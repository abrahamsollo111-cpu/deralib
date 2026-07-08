"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Moteur d'effets global, sans dépendance externe.
 *
 * Attributs disponibles dans les pages (rendues côté serveur) :
 * - [data-reveal]            → apparition en fondu à l'entrée dans l'écran
 * - [data-stagger] (parent)  → décale les apparitions de ses enfants en cascade
 * - [data-parallax="0.3"]    → déplacement vertical lié au scroll (facteur = vitesse)
 * - [data-parallax-x="0.1"]  → composante horizontale du parallax
 * - [data-parallax-r="0.5"]  → légère rotation liée au scroll
 * - [data-depth="18"]        → parallax souris (dans un conteneur [data-mouse-zone])
 * - [data-count="15"] [data-count-suffix="%"] → compteur animé (la valeur finale
 *   est rendue côté serveur ; le compteur repart de 0 à l'entrée dans l'écran)
 * - .scroll-progress         → barre de progression de lecture (dans le layout)
 *
 * Performance : toutes les écritures passent par transform (composité GPU),
 * chaque frame fait d'abord TOUTES ses lectures (getBoundingClientRect,
 * dédupliquées par élément hôte) puis toutes ses écritures — jamais
 * d'entrelacement lecture/écriture. Les sections hors écran reçoivent la
 * classe .anim-off qui met en pause leurs animations CSS décoratives.
 * Tout est désactivé si l'utilisateur préfère réduire les animations.
 */
export default function ScrollFx() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    /* ---------- Apparitions en cascade ---------- */
    document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((parent) => {
      parent.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el, i) => {
        el.style.transitionDelay = `${Math.min(i * 90, 540)}ms`;
      });
    });

    const finishReveal = (el: HTMLElement) => {
      // une fois l'apparition jouée, on retire l'attribut : les transitions
      // propres de l'élément (hover des cartes, etc.) reprennent la main
      // sans hériter du transition-delay de la cascade
      el.classList.add("is-visible");
      window.setTimeout(() => {
        el.removeAttribute("data-reveal");
        el.style.transitionDelay = "";
      }, 1500);
    };

    const revealEls = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (reduced) {
      revealEls.forEach((el) => {
        el.removeAttribute("data-reveal");
        el.style.transitionDelay = "";
      });
    } else if (revealEls.length) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              finishReveal(entry.target as HTMLElement);
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
      );
      revealEls.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    /* ---------- Compteurs animés ---------- */
    // La valeur finale est déjà dans le HTML serveur (lecteurs d'écran, no-JS,
    // robots). En mode animé, on repart de 0 au moment où le bloc devient
    // visible, puis on remonte vers la valeur finale.
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    if (counters.length && !reduced) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            io.unobserve(el);
            const target = parseFloat(el.dataset.count || "0");
            const suffix = el.dataset.countSuffix || "";
            const setFinal = () => {
              el.textContent = (el.dataset.count || "") + suffix;
            };
            const start = performance.now();
            const duration = 1500;
            const tick = (now: number) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              el.textContent = String(Math.round(target * eased)) + suffix;
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            // filet de sécurité : si l'onglet passe en arrière-plan,
            // requestAnimationFrame est suspendu → on force la valeur finale
            window.setTimeout(setFinal, duration + 200);
          });
        },
        { threshold: 0.5 }
      );
      counters.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    /* ---------- Pause des animations décoratives hors écran ---------- */
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section"));
    if (sections.length && !reduced) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            entry.target.classList.toggle("anim-off", !entry.isIntersecting);
          });
        },
        { rootMargin: "100px 0px" }
      );
      sections.forEach((s) => io.observe(s));
      cleanups.push(() => io.disconnect());
    }

    /* ---------- Parallax scroll + souris, header, progression ---------- */
    type Layer = {
      el: HTMLElement;
      host: HTMLElement;
      y: number;
      x: number;
      r: number;
      depth: number;
      mx: number;
      my: number;
    };
    const layers: Layer[] = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax], [data-depth]")
    ).map((el) => ({
      el,
      // le parent sert de référence de mesure : ne jamais imbriquer deux
      // éléments parallax (le parent ne doit pas être transformé)
      host: el.parentElement || el,
      y: parseFloat(el.dataset.parallax || "0"),
      x: parseFloat(el.dataset.parallaxX || "0"),
      r: parseFloat(el.dataset.parallaxR || "0"),
      depth: parseFloat(el.dataset.depth || "0"),
      mx: 0,
      my: 0,
    }));

    const progress = document.querySelector<HTMLElement>(".scroll-progress");
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;

      /* --- phase 1 : LECTURES uniquement (rects dédupliqués par hôte) --- */
      const scrollMax = document.documentElement.scrollHeight - vh;
      const hostRects = new Map<HTMLElement, DOMRect>();
      if (!reduced) {
        for (const l of layers) {
          if (!hostRects.has(l.host)) hostRects.set(l.host, l.host.getBoundingClientRect());
        }
      }

      /* --- phase 2 : ÉCRITURES uniquement --- */
      document.body.classList.toggle("scrolled", window.scrollY > 8);
      if (progress) {
        progress.style.transform = `scaleX(${scrollMax > 0 ? Math.min(window.scrollY / scrollMax, 1) : 0})`;
      }
      if (reduced) return;

      for (const l of layers) {
        const rect = hostRects.get(l.host)!;
        if (rect.bottom < -250 || rect.top > vh + 250) continue;
        const d = rect.top + rect.height / 2 - vh / 2;
        const tx = -d * l.x + l.mx;
        const ty = -d * l.y + l.my;
        const rot = l.r ? ` rotate(${((d * l.r) / 12).toFixed(2)}deg)` : "";
        l.el.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0)${rot}`;
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    cleanups.push(() => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    });

    /* ---------- Parallax souris (zones dédiées, desktop uniquement) ---------- */
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!reduced && fine) {
      document.querySelectorAll<HTMLElement>("[data-mouse-zone]").forEach((zone) => {
        const zoneLayers = layers.filter((l) => l.depth !== 0 && zone.contains(l.el));
        if (!zoneLayers.length) return;
        let zoneRect: DOMRect | null = null;
        const invalidate = () => {
          zoneRect = null;
        };
        const onMove = (e: MouseEvent) => {
          if (!zoneRect) zoneRect = zone.getBoundingClientRect();
          const nx = ((e.clientX - zoneRect.left) / zoneRect.width - 0.5) * 2;
          const ny = ((e.clientY - zoneRect.top) / zoneRect.height - 0.5) * 2;
          zoneLayers.forEach((l) => {
            l.mx = -nx * l.depth;
            l.my = -ny * l.depth;
          });
          schedule();
        };
        const onLeave = () => {
          zoneLayers.forEach((l) => {
            l.mx = 0;
            l.my = 0;
          });
          schedule();
        };
        zone.addEventListener("mousemove", onMove, { passive: true });
        zone.addEventListener("mouseleave", onLeave);
        window.addEventListener("scroll", invalidate, { passive: true });
        window.addEventListener("resize", invalidate);
        cleanups.push(() => {
          zone.removeEventListener("mousemove", onMove);
          zone.removeEventListener("mouseleave", onLeave);
          window.removeEventListener("scroll", invalidate);
          window.removeEventListener("resize", invalidate);
        });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}

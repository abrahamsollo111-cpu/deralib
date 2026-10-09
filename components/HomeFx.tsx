"use client";

import { useEffect } from "react";

/**
 * Titres de section de l'accueil qui montent mot par mot à l'entrée dans
 * l'écran (GSAP SplitText + ScrollTrigger), chargés après l'affichage.
 * Rien si l'utilisateur a demandé à réduire les animations.
 */
export default function HomeFx() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let revert = () => {};
    let annule = false;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { SplitText } = await import("gsap/SplitText");
      if (annule) return;
      gsap.registerPlugin(ScrollTrigger, SplitText);

      const ctx = gsap.context(() => {
        document.querySelectorAll<HTMLElement>(".cl-section h2").forEach((h2) => {
          const split = SplitText.create(h2, { type: "words", mask: "words" });
          gsap.from(split.words, {
            yPercent: 110,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.06,
            scrollTrigger: { trigger: h2, start: "top 88%", once: true },
          });
        });
      });
      revert = () => ctx.revert();
    })();

    return () => {
      annule = true;
      revert();
    };
  }, []);
  return null;
}

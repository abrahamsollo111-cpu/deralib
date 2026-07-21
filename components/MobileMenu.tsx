"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconPhone } from "./Icons";
import { site } from "@/lib/config";
import { NUISIBLES_SLUGS, NUISIBLES_LABELS } from "@/lib/nuisibles";

/**
 * Menu hamburger mobile : bouton 3 traits → croix (animation CSS),
 * panneau qui se déplie sous le header avec les liens en cascade.
 * Se ferme au clic sur un lien, sur le fond, à la touche Échap
 * et à chaque changement de page.
 */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        className={`mnav-toggle${open ? " is-open" : ""}`}
        aria-expanded={open}
        aria-controls="menu-mobile"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
        <span />
      </button>

      <div
        className={`mnav-backdrop${open ? " is-open" : ""}`}
        onClick={close}
        aria-hidden
      />

      <nav
        id="menu-mobile"
        className={`mnav-panel${open ? " is-open" : ""}`}
        aria-label="Menu"
      >
        <ul>
          {NUISIBLES_SLUGS.map((slug) => (
            <li key={slug}>
              <Link href={`/${slug}`} onClick={close}>
                {NUISIBLES_LABELS[slug]}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/conseils" onClick={close}>
              Conseils
            </Link>
          </li>
          <li>
            <Link href="/a-propos" onClick={close}>
              À propos
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={close}>
              Contact
            </Link>
          </li>
          <li>
            <Link href="/devis" onClick={close}>
              Devis gratuit
            </Link>
          </li>
        </ul>
        <a href={site.telephoneHref} className="btn btn-primary btn-lg btn-call mnav-call">
          <IconPhone /> {site.telephone}
        </a>
        <p className="dispo" style={{ marginTop: 12, justifyContent: "center", width: "100%" }}>
          <span className="dot" /> <span>Nous répondons <em>{site.horaires}</em></span>
        </p>
      </nav>
    </>
  );
}

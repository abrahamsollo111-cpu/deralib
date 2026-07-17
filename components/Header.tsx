import Link from "next/link";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { IconPhone } from "./Icons";
import { site } from "@/lib/config";
import { NUISIBLES_SLUGS, NUISIBLES_LABELS } from "@/lib/content";

export default function Header() {
  return (
    <>
      {/* bandeau fin : disponibilité + expérience */}
      <div className="topbar">
        Intervention 7j/7 en {site.zone} — <em>{site.anneesMetier} ans de métier</em> — Devis gratuit
      </div>
      <header className="header">
        <div className="container header-inner">
          <Logo />
          {/* navigation desktop */}
          <nav className="header-nav" aria-label="Navigation principale">
            {NUISIBLES_SLUGS.map((slug) => (
              <Link key={slug} href={`/${slug}`}>
                {NUISIBLES_LABELS[slug]}
              </Link>
            ))}
            <Link href="/a-propos">À propos</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div className="header-cta">
            {/* desktop : numéro très visible + devis */}
            <a
              href={site.telephoneHref}
              className="header-phone"
              aria-label={`Appeler le ${site.telephone}`}
            >
              <IconPhone />
              <span className="header-phone-bloc">
                <span>{site.telephone}</span>
                <span className="header-phone-note">{site.horaires}</span>
              </span>
            </a>
            <Link href="/devis" className="btn btn-primary header-devis">
              Devis gratuit
            </Link>
            {/* mobile : bouton d'appel + hamburger */}
            <a
              href={site.telephoneHref}
              className="btn btn-primary btn-call call-cta"
              aria-label={`Appeler le ${site.telephone}`}
            >
              <IconPhone size={16} /> <span>Appeler</span>
            </a>
            <MobileMenu />
          </div>
        </div>
      </header>
    </>
  );
}

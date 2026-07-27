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
          {/* navigation desktop : les 5 services sont regroupés dans un
              menu déroulant pour que la barre reste aérée (4 entrées) */}
          <nav className="header-nav" aria-label="Navigation principale">
            <div className="nav-groupe">
              <button type="button" className="nav-groupe-btn" aria-haspopup="true">
                Nos services
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className="nav-menu">
                <div className="nav-menu-inner">
                  {NUISIBLES_SLUGS.map((slug) => (
                    <Link key={slug} href={`/${slug}`}>
                      {NUISIBLES_LABELS[slug]}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {/* « À propos» reste accessible via le footer et le menu
                mobile : la barre desktop privilégie les pages business */}
            <Link href="/professionnels">Professionnels</Link>
            <Link href="/conseils">Conseils</Link>
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

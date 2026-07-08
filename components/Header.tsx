import Link from "next/link";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { IconPhone } from "./Icons";
import { site } from "@/lib/config";
import { NUISIBLES_SLUGS, NUISIBLES_LABELS } from "@/lib/content";

export default function Header() {
  return (
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
        </nav>
        <div className="header-cta">
          {/* desktop : numéro + devis */}
          <a
            href={site.telephoneHref}
            className="header-phone"
            aria-label={`Appeler le ${site.telephone}`}
          >
            <IconPhone />
            <span>{site.telephone}</span>
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
  );
}

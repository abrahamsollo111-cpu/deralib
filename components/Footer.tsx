import Link from "next/link";
import Logo from "./Logo";
import { IconPhone } from "./Icons";
import { site } from "@/lib/config";
import { NUISIBLES_SLUGS, NUISIBLES_LABELS } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Logo invert />
            <p className="footer-desc">
              Entreprise de dératisation et de lutte anti-nuisibles en{" "}
              {site.zone}. Une équipe de techniciens certifiés{" "}
              {site.certification} qui réalisent eux-mêmes les interventions.
            </p>
            <a href={site.telephoneHref} className="footer-phone">
              <IconPhone /> {site.telephone}
            </a>
          </div>
          <div>
            <h4>Nos services</h4>
            <ul>
              {NUISIBLES_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link href={`/${slug}`}>{NUISIBLES_LABELS[slug]}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Zones d&apos;intervention</h4>
            <ul>
              <li>
                <Link href="/deratisation/paris">Dératisation Paris</Link>
              </li>
              <li>Toute l&apos;{site.zone}</li>
            </ul>
          </div>
          <div>
            <h4>L&apos;entreprise</h4>
            <ul>
              <li>
                <Link href="/a-propos">À propos de nous</Link>
              </li>
              <li>
                <Link href="/devis">Demander un devis</Link>
              </li>
              <li>
                <Link href="/mentions-legales">Mentions légales</Link>
              </li>
              <li>
                <Link href="/politique-de-confidentialite">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.marque} — {site.slogan}
          </span>
          <span>
            Intervention 7j/7 en {site.zone} — Devis gratuit
          </span>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import Logo from "./Logo";
import { IconPhone } from "./Icons";
import { site } from "@/lib/config";
import { NUISIBLES_SLUGS, NUISIBLES_LABELS } from "@/lib/content";

// Un champ de config encore marqué TODO n'est pas affiché :
// on ne publie jamais de fausse donnée légale.
const estRenseigne = (v: string) => v !== "" && !v.includes("TODO");

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Logo invert />
            <p className="footer-desc">
              Entreprise de dératisation et de lutte anti-nuisibles en{" "}
              {site.zone}. Les interventions sont réalisées par nos techniciens
              salariés, certifiés {site.certification} — jamais sous-traitées.
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
                <Link href="/deratisation/paris">Dératisation à Paris</Link>
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
                <Link href="/contact">Contact</Link>
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

        {/* Bloc légal — E-E-A-T et SEO local : raison sociale, SIRET,
            adresse et ancienneté identiques partout (NAP cohérent).
            ⚠️ TODO : ces lignes n'apparaîtront qu'une fois les champs
            correspondants remplis dans lib/config.ts */}
        <div className="footer-legal">
          {estRenseigne(site.raisonSociale) && <span>{site.raisonSociale}</span>}
          {estRenseigne(site.siret) && <span>SIRET {site.siret}</span>}
          {estRenseigne(site.adresse) && (
            <span>
              {site.adresse}
              {estRenseigne(site.codePostal) && `, ${site.codePostal} ${site.villeSiege}`}
            </span>
          )}
          {estRenseigne(site.anneeCreation) && <span>Depuis {site.anneeCreation}</span>}
          <span>Techniciens certifiés {site.certification}{estRenseigne(site.certibiocideNumero) && ` n° ${site.certibiocideNumero}`}</span>
          {estRenseigne(site.rcProAssureur) && (
            <span>
              Assurance RC professionnelle {site.rcProAssureur}
              {estRenseigne(site.rcProContrat) && ` — contrat n° ${site.rcProContrat}`}
            </span>
          )}
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.marque} — {site.slogan}
          </span>
          <span>Intervention 7j/7 en {site.zone} — Devis gratuit</span>
        </div>
      </div>
    </footer>
  );
}

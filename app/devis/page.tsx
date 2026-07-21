import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import HeroDecor from "@/components/HeroDecor";
import DevisForm from "./DevisForm";
import { IconPhone, IconCheck } from "@/components/Icons";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Devis gratuit — décrivez votre problème de nuisibles",
  description: `Demandez votre devis gratuit : un technicien ${site.marque} vous rappelle rapidement avec un diagnostic et un prix clair. Intervention partout en ${site.zone}.`,
  alternates: { canonical: "/devis" },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs crumbs={[{ label: "Devis gratuit" }]} />
      <section className="hero" style={{ padding: "56px 0 88px" }} data-mouse-zone>
        <HeroDecor />
        <div className="container two-col two-col-top" style={{ position: "relative", zIndex: 2 }}>
          <div>
            <h1>Devis gratuit en 2 minutes</h1>
            <p className="lead" style={{ margin: "18px 0 24px" }}>
              Décrivez la situation, un technicien vous rappelle rapidement
              avec un diagnostic et un prix clair — sans engagement.
            </p>
            <ul className="checklist" style={{ marginBottom: 24 }}>
              <li>
                <IconCheck /> Réponse rapide par un technicien, pas un centre d&apos;appels
              </li>
              <li>
                <IconCheck /> Prix confirmé avant toute intervention
              </li>
              <li>
                <IconCheck /> Intervention possible en 30-45 min en {site.zone}
              </li>
            </ul>
            <p style={{ fontWeight: 700, color: "var(--marine)" }}>
              Vous préférez nous parler directement ?
            </p>
            <a
              href={site.telephoneHref}
              className="btn btn-primary btn-lg btn-call"
              style={{ marginTop: 12 }}
            >
              <IconPhone /> {site.telephone}
            </a>
            <p className="dispo" style={{ marginTop: 14 }}>
              <span className="dot" /> <span>Nous répondons <em>{site.horaires}</em></span>
            </p>
          </div>
          <div className="form-card">
            <DevisForm />
          </div>
        </div>
      </section>
    </>
  );
}

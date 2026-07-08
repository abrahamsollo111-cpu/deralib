import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site ${site.url.replace("https://", "")}.`,
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs crumbs={[{ label: "Mentions légales" }]} />
      <section>
        <div className="container prose">
          <h1>Mentions légales</h1>
          <p style={{ marginTop: 18 }}>
            [PAGE À COMPLÉTER avec les informations légales définitives de la
            société.]
          </p>

          <h2>Éditeur du site</h2>
          <ul>
            <li>
              <strong>Dénomination :</strong> {site.raisonSociale}
            </li>
            <li>
              <strong>SIREN :</strong> {site.siren}
            </li>
            <li>
              <strong>Siège social :</strong> {site.adresse}
            </li>
            <li>
              <strong>Directeur de la publication :</strong> {site.dirigeant}
            </li>
            <li>
              <strong>Téléphone :</strong> {site.telephone}
            </li>
            <li>
              <strong>Email :</strong> {site.email}
            </li>
          </ul>

          <h2>Hébergement</h2>
          <p>
            Ce site est hébergé par Vercel Inc., 440 N Barranca Ave #4133,
            Covina, CA 91723, États-Unis — vercel.com.
          </p>

          <h2>Activité réglementée</h2>
          <p>
            Les interventions utilisant des produits biocides sont réalisées
            par des techniciens titulaires du certificat individuel{" "}
            {site.certification}, conformément à la réglementation en vigueur.
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus de ce site (textes, images, logo) est la
            propriété de {site.raisonSociale} et ne peut être reproduit sans
            autorisation écrite préalable.
          </p>
        </div>
      </section>
    </>
  );
}

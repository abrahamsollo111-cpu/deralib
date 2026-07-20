import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site ${site.url.replace("https://", "")} — éditeur, hébergeur, activité réglementée, propriété intellectuelle.`,
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false },
};

// Un champ de config encore marqué TODO n'est pas publié.
const estRenseigne = (v: string) => v !== "" && !v.includes("TODO");

export default function Page() {
  return (
    <>
      <Breadcrumbs crumbs={[{ label: "Mentions légales" }]} />
      <section>
        <div className="container prose">
          <h1>Mentions légales</h1>

          {/* ⚠️ TODO AVANT MISE EN PRODUCTION DÉFINITIVE : compléter dans
              lib/config.ts la raison sociale, le SIRET, l'adresse du siège
              et le nom du dirigeant — chaque ligne s'affichera dès que le
              champ sera rempli. Ajouter aussi ci-dessous : capital social,
              RCS et ville d'immatriculation, n° TVA intracommunautaire,
              médiateur de la consommation (obligatoire B2C). Ces mentions
              sont exigées par la loi : la page est incomplète tant que ces
              données manquent. */}

          <h2>Éditeur du site</h2>
          <ul>
            <li>
              <strong>Dénomination :</strong>{" "}
              {estRenseigne(site.raisonSociale) ? site.raisonSociale : site.marque}
            </li>
            {estRenseigne(site.siret) && (
              <li>
                <strong>SIRET :</strong> {site.siret}
              </li>
            )}
            {estRenseigne(site.adresse) && (
              <li>
                <strong>Siège social :</strong> {site.adresse},{" "}
                {site.codePostal} {site.villeSiege}
              </li>
            )}
            {estRenseigne(site.dirigeant) && (
              <li>
                <strong>Directeur de la publication :</strong> {site.dirigeant}
              </li>
            )}
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
            L&apos;application de produits biocides à titre professionnel est
            subordonnée à la détention du certificat individuel{" "}
            {site.certification} (arrêté du 9 octobre 2013 modifié), couvrant
            notamment les produits des types TP14 (rodenticides) et TP18
            (insecticides). Les techniciens de {site.marque} sont titulaires de
            ce certificat.
            {/* TODO : ajouter le n° de certificat dans lib/config.ts */}
          </p>
          <p>
            L&apos;entreprise est couverte par une assurance responsabilité
            civile professionnelle.
            {estRenseigne(site.rcProAssureur) &&
              ` Assureur : ${site.rcProAssureur}${estRenseigne(site.rcProContrat) ? ` — contrat n° ${site.rcProContrat}` : ""}.`}
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus de ce site (textes, images, logo) est
            la propriété de{" "}
            {estRenseigne(site.raisonSociale) ? site.raisonSociale : site.marque}{" "}
            et ne peut être reproduit sans autorisation écrite préalable.
          </p>

          <h2>Données personnelles</h2>
          <p>
            Les traitements de données réalisés via ce site sont décrits dans
            notre{" "}
            <a href="/politique-de-confidentialite">
              politique de confidentialité
            </a>
            .
          </p>

          <h2>Médiation de la consommation</h2>
          <p>
            Conformément à l&apos;article L612-1 du Code de la consommation,
            tout consommateur a le droit de recourir gratuitement à un
            médiateur de la consommation en vue de la résolution amiable
            d&apos;un litige. Les coordonnées du médiateur compétent seront
            communiquées sur demande à {site.email}.
            {/* TODO : remplacer par le nom et les coordonnées du médiateur
                choisi dès l'adhésion effectuée (obligation légale B2C) */}
          </p>
        </div>
      </section>
    </>
  );
}

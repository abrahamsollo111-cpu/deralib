import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site ${site.url.replace("https://", "")} — éditeur, hébergeur, activité réglementée, propriété intellectuelle.`,
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

          {/* ⚠️ TODO : remplacer les champs marqués TODO dans lib/config.ts
              (raison sociale, SIRET, adresse, dirigeant) — ils s'affichent
              tels quels ici tant qu'ils ne sont pas renseignés. Ajouter
              également : capital social, RCS et ville d'immatriculation,
              n° de TVA intracommunautaire. */}

          <h2>Éditeur du site</h2>
          <ul>
            <li>
              <strong>Dénomination :</strong> {site.raisonSociale}
            </li>
            <li>
              <strong>SIRET :</strong> {site.siret}
            </li>
            <li>
              <strong>Capital social :</strong> [TODO : capital social]
            </li>
            <li>
              <strong>RCS :</strong> [TODO : n° RCS et ville d&apos;immatriculation]
            </li>
            <li>
              <strong>TVA intracommunautaire :</strong> [TODO : n° de TVA]
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
            civile professionnelle. [TODO : assureur et n° de contrat dans
            lib/config.ts]
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus de ce site (textes, images, logo) est
            la propriété de {site.raisonSociale} et ne peut être reproduit sans
            autorisation écrite préalable.
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
            médiateur de la consommation. [TODO : nom et coordonnées du
            médiateur choisi par l&apos;entreprise — obligation légale pour
            toute entreprise vendant aux particuliers.]
          </p>
        </div>
      </section>
    </>
  );
}

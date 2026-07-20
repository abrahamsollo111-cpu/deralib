import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Politique de confidentialité et de protection des données personnelles de ${site.marque}.`,
  alternates: { canonical: "/politique-de-confidentialite" },
  robots: { index: false },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs crumbs={[{ label: "Politique de confidentialité" }]} />
      <section>
        <div className="container prose">
          <h1>Politique de confidentialité</h1>

          {/* TODO : faire valider cette version par le client ; compléter
              le responsable de traitement avec la raison sociale exacte
              dès qu'elle est renseignée dans lib/config.ts */}
          <h2>Qui sommes-nous ?</h2>
          <p>
            Le responsable du traitement des données collectées sur ce site
            est {site.raisonSociale.includes("TODO") ? site.marque : site.raisonSociale},
            joignable à l&apos;adresse {site.email}.
          </p>

          <h2>Quelles données collectons-nous ?</h2>
          <p>
            Lorsque vous remplissez notre formulaire de devis ou nous
            contactez, nous collectons uniquement les informations nécessaires
            au traitement de votre demande : nom, téléphone, ville, nature du
            problème et description que vous fournissez.
          </p>

          <h2>Pourquoi et pour combien de temps ?</h2>
          <p>
            Ces données servent exclusivement à vous recontacter, établir un
            devis et organiser une éventuelle intervention. Elles ne sont
            jamais revendues ni transmises à des tiers à des fins commerciales.
            Elles sont conservées au maximum 3 ans après le dernier contact,
            conformément aux recommandations de la CNIL pour la prospection.
            {/* TODO : durée à confirmer par le client (3 ans = référence
                CNIL pour les prospects) */}
          </p>

          <h2>Cookies et mesure d&apos;audience</h2>
          <p>
            Ce site n&apos;utilise ni cookies publicitaires ni traceurs
            nécessitant un consentement.
            {/* TODO : mettre à jour cette section si un outil de mesure
                d'audience est ajouté plus tard */}
          </p>

          <h2>Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
            rectification, d&apos;effacement et d&apos;opposition sur vos données.
            Pour l&apos;exercer, écrivez-nous à {site.email}. Vous pouvez également
            saisir la CNIL (cnil.fr) si vous estimez que vos droits ne sont pas
            respectés.
          </p>
        </div>
      </section>
    </>
  );
}

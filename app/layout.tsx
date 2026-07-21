import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollFx from "@/components/ScrollFx";
import JsonLd from "@/components/JsonLd";
import { site, DEPARTEMENTS } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Dératisation & anti-nuisibles ${site.zone} | ${site.marque}`,
    template: `%s | ${site.marque}`,
  },
  description: `Entreprise de dératisation et de lutte anti-nuisibles en ${site.zone}. Techniciens salariés certifiés ${site.certification}. Sur place en 30-45 min, devis gratuit.`,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.marque,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <body>
        {/* sans JavaScript, les éléments à apparition différée restent visibles */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <div className="scroll-progress" aria-hidden />
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <ScrollFx />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": `${site.url}/#organization`,
                name: site.marque,
                url: site.url,
                telephone: site.telephone,
                email: site.email,
                slogan: site.slogan,
              },
              {
                "@type": "WebSite",
                "@id": `${site.url}/#website`,
                name: site.marque,
                url: site.url,
                inLanguage: "fr-FR",
                publisher: { "@id": `${site.url}/#organization` },
              },
              {
                // PestControl = sous-type LocalBusiness dédié au métier
                "@type": "PestControl",
                "@id": `${site.url}/#localbusiness`,
                name: site.marque,
                description: `Entreprise de dératisation et de lutte anti-nuisibles en ${site.zone}. Sur place en 30-45 min, techniciens certifiés ${site.certification}.`,
                url: site.url,
                telephone: site.telephone,
                email: site.email,
                priceRange: "€€",
                // TODO : ajouter "address" (PostalAddress) et "geo" dès que
                // l'adresse du siège est renseignée dans lib/config.ts —
                // identique à la fiche Google Business Profile
                openingHoursSpecification: {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: site.horairesSchema.jours,
                  opens: site.horairesSchema.ouverture,
                  closes: site.horairesSchema.fermeture,
                },
                areaServed: DEPARTEMENTS.map((d) => ({
                  "@type": "AdministrativeArea",
                  name: `${d.nom} (${d.code})`,
                })),
                knowsAbout: [
                  "dératisation",
                  "punaises de lit",
                  "cafards et blattes",
                  "guêpes et frelons",
                ],
                parentOrganization: { "@id": `${site.url}/#organization` },
              },
            ],
          }}
        />
      </body>
    </html>
  );
}

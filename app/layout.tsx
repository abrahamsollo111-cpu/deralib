import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollFx from "@/components/ScrollFx";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.marque} — Dératisation & lutte anti-nuisibles en ${site.zone}`,
    template: `%s | ${site.marque}`,
  },
  description: `Entreprise de dératisation et de lutte anti-nuisibles en ${site.zone}. Techniciens salariés certifiés ${site.certification}. Intervention rapide, devis gratuit.`,
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
                "@type": "LocalBusiness",
                "@id": `${site.url}/#localbusiness`,
                name: site.marque,
                description: `Entreprise de dératisation et de lutte anti-nuisibles en ${site.zone}.`,
                url: site.url,
                telephone: site.telephone,
                email: site.email,
                areaServed: {
                  "@type": "AdministrativeArea",
                  name: site.zone,
                },
                knowsAbout: [
                  "dératisation",
                  "punaises de lit",
                  "cafards",
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

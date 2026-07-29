import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reassurance from "@/components/Reassurance";
import SectionsLocales from "@/components/SectionsLocales";
import CtaRassure from "@/components/CtaRassure";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { IconPhone, IconPin, IconArrow, IconCheck } from "@/components/Icons";
import { site } from "@/lib/config";
import { getVille, getAllVilles, NUISIBLES_LABELS } from "@/lib/content";

/**
 * Chaque département a sa propre respiration : photo de la bande
 * immersive, position de cette bande dans la lecture, et légende.
 * Combiné à l'alternance gauche/droite des sections et au numéro du
 * département en filigrane, aucune des 8 pages ne ressemble à sa sœur.
 */
const VARIANTES_VILLE: Record<
  string,
  { photo: string; alt: string; legende: string; apres: number }
> = {
  paris: {
    photo: "/images/technicien-traitement-plinthes.jpg",
    alt: "Technicien traitant les plinthes d'un appartement parisien",
    legende: "Traitement au plus près des passages : plinthes, gaines, caves.",
    apres: 1,
  },
  "hauts-de-seine": {
    photo: "/images/techniciens-deratisation-entrepot.jpg",
    alt: "Techniciens Deralib préparant une intervention en entrepôt",
    legende: "Sièges sociaux, commerces, pavillons : nous couvrons tout le 92.",
    apres: 0,
  },
  "seine-saint-denis": {
    photo: "/images/technicien-deralib-inspection-entrepot.jpg",
    alt: "Technicien Deralib inspectant une réserve de stockage",
    legende: "Entrepôts et logistique : le 93 est notre terrain quotidien.",
    apres: 1,
  },
  "val-de-marne": {
    photo: "/images/technicien-traitement-plinthes.jpg",
    alt: "Traitement des plinthes dans un logement du Val-de-Marne",
    legende: "Du pavillon aux bords de Marne, un protocole complet.",
    apres: 0,
  },
  "seine-et-marne": {
    photo: "/images/technicien-deralib-inspection-entrepot.jpg",
    alt: "Inspection d'un bâtiment agricole par un technicien Deralib",
    legende: "Fermes, granges, zones d'activité : le 77 côté terrain.",
    apres: 1,
  },
  yvelines: {
    photo: "/images/techniciens-deratisation-entrepot.jpg",
    alt: "Équipe Deralib en intervention de dératisation",
    legende: "Des Yvelines résidentielles aux zones commerciales.",
    apres: 0,
  },
  essonne: {
    photo: "/images/technicien-traitement-plinthes.jpg",
    alt: "Traitement anti-rongeurs le long des plinthes d'une cuisine",
    legende: "Pavillons, résidences, commerces : l'Essonne couverte 24h/24.",
    apres: 1,
  },
  "val-d-oise": {
    photo: "/images/techniciens-deratisation-entrepot.jpg",
    alt: "Techniciens Deralib équipés pour une intervention en entrepôt",
    legende: "Du bâti ancien aux plateformes de Roissy : le 95 sous protection.",
    apres: 0,
  },
};

// Une page département n'existe que si une vraie fiche locale existe
// (contenu unique par département — jamais de template dupliqué)
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllVilles().map((v) => ({ ville: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ville: string }>;
}): Promise<Metadata> {
  const { ville } = await params;
  const v = getVille(ville);
  return {
    title: { absolute: v.meta_title },
    description: v.meta_description,
    alternates: { canonical: `/deratisation/${v.slug}` },
    openGraph: { title: v.meta_title, description: v.meta_description },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ ville: string }>;
}) {
  const { ville } = await params;
  const v = getVille(ville);
  const autres = getAllVilles().filter((a) => a.slug !== v.slug);
  const variante = VARIANTES_VILLE[v.slug] ?? VARIANTES_VILLE["paris"];

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { label: NUISIBLES_LABELS["deratisation"], href: "/deratisation" },
          { label: v.nom },
        ]}
      />

      {/* ===== HERO (numéro du département en filigrane parallax) ===== */}
      <section className="hero hero-page hero-ville">
        <span className="hero-watermark" data-parallax="0.12" aria-hidden>
          {v.departement}
        </span>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <h1 style={{ maxWidth: 860 }}>{v.h1}</h1>
          <p className="lead" style={{ maxWidth: 760, margin: "20px 0 28px" }}>
            {v.intro}
          </p>
          <div className="hero-actions">
            <a href={site.telephoneHref} className="btn btn-primary btn-lg btn-call">
              <IconPhone /> {site.telephone}
            </a>
            <Link href="/devis" className="btn btn-outline btn-lg">
              Devis gratuit en ligne
            </Link>
          </div>
          <p className="dispo">
            <span className="dot" />
            <span>
              Nous répondons <em>{site.horaires}</em> — appel sans engagement
            </span>
          </p>
          <CtaRassure />
        </div>
      </section>

      <Reassurance />

      {/* ===== CONTENU LOCAL (sections uniques au département,
           mise en page alternée + bande photo parallax) ===== */}
      <SectionsLocales
        sections={v.sections}
        bandePhoto={{ src: variante.photo, alt: variante.alt }}
        bandeTitre={variante.legende}
        bandeApres={variante.apres}
      />

      {/* ===== COMMUNES COUVERTES ===== */}
      <section className="section-azur">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">
              <IconPin size={14} /> Couverture
            </span>
            <h2>Communes couvertes — {v.nom} ({v.departement})</h2>
            <p>{v.delais}</p>
          </div>
          <div className="chip-list" data-reveal>
            {v.villes_principales.map((q) => (
              <span key={q} className="chip">
                {q}
              </span>
            ))}
            <span className="chip">… et tout le département</span>
          </div>
        </div>
      </section>

      {/* ===== QUI FAIT QUOI ===== */}
      <section>
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">Bon à savoir</span>
            <h2>Espace public ou logement privé : qui contacter ?</h2>
          </div>
          <div className="signs-grid" data-stagger>
            <div className="sign" data-reveal>
              <h3>Sur la voie publique</h3>
              <p>{v.signalement.espace_public}</p>
            </div>
            <div className="sign" data-reveal>
              <h3>Logement insalubre</h3>
              <p>{v.signalement.logement_insalubre}</p>
            </div>
            <div className="sign" data-reveal>
              <h3>Chez vous ou en copropriété</h3>
              <p>{v.signalement.prive}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ LOCALE ===== */}
      <section className="section-azur">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">FAQ</span>
            <h2>Questions fréquentes — {v.nom}</h2>
          </div>
          <Faq items={v.faq_locale} />
        </div>
      </section>

      {/* ===== MAILLAGE : services + autres départements ===== */}
      <section>
        <div className="container" data-reveal>
          <p style={{ fontWeight: 700, color: "var(--marine)", marginBottom: 12 }}>
            <IconCheck size={15} /> Nos services en {v.nom} :
          </p>
          <div className="chip-list" style={{ marginBottom: 26 }}>
            <Link href="/deratisation" className="chip">
              Dératisation en {site.zone} <IconArrow size={12} />
            </Link>
            <Link href="/punaises-de-lit" className="chip">
              Traitement punaises de lit
            </Link>
            <Link href="/cafards" className="chip">
              Traitement cafards
            </Link>
            <Link href="/guepes-frelons" className="chip">
              Destruction nid de guêpes
            </Link>
          </div>
          <p style={{ fontWeight: 700, color: "var(--marine)", marginBottom: 12 }}>
            <IconPin size={15} /> Dératisation dans les autres départements :
          </p>
          <div className="chip-list">
            {autres.map((a) => (
              <Link key={a.slug} href={`/deratisation/${a.slug}`} className="chip">
                Dératisation {a.nom} ({a.departement})
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={`Un problème de rongeurs en ${v.nom} ?`}
        text="Appelez-nous ou décrivez la situation en ligne : un technicien vous rappelle avec un diagnostic et un prix clair."
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Dératisation ${v.nom}`,
          description: v.meta_description,
          url: `${site.url}/deratisation/${v.slug}`,
          areaServed: { "@type": "AdministrativeArea", name: `${v.nom} (${v.departement})` },
          provider: { "@id": `${site.url}/#localbusiness` },
        }}
      />
    </>
  );
}

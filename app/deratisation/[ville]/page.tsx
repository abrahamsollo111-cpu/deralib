import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import HeroDecor from "@/components/HeroDecor";
import Reassurance from "@/components/Reassurance";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { IconPhone, IconPin, IconArrow } from "@/components/Icons";
import { site } from "@/lib/config";
import { getVille, getAllVilles, NUISIBLES_LABELS } from "@/lib/content";

// Une page ville n'est créée que si une vraie fiche locale existe (règle §3.1 du PLAN)
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
    title: {
      absolute: `Dératisation à ${v.nom} (${v.departement}) — intervention rapide | ${site.marque}`,
    },
    description: `Rats ou souris à ${v.nom} ? Nos techniciens certifiés ${site.certification} interviennent dans tous les arrondissements. Diagnostic, traitement, prévention. Devis gratuit.`,
    alternates: { canonical: `/deratisation/${v.slug}` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ ville: string }>;
}) {
  const { ville } = await params;
  const v = getVille(ville);

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { label: NUISIBLES_LABELS["deratisation"], href: "/deratisation" },
          { label: v.nom },
        ]}
      />

      {/* ===== HERO ===== */}
      <section className="hero hero-page" data-mouse-zone>
        <HeroDecor />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <h1 style={{ maxWidth: 860 }}>
            Dératisation à {v.nom} : nos techniciens interviennent dans tous
            les arrondissements
          </h1>
          <p className="lead" style={{ maxWidth: 760, margin: "20px 0 28px" }}>
            Rats ou souris dans votre logement, votre cave ou votre commerce à{" "}
            {v.nom} ? Nos techniciens certifiés {site.certification}{" "}
            connaissent le terrain parisien et interviennent rapidement, avec
            un protocole complet : diagnostic, traitement sécurisé, obturation
            des accès et suivi.
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
        </div>
      </section>

      <Reassurance />

      {/* ===== CONTEXTE LOCAL ===== */}
      <section>
        <div className="container two-col">
          <div data-reveal="left">
            <span className="kicker">Le terrain local</span>
            <h2>Pourquoi {v.nom} est un terrain favorable aux rongeurs</h2>
          </div>
          <p className="lead" data-reveal="right">
            {v.contexte_local}
          </p>
        </div>
      </section>

      {/* ===== QUARTIERS ===== */}
      <section className="section-azur">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">
              <IconPin size={14} /> Couverture
            </span>
            <h2>Nous intervenons dans tout {v.nom}</h2>
          </div>
          <div className="chip-list" data-reveal>
            {v.quartiers.map((q) => (
              <span key={q} className="chip">
                {q}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== QUI FAIT QUOI ===== */}
      <section>
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">Bon à savoir</span>
            <h2>Espace public ou logement privé : qui contacter à {v.nom} ?</h2>
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

      {/* ===== PRIX ===== */}
      <section className="section-azur">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">Tarifs</span>
            <h2>Combien coûte une dératisation à {v.nom} ?</h2>
          </div>
          <p className="notice" data-reveal>
            {v.prix_locaux.note}{" "}
            <Link href="/deratisation">{v.prix_locaux.renvoi}</Link>
          </p>
        </div>
      </section>

      {/* ===== FAQ LOCALE ===== */}
      <section>
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">Questions fréquentes</span>
            <h2>Dératisation à {v.nom} : vos questions</h2>
          </div>
          <Faq items={v.faq_locale} />
        </div>
      </section>

      {/* ===== MAILLAGE ===== */}
      <section className="section-azur">
        <div className="container" data-reveal>
          <p style={{ fontWeight: 700, color: "var(--marine)", marginBottom: 12 }}>
            Voir aussi :
          </p>
          <div className="chip-list">
            <Link href="/deratisation" className="chip">
              Dératisation en {site.zone} <IconArrow size={12} />
            </Link>
            <Link href="/punaises-de-lit" className="chip">
              Punaises de lit
            </Link>
            <Link href="/cafards" className="chip">
              Cafards
            </Link>
            <Link href="/guepes-frelons" className="chip">
              Guêpes & frelons
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title={`Un problème de rongeurs à ${v.nom} ?`}
        text="Appelez-nous ou décrivez la situation en ligne : un technicien vous rappelle avec un diagnostic et un prix clair."
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Dératisation à ${v.nom}`,
          url: `${site.url}/deratisation/${v.slug}`,
          areaServed: { "@type": "City", name: v.nom },
          provider: { "@id": `${site.url}/#localbusiness` },
        }}
      />
    </>
  );
}

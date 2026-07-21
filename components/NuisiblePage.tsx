import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";
import HeroDecor from "./HeroDecor";
import Reassurance from "./Reassurance";
import Avis from "./Avis";
import PriceTable from "./PriceTable";
import Faq from "./Faq";
import CtaBand from "./CtaBand";
import JsonLd from "./JsonLd";
import { IconPhone, IconSearch, IconAlert, IconCheck, IconArrow, NUISIBLE_ICONS } from "./Icons";
import { site } from "@/lib/config";
import { getNuisible, getAllVilles, NUISIBLES_SLUGS, NUISIBLES_LABELS } from "@/lib/content";
import { NUISIBLES_TILES } from "@/lib/nuisibles";

// Gabarit commun des 4 pages piliers (dératisation, punaises, cafards, guêpes)
export default function NuisiblePage({ slug }: { slug: string }) {
  const n = getNuisible(slug);
  const autres = NUISIBLES_SLUGS.filter((s) => s !== slug);
  // Pages villes existantes pour ce nuisible (pour l'instant : dératisation/paris)
  const villes = slug === "deratisation" ? getAllVilles() : [];

  return (
    <>
      <Breadcrumbs crumbs={[{ label: NUISIBLES_LABELS[slug] }]} />

      {/* ===== HERO ===== */}
      <section className="hero hero-page" data-mouse-zone>
        <HeroDecor />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <h1 style={{ maxWidth: 900 }}>{n.h1}</h1>
          <p className="lead" style={{ maxWidth: 760, margin: "20px 0 28px" }}>
            {n.intro}
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

      {/* ===== SIGNES ===== */}
      <section>
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">Diagnostic</span>
            <h2>Les signes</h2>
            <p>Un seul de ces signes suffit pour agir.</p>
          </div>
          <div className="signs-grid" data-stagger>
            {n.signes.map((s) => (
              <div key={s.titre} className="sign" data-reveal>
                <h3>
                  <IconSearch size={16} /> {s.titre}
                </h3>
                <p>{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMPRENDRE ===== */}
      <section className="section-azur">
        <div className="container two-col">
          <div data-reveal="left">
            <span className="kicker">Comprendre</span>
            <h2>Pourquoi un professionnel</h2>
          </div>
          <p className="lead" data-reveal="right">
            {n.comprendre_espece}
          </p>
        </div>
      </section>

      {/* ===== PLAN D'ACTION ===== */}
      <section>
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">Notre protocole</span>
            <h2>Le déroulé</h2>
          </div>
          <div className="steps-grid" data-stagger>
            {n.plan_action.map((e, i) => (
              <div key={e.etape} className="step" data-reveal>
                <span className="step-num">{i + 1}</span>
                <h3>{e.etape.replace(/^\d+\.\s*/, "")}</h3>
                <p>{e.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTIONS DÉTAILLÉES (déroulé, méthodes, cas particuliers) ===== */}
      {n.sections_longues && n.sections_longues.length > 0 && (
        <section className="section-azur">
          <div className="container prose" style={{ maxWidth: 860 }}>
            {n.sections_longues.map((s) => (
              <div key={s.titre} data-reveal>
                <h2>{s.titre}</h2>
                {s.paragraphes.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== GESTES D'URGENCE ===== */}
      <section>
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">En attendant notre passage</span>
            <h2>Les bons gestes</h2>
          </div>
          <ul className="checklist" data-stagger>
            {n.gestes_urgence.map((g, i) => (
              <li key={g} data-reveal={i % 2 === 0 ? "left" : "right"}>
                <IconAlert /> {g}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== PRIX ===== */}
      <section>
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">Tarifs</span>
            <h2>Nos tarifs</h2>
          </div>
          <div data-reveal>
            <PriceTable prix={n.prix} note={n.prix_note} />
          </div>
        </div>
      </section>

      {/* ===== AVIS CLIENTS (rien tant que content/avis.json est vide) ===== */}
      <Avis />

      {/* ===== FAQ ===== */}
      <section className="section-azur">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">FAQ</span>
            <h2>Questions fréquentes</h2>
          </div>
          <Faq items={n.faq} />
        </div>
      </section>

      {/* ===== MAILLAGE INTERNE ===== */}
      <section>
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">Nos autres services</span>
            <h2>Autres nuisibles</h2>
          </div>
          <div className="cards-grid cards-grid-3" data-stagger>
            {autres.map((s) => {
              const Icon = NUISIBLE_ICONS[s];
              return (
                <Link key={s} href={`/${s}`} className="card" data-reveal>
                  <span className={`card-icon ${NUISIBLES_TILES[s]}`}>
                    <Icon />
                  </span>
                  <h3>{NUISIBLES_LABELS[s]}</h3>
                  <span className="card-link">
                    {NUISIBLES_LABELS[s]} en {site.zone} <IconArrow size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
          {villes.length > 0 && (
            <div style={{ marginTop: 30 }} data-reveal>
              <p style={{ fontWeight: 700, color: "var(--marine)", marginBottom: 12 }}>
                <IconCheck size={15} /> Nos pages locales :
              </p>
              <div className="chip-list">
                {villes.map((v) => (
                  <Link key={v.slug} href={`/${slug}/${v.slug}`} className="chip">
                    Dératisation {v.nom} ({v.departement})
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CtaBand
        title={`${NUISIBLES_LABELS[slug]} : demandez votre devis gratuit`}
        text={`Décrivez-nous la situation, un technicien vous rappelle avec un diagnostic et un prix clair.`}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: n.nom,
          description: n.meta_description,
          url: `${site.url}/${slug}`,
          areaServed: { "@type": "AdministrativeArea", name: site.zone },
          provider: { "@id": `${site.url}/#localbusiness` },
        }}
      />
    </>
  );
}

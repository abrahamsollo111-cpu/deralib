import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "./Breadcrumbs";
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

// Illustration du hero par nuisible (fichiers dans /public/images/,
// nommés en SEO, alt descriptifs en français)
const HERO_IMAGES: Record<string, { src: string; alt: string; w: number; h: number }> = {
  deratisation: {
    src: "/images/rat-brun-canalisation.jpg",
    alt: "Rat brun dans une canalisation, voie d'entrée classique vers les caves et logements",
    w: 738,
    h: 414,
  },
  "punaises-de-lit": {
    src: "/images/punaises-de-lit-matelas.jpg",
    alt: "Deux punaises de lit adultes sur un matelas, reconnaissables à leur corps brun et plat",
    w: 554,
    h: 554,
  },
  cafards: {
    src: "/images/cafards-blattes-infestation.jpg",
    alt: "Blattes adultes et juvéniles, signe d'une colonie installée",
    w: 500,
    h: 396,
  },
  "guepes-frelons": {
    src: "/images/comparaison-guepe-frelon-asiatique-europeen.jpg",
    alt: "Comparaison de taille entre guêpe commune, frelon asiatique et frelon européen",
    w: 554,
    h: 554,
  },
};

/**
 * Chaque nuisible a sa propre mise en page (hero, signes, protocole,
 * prix, réassurance) : quatre pages sœurs mais jamais identiques,
 * pour un rendu vivant et crédible. Les variantes partagent les mêmes
 * primitives CSS — la cohérence visuelle reste totale.
 */
const VARIANTES: Record<
  string,
  {
    hero: "imageDroite" | "imageGauche" | "banniere" | "flottant";
    signes: "cartes" | "carrousel" | "liste";
    protocole: "timeline" | "grille" | "timelineH";
    prix: "table" | "cartes";
    reassurance: "bandeau" | "badges";
    alerteSecurite?: boolean;
  }
> = {
  deratisation: { hero: "imageDroite", signes: "cartes", protocole: "timeline", prix: "table", reassurance: "bandeau" },
  "punaises-de-lit": { hero: "imageGauche", signes: "carrousel", protocole: "grille", prix: "cartes", reassurance: "badges" },
  cafards: { hero: "banniere", signes: "liste", protocole: "timelineH", prix: "table", reassurance: "bandeau" },
  "guepes-frelons": { hero: "flottant", signes: "cartes", protocole: "grille", prix: "cartes", reassurance: "badges", alerteSecurite: true },
};

// Badges de réassurance compacts affichés dans le hero (variante "badges")
function HeroBadges({ slug }: { slug: string }) {
  const badges =
    slug === "punaises-de-lit"
      ? ["2 passages J+0 et J+15 inclus", `Certifiés ${site.certification}`, "Sur place en 30-45 min"]
      : ["Combinaison intégrale", "Perche télescopique jusqu'à 20 m", "Urgences 7j/7 — 24h/24"];
  return (
    <div className="hero-points" style={{ marginTop: 20 }}>
      {badges.map((b) => (
        <span key={b} className="hero-point">
          <IconCheck size={14} /> {b}
        </span>
      ))}
    </div>
  );
}

export default function NuisiblePage({ slug }: { slug: string }) {
  const n = getNuisible(slug);
  const v = VARIANTES[slug] ?? VARIANTES["deratisation"];
  const img = HERO_IMAGES[slug];
  const autres = NUISIBLES_SLUGS.filter((s) => s !== slug);
  const villes = slug === "deratisation" ? getAllVilles() : [];

  const boutonsCta = (
    <div className="hero-actions">
      <a href={site.telephoneHref} className="btn btn-primary btn-lg btn-call">
        <IconPhone /> {site.telephone}
      </a>
      <Link href="/devis" className="btn btn-outline btn-lg">
        Devis gratuit en ligne
      </Link>
    </div>
  );
  const dispo = (
    <p className="dispo">
      <span className="dot" />
      <span>
        Nous répondons <em>{site.horaires}</em> — appel sans engagement
      </span>
    </p>
  );

  return (
    <>
      <Breadcrumbs crumbs={[{ label: NUISIBLES_LABELS[slug] }]} />

      {/* ===== HERO — 4 variantes ===== */}
      {v.hero === "banniere" ? (
        <>
          {/* bannière photo pleine largeur, texte en dessous */}
          <div className="banniere-photo">
            <Image src={img.src} alt={img.alt} width={img.w} height={img.h} priority />
          </div>
          <section className="hero hero-page" style={{ paddingTop: 36, paddingBottom: 56 }}>
            <div className="container">
              <h1 style={{ maxWidth: 860 }}>{n.h1}</h1>
              <p className="lead" style={{ maxWidth: 760, margin: "18px 0 26px" }}>
                {n.intro}
              </p>
              {boutonsCta}
              {dispo}
            </div>
          </section>
        </>
      ) : v.hero === "flottant" ? (
        // image flottante dans le texte d'intro (utile : comparatif des espèces)
        <section className="hero hero-page">
          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <h1 style={{ maxWidth: 900 }}>{n.h1}</h1>
            <div className="intro-flottante">
              <figure className="img-flottante photo-cadre">
                <Image src={img.src} alt={img.alt} width={img.w} height={img.h} priority />
                <figcaption>Guêpe, frelon asiatique, frelon européen : la taille ne fait pas le danger.</figcaption>
              </figure>
              <p className="lead">{n.intro}</p>
            </div>
            {boutonsCta}
            {dispo}
            <HeroBadges slug={slug} />
          </div>
        </section>
      ) : (
        // deux colonnes, image à droite ou à gauche selon la page
        <section className="hero hero-page">
          <div
            className={`container hero-service${v.hero === "imageGauche" ? " hero-service-inverse" : ""}`}
            style={{ position: "relative", zIndex: 2 }}
          >
            <div>
              <h1>{n.h1}</h1>
              <p className="lead" style={{ margin: "20px 0 28px" }}>
                {n.intro}
              </p>
              {boutonsCta}
              {dispo}
              {v.reassurance === "badges" && <HeroBadges slug={slug} />}
            </div>
            <figure className="hero-service-img">
              <Image src={img.src} alt={img.alt} width={img.w} height={img.h} priority />
            </figure>
          </div>
        </section>
      )}

      {/* ===== RÉASSURANCE (bandeau 4 tuiles ou déjà en badges hero) ===== */}
      {v.reassurance === "bandeau" ? <Reassurance /> : <div style={{ height: 8 }} />}

      {/* ===== ALERTE SÉCURITÉ (guêpes-frelons) ===== */}
      {v.alerteSecurite && (
        <section style={{ paddingTop: 26, paddingBottom: 0 }}>
          <div className="container">
            <div className="alerte-secu" data-reveal>
              <IconAlert size={22} />
              <div>
                <strong>N&apos;approchez pas du nid.</strong> Un nid dérangé
                peut déclencher une attaque groupée. En cas de piqûres
                multiples, de piqûre dans la bouche ou la gorge, ou de
                réaction allergique : appelez le 15 immédiatement. Pour le
                nid, appelez-nous — l&apos;intervention est notre métier.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== SIGNES — 3 variantes ===== */}
      <section>
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">Diagnostic</span>
            <h2>Les signes</h2>
            <p>Un seul de ces signes suffit pour agir.</p>
          </div>
          {v.signes === "liste" ? (
            <ul className="signes-liste" data-stagger>
              {n.signes.map((s) => (
                <li key={s.titre} data-reveal>
                  <IconSearch size={15} />
                  <div>
                    <strong>{s.titre}.</strong> {s.detail}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div
              className={v.signes === "carrousel" ? "signs-grid signes-carrousel" : "signs-grid"}
              data-stagger
            >
              {n.signes.map((s) => (
                <div key={s.titre} className="sign" data-reveal>
                  <h3>
                    <IconSearch size={16} /> {s.titre}
                  </h3>
                  <p>{s.detail}</p>
                </div>
              ))}
            </div>
          )}
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

      {/* ===== PROTOCOLE — 3 variantes ===== */}
      <section>
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">Notre protocole</span>
            <h2>Le déroulé</h2>
          </div>

          {v.protocole === "timeline" ? (
            <ol className="timeline" data-stagger>
              {n.plan_action.map((e, i) => (
                <li key={e.etape} data-reveal>
                  <span className="timeline-num">{i + 1}</span>
                  <div className="timeline-corps">
                    <h3>{e.etape.replace(/^\d+\.\s*/, "")}</h3>
                    <p>{e.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          ) : v.protocole === "timelineH" ? (
            <ol className="timeline-h" data-stagger>
              {n.plan_action.map((e, i) => (
                <li key={e.etape} data-reveal>
                  <span className="timeline-num">{i + 1}</span>
                  <h3>{e.etape.replace(/^\d+\.\s*/, "")}</h3>
                  <p>{e.detail}</p>
                </li>
              ))}
            </ol>
          ) : (
            <div className="steps-grid" data-stagger>
              {n.plan_action.map((e, i) => (
                <div key={e.etape} className="step" data-reveal>
                  <span className="step-num">{i + 1}</span>
                  <h3>{e.etape.replace(/^\d+\.\s*/, "")}</h3>
                  <p>{e.detail}</p>
                </div>
              ))}
            </div>
          )}

          {/* CTA intermédiaire intégré au contenu (position naturelle :
              juste après le déroulé, quand la confiance est installée) */}
          <div className="cta-inline" data-reveal>
            <p>
              <strong>Un doute sur votre situation ?</strong> Décrivez-la au
              téléphone : un technicien vous dit en 5 minutes si une
              intervention s&apos;impose — et à quel prix.
            </p>
            <a href={site.telephoneHref} className="btn btn-primary btn-call">
              <IconPhone size={16} /> {site.telephone}
            </a>
          </div>
        </div>
      </section>

      {/* ===== SECTIONS DÉTAILLÉES ===== */}
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
            {n.gestes_urgence.map((g) => (
              <li key={g} data-reveal>
                <IconAlert /> {g}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== PRIX — table ou cartes ===== */}
      <section className={v.prix === "cartes" ? "section-azur" : undefined}>
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">Tarifs</span>
            <h2>Nos tarifs</h2>
          </div>
          {v.prix === "cartes" ? (
            <>
              <div className="prix-cartes" data-stagger>
                {n.prix.map((p) => (
                  <div key={p.prestation} className="prix-carte" data-reveal>
                    <h3>{p.prestation}</h3>
                    <strong>{p.fourchette}</strong>
                    <p>{p.note}</p>
                  </div>
                ))}
              </div>
              <p className="price-note" data-reveal>{n.prix_note}</p>
            </>
          ) : (
            <div data-reveal>
              <PriceTable prix={n.prix} note={n.prix_note} />
            </div>
          )}
        </div>
      </section>

      {/* ===== AVIS CLIENTS (rien tant que content/avis.json est vide) ===== */}
      <Avis />

      {/* ===== FAQ (accordéon commun — allège la page, surtout en mobile) ===== */}
      <section className={v.prix === "cartes" ? undefined : "section-azur"}>
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
                {villes.map((vl) => (
                  <Link key={vl.slug} href={`/${slug}/${vl.slug}`} className="chip">
                    Dératisation {vl.nom} ({vl.departement})
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

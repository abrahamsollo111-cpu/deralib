import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reassurance from "@/components/Reassurance";
import CtaRassure from "@/components/CtaRassure";
import Avis from "@/components/Avis";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import DevisForm from "@/app/devis/DevisForm";
import {
  IconPhone,
  IconWhatsApp,
  IconCheck,
  IconShield,
  IconTeam,
  IconHome,
  IconDoc,
  IconArrow,
} from "@/components/Icons";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: { absolute: "Nettoyage syndrome de Diogène — Île-de-France | Deralib" },
  description:
    "Débarras, nettoyage, désinfection et traitement des nuisibles d'un logement Diogène ou insalubre, en toute discrétion. Visite et devis gratuits en Île-de-France.",
  alternates: { canonical: "/nettoyage-syndrome-diogene" },
};

/*
 * Page d'atterrissage de campagne (Ads) : structure de homepage —
 * hero avec formulaire de devis, photos, preuve sociale, protocole.
 * Règles inchangées : sujet sensible → ton digne, aucune photo choc
 * (les photos montrent nos équipes au travail, jamais un logement
 * Diogène réel), prix uniquement sur devis, rien d'inventé.
 */

const POUR_QUI = [
  {
    icone: <IconTeam />,
    tuile: "tile-bleu",
    titre: "Familles & proches",
    texte:
      "Un parent, un frère, une voisine dont le logement s'est refermé sur lui. Nous intervenons sans jugement, à votre rythme et au sien, et nous vous disons clairement ce qui est possible.",
  },
  {
    icone: <IconShield />,
    tuile: "tile-indigo",
    titre: "Tuteurs, curateurs & services sociaux",
    texte:
      "Mandataires judiciaires, CCAS, assistantes sociales : devis détaillé pour le dossier, interventions planifiées, compte rendu écrit avec photos avant/après remis au mandataire.",
  },
  {
    icone: <IconHome />,
    tuile: "tile-teal",
    titre: "Syndics, bailleurs & propriétaires",
    texte:
      "Logement rendu insalubre, dégâts sur les parties communes, plaintes de voisinage : remise en état complète et traitement des nuisibles en une seule prestation, avec rapport.",
  },
  {
    icone: <IconDoc />,
    tuile: "tile-cyan",
    titre: "Successions & notaires",
    texte:
      "Un logement encombré à vider et à assainir avant vente ou relocation : tri respectueux des effets personnels, objets de valeur et documents mis de côté et remis à la famille.",
  },
];

const ETAPES = [
  {
    titre: "Visite d'évaluation, discrète et gratuite",
    detail:
      "Un responsable se déplace, seul et sans véhicule siglé si vous le souhaitez. Il évalue le volume, l'état du logement et la présence de nuisibles, puis établit un devis ferme : vous savez exactement quoi, quand et combien avant toute intervention.",
  },
  {
    titre: "Tri et débarras",
    detail:
      "L'équipe trie avant de jeter : papiers d'identité, documents administratifs, photos, objets de valeur et souvenirs sont mis de côté et remis à la personne ou à la famille. Le reste est évacué vers les filières de traitement appropriées.",
  },
  {
    titre: "Nettoyage et désinfection en profondeur",
    detail:
      "Sols, murs, sanitaires, cuisine : nettoyage complet, désinfection des surfaces et traitement des odeurs. Le logement redevient sain et habitable — ou présentable pour une vente ou une relocation.",
  },
  {
    titre: "Traitement des nuisibles et contrôle",
    detail:
      "C'est notre métier d'origine : cafards, punaises de lit, rats ou souris sont traités dans la même prestation, par nos techniciens certifiés " +
      site.certification +
      ". Un passage de contrôle vérifie le résultat.",
  },
];

const FAQ_DIOGENE = [
  {
    q: "Combien coûte un nettoyage de logement Diogène ?",
    r: "Chaque situation est unique : le prix dépend de la surface, du volume à évacuer, de l'état du logement et de la présence de nuisibles. C'est pourquoi nous ne facturons rien sans visite : l'évaluation et le devis sont gratuits, le prix est ferme avant intervention, sans majoration le soir ni le week-end.",
  },
  {
    q: "Qui paie l'intervention ?",
    r: "Selon les cas : la personne elle-même, la famille, le tuteur ou curateur sur le budget de la personne protégée, le bailleur ou le syndic si l'immeuble est touché. Certaines communes et CCAS accordent des aides pour l'assainissement d'un logement : renseignez-vous en mairie, notre devis détaillé sert de pièce au dossier.",
  },
  {
    q: "La personne refuse toute intervention : que faire ?",
    r: "C'est fréquent — le syndrome de Diogène s'accompagne souvent d'un déni. Nous n'intervenons jamais contre la volonté de l'occupant hors cadre légal. Le bon chemin passe par le médecin traitant, les services sociaux ou le juge des tutelles ; une fois l'accord obtenu, nous travaillons au rythme de la personne, pièce par pièce si nécessaire.",
  },
  {
    q: "Jetez-vous tout ? Et les objets de valeur ?",
    r: "Non. Le tri fait partie du protocole : documents administratifs, argent, bijoux, photos et objets auxquels la personne tient sont systématiquement mis de côté et remis en main propre. Nous dressons la liste de ce qui est retrouvé.",
  },
  {
    q: "Combien de temps dure l'intervention ?",
    r: "De une journée pour un studio encombré à plusieurs jours pour une maison très touchée avec traitement des nuisibles. La durée exacte figure sur le devis après la visite d'évaluation.",
  },
  {
    q: "L'intervention reste-t-elle discrète vis-à-vis du voisinage ?",
    r: "Oui, c'est une règle absolue : équipe en tenue neutre et véhicule banalisé sur demande, pas de matériel étalé sur le palier, évacuation organisée pour limiter les allers-retours. La situation de la personne ne regarde personne d'autre.",
  },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs crumbs={[{ label: "Nettoyage syndrome de Diogène" }]} />

      {/* ===== HERO DE CAMPAGNE : argumentaire + formulaire ===== */}
      <section className="hero hero-page">
        <div
          className="container two-col two-col-top"
          style={{ position: "relative", zIndex: 2 }}
        >
          <div>
            <span className="kicker">Nouveau service — Île-de-France</span>
            <h1>Nettoyage syndrome de Diogène : rendre le logement à la vie</h1>
            <p className="lead" style={{ margin: "20px 0 24px" }}>
              Débarras, nettoyage en profondeur, désinfection et traitement des
              nuisibles, en une seule prestation et en toute discrétion. Une
              équipe dédiée, un interlocuteur unique, un devis ferme avant
              toute intervention.
            </p>
            <div className="hero-actions">
              <a href={site.telephoneHref} className="btn btn-primary btn-lg btn-call">
                <IconPhone /> {site.telephone}
              </a>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa btn-lg"
              >
                <IconWhatsApp /> WhatsApp
              </a>
            </div>
            <p className="dispo">
              <span className="dot" />
              <span>
                Nous répondons <em>{site.horaires}</em> — échange confidentiel,
                sans engagement
              </span>
            </p>
            <CtaRassure />
            <div className="hero-points" style={{ marginTop: 20 }}>
              <span className="hero-point">
                <IconCheck size={14} /> Discrétion totale
              </span>
              <span className="hero-point">
                <IconCheck size={14} /> Visite d&apos;évaluation gratuite
              </span>
              <span className="hero-point">
                <IconCheck size={14} /> Nuisibles traités dans la même
                prestation
              </span>
            </div>
          </div>
          <div className="form-card">
            <h2 style={{ fontSize: "1.25rem", marginBottom: 6 }}>
              Décrivez la situation
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--text-light)", marginBottom: 14 }}>
              Réponse confidentielle et rapide d&apos;un responsable — pas un
              centre d&apos;appels.
            </p>
            <DevisForm source="page-diogene" />
          </div>
        </div>
      </section>

      <Reassurance />

      {/* ===== COMPRENDRE (photo + ton digne) ===== */}
      <section className="section-terrain">
        <div className="container photo-split">
          <figure className="photo-split-img" data-reveal>
            <Image
              src="/images/logement-assaini-lumineux.jpg"
              alt="Cartons de tri rassemblés dans une pièce baignée de lumière"
              width={933}
              height={1400}
              sizes="(max-width: 900px) 100vw, 480px"
              data-parallax="0.05"
            />
            <figcaption>
              Le tri d&apos;abord : ce qui compte est mis de côté, le reste
              évacué.
            </figcaption>
          </figure>
          <div className="photo-split-texte" data-reveal>
            <span className="kicker">Comprendre</span>
            <h2>Ce n&apos;est pas une question de ménage</h2>
            <p>
              Le syndrome de Diogène est un trouble : une personne accumule,
              n&apos;arrive plus à jeter, et le logement se referme peu à peu —
              souvent avec un déni complet de la situation. Les proches
              découvrent l&apos;ampleur tard, et la honte retarde encore
              l&apos;appel à l&apos;aide. Notre rôle n&apos;est pas de juger :
              c&apos;est de rendre le logement sain, en respectant la personne,
              ses affaires et sa dignité. Et parce que ces logements abritent
              presque toujours cafards, punaises ou rongeurs, notre équipe
              traite tout en une seule fois — c&apos;est notre métier depuis{" "}
              {site.anneesMetier} ans.
            </p>
            <a href={site.telephoneHref} className="btn btn-primary btn-call">
              <IconPhone size={16} /> {site.telephone}
            </a>
          </div>
        </div>
      </section>

      {/* ===== POUR QUI ===== */}
      <section className="section-azur">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">Pour qui</span>
            <h2>À qui s&apos;adresse ce service</h2>
          </div>
          <div className="signs-grid" data-stagger>
            {POUR_QUI.map((p) => (
              <div key={p.titre} className="sign" data-reveal>
                <span className={`card-icon ${p.tuile}`} style={{ marginBottom: 12 }}>
                  {p.icone}
                </span>
                <h3>{p.titre}</h3>
                <p>{p.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BANDE PHOTO IMMERSIVE ===== */}
      <section className="photo-band-section">
        <div className="container">
          <figure className="photo-band" data-reveal>
            <Image
              src="/images/desinfection-tenue-protection.jpg"
              alt="Agent en tenue de protection intégrale désinfectant une surface"
              width={1100}
              height={734}
              sizes="(max-width: 900px) 100vw, 1160px"
              data-parallax="0.07"
            />
            <figcaption className="photo-band-card">
              <strong>Désinfection complète après le débarras</strong>
              <p>
                Surfaces, sols, odeurs : le logement est assaini pièce par
                pièce, en tenue adaptée et avec du matériel professionnel.
              </p>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ===== PROTOCOLE ===== */}
      <section>
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">Notre protocole</span>
            <h2>Quatre étapes, un devis ferme</h2>
          </div>
          <ol className="timeline" data-stagger>
            {ETAPES.map((e, i) => (
              <li key={e.titre} data-reveal>
                <span className="timeline-num">{i + 1}</span>
                <div className="timeline-corps">
                  <h3>{e.titre}</h3>
                  <p>{e.detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="cta-inline" data-reveal>
            <p>
              <strong>Vous ne savez pas par où commencer ?</strong> Décrivez la
              situation au téléphone ou envoyez des photos sur WhatsApp :
              on vous dit ce qui est possible, sans jugement et sans engagement.
            </p>
            <a href={site.telephoneHref} className="btn btn-primary btn-call">
              <IconPhone size={16} /> {site.telephone}
            </a>
          </div>
        </div>
      </section>

      {/* ===== NOTRE DIFFÉRENCE (photo + checklist) ===== */}
      <section className="section-azur">
        <div className="container two-col">
          <div data-reveal="left">
            <span className="kicker">Notre différence</span>
            <h2>Nuisibles et nettoyage : un seul interlocuteur</h2>
            <p style={{ marginTop: 16 }}>
              Dans la plupart des cas, il faut deux prestataires : une société
              de débarras, puis une société anti-nuisibles. Chez {site.marque},
              la même intervention couvre les deux — le logement est vidé,
              nettoyé, désinfecté <em>et</em> traité contre les cafards,
              punaises de lit et rongeurs par nos techniciens certifiés{" "}
              {site.certification}. Un seul devis, un seul planning, un seul
              responsable.
            </p>
            <figure className="photo-cadre" style={{ marginTop: 20 }}>
              <Image
                src="/images/nettoyage-profondeur-evier.jpg"
                alt="Nettoyage en profondeur d'une salle d'eau, gants de protection"
                width={900}
                height={601}
                sizes="(max-width: 900px) 100vw, 520px"
              />
            </figure>
          </div>
          <ul className="checklist" data-stagger>
            <li data-reveal>
              <IconCheck /> Visite d&apos;évaluation et devis gratuits, prix
              ferme avant intervention
            </li>
            <li data-reveal>
              <IconCheck /> Tri respectueux : documents et objets de valeur
              remis à la famille
            </li>
            <li data-reveal>
              <IconCheck /> Évacuation des déchets vers les filières
              appropriées
            </li>
            <li data-reveal>
              <IconCheck /> Désinfection complète et traitement des odeurs
            </li>
            <li data-reveal>
              <IconCheck /> Cafards, punaises, rongeurs traités dans la même
              prestation
            </li>
            <li data-reveal>
              <IconCheck /> Discrétion : tenue neutre, véhicule banalisé sur
              demande
            </li>
            <li data-reveal>
              <IconCheck /> Rapport écrit avec photos avant/après (syndics,
              tuteurs, bailleurs)
            </li>
            <li data-reveal>
              <IconCheck /> Aucune majoration le soir, le week-end ni les
              jours fériés
            </li>
          </ul>
        </div>
      </section>

      {/* ===== AVIS GOOGLE (preuve sociale réelle) ===== */}
      <Avis />

      {/* ===== FAQ ===== */}
      <section className="section-azur">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">FAQ</span>
            <h2>Questions fréquentes</h2>
          </div>
          <Faq items={FAQ_DIOGENE} />
        </div>
      </section>

      {/* ===== MAILLAGE ===== */}
      <section>
        <div className="container" data-reveal>
          <p style={{ fontWeight: 700, color: "var(--marine)", marginBottom: 12 }}>
            <IconCheck size={15} /> Souvent associés à une intervention
            Diogène :
          </p>
          <div className="chip-list">
            <Link href="/cafards" className="chip">
              Traitement cafards <IconArrow size={12} />
            </Link>
            <Link href="/punaises-de-lit" className="chip">
              Traitement punaises de lit
            </Link>
            <Link href="/deratisation" className="chip">
              Dératisation en {site.zone}
            </Link>
            <Link href="/professionnels" className="chip">
              Offre syndics & bailleurs
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Une situation difficile ? Parlons-en."
        text="Un échange confidentiel, une visite gratuite, un devis ferme — et un logement qui redevient vivable."
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Nettoyage syndrome de Diogène et logements insalubres",
          description:
            "Débarras, nettoyage, désinfection et traitement des nuisibles d'un logement Diogène ou insalubre en Île-de-France. Visite et devis gratuits, intervention discrète.",
          url: `${site.url}/nettoyage-syndrome-diogene`,
          areaServed: { "@type": "AdministrativeArea", name: site.zone },
          provider: { "@id": `${site.url}/#localbusiness` },
        }}
      />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reassurance from "@/components/Reassurance";
import Avis from "@/components/Avis";
import QuickQuote from "@/components/QuickQuote";
import HomeFx from "@/components/HomeFx";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import {
  IconWhatsApp,
  IconPhone,
  IconCheck,
  IconClock,
  IconArrow,
  IconPin,
  NUISIBLE_ICONS,
} from "@/components/Icons";
import { site, DEPARTEMENTS } from "@/lib/config";

export const metadata: Metadata = {
  // ≤ 60 caractères, unique, service + zone (guide SEO Google)
  title: {
    absolute: `Dératisation & anti-nuisibles ${site.zone} | ${site.marque}`,
  },
  description: `Rats, punaises de lit, cafards, guêpes : sur place en 30-45 min par techniciens certifiés ${site.certification} en ${site.zone}. Appelez, devis gratuit.`,
  alternates: { canonical: "/" },
};

const SERVICES = [
  {
    slug: "deratisation",
    titre: "Dératisation",
    tile: "tile-bleu",
    desc: "Rats et souris : postes d'appâtage sécurisés, piégeage mécanique quand les biocides sont déconseillés, puis obturation grillagée des points d'entrée. Sans cette dernière étape, ils reviennent.",
  },
  {
    slug: "punaises-de-lit",
    titre: "Punaises de lit",
    tile: "tile-indigo",
    desc: "Détection pièce par pièce, traitement combiné vapeur sèche + insecticide rémanent, second passage à J+15 pour les œufs éclos entre-temps. Contrôle de résultat inclus.",
  },
  {
    slug: "cafards",
    titre: "Cafards & blattes",
    tile: "tile-cyan",
    desc: "Gel anti-blattes appliqué dans les charnières, fentes et arrières d'électroménager. Effet cascade sur la colonie, sans évacuation du logement.",
  },
  {
    slug: "guepes-frelons",
    titre: "Guêpes & frelons",
    tile: "tile-teal",
    desc: "Poudre insecticide injectée dans le nid, à la perche télescopique pour les nids en hauteur. Combinaison intégrale, retrait du nid quand c'est possible.",
  },
];

const FAQ_HOME = [
  {
    q: "Intervenez-vous vraiment vous-mêmes ?",
    r: `Oui. ${site.marque} n'est pas un site de mise en relation : nos techniciens salariés et certifiés ${site.certification} réalisent eux-mêmes toutes les interventions, partout en ${site.zone}.`,
  },
  {
    q: "Combien coûte une intervention ?",
    r: "Chaque page de service affiche des fourchettes de prix indicatives. Le prix exact dépend de l'ampleur de l'infestation et de l'accès : il est confirmé par un devis gratuit avant toute intervention.",
  },
  {
    q: "Sous quel délai pouvez-vous intervenir ?",
    r: `Nous intervenons rapidement partout en ${site.zone}, en 30 à 45 minutes maximum, et en priorité pour les urgences (nids de frelons, infestations importantes).`,
  },
  {
    q: "Les traitements sont-ils sans danger pour ma famille ?",
    r: "Nos techniciens sont formés et certifiés pour appliquer les produits biocides dans le respect strict de la réglementation, avec des dispositifs sécurisés adaptés à la présence d'enfants et d'animaux.",
  },
  // Questions « People Also Ask » les plus recherchées sur le sujet
  {
    q: "Qui doit payer la dératisation : le locataire ou le propriétaire ?",
    r: "En location, l'entretien courant incombe au locataire, mais une infestation liée à la vétusté du logement ou aux parties communes relève du propriétaire ou du syndic. En copropriété, caves et locaux poubelles sont à la charge du syndic. Notre diagnostic précise l'origine, ce qui aide à déterminer qui paie.",
  },
  {
    q: "La mairie intervient-elle gratuitement contre les rats ?",
    r: "Non, sauf sur l'espace public (rues, squares, égouts). À l'intérieur des logements, caves et copropriétés privées, la dératisation est à la charge des occupants ou du syndic — c'est là que nous intervenons. À Paris, signalez les rats sur la voie publique via l'application DansMaRue.",
  },
  {
    q: "Combien de temps dure un traitement contre les punaises de lit ?",
    r: "Le protocole complet s'étale sur 2 à 4 semaines : un premier passage (J+0), puis un second environ 15 jours après (J+15) pour éliminer les punaises écloses entre-temps. Les piqûres diminuent nettement dès le premier traitement.",
  },
  {
    q: "Les cafards reviennent-ils après un traitement ?",
    r: "Pas si la source est traitée. Quand ils reviennent, c'est presque toujours que la colonie se trouve ailleurs : gaines de l'immeuble, logement voisin, local poubelles. C'est pourquoi nous inspectons au-delà du logement et recommandons parfois un traitement à l'échelle de l'immeuble.",
  },
  {
    q: "Faut-il quitter son logement pendant le traitement ?",
    r: "Rarement. Le gel anti-blattes et les postes d'appâtage ne nécessitent aucune évacuation. Pour un traitement insecticide contre les punaises de lit, il faut s'absenter quelques heures le temps du séchage — nous vous donnons les consignes exactes avant l'intervention.",
  },
  {
    q: "Vos traitements sont-ils garantis ?",
    r: "Oui : nos traitements sont garantis, avec les conditions précisées noir sur blanc sur le devis. Si les nuisibles reviennent pendant la période couverte, nous revenons.",
  },
  {
    q: "Y a-t-il une majoration la nuit, le week-end ou les jours fériés ?",
    r: "Non, aucune. Nous répondons 24h/24 et 7j/7 au même tarif : le prix annoncé au devis est le même un dimanche soir qu'un mardi matin.",
  },
  {
    q: "Délivrez-vous une facture et un rapport d'intervention ?",
    r: "Oui, systématiquement : facture et rapport détaillant le diagnostic, les produits utilisés et les recommandations. Pour les commerces et copropriétés, nous fournissons aussi le registre de suivi exigé lors des contrôles sanitaires.",
  },
];

// « Triage » : le visiteur part de ce qu'il observe, pas du nom du
// nuisible — comme une consultation. Chaque carte mène au protocole.
const SYMPTOMES = [
  {
    slug: "punaises-de-lit",
    symptome: "Piqûres alignées au réveil, points noirs sur le matelas",
    diagnostic: "Punaises de lit",
    tile: "tile-indigo",
  },
  {
    slug: "deratisation",
    symptome: "Crottes, emballages rongés, grattements la nuit",
    diagnostic: "Rats & souris",
    tile: "tile-bleu",
  },
  {
    slug: "cafards",
    symptome: "Insectes qui fuient la lumière dans la cuisine",
    diagnostic: "Cafards & blattes",
    tile: "tile-cyan",
  },
  {
    slug: "guepes-frelons",
    symptome: "Va-et-vient sous le toit ou le coffre du volet",
    diagnostic: "Guêpes & frelons",
    tile: "tile-teal",
  },
  {
    slug: "depigeonnage",
    symptome: "Fientes et nids sur le balcon ou les corniches",
    diagnostic: "Pigeons",
    tile: "tile-cyan",
  },
];

const PROTOCOLE = [
  {
    titre: "Diagnostic",
    texte: "Identification de l'espèce, de l'ampleur de l'infestation et des points d'entrée. Le prix est confirmé à ce moment-là, avant de commencer.",
  },
  {
    titre: "Traitement",
    texte: "Méthode adaptée au nuisible : postes d'appâtage sécurisés, gel, vapeur sèche ou insecticide. Dispositifs pensés pour les enfants et les animaux.",
  },
  {
    titre: "Prévention",
    texte: "Obturation grillagée des accès, retrait du nid, conseils concrets : c'est l'étape qui empêche le retour.",
  },
  {
    titre: "Contrôle",
    texte: "Passage de contrôle et ajustement si nécessaire. Traitement garanti, conditions écrites sur le devis.",
  },
];

export default function Home() {
  return (
    <>
      {/* ===== HERO « clinique » : texte + photo cadrée, fiche flottante ===== */}
      <section className="cl-hero">
        <div className="container cl-hero-grid">
          <div className="cl-hero-texte enter-left">
            <p className="cl-statut">
              <span className="dot" /> Nous répondons {site.horaires}
            </p>
            <span className="cl-kicker">
              Clinique de l&apos;assainissement · {site.zone}
            </span>
            <h1>
              Nuisibles éliminés. <em>Maison assainie.</em>
            </h1>
            <p className="cl-hero-sub">
              Un protocole précis, appliqué par nos techniciens certifiés{" "}
              {site.certification} : diagnostic, traitement, prévention,
              contrôle. Sur place en 30 à 45 minutes, prix confirmé avant de
              commencer.
            </p>
            <div className="cl-actions">
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
            <a href="#devis-express" className="cl-lien-devis">
              ou décrivez votre problème en 30 secondes <IconArrow size={14} />
            </a>
            <ul className="cl-garanties">
              <li>
                <IconCheck size={15} /> Certifiés {site.certification}
              </li>
              <li>
                <IconCheck size={15} /> Traitements garantis
              </li>
              <li>
                <IconCheck size={15} /> Sans majoration soir & week-end
              </li>
            </ul>
          </div>

          <div className="cl-visuel enter-right">
            <figure className="cl-photo">
              <Image
                src="/images/technicien-deralib-vehicule.webp"
                alt="Technicien Deralib en combinaison de protection devant le véhicule de l'entreprise"
                width={1536}
                height={1024}
                priority
                sizes="(max-width: 900px) 100vw, 560px"
              />
            </figure>
            <div className="cl-badge" data-parallax="0.08">
              <span className="cl-badge-ico">
                <IconClock size={18} />
              </span>
              <span>
                <strong>Sur place en 30-45 min</strong>
                <small>Partout en {site.zone}</small>
              </span>
            </div>
            <div className="cl-fiche" data-parallax="0.04">
              <p className="cl-fiche-titre">Protocole d&apos;intervention</p>
              <ol>
                {PROTOCOLE.map((p) => (
                  <li key={p.titre}>
                    <IconCheck size={14} /> {p.titre}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DEVIS EXPRESS (formulaire pas-à-pas) ===== */}
      <section id="devis-express" className="cl-section">
        <div className="container two-col" style={{ position: "relative", zIndex: 2 }}>
          <div data-reveal="left">
            <span className="cl-kicker">Devis express</span>
            <h2>
              Décrivez. <span className="grad-text">On vous rappelle.</span>
            </h2>
            <p style={{ marginTop: 16 }}>
              4 questions, 30 secondes. Un technicien vous rappelle avec un
              premier diagnostic et un prix indicatif.
            </p>
            <ul className="checklist" style={{ marginTop: 22 }} data-stagger>
              <li data-reveal="left">
                <IconCheck /> Réponse rapide d&apos;un technicien, pas d&apos;un robot
              </li>
              <li data-reveal="left">
                <IconCheck /> Gratuit et sans engagement
              </li>
              <li data-reveal="left">
                <IconCheck /> Vos coordonnées ne sont jamais revendues
              </li>
            </ul>
          </div>
          <div data-reveal="right">
            <QuickQuote />
          </div>
        </div>
      </section>

      <Reassurance />

      {/* ===== TRIAGE : du symptôme au protocole ===== */}
      <section className="cl-section">
        <div className="container">
          <div className="cl-head" data-reveal>
            <span className="cl-kicker">Diagnostic</span>
            <h2>Qu&apos;observez-vous ?</h2>
            <p>
              Partez de ce que vous voyez : chaque nuisible a son protocole,
              son matériel et ses délais.
            </p>
          </div>
          <div className="cl-triage" data-stagger>
            {SYMPTOMES.map((s) => {
              const Icon = NUISIBLE_ICONS[s.slug];
              return (
                <Link key={s.slug} href={`/${s.slug}`} className="cl-symptome" data-reveal>
                  <span className={`cl-symptome-ico ${s.tile}`}>
                    <Icon />
                  </span>
                  <span className="cl-symptome-txt">« {s.symptome} »</span>
                  <span className="cl-symptome-diag">
                    <small>Diagnostic probable</small>
                    {s.diagnostic} <IconArrow size={14} />
                  </span>
                </Link>
              );
            })}
            <a href={site.telephoneHref} className="cl-symptome cl-symptome-cta" data-reveal>
              <span className="cl-symptome-ico">
                <IconPhone />
              </span>
              <span className="cl-symptome-txt">Vous ne savez pas ce que c&apos;est ?</span>
              <span className="cl-symptome-diag">
                <small>Diagnostic gratuit par téléphone</small>
                {site.telephone} <IconArrow size={14} />
              </span>
            </a>
          </div>

          {/* maillage fin : les espèces précises couvertes par nos
              protocoles — capte « blatte germanique », « frelon asiatique »… */}
          <div className="cl-especes" data-reveal>
            <p>Espèces traitées :</p>
            <div className="chip-list">
              <Link href="/deratisation" className="chip">rat brun (surmulot)</Link>
              <Link href="/deratisation" className="chip">rat noir</Link>
              <Link href="/deratisation" className="chip">souris grise</Link>
              <Link href="/punaises-de-lit" className="chip">punaises de lit</Link>
              <Link href="/cafards" className="chip">blatte germanique</Link>
              <Link href="/cafards" className="chip">blatte orientale</Link>
              <Link href="/guepes-frelons" className="chip">guêpe commune</Link>
              <Link href="/guepes-frelons" className="chip">frelon européen</Link>
              <Link href="/guepes-frelons" className="chip">frelon asiatique</Link>
              <Link href="/depigeonnage" className="chip">pigeons (dépigeonnage)</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROTOCOLE : photo + 4 étapes numérotées ===== */}
      <section className="cl-section cl-section-teinte">
        <div className="container cl-protocole-grid">
          <figure className="cl-photo cl-photo-carree" data-reveal="left">
            <Image
              src="/images/technicien-traitement-logement.jpg"
              alt="Technicien en combinaison traitant les plinthes d'un logement"
              width={554}
              height={554}
              sizes="(max-width: 900px) 100vw, 460px"
            />
            <figcaption>Traitement au plus près des passages : plinthes, gaines, recoins.</figcaption>
          </figure>
          <div data-reveal="right">
            <span className="cl-kicker">Notre protocole</span>
            <h2>Quatre étapes. Aucune improvisation.</h2>
            <ol className="cl-protocole">
              {PROTOCOLE.map((p, i) => (
                <li key={p.titre}>
                  <span className="cl-num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{p.titre}</h3>
                    <p>{p.texte}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ===== AVIS CLIENTS — placés haut : la preuve sociale juste
          après l'offre (rien ne s'affiche tant que avis.json est vide) ===== */}
      <Avis />

      {/* ===== PROFESSIONNELS ===== */}
      <section className="cl-section">
        <div className="container cl-pro-grid">
          <div data-reveal="left">
            <span className="cl-kicker">Professionnels</span>
            <h2>Établissements : discrétion et traçabilité.</h2>
            <p style={{ marginTop: 16 }}>
              Restaurants, hôtels, copropriétés, bureaux, écoles : nous
              intervenons hors horaires d&apos;ouverture, en discrétion, avec le
              registre sanitaire que vos contrôles exigent. Contrats annuels
              avec passages programmés pour les sites exposés.
            </p>
            <div className="chip-list" style={{ marginTop: 22 }}>
              {[
                "Restaurants",
                "Commerces de bouche",
                "Hôtels",
                "Locations saisonnières",
                "Copropriétés & syndics",
                "Bureaux",
                "Crèches & écoles",
                "Entrepôts",
              ].map((s) => (
                <Link key={s} href="/professionnels" className="chip">
                  {s}
                </Link>
              ))}
            </div>
            <div style={{ marginTop: 26 }}>
              <Link href="/professionnels" className="btn btn-marine">
                Nos solutions pour les professionnels <IconArrow size={14} />
              </Link>
            </div>
          </div>
          <figure className="cl-photo" data-reveal="right">
            <Image
              src="/images/techniciens-traitement-bureaux.jpg"
              alt="Deux techniciens en combinaison traitant des bureaux"
              width={678}
              height={452}
              sizes="(max-width: 900px) 100vw, 540px"
            />
            <figcaption>Bureaux, commerces, parties communes : interventions hors horaires.</figcaption>
          </figure>
        </div>
      </section>

      {/* ===== BANDE CHIFFRES (parallax sombre + compteurs) ===== */}
      <section className="stats-band cl-stats">
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <span className="cl-kicker cl-kicker-clair">
            Une vraie entreprise, pas un annuaire
          </span>
          <h2 data-reveal style={{ color: "#fff" }}>
            Nos techniciens. Personne d&apos;autre.
          </h2>
          <div className="stats-grid" data-stagger>
            {/* valeurs finales rendues côté serveur (lecteurs d'écran, robots) ;
                ScrollFx anime de 0 vers la valeur à l'entrée dans l'écran */}
            <div className="stat" data-reveal="left">
              <strong data-count="20" data-count-suffix=" ans">20 ans</strong>
              <span>de métier sur le terrain, en {site.zone}</span>
            </div>
            <div className="stat" data-reveal="left">
              <strong data-count="45" data-count-suffix=" min">45 min</strong>
              <span>délai maximum pour être sur place</span>
            </div>
            <div className="stat" data-reveal="left">
              <strong data-count="7" data-count-suffix="j/7">7j/7</strong>
              <span>disponibles pour les urgences, {site.horaires}</span>
            </div>
            <div className="stat" data-reveal="left">
              <strong data-count="100" data-count-suffix="%">100%</strong>
              <span>devis gratuit, prix confirmé avant intervention</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ZONE D'INTERVENTION (radar) ===== */}
      <section className="cl-section">
        <div className="container two-col" style={{ position: "relative", zIndex: 2 }}>
          <div data-reveal="left">
            <span className="cl-kicker">Zone d&apos;intervention</span>
            <h2>
              Toute l&apos;<span className="grad-text">{site.zone}</span>
            </h2>
            <p style={{ marginTop: 16 }}>
              Nos techniciens sont répartis sur toute la région, de Paris
              intra-muros à la grande couronne. Chaque secteur a ses
              particularités : dans les caves haussmanniennes du 11e, les rats
              passent le plus souvent par les gaines techniques des colonnes
              d&apos;eaux usées ; en pavillonnaire dans le 77 ou le 78, ce sont
              plutôt les nids de guêpes sous les tuiles et les souris dans les
              combles. On adapte le traitement au bâti, pas l&apos;inverse.
            </p>
            {/* maillage interne : chaque chip pointe vers la page
                département correspondante, avec une ancre descriptive */}
            <div className="chip-list" style={{ marginTop: 24 }} data-stagger>
              {DEPARTEMENTS.map((d) => (
                <Link
                  key={d.slug}
                  href={`/deratisation/${d.slug}`}
                  className="chip"
                  data-reveal
                >
                  Dératisation {d.nom} ({d.code})
                </Link>
              ))}
            </div>
            <div style={{ marginTop: 26 }}>
              <Link href="/deratisation/paris" className="btn btn-marine">
                <IconPin size={17} /> Dératisation à Paris
              </Link>
            </div>
          </div>
          <div data-reveal="right">
            {/* contenu utile plutôt qu'un décor : ce que couvre chaque
                type de secteur */}
            <ul className="checklist" data-stagger>
              <li data-reveal>
                <IconCheck /> Paris intra-muros : caves, copropriétés,
                commerces de bouche
              </li>
              <li data-reveal>
                <IconCheck /> Petite couronne (92, 93, 94) : immeubles
                collectifs, entrepôts, bords de Seine et de Marne
              </li>
              <li data-reveal>
                <IconCheck /> Grande couronne (77, 78, 91, 95) : pavillons,
                corps de ferme, locaux d&apos;activité
              </li>
              <li data-reveal>
                <IconCheck /> Urgences 7j/7 : nids de guêpes et frelons,
                infestations importantes
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== À PROPOS TEASER ===== */}
      <section className="cl-section cl-section-teinte">
        <div className="container two-col" style={{ position: "relative", zIndex: 2 }}>
          <div data-reveal="left">
            <span className="cl-kicker">Qui sommes-nous</span>
            <h2>
              {site.anneesMetier} ans de métier.{" "}
              <span className="grad-text">Sur le terrain.</span>
            </h2>
            {/* TODO : une fois le nom du dirigeant fourni dans lib/config.ts,
                le citer ici avec son parcours (E-E-A-T) */}
            <p style={{ marginTop: 16 }}>
              Vingt ans de caves, de combles, de cuisines de restaurant et de
              chambres infestées : quand vous appelez {site.marque}, vous
              parlez à quelqu&apos;un qui fait ce métier tous les jours — pas à
              un centre d&apos;appels qui revend votre demande. Techniciens
              salariés, certifiés {site.certification}.
            </p>
            <div style={{ marginTop: 24 }}>
              <Link href="/a-propos" className="btn btn-outline">
                Notre histoire et notre équipe <IconArrow size={14} />
              </Link>
            </div>
          </div>
          <div data-reveal="right">
            <figure className="photo-cadre" style={{ marginBottom: 18 }}>
              <Image
                src="/images/equipe-deralib-polos.jpg"
                alt="Techniciens en polo Deralib"
                width={1024}
                height={765}
              />
            </figure>
            <ul className="checklist" data-stagger>
              <li data-reveal="right">
                <IconCheck /> Techniciens salariés de l&apos;entreprise — jamais
                de mise en relation
              </li>
              <li data-reveal="right">
                <IconCheck /> Certification {site.certification} et assurance
                professionnelle
              </li>
              <li data-reveal="right">
                <IconCheck /> Prix annoncé et confirmé avant chaque intervention
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="cl-section">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="cl-kicker">FAQ</span>
            <h2>Questions fréquentes</h2>
          </div>
          <Faq items={FAQ_HOME} />
        </div>
      </section>

      <CtaBand />
      <HomeFx />
    </>
  );
}

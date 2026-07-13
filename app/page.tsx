import type { Metadata } from "next";
import Link from "next/link";
import Reassurance from "@/components/Reassurance";
import QuickQuote from "@/components/QuickQuote";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import HeroDecor from "@/components/HeroDecor";
import {
  IconPhone,
  IconCheck,
  IconShield,
  IconTeam,
  IconArrow,
  IconPin,
  NUISIBLE_ICONS,
} from "@/components/Icons";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: `${site.marque} — Dératisation & lutte anti-nuisibles en ${site.zone} | Devis gratuit`,
  description: `Rats, souris, punaises de lit, cafards, guêpes : nos techniciens certifiés ${site.certification} interviennent rapidement partout en ${site.zone}. Devis gratuit.`,
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
    r: `Nous intervenons rapidement partout en ${site.zone}, généralement sous 24 à 48 h, et en priorité pour les urgences (nids de frelons, infestations importantes).`,
  },
  {
    q: "Les traitements sont-ils sans danger pour ma famille ?",
    r: "Nos techniciens sont formés et certifiés pour appliquer les produits biocides dans le respect strict de la réglementation, avec des dispositifs sécurisés adaptés à la présence d'enfants et d'animaux.",
  },
];

export default function Home() {
  return (
    <>
      {/* ===== HERO parallax multi-couches ===== */}
      <section className="hero hero-home" data-mouse-zone>
        <HeroDecor dense />

        <div className="container hero-grid">
          <div className="enter-left">
            <h1>
              Dératisation et lutte anti-nuisibles{" "}
              <em className="grad-text">en {site.zone}</em>
            </h1>
            <p className="hero-sub">
              Rats, souris, punaises de lit, cafards, guêpes et frelons. Nos
              techniciens certifiés {site.certification} interviennent sous 24
              à 48 h dans les 8 départements franciliens. Le prix est confirmé
              par devis avant l&apos;intervention, pas après.
            </p>
            <div className="hero-actions">
              <a href={site.telephoneHref} className="btn btn-primary btn-lg btn-call">
                <IconPhone /> {site.telephone}
              </a>
              <a href="#devis-express" className="btn btn-outline btn-lg">
                Devis gratuit en 30 s
              </a>
            </div>
            <p className="dispo" style={{ marginBottom: 22 }}>
              <span className="dot" />
              <span>
                Nous répondons <em>{site.horaires}</em> — appel sans engagement
              </span>
            </p>
            <div className="hero-points">
              <span className="hero-point">
                <IconCheck size={15} /> Certifiés {site.certification}
              </span>
              <span className="hero-point">
                <IconCheck size={15} /> Techniciens salariés
              </span>
              <span className="hero-point">
                <IconCheck size={15} /> Devis gratuit
              </span>
            </div>
          </div>

          <div style={{ position: "relative" }} className="enter-right">
            <div className="hero-float hero-float-1" data-parallax="0.1" data-depth="14">
              <IconShield size={17} /> Certifié {site.certification}
            </div>
            <div className="hero-card" data-depth="5">
              <div className="hero-card-title">
                <span className="pulse" /> Déroulé d&apos;une intervention
              </div>
              <p className="hero-card-sub">
                Les 4 étapes, de l&apos;appel au contrôle de résultat
              </p>
              <div className="hero-card-steps">
                {[
                  ["Diagnostic sur place", "Identification de l'espèce et des points d'entrée"],
                  ["Traitement adapté", "Postes d'appâtage, gel ou insecticide selon le nuisible"],
                  ["Prévention du retour", "Obturation grillagée des accès, conseils concrets"],
                  ["Suivi & contrôle", "Passage de contrôle, ajustement si nécessaire"],
                ].map(([t, s], i) => (
                  <div key={t} className="hero-card-step">
                    <span className="num">{i + 1}</span>
                    <div>
                      <strong>{t}</strong>
                      <span>{s}</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* tracé ECG animé */}
              <div className="ecg" aria-hidden>
                <svg viewBox="0 0 300 34" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="ecg-grad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#1577DB" />
                      <stop offset="100%" stopColor="#0FB5C9" />
                    </linearGradient>
                  </defs>
                  <path d="M0 20 H70 L82 20 L90 6 L98 30 L106 20 H150 L162 20 L170 9 L178 28 L186 20 H300" />
                </svg>
              </div>
            </div>
            <div className="hero-float hero-float-2" data-parallax="0.18" data-depth="22">
              <IconTeam size={17} /> Techniciens dans toute l&apos;{site.zone}
            </div>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden>
          Découvrir
        </div>
      </section>

      <Reassurance />

      {/* ===== DEVIS EXPRESS (formulaire pas-à-pas) ===== */}
      <section id="devis-express" style={{ overflow: "hidden" }}>
        <div className="fx-layer" aria-hidden>
          <span
            className="deco-plus deco-plus-cyan"
            data-parallax="0.4"
            style={{ top: "14%", right: "8%", fontSize: 34 }}
          >
            +
          </span>
          <div
            className="deco deco-ring"
            data-parallax="0.25"
            style={{ width: 260, height: 260, bottom: -90, left: "-5%" }}
          />
        </div>
        <div className="container two-col" style={{ position: "relative", zIndex: 2 }}>
          <div data-reveal="left">
            <span className="kicker">Devis express</span>
            <h2>
              Pas envie d&apos;appeler ?{" "}
              <span className="grad-text">Décrivez, on vous rappelle.</span>
            </h2>
            <p style={{ marginTop: 16 }}>
              Répondez à 4 questions — 30 secondes chrono — et un technicien
              vous rappelle avec un premier diagnostic et un prix indicatif.
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

      {/* ===== SERVICES ===== */}
      <section style={{ overflow: "hidden" }}>
        <span className="giant" data-parallax="0.12" style={{ top: 30, right: -60 }} aria-hidden>
          Interventions
        </span>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="section-head" data-reveal>
            <span className="kicker">Nos interventions</span>
            <h2>
              Quatre familles de nuisibles,{" "}
              <span className="grad-text">quatre protocoles différents</span>
            </h2>
            <p>
              On ne traite pas une colonie de blattes germaniques comme un nid
              de frelons asiatiques. Chaque intervention suit le protocole de
              l&apos;espèce concernée, avec le matériel qui va avec.
            </p>
          </div>
          <div className="cards-grid" data-stagger>
            {SERVICES.map((s) => {
              const Icon = NUISIBLE_ICONS[s.slug];
              return (
                <Link key={s.slug} href={`/${s.slug}`} className="card" data-reveal>
                  <span className={`card-icon ${s.tile}`}>
                    <Icon />
                  </span>
                  <h3>{s.titre}</h3>
                  <p>{s.desc}</p>
                  <span className="card-link">
                    En savoir plus <IconArrow size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== BANDE CHIFFRES (parallax sombre + compteurs) ===== */}
      <section className="stats-band">
        <div className="fx-layer" aria-hidden>
          <div data-parallax="0.08" style={{ position: "absolute", inset: 0 }}>
            <div className="bg-dots bg-dots-invert" />
          </div>
          <div
            className="deco deco-ring-light deco-ring"
            data-parallax="0.28"
            style={{ width: 560, height: 560, top: -200, right: -160 }}
          />
          <div
            className="deco deco-ring-light deco-ring-dash"
            style={{ width: 300, height: 300, bottom: -100, left: "10%" }}
          />
          <span className="giant giant-light" data-parallax="0.18" style={{ bottom: 20, right: -40 }}>
            Deralib
          </span>
        </div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <span className="kicker" style={{ color: "#3fd6e8" }}>
            Une vraie entreprise, pas un annuaire
          </span>
          <h2 data-reveal>
            Ce sont <em className="grad-text">nos techniciens</em> qui
            interviennent chez vous — pas des sous-traitants.
          </h2>
          <div className="stats-grid" data-stagger>
            {/* valeurs finales rendues côté serveur (lecteurs d'écran, robots) ;
                ScrollFx anime de 0 vers la valeur à l'entrée dans l'écran */}
            <div className="stat" data-reveal="left">
              <strong data-count="48" data-count-suffix="h">48h</strong>
              <span>intervention généralement sous 24 à 48 h en {site.zone}</span>
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
      <section className="section-azur" style={{ overflow: "hidden" }}>
        <div className="fx-layer" aria-hidden>
          <span
            className="deco-plus"
            data-parallax="0.4"
            style={{ top: "12%", right: "12%", fontSize: 30 }}
          >
            +
          </span>
          <div
            className="deco deco-ring"
            data-parallax="0.25"
            style={{ width: 220, height: 220, bottom: -80, right: "-4%" }}
          />
        </div>
        <div className="container two-col" style={{ position: "relative", zIndex: 2 }}>
          <div data-reveal="left">
            <span className="kicker">Zone d&apos;intervention</span>
            <h2>
              Toute l&apos;{site.zone}, <span className="grad-text">Paris en tête</span>
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
            <div className="chip-list" style={{ marginTop: 24 }} data-stagger>
              {["Paris (75)", "Hauts-de-Seine (92)", "Seine-Saint-Denis (93)", "Val-de-Marne (94)", "Seine-et-Marne (77)", "Yvelines (78)", "Essonne (91)", "Val-d'Oise (95)"].map(
                (d) => (
                  <span key={d} className="chip" data-reveal>
                    {d}
                  </span>
                )
              )}
            </div>
            <div style={{ marginTop: 26 }}>
              <Link href="/deratisation/paris" className="btn btn-primary">
                <IconPin size={17} /> Dératisation à Paris
              </Link>
            </div>
          </div>
          <div data-reveal="right">
            <div className="radar" data-parallax="0.06" aria-hidden>
              <div className="radar-ring" />
              <div className="radar-ring" />
              <div className="radar-ring" />
              <div className="radar-sweep" />
              <span className="radar-blip" style={{ top: "26%", left: "60%" }} />
              <span className="radar-blip" style={{ top: "62%", left: "24%", animationDelay: "0.9s" }} />
              <span className="radar-blip" style={{ top: "70%", left: "70%", animationDelay: "1.6s" }} />
              <div className="radar-center">
                <IconPin size={26} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== À PROPOS TEASER ===== */}
      <section style={{ overflow: "hidden" }}>
        <span className="giant" data-parallax="0.14" style={{ bottom: 10, left: -40 }} aria-hidden>
          Expertise
        </span>
        <div className="container two-col" style={{ position: "relative", zIndex: 2 }}>
          <div data-reveal="left">
            <span className="kicker">Qui sommes-nous</span>
            <h2>
              Une entreprise de terrain,{" "}
              <span className="grad-text">pas une plateforme</span>
            </h2>
            {/* TODO : une fois le nom du dirigeant fourni dans lib/config.ts,
                le citer ici avec son parcours (E-E-A-T) */}
            <p style={{ marginTop: 16 }}>
              Quand vous appelez {site.marque}, vous parlez à quelqu&apos;un qui
              fait ce métier tous les jours — pas à un centre d&apos;appels qui
              revend votre demande. Nos techniciens sont salariés de
              l&apos;entreprise, certifiés {site.certification}, et formés en
              continu à la réglementation biocides.
            </p>
            <div style={{ marginTop: 24 }}>
              <Link href="/a-propos" className="btn btn-outline">
                Découvrir l&apos;équipe <IconArrow size={14} />
              </Link>
            </div>
          </div>
          <ul className="checklist" data-stagger>
            <li data-reveal="right">
              <IconCheck /> Techniciens salariés de l&apos;entreprise — jamais de
              mise en relation
            </li>
            <li data-reveal="right">
              <IconCheck /> Certification {site.certification} et assurance
              professionnelle
            </li>
            <li data-reveal="right">
              <IconCheck /> Méthodes conformes à la réglementation biocides
            </li>
            <li data-reveal="right">
              <IconCheck /> Prix annoncé et confirmé avant chaque intervention
            </li>
          </ul>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section-azur">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">Questions fréquentes</span>
            <h2>Vos questions, nos réponses</h2>
          </div>
          <Faq items={FAQ_HOME} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}

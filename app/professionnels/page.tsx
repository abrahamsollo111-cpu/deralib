import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reassurance from "@/components/Reassurance";
import PhotoBand from "@/components/PhotoBand";
import CtaRassure from "@/components/CtaRassure";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { IconPhone, IconCheck, IconStore, IconBuilding, IconTeam, IconHome, IconShield, IconDoc } from "@/components/Icons";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: { absolute: "Dératisation professionnels & commerces — 24h/24 | Deralib" },
  description:
    "Contrats anti-nuisibles pour restaurants, hôtels, copropriétés, bureaux et écoles en Île-de-France : passages réguliers, registre sanitaire, interventions discrètes 24h/24. Devis gratuit.",
  alternates: { canonical: "/professionnels" },
};

const SEGMENTS = [
  {
    icone: <IconStore />,
    tuile: "tile-bleu",
    titre: "Restaurants & commerces de bouche",
    texte:
      "La lutte contre les nuisibles fait partie de vos obligations d'hygiène (plan de maîtrise sanitaire). Nous intervenons hors heures de service, en discrétion totale, et fournissons le registre exigé lors des contrôles : plan des postes d'appâtage, produits utilisés, dates de passage.",
  },
  {
    icone: <IconBuilding />,
    tuile: "tile-indigo",
    titre: "Hôtels & locations saisonnières",
    texte:
      "Une punaise de lit signalée en ligne peut coûter une saison. Protocole en 2 passages (J+0 et J+15) chambre par chambre, traitement vapeur compatible avec une réouverture rapide, et conseils au personnel d'étage pour détecter tôt.",
  },
  {
    icone: <IconTeam />,
    tuile: "tile-teal",
    titre: "Copropriétés & syndics",
    texte:
      "Caves, locaux poubelles, vide-ordures : traiter l'immeuble en entier coûte moins cher que dix interventions logement par logement. Devis pour le syndic, rapport d'intervention et plan des postes pour le conseil syndical.",
  },
  {
    icone: <IconHome />,
    tuile: "tile-cyan",
    titre: "Bureaux & commerces",
    texte:
      "Intervention en dehors des horaires d'ouverture, dispositifs discrets, zéro perturbation pour vos équipes et vos clients. Passages de contrôle programmés à date fixe.",
  },
  {
    icone: <IconShield />,
    tuile: "tile-bleu",
    titre: "Crèches, écoles & santé",
    texte:
      "Établissements sensibles : priorité au piégeage mécanique et aux dispositifs sécurisés, produits appliqués uniquement hors présence des enfants, traçabilité complète de chaque produit utilisé.",
  },
  {
    icone: <IconDoc />,
    tuile: "tile-indigo",
    titre: "Entrepôts & chantiers",
    texte:
      "Les chantiers déplacent les colonies de rongeurs, les stocks les attirent. Dératisation préventive en début de chantier, protection des réserves et des quais de chargement, suivi adapté au site.",
  },
];

const FAQ_PRO = [
  {
    q: "Que comprend un contrat annuel professionnel ?",
    r: "Des passages réguliers programmés (fréquence selon l'activité et la pression du site), le renouvellement des postes d'appâtage, un rapport après chaque visite, le registre sanitaire tenu à jour, et les interventions d'urgence entre deux passages. Le tout à tarif annuel connu d'avance, établi sur devis après visite du site.",
  },
  {
    q: "Fournissez-vous les documents pour les contrôles d'hygiène ?",
    r: "Oui : plan des postes d'appâtage numérotés, fiches des produits utilisés, dates et comptes rendus de passage. C'est précisément ce que les services d'hygiène demandent aux établissements alimentaires.",
  },
  {
    q: "Pouvez-vous intervenir sans que la clientèle s'en aperçoive ?",
    r: "C'est notre façon normale de travailler avec les commerces : passage avant l'ouverture ou après la fermeture, véhicule discret sur demande, dispositifs invisibles pour la clientèle.",
  },
  {
    q: "Sous quel délai intervenez-vous pour une urgence professionnelle ?",
    r: `Nous répondons ${site.horaires} et un technicien peut être sur place en 30 à 45 minutes. Un restaurant avec un contrôle imminent ou un hôtel avec une chambre touchée passent en priorité.`,
  },
  {
    q: "Travaillez-vous avec les gestionnaires multi-sites ?",
    r: "Oui : un interlocuteur unique, une facturation centralisée et un reporting par site. Contactez-nous pour un devis groupé.",
  },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs crumbs={[{ label: "Professionnels" }]} />

      {/* ===== HERO ===== */}
      <section className="hero hero-page">
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <h1 style={{ maxWidth: 880 }}>
            Anti-nuisibles pour les professionnels en {site.zone}
          </h1>
          <p className="lead" style={{ maxWidth: 760, margin: "20px 0 28px" }}>
            Restaurants, hôtels, copropriétés, bureaux, écoles : un nuisible
            dans un établissement, c&apos;est un risque sanitaire, réglementaire
            et de réputation. Nous le traitons vite, discrètement, et avec les
            documents que vos contrôles exigent.
          </p>
          <div className="hero-actions">
            <a href={site.telephoneHref} className="btn btn-primary btn-lg btn-call">
              <IconPhone /> {site.telephone}
            </a>
            <Link href="/devis" className="btn btn-outline btn-lg">
              Devis professionnel gratuit
            </Link>
          </div>
          <p className="dispo">
            <span className="dot" />
            <span>
              Nous répondons <em>{site.horaires}</em> — interventions hors
              horaires d&apos;ouverture
            </span>
          </p>
          <CtaRassure />
        </div>
      </section>

      <Reassurance />

      {/* ===== SEGMENTS ===== */}
      <section>
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">Votre secteur</span>
            <h2>Chaque activité a ses contraintes</h2>
            <p>
              On n&apos;intervient pas dans une cuisine de restaurant comme dans
              une crèche. Voici comment nous travaillons selon votre métier.
            </p>
          </div>
          <div className="signs-grid" data-stagger>
            {SEGMENTS.map((s) => (
              <div key={s.titre} className="sign" data-reveal>
                <span className={`card-icon ${s.tuile}`} style={{ marginBottom: 12 }}>
                  {s.icone}
                </span>
                <h3>{s.titre}</h3>
                <p>{s.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PHOTO TERRAIN (parallax) ===== */}
      <PhotoBand
        src="/images/technicien-deralib-inspection-entrepot.jpg"
        alt="Technicien Deralib inspectant une réserve de stockage à la recherche de traces de rongeurs"
        titre="L'inspection d'abord, le traitement ensuite"
        texte="Réserves, quais, faux plafonds : chaque visite commence par une inspection des points de passage avant de poser ou renouveler les dispositifs."
      />

      {/* ===== CONTRAT ===== */}
      <section className="section-azur">
        <div className="container two-col">
          <div data-reveal="left">
            <span className="kicker">Contrat annuel</span>
            <h2>Mieux qu&apos;une urgence : un site sous surveillance</h2>
            <p style={{ marginTop: 16 }}>
              Pour un établissement exposé — cuisine, réserve alimentaire,
              parties communes — la question n&apos;est pas <em>si</em> les
              nuisibles reviendront, mais <em>quand</em>. Un contrat de passages
              réguliers coûte presque toujours moins cher qu&apos;une succession
              d&apos;urgences, et vous êtes couvert vis-à-vis des contrôles.
            </p>
            <div style={{ marginTop: 22 }}>
              <a href={site.telephoneHref} className="btn btn-primary btn-call">
                <IconPhone size={16} /> Parler à un technicien
              </a>
            </div>
          </div>
          <ul className="checklist" data-stagger>
            <li data-reveal>
              <IconCheck /> Passages programmés à fréquence adaptée à votre
              activité
            </li>
            <li data-reveal>
              <IconCheck /> Registre sanitaire tenu à jour : plan des postes,
              produits, dates
            </li>
            <li data-reveal>
              <IconCheck /> Rapport écrit après chaque visite
            </li>
            <li data-reveal>
              <IconCheck /> Urgences couvertes entre deux passages, {site.horaires}
            </li>
            <li data-reveal>
              <IconCheck /> Interventions hors horaires d&apos;ouverture, en
              discrétion
            </li>
            <li data-reveal>
              <IconCheck /> Tarif annuel connu d&apos;avance, sur devis après
              visite du site
            </li>
            <li data-reveal>
              <IconCheck /> Traitements garantis — conditions écrites au devis
            </li>
            <li data-reveal>
              <IconCheck /> Aucune majoration la nuit, le week-end ni les
              jours fériés
            </li>
          </ul>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section>
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">FAQ</span>
            <h2>Questions fréquentes des professionnels</h2>
          </div>
          <Faq items={FAQ_PRO} />
        </div>
      </section>

      {/* ===== MAILLAGE ===== */}
      <section className="section-azur">
        <div className="container" data-reveal>
          <p style={{ fontWeight: 700, color: "var(--marine)", marginBottom: 12 }}>
            Nos interventions pour les professionnels :
          </p>
          <div className="chip-list">
            <Link href="/deratisation" className="chip">
              Dératisation en {site.zone}
            </Link>
            <Link href="/punaises-de-lit" className="chip">
              Traitement punaises de lit (hôtels)
            </Link>
            <Link href="/cafards" className="chip">
              Traitement cafards (restaurants)
            </Link>
            <Link href="/guepes-frelons" className="chip">
              Destruction nid de guêpes
            </Link>
            <Link href="/depigeonnage" className="chip">
              Dépigeonnage (façades, cours, enseignes)
            </Link>
            <Link href="/deratisation/paris" className="chip">
              Dératisation Paris (75)
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Un site à protéger ? Parlons-en."
        text="Décrivez votre établissement : un technicien vous rappelle avec une proposition adaptée — intervention ponctuelle ou contrat annuel."
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Lutte anti-nuisibles pour les professionnels",
          description:
            "Contrats de dératisation et désinsectisation pour restaurants, hôtels, copropriétés, bureaux et établissements sensibles en Île-de-France.",
          url: `${site.url}/professionnels`,
          areaServed: { "@type": "AdministrativeArea", name: site.zone },
          provider: { "@id": `${site.url}/#localbusiness` },
          audience: { "@type": "BusinessAudience", name: "Professionnels et gestionnaires d'établissements" },
        }}
      />
    </>
  );
}

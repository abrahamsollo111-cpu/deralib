import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import HeroDecor from "@/components/HeroDecor";
import Reassurance from "@/components/Reassurance";
import CtaBand from "@/components/CtaBand";
import { IconCheck, IconShield, IconTeam } from "@/components/Icons";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "À propos — l'équipe et l'expert derrière l'entreprise",
  description: `Qui est derrière ${site.marque} : le parcours du dirigeant, l'équipe de techniciens salariés certifiés ${site.certification} et la façon dont nous travaillons en ${site.zone}.`,
  alternates: { canonical: "/a-propos" },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs crumbs={[{ label: "À propos" }]} />

      <section className="hero hero-page" data-mouse-zone>
        <HeroDecor />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <h1 style={{ maxWidth: 860 }}>
            {site.anneesMetier} ans de métier
          </h1>
          <p className="lead" style={{ maxWidth: 740, marginTop: 20 }}>
            {site.marque} est une entreprise de dératisation et de lutte
            anti-nuisibles basée en {site.zone}. Pas un annuaire, pas une
            plateforme de mise en relation : les techniciens qui se déplacent
            chez vous sont salariés de l&apos;entreprise.
          </p>
        </div>
      </section>

      <Reassurance />

      {/* ===== L'HISTOIRE =====
          TODO (enrichissement, ne rien inventer) : quand le dirigeant
          fournira les faits précis, ajouter ici — année exacte de début,
          employeurs/parcours, année de création de la société actuelle,
          première embauche, spécialisations. Le texte ci-dessous ne
          contient que des faits confirmés par le client (20 ans de
          métier, enseigne actuelle récente). */}
      <section>
        <div className="container prose" data-reveal>
          <span className="kicker">L&apos;entreprise</span>
          <h2 style={{ marginTop: 0 }}>L&apos;histoire</h2>
          <p>
            {site.marque} est une enseigne récente, mais le métier, lui, ne
            date pas d&apos;hier : son fondateur travaille dans la lutte
            anti-nuisibles depuis {site.anneesMetier} ans. Vingt ans de
            dératisation de caves et de locaux poubelles, de traitements
            punaises de lit, de nids de guêpes décrochés sous les toits,
            partout en {site.zone}.
          </p>
          <p>
            Créer sa propre enseigne, c&apos;était la suite logique : appliquer
            ces vingt ans d&apos;expérience avec ses propres méthodes, son
            propre matériel et son propre niveau d&apos;éthique — diagnostic
            honnête, prix confirmé avant intervention, et traitement de la
            cause, pas seulement des symptômes.
          </p>
          <p>
            Une règle n&apos;a jamais changé : les interventions sont réalisées
            par nos propres techniciens, certifiés {site.certification},
            jamais sous-traitées. C&apos;est plus exigeant à faire tourner
            qu&apos;une plateforme de mise en relation, mais c&apos;est la
            seule façon de répondre du résultat.
          </p>
        </div>
      </section>

      {/* ===== LE DIRIGEANT =====
          TODO (E-E-A-T) : dès que lib/config.ts contient le vrai nom,
          il s'affiche automatiquement ici. Ajouter ensuite :
          - une vraie photo → /public/images/dirigeant-deralib.jpg
            (alt : « [Prénom Nom], dirigeant de Deralib, devant un
            véhicule d'intervention »)
          - un paragraphe factuel : diplômes, n° Certibiocide, parcours.
          Ne rien inventer d'ici là. */}
      <section className="section-azur">
        <div className="container two-col">
          <div data-reveal>
            <span className="kicker">Le dirigeant</span>
            <h2>
              {site.dirigeant.includes("TODO")
                ? "Un fondateur qui vient du terrain"
                : site.dirigeant}
            </h2>
            <p style={{ marginTop: 6, color: "var(--bleu)", fontWeight: 700 }}>
              {site.dirigeantTitre} — {site.anneesMetier} ans d&apos;expérience
            </p>
            <p style={{ marginTop: 16 }}>
              Le fondateur de {site.marque} exerce ce métier depuis{" "}
              {site.anneesMetier} ans. Il connaît les trois volets du secteur —
              dératisation, désinsectisation, désinfection — et continue
              d&apos;intervenir sur le terrain avec l&apos;équipe.
            </p>
          </div>
          <div data-reveal>
            <ul className="checklist" data-stagger>
              <li>
                <IconShield /> Certificat {site.certification} — obligatoire
                pour l&apos;usage professionnel des produits biocides (types
                TP14 rodenticides et TP18 insecticides)
              </li>
              <li>
                <IconCheck /> {site.anneesMetier} ans d&apos;expérience en
                lutte anti-nuisibles
              </li>
              <li>
                <IconCheck /> Assurance responsabilité civile professionnelle
                {/* TODO : assureur + n° de contrat dans lib/config.ts */}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== L'ÉQUIPE ===== */}
      <section>
        <div className="container two-col">
          <div data-reveal>
            <span className="kicker">L&apos;équipe</span>
            <h2>Salariés, formés, certifiés</h2>
            <p style={{ marginTop: 16 }}>
              Chaque technicien est salarié de l&apos;entreprise et titulaire du
              certificat {site.certification}. La formation continue porte sur
              la biologie des espèces, les protocoles de traitement, la
              sécurité des occupants et la réglementation biocides — qui évolue
              régulièrement, notamment sur les rodenticides anticoagulants.
            </p>
            <p style={{ marginTop: 14 }}>
              Concrètement : celui qui vous répond au téléphone sait de quoi il
              parle, et celui qui vient chez vous a déjà traité des dizaines de
              cas comme le vôtre.
            </p>
            {/* TODO PHOTOS : remplacer ce bloc par de vraies photos.
                - /public/images/equipe-deralib-techniciens.jpg
                  Alt : « L'équipe de techniciens Deralib en tenue d'intervention »
                - /public/images/vehicule-intervention-deralib.jpg
                  Alt : « Véhicule d'intervention Deralib siglé »
                Les photos authentiques comptent énormément pour la confiance
                et pour la fiche Google Business Profile. */}
          </div>
          <div data-reveal>
            <figure className="photo-cadre" style={{ marginBottom: 18 }}>
              <Image
                src="/images/technicien-traitement-plinthes.jpg"
                alt="Technicien en combinaison appliquant un traitement le long des plinthes avec un pulvérisateur"
                width={540}
                height={370}
              />
            </figure>
            <ul className="checklist" data-stagger>
              {/* TODO : afficher le nombre réel dès qu'il est renseigné
                  dans lib/config.ts (nbTechniciens) */}
              <li>
                <IconTeam /> Des techniciens répartis sur toute
                l&apos;{site.zone}
              </li>
              <li>
                <IconCheck /> 100 % certifiés {site.certification}
              </li>
              <li>
                <IconCheck /> Formation continue aux méthodes et produits
              </li>
              <li>
                <IconCheck /> Véhicules équipés pour intervenir 7j/7
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== ENGAGEMENTS ===== */}
      <section className="section-azur">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">Nos engagements</span>
            <h2>Nos garanties</h2>
          </div>
          <div className="signs-grid" data-stagger>
            {[
              [
                "Diagnostic honnête",
                "Si une intervention n'est pas nécessaire, on vous le dit. Un couple de guêpes qui butine n'est pas un nid ; une crotte isolée n'est pas une infestation.",
              ],
              [
                "Sécurité du foyer",
                "Postes d'appâtage verrouillés, gel appliqué hors de portée, piégeage mécanique quand des enfants ou des animaux vivent sur place. La réglementation biocides est respectée à la lettre.",
              ],
              [
                "Traitement de la cause",
                "Traiter sans obturer les points d'entrée, c'est recommencer dans trois mois. L'obturation grillagée et les conseils de prévention font partie de l'intervention.",
              ],
              [
                "Disponibilité",
                `Sur place en 30 à 45 minutes maximum partout en ${site.zone}, en priorité pour les urgences (nids de frelons, infestations importantes).`,
              ],
              [
                "Prix annoncé avant",
                "Fourchettes publiées sur le site, devis gratuit et détaillé, prix confirmé avant de commencer. Jamais de supplément découvert en fin d'intervention.",
              ],
              [
                "Respect des lieux",
                "Interventions discrètes et soignées, chez les particuliers comme dans les commerces de bouche, où la discrétion compte double.",
              ],
            ].map(([t, d]) => (
              <div key={t} className="sign" data-reveal>
                <h3>
                  <IconCheck size={16} /> {t}
                </h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INFOS ENTREPRISE ===== */}
      <section>
        <div className="container prose" data-reveal>
          <span className="kicker">L&apos;entreprise</span>
          <h2 style={{ marginTop: 0 }}>Informations</h2>
          <ul>
            <li>
              {/* TODO : la raison sociale complète s'affichera dès qu'elle
                  sera renseignée dans lib/config.ts */}
              <strong>Société :</strong>{" "}
              {site.raisonSociale.includes("TODO") ? site.marque : site.raisonSociale}
            </li>
            <li>
              <strong>Zone d&apos;intervention :</strong> {site.zone} — les 8
              départements (75, 77, 78, 91, 92, 93, 94, 95)
            </li>
            <li>
              <strong>Téléphone :</strong>{" "}
              <a href={site.telephoneHref}>{site.telephone}</a>
            </li>
            <li>
              <strong>Email :</strong>{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
          </ul>
          <p>
            Voir aussi notre <Link href="/contact">page contact</Link> et nos{" "}
            <Link href="/mentions-legales">mentions légales</Link>.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

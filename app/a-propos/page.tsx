import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import HeroDecor from "@/components/HeroDecor";
import Reassurance from "@/components/Reassurance";
import CtaBand from "@/components/CtaBand";
import { IconCheck, IconShield, IconTeam } from "@/components/Icons";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "À propos — l'équipe et l'expert derrière l'entreprise",
  description: `Découvrez ${site.marque} : un dirigeant expert certifié et une équipe de techniciens salariés certifiés ${site.certification} qui réalisent eux-mêmes les interventions en ${site.zone}.`,
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
            Une vraie entreprise de terrain, dirigée par un expert du métier
          </h1>
          <p className="lead" style={{ maxWidth: 740, marginTop: 20 }}>
            {site.marque} n&apos;est pas un annuaire ni une plateforme de mise en
            relation : c&apos;est une entreprise de dératisation et de lutte
            anti-nuisibles dont les techniciens salariés réalisent eux-mêmes
            chaque intervention, partout en {site.zone}.
          </p>
        </div>
      </section>

      <Reassurance />

      {/* ===== LE DIRIGEANT ===== */}
      <section>
        <div className="container two-col">
          <div data-reveal>
            <span className="kicker">Le dirigeant</span>
            <h2>{site.dirigeant}</h2>
            <p style={{ marginTop: 6, color: "var(--bleu)", fontWeight: 700 }}>
              {site.dirigeantTitre}
            </p>
            <p style={{ marginTop: 16 }}>
              [À COMPLÉTER : parcours du dirigeant — diplômes, années
              d&apos;expérience, spécialités. C&apos;est cette expertise nommée et
              vérifiable qui inspire confiance aux clients comme à Google
              (E-E-A-T). Ajouter ici une vraie photo.]
            </p>
          </div>
          <div data-reveal>
            <ul className="checklist" data-stagger>
              <li>
                <IconShield /> Certification {site.certification} —
                obligatoire pour l&apos;usage professionnel des biocides
              </li>
              <li>
                <IconCheck /> [À COMPLÉTER : diplômes et formations]
              </li>
              <li>
                <IconCheck /> [À COMPLÉTER : années d&apos;expérience]
              </li>
              <li>
                <IconCheck /> Assurance responsabilité civile professionnelle
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== L'ÉQUIPE ===== */}
      <section className="section-azur">
        <div className="container two-col">
          <div data-reveal>
            <span className="kicker">L&apos;équipe</span>
            <h2>Une équipe de techniciens salariés et certifiés</h2>
            <p style={{ marginTop: 16 }}>
              Chaque technicien de l&apos;équipe est salarié de l&apos;entreprise,
              certifié {site.certification}, et formé en continu : biologie des
              nuisibles, protocoles de traitement, sécurité des occupants,
              réglementation. Quand vous appelez {site.marque}, c&apos;est l&apos;un
              d&apos;eux qui vient — pas un sous-traitant inconnu.
            </p>
            <p style={{ marginTop: 14 }}>
              [À COMPLÉTER : vraies photos de l&apos;équipe et des interventions —
              elles remplaceront ce texte. Les photos authentiques comptent
              énormément pour la confiance et pour la fiche Google Business
              Profile.]
            </p>
          </div>
          <div data-reveal>
            <ul className="checklist" data-stagger>
              <li>
                <IconTeam /> Des techniciens répartis sur toute l&apos;{site.zone}
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
      <section>
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">Nos engagements</span>
            <h2>Ce que nous vous garantissons</h2>
          </div>
          <div className="signs-grid" data-stagger>
            {[
              [
                "Honnêteté",
                "Diagnostic sincère : si une intervention n'est pas nécessaire, on vous le dit. Le prix est confirmé avant de commencer, jamais après.",
              ],
              [
                "Sécurité",
                "Produits professionnels appliqués selon la réglementation biocides, avec des dispositifs adaptés aux enfants et aux animaux.",
              ],
              [
                "Efficacité durable",
                "On ne se contente pas de traiter : on bouche les accès et on vous explique comment éviter le retour des nuisibles.",
              ],
              [
                "Disponibilité",
                `Intervention rapide partout en ${site.zone}, y compris pour les urgences, ${site.horaires}.`,
              ],
              [
                "Transparence",
                "Fourchettes de prix publiées sur le site, devis gratuit et détaillé, rapport d'intervention remis au client.",
              ],
              [
                "Respect des lieux",
                "Interventions discrètes et soignées, chez les particuliers comme dans les commerces et les copropriétés.",
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
      <section className="section-azur">
        <div className="container prose" data-reveal>
          <span className="kicker">L&apos;entreprise</span>
          <h2 style={{ marginTop: 0 }}>Informations</h2>
          <ul>
            <li>
              <strong>Société :</strong> {site.raisonSociale}
            </li>
            <li>
              <strong>Zone d&apos;intervention :</strong> {site.zone}
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
            Voir aussi nos <Link href="/mentions-legales">mentions légales</Link>.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

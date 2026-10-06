import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import RecrutementForm from "./RecrutementForm";
import JsonLd from "@/components/JsonLd";
import { IconCheck, IconPhone, IconShield, IconPin, IconClock } from "@/components/Icons";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: `Recrutement dératiseurs ${site.zone} — rejoignez ${site.marque}`,
  description: `Dératiseur ou technicien 3D en ${site.zone} ? Rejoignez le réseau ${site.marque} : des demandes d'intervention qualifiées dans vos zones, sans prospecter. Candidature en 2 minutes.`,
  alternates: { canonical: "/recrutement" },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs crumbs={[{ label: "Nous recrutons" }]} />

      <section style={{ paddingTop: 40 }}>
        <div className="container">
          <span className="kicker">Nous recrutons</span>
          <h1 style={{ maxWidth: 820 }}>
            Dératiseurs d&apos;{site.zone} : rejoignez le réseau {site.marque}
          </h1>
          <p className="lead" style={{ maxWidth: 720, marginTop: 16 }}>
            La demande que nous recevons grandit plus vite que nos tournées.
            Nous cherchons des techniciens sérieux — indépendants ou en
            société — pour intervenir avec nous partout en {site.zone}.
            Vous faites le terrain que vous aimez, nous vous apportons des
            demandes d&apos;intervention qualifiées dans vos zones, sans
            prospecter.
          </p>

          <div className="contact-grid" style={{ marginTop: 40 }}>
            <div>
              <div className="contact-bloc">
                <h2 style={{ fontSize: "1.2rem" }}>Ce que vous y gagnez</h2>
                <ul className="contact-lignes">
                  <li>
                    <IconPin size={17} />
                    <div>
                      <strong>Des interventions près de chez vous</strong>
                      <span className="contact-note">
                        Vous choisissez vos départements — on ne vous envoie
                        jamais à l&apos;autre bout de la région.
                      </span>
                    </div>
                  </li>
                  <li>
                    <IconCheck size={17} />
                    <div>
                      <strong>Des demandes qualifiées, zéro prospection</strong>
                      <span className="contact-note">
                        Chaque demande est qualifiée en amont : nuisible
                        identifié, adresse, urgence. Vous intervenez, c&apos;est
                        tout.
                      </span>
                    </div>
                  </li>
                  <li>
                    <IconClock size={17} />
                    <div>
                      <strong>Vous restez libre</strong>
                      <span className="contact-note">
                        Indépendant ou société : vous gardez votre activité,
                        vos horaires et vos clients.
                      </span>
                    </div>
                  </li>
                  <li>
                    <IconShield size={17} />
                    <div>
                      <strong>Une exigence partagée</strong>
                      <span className="contact-note">
                        Certibiocide, protocoles sérieux, prix annoncés et
                        tenus : c&apos;est ce qui fait notre réputation — et la
                        vôtre.
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="contact-bloc" style={{ marginTop: 20 }}>
                <h2 style={{ fontSize: "1.2rem" }}>Comment ça se passe</h2>
                <ol className="recrutement-etapes">
                  <li>
                    <strong>1.</strong> Vous remplissez le formulaire (2 minutes)
                  </li>
                  <li>
                    <strong>2.</strong> Nous vous rappelons pour faire
                    connaissance : zones, matériel, expérience, conditions
                  </li>
                  <li>
                    <strong>3.</strong> Première intervention ensemble, puis
                    vous recevez les demandes de vos zones
                  </li>
                </ol>
                <p style={{ marginTop: 14, fontSize: "0.9rem", color: "var(--text-light)" }}>
                  Une question avant de candidater ?{" "}
                  <a href={site.telephoneHref} style={{ fontWeight: 700 }}>
                    <IconPhone size={13} /> {site.telephone}
                  </a>
                </p>
              </div>
            </div>

            <RecrutementForm />
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "JobPosting",
          title: "Technicien dératiseur / 3D — réseau Deralib (Île-de-France)",
          description:
            "Deralib recherche des techniciens dératiseurs et 3D (dératisation, punaises de lit, blattes, guêpes) en Île-de-France, indépendants ou en société, pour intervenir sur des demandes qualifiées dans leurs zones.",
          datePosted: "2026-10-06",
          employmentType: "CONTRACTOR",
          hiringOrganization: {
            "@type": "Organization",
            name: site.marque,
            sameAs: site.url,
          },
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressRegion: "Île-de-France",
              addressCountry: "FR",
            },
          },
        }}
      />
    </>
  );
}

import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import DevisForm from "@/app/devis/DevisForm";
import JsonLd from "@/components/JsonLd";
import { IconPhone, IconPin, IconClock, IconDoc } from "@/components/Icons";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: `Contact — ${site.marque}, dératisation en ${site.zone}`,
  description: `Contactez ${site.marque} : téléphone, email, horaires et formulaire. Intervention anti-nuisibles en 30-45 min partout en ${site.zone}. Devis gratuit.`,
  alternates: { canonical: "/contact" },
};

const estRenseigne = (v: string) => v !== "" && !v.includes("TODO");

export default function Page() {
  return (
    <>
      <Breadcrumbs crumbs={[{ label: "Contact" }]} />

      <section style={{ paddingTop: 40 }}>
        <div className="container">
          <h1 style={{ maxWidth: 800 }}>
            Contacter {site.marque} en {site.zone}
          </h1>
          <p className="lead" style={{ maxWidth: 720, marginTop: 16 }}>
            Par téléphone pour une réponse immédiate, ou par le formulaire si
            vous préférez décrire la situation par écrit — un technicien vous
            rappelle.
          </p>

          <div className="contact-grid" style={{ marginTop: 40 }}>
            {/* ===== NAP — doit rester identique au caractère près sur tout
                le site ET sur la fiche Google Business Profile ===== */}
            <div>
              <div className="contact-bloc">
                <h2 style={{ fontSize: "1.2rem" }}>Coordonnées</h2>
                <ul className="contact-lignes">
                  <li>
                    <IconPhone size={17} />
                    <div>
                      <strong>Téléphone</strong>
                      <a href={site.telephoneHref}>{site.telephone}</a>
                      <span className="contact-note">
                        Appel sans engagement — {site.horaires}
                      </span>
                    </div>
                  </li>
                  <li>
                    <IconDoc size={17} />
                    <div>
                      <strong>Email</strong>
                      <a href={`mailto:${site.email}`}>{site.email}</a>
                    </div>
                  </li>
                  <li>
                    <IconPin size={17} />
                    <div>
                      <strong>Siège</strong>
                      {estRenseigne(site.adresse) ? (
                        <span>
                          {estRenseigne(site.raisonSociale) ? site.raisonSociale : site.marque}{" "}
                          — {site.adresse}, {site.codePostal} {site.villeSiege}
                        </span>
                      ) : (
                        // ⚠️ TODO : renseigner l'adresse du siège dans
                        // lib/config.ts — identique à la fiche Google
                        // Business Profile (NAP)
                        <span>
                          {estRenseigne(site.raisonSociale) ? site.raisonSociale : site.marque}{" "}
                          — {site.zone}
                        </span>
                      )}
                      <span className="contact-note">
                        Interventions à domicile uniquement, dans les 8
                        départements d&apos;{site.zone}
                      </span>
                    </div>
                  </li>
                  <li>
                    <IconClock size={17} />
                    <div>
                      <strong>Horaires</strong>
                      <span>{site.horaires}</span>
                      <span className="contact-note">
                        Urgences (nids de frelons, infestations importantes)
                        traitées en priorité
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* carte OpenStreetMap centrée sur le siège (45 rue
                  Boursault, Paris 17e) — chargée en différé */}
              <div className="contact-bloc" style={{ marginTop: 22, padding: 0, overflow: "hidden" }}>
                <iframe
                  title="Localisation du siège de Deralib — 45 rue Boursault, 75017 Paris"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=2.3129%2C48.8803%2C2.3269%2C48.8883&layer=mapnik&marker=48.8843%2C2.3199"
                  style={{ width: "100%", height: 260, border: 0, display: "block" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="contact-bloc" style={{ marginTop: 22 }}>
                <h2 style={{ fontSize: "1.2rem" }}>Zone d&apos;intervention</h2>
                <p style={{ fontSize: "0.94rem", marginTop: 10 }}>
                  Paris (75), Hauts-de-Seine (92), Seine-Saint-Denis (93),
                  Val-de-Marne (94), Seine-et-Marne (77), Yvelines (78),
                  Essonne (91) et Val-d&apos;Oise (95). Intervention
                  en 30 à 45 minutes maximum.
                </p>
              </div>
            </div>

            <div className="form-card">
              <DevisForm />
            </div>
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: `Contact ${site.marque}`,
          url: `${site.url}/contact`,
          about: { "@id": `${site.url}/#localbusiness` },
        }}
      />
    </>
  );
}

"use client";

import { useState } from "react";
import { site } from "@/lib/config";

const DOMAINES = [
  "Dératisation (rats, souris)",
  "Punaises de lit",
  "Cafards / blattes",
  "Guêpes / frelons",
  "Dépigeonnage",
  "Tous nuisibles (3D)",
];

const ZONES = [
  { code: "75", label: "Paris (75)" },
  { code: "92", label: "Hauts-de-Seine (92)" },
  { code: "93", label: "Seine-Saint-Denis (93)" },
  { code: "94", label: "Val-de-Marne (94)" },
  { code: "77", label: "Seine-et-Marne (77)" },
  { code: "78", label: "Yvelines (78)" },
  { code: "91", label: "Essonne (91)" },
  { code: "95", label: "Val-d'Oise (95)" },
];

/**
 * Candidature technicien / dératiseur partenaire.
 * Envoie vers /api/leads avec source "candidature" : la demande
 * arrive dans l'onglet « Candidatures » du dashboard /admin.
 */
export default function RecrutementForm() {
  const [etat, setEtat] = useState<"saisie" | "envoi" | "envoye" | "erreur">("saisie");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const zones = ZONES.filter((z) => data.get(`zone-${z.code}`)).map((z) => z.label);
    if (zones.length === 0) {
      alert("Indiquez au moins un département d'intervention.");
      return;
    }

    setEtat("envoi");
    const email = String(data.get("email") || "").trim();
    const experience = String(data.get("experience") || "").trim();
    const messageLibre = String(data.get("message") || "").trim();
    const message = [
      email ? `Email : ${email}` : "",
      experience ? `Expérience : ${experience}` : "",
      messageLibre,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: data.get("nom"),
          tel: data.get("tel"),
          ville: zones.join(", "),
          nuisible: data.get("domaine"),
          lieu: String(data.get("entreprise") || "").trim(), // société du candidat
          urgence: `Certibiocide : ${data.get("certibiocide")}`,
          message,
          societe: data.get("societe"), // piège à robots (doit rester vide)
          source: "candidature",
          page: "/recrutement",
        }),
      });
      setEtat(res.ok ? "envoye" : "erreur");
    } catch {
      setEtat("erreur");
    }
  }

  if (etat === "envoye") {
    return (
      <div className="form-card" role="status">
        <h3 style={{ marginBottom: 10 }}>Candidature bien reçue ✅</h3>
        <p style={{ fontSize: "0.95rem" }}>
          Merci ! Nous examinons chaque profil personnellement et nous vous
          recontactons rapidement pour faire connaissance.
        </p>
        <p style={{ fontSize: "0.95rem", marginTop: 12 }}>
          Une question en attendant ?{" "}
          <a href={site.telephoneHref} style={{ fontWeight: 700 }}>
            {site.telephone}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3 style={{ marginBottom: 20 }}>Rejoindre le réseau</h3>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="rec-nom">Votre nom *</label>
          <input id="rec-nom" name="nom" required autoComplete="name" />
        </div>
        <div className="form-field">
          <label htmlFor="rec-tel">Téléphone *</label>
          <input id="rec-tel" name="tel" type="tel" required autoComplete="tel" />
        </div>
        <div className="form-field">
          <label htmlFor="rec-email">Email</label>
          <input id="rec-email" name="email" type="email" autoComplete="email" />
        </div>
        <div className="form-field">
          <label htmlFor="rec-entreprise">Votre société (si vous en avez une)</label>
          <input id="rec-entreprise" name="entreprise" placeholder="Nom ou SIRET" />
        </div>
        <div className="form-field">
          <label htmlFor="rec-domaine">Domaine d&apos;activité principal *</label>
          <select id="rec-domaine" name="domaine" required defaultValue="">
            <option value="" disabled>
              Choisir…
            </option>
            {DOMAINES.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="rec-certibiocide">Certificat Certibiocide *</label>
          <select id="rec-certibiocide" name="certibiocide" required defaultValue="">
            <option value="" disabled>
              Choisir…
            </option>
            <option>Oui, à jour</option>
            <option>En cours d&apos;obtention</option>
            <option>Non</option>
          </select>
        </div>
        <div className="form-field full">
          <span className="form-label">Dans quels départements intervenez-vous ? *</span>
          <div className="zones-grid">
            {ZONES.map((z) => (
              <label key={z.code} className="zone-case">
                <input type="checkbox" name={`zone-${z.code}`} />
                <span>{z.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="rec-exp">Années d&apos;expérience</label>
          <select id="rec-exp" name="experience" defaultValue="">
            <option value="">—</option>
            <option>Moins de 2 ans</option>
            <option>2 à 5 ans</option>
            <option>5 à 10 ans</option>
            <option>Plus de 10 ans</option>
          </select>
        </div>
        <div className="form-field full">
          <label htmlFor="rec-message">Un mot sur vous (facultatif)</label>
          <textarea
            id="rec-message"
            name="message"
            rows={3}
            placeholder="Matériel, disponibilités, types de chantiers préférés…"
          />
        </div>
        {/* piège à robots : champ invisible qui doit rester vide */}
        <input
          type="text"
          name="societe"
          tabIndex={-1}
          autoComplete="off"
          style={{ position: "absolute", left: "-9999px" }}
          aria-hidden
        />
      </div>
      {etat === "erreur" && (
        <p className="form-erreur">
          L&apos;envoi a échoué. Réessayez, ou appelez-nous au {site.telephone}.
        </p>
      )}
      <button
        type="submit"
        className="btn btn-primary btn-lg"
        style={{ width: "100%", marginTop: 22 }}
        disabled={etat === "envoi"}
      >
        {etat === "envoi" ? "Envoi en cours…" : "Envoyer ma candidature"}
      </button>
      <p style={{ fontSize: "0.78rem", color: "var(--text-light)", marginTop: 14 }}>
        Vos coordonnées servent uniquement à vous recontacter au sujet de votre
        candidature — jamais revendues.{" "}
        <a href="/politique-de-confidentialite">Politique de confidentialité</a>
      </p>
    </form>
  );
}

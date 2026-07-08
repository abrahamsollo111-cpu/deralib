"use client";

import { useState } from "react";
import { site } from "@/lib/config";
import { NUISIBLES_SLUGS, NUISIBLES_LABELS } from "@/lib/nuisibles";

/**
 * Formulaire de devis — version de départ.
 * Pour l'instant, l'envoi ouvre l'application email du visiteur (mailto),
 * pré-remplie vers l'adresse de l'entreprise.
 * TODO plus tard : brancher un service type Formspree / Resend pour
 * recevoir les demandes directement par email sans action du visiteur.
 */
export default function DevisForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lignes = [
      `Nom : ${data.get("nom")}`,
      `Téléphone : ${data.get("tel")}`,
      `Ville / code postal : ${data.get("ville")}`,
      `Nuisible : ${data.get("nuisible")}`,
      `Type de lieu : ${data.get("lieu")}`,
      "",
      "Description :",
      String(data.get("message") || ""),
    ];
    const subject = encodeURIComponent(
      `Demande de devis — ${data.get("nuisible")} à ${data.get("ville")}`
    );
    const body = encodeURIComponent(lignes.join("\n"));
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div role="status">
        <h3 style={{ marginBottom: 10 }}>Merci !</h3>
        <p style={{ fontSize: "0.95rem" }}>
          Votre application email s&apos;est ouverte avec votre demande
          pré-remplie : il ne reste qu&apos;à appuyer sur « Envoyer ».
        </p>
        <p style={{ fontSize: "0.95rem", marginTop: 12 }}>
          Vous pouvez aussi nous appeler directement au{" "}
          <a href={site.telephoneHref} style={{ fontWeight: 700 }}>
            {site.telephone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 style={{ marginBottom: 20 }}>Décrivez votre situation</h3>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="nom">Votre nom *</label>
          <input id="nom" name="nom" required autoComplete="name" />
        </div>
        <div className="form-field">
          <label htmlFor="tel">Téléphone *</label>
          <input id="tel" name="tel" type="tel" required autoComplete="tel" />
        </div>
        <div className="form-field">
          <label htmlFor="ville">Ville / code postal *</label>
          <input id="ville" name="ville" required placeholder="Ex. Paris 11e" />
        </div>
        <div className="form-field">
          <label htmlFor="nuisible">Nuisible concerné *</label>
          <select id="nuisible" name="nuisible" required defaultValue="">
            <option value="" disabled>
              Choisir…
            </option>
            {NUISIBLES_SLUGS.map((s) => (
              <option key={s} value={NUISIBLES_LABELS[s]}>
                {NUISIBLES_LABELS[s]}
              </option>
            ))}
            <option value="Autre / je ne sais pas">Autre / je ne sais pas</option>
          </select>
        </div>
        <div className="form-field full">
          <label htmlFor="lieu">Type de lieu</label>
          <select id="lieu" name="lieu" defaultValue="Appartement">
            <option>Appartement</option>
            <option>Maison</option>
            <option>Commerce / restaurant</option>
            <option>Copropriété / parties communes</option>
            <option>Bureaux / local professionnel</option>
          </select>
        </div>
        <div className="form-field full">
          <label htmlFor="message">Décrivez le problème *</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            placeholder="Depuis quand, dans quelles pièces, ce que vous avez observé…"
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: 22 }}>
        Recevoir mon devis gratuit
      </button>
      <p style={{ fontSize: "0.78rem", color: "var(--text-light)", marginTop: 14 }}>
        En envoyant ce formulaire, vous acceptez d&apos;être recontacté au sujet de
        votre demande. Vos données ne sont jamais revendues — voir notre{" "}
        <a href="/politique-de-confidentialite">politique de confidentialité</a>.
      </p>
    </form>
  );
}

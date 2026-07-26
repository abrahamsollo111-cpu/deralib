"use client";

import { useState } from "react";
import { site } from "@/lib/config";
import { NUISIBLES_SLUGS, NUISIBLES_LABELS } from "@/lib/nuisibles";

/**
 * Formulaire de devis complet.
 * La demande est enregistrée directement sur le site (visible dans
 * /admin) : plus aucune ouverture de l'application email du visiteur.
 */
export default function DevisForm({ source = "formulaire-devis" }: { source?: string }) {
  const [etat, setEtat] = useState<"saisie" | "envoi" | "envoye" | "erreur">("saisie");
  const [erreur, setErreur] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEtat("envoi");
    const data = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: data.get("nom"),
          tel: data.get("tel"),
          ville: data.get("ville"),
          nuisible: data.get("nuisible"),
          lieu: data.get("lieu"),
          message: data.get("message"),
          societe: data.get("societe"), // piège à robots
          source,
          page: typeof window !== "undefined" ? window.location.pathname : "",
        }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.erreur || "Envoi impossible");
      setEtat("envoye");
    } catch (err) {
      setErreur(err instanceof Error ? err.message : "Envoi impossible");
      setEtat("erreur");
    }
  }

  if (etat === "envoye") {
    return (
      <div role="status" className="form-confirmation">
        <span className="form-confirmation-ico" aria-hidden>
          ✓
        </span>
        <h3>Demande envoyée</h3>
        <p>
          Merci, votre demande est bien enregistrée. Un technicien vous rappelle
          au plus vite — nous répondons {site.horaires}.
        </p>
        <p style={{ marginTop: 14, fontSize: "0.93rem" }}>
          C&apos;est urgent ? Appelez directement :
        </p>
        <a href={site.telephoneHref} className="btn btn-primary" style={{ marginTop: 10 }}>
          {site.telephone}
        </a>
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

      {/* champ piège : invisible pour les humains, rempli par les robots */}
      <input
        type="text"
        name="societe"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
      />

      <button
        type="submit"
        className="btn btn-primary btn-lg"
        style={{ width: "100%", marginTop: 22 }}
        disabled={etat === "envoi"}
      >
        {etat === "envoi" ? "Envoi en cours…" : "Recevoir mon devis gratuit"}
      </button>

      {etat === "erreur" && (
        <p className="form-erreur">
          {erreur}. Appelez-nous directement au{" "}
          <a href={site.telephoneHref}>{site.telephone}</a>.
        </p>
      )}

      <p style={{ fontSize: "0.78rem", color: "var(--text-light)", marginTop: 14 }}>
        En envoyant ce formulaire, vous acceptez d&apos;être recontacté au sujet de
        votre demande. Vos données ne sont jamais revendues — voir notre{" "}
        <a href="/politique-de-confidentialite">politique de confidentialité</a>.
      </p>
    </form>
  );
}

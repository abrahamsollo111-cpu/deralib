"use client";

import { useEffect, useState } from "react";
import type { Reglages } from "@/lib/store";

const CHAMPS: {
  cle: keyof Reglages;
  label: string;
  exemple: string;
  aide: string;
}[] = [
  {
    cle: "gaId",
    label: "Google Analytics 4 — identifiant de mesure",
    exemple: "G-XXXXXXXXXX",
    aide: "analytics.google.com → Admin → Flux de données → votre site. Mesure les visiteurs, les pages vues et les sources de trafic.",
  },
  {
    cle: "adsId",
    label: "Google Ads — identifiant de conversion",
    exemple: "AW-123456789",
    aide: "Uniquement si vous lancez un jour des campagnes payantes. Laissez vide sinon.",
  },
  {
    cle: "adsLabel",
    label: "Google Ads — libellé de conversion",
    exemple: "AbC-D_efGh12",
    aide: "Envoyé automatiquement à chaque formulaire envoyé, pour mesurer le coût par demande.",
  },
  {
    cle: "metaPixel",
    label: "Meta Pixel (Facebook / Instagram)",
    exemple: "1234567890",
    aide: "Utile seulement si vous faites de la publicité sur Facebook ou Instagram.",
  },
  {
    cle: "verifGoogle",
    label: "Vérification Google (balise meta)",
    exemple: "AbCdEf123456…",
    aide: "Contenu de la balise google-site-verification. Déjà validé par DNS pour deralib.com : ce champ n'est utile qu'en cas de nouvelle vérification.",
  },
  {
    cle: "verifBing",
    label: "Vérification Bing Webmaster",
    exemple: "0123456789ABCDEF",
    aide: "Bing représente une petite part du trafic, mais l'inscription est gratuite : bing.com/webmasters",
  },
  {
    cle: "lienAvisGoogle",
    label: "Lien pour demander un avis Google",
    exemple: "https://g.page/r/…/review",
    aide: "Fiche Google Business → « Demander des avis ». Utilisé dans l'onglet Prospection pour l'envoyer en un clic à vos clients.",
  },
];

export default function Suivi({
  reglages,
  setReglages,
}: {
  reglages: Reglages | null;
  setReglages: (r: Reglages) => void;
}) {
  const [form, setForm] = useState<Reglages | null>(reglages);
  const [etat, setEtat] = useState<"" | "envoi" | "ok" | "erreur">("");

  useEffect(() => setForm(reglages), [reglages]);

  if (!form) return <p className="admin-vide">Chargement…</p>;

  async function enregistrer(e: React.FormEvent) {
    e.preventDefault();
    setEtat("envoi");
    const res = await fetch("/api/admin/reglages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const data = await res.json();
      setReglages(data.reglages as Reglages);
      setEtat("ok");
      setTimeout(() => setEtat(""), 3000);
    } else {
      setEtat("erreur");
    }
  }

  return (
    <section className="admin-formulaire">
      <div className="admin-carte">
        <h2>Balises de suivi et de vérification</h2>
        <p className="admin-mini">
          Renseignez uniquement ce dont vous avez besoin. Les balises sont
          ajoutées automatiquement sur toutes les pages du site, sans
          intervention technique. Les modifications sont prises en compte en
          quelques minutes.
        </p>

        <form onSubmit={enregistrer} style={{ marginTop: 20 }}>
          {CHAMPS.map((c) => (
            <div key={c.cle} className="admin-champ">
              <label htmlFor={c.cle}>{c.label}</label>
              <input
                id={c.cle}
                value={form[c.cle]}
                placeholder={c.exemple}
                onChange={(e) => setForm({ ...form, [c.cle]: e.target.value })}
              />
              <span className="admin-aide">{c.aide}</span>
            </div>
          ))}

          <div className="admin-champ">
            <label htmlFor="notes">Bloc-notes</label>
            <textarea
              id="notes"
              rows={4}
              value={form.notes}
              placeholder="Identifiants, rappels, tarifs négociés, contacts syndics…"
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
            <span className="admin-aide">
              Visible uniquement ici. N&apos;y stockez pas de mots de passe.
            </span>
          </div>

          <div className="admin-form-bas">
            <button type="submit" className="btn btn-primary" disabled={etat === "envoi"}>
              {etat === "envoi" ? "Enregistrement…" : "Enregistrer"}
            </button>
            {etat === "ok" && <span className="admin-ok">✓ Enregistré</span>}
            {etat === "erreur" && (
              <span className="admin-erreur">Échec de l&apos;enregistrement</span>
            )}
          </div>
        </form>
      </div>

      <div className="admin-carte">
        <h2>Outils de suivi recommandés</h2>
        <ul className="admin-liens">
          <li>
            <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer">
              Google Search Console ↗
            </a>
            <span>
              Mots-clés qui vous amènent des visiteurs, pages indexées,
              positions. Déjà configuré et sitemap soumis.
            </span>
          </li>
          <li>
            <a href="https://business.google.com" target="_blank" rel="noreferrer">
              Fiche Google Business ↗
            </a>
            <span>
              Le levier n°1 des appels : statistiques d&apos;appels, demandes
              d&apos;itinéraire, avis clients.
            </span>
          </li>
          <li>
            <a href="https://analytics.google.com" target="_blank" rel="noreferrer">
              Google Analytics ↗
            </a>
            <span>
              Créez une propriété, copiez l&apos;identifiant G-… ci-dessus, et
              l&apos;audience du site sera mesurée automatiquement.
            </span>
          </li>
          <li>
            <a href="https://pagespeed.web.dev/?url=https://www.deralib.com" target="_blank" rel="noreferrer">
              Test de vitesse PageSpeed ↗
            </a>
            <span>Vérifie la performance mobile, critère de classement Google.</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

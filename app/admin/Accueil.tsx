"use client";

import { useEffect, useMemo, useState } from "react";
import type { Lead, Reglages } from "@/lib/store";

/* ============================================================
   Écran d'accueil du dashboard : vue d'ensemble colorée
   (KPI, graphiques, dernières demandes) + tâches de la semaine
   qui se renouvellent automatiquement chaque lundi.
   ============================================================ */

// ---------- Tâches hebdomadaires ----------
// Chaque catégorie contient un vivier : une ou deux tâches par
// catégorie sont sélectionnées selon le numéro de semaine, donc le
// programme change tout seul, sans jamais s'épuiser.

const VIVIER: {
  categorie: string;
  couleur: string;
  taches: string[];
}[] = [
  {
    categorie: "Avis clients",
    couleur: "#1e7a4f",
    taches: [
      "Envoyer le SMS d'avis aux clients de la semaine (onglet Prospection)",
      "Répondre à tous les avis Google reçus, même d'un simple merci",
      "Relancer gentiment un client satisfait qui n'a pas encore laissé d'avis",
    ],
  },
  {
    categorie: "Backlinks & annuaires",
    couleur: "#23548f",
    taches: [
      "Inscrire Deralib sur PagesJaunes.fr (mêmes nom, adresse, téléphone que le site)",
      "Inscrire Deralib sur Yelp.fr",
      "Inscrire Deralib sur 118000.fr",
      "Inscrire Deralib sur Hotfrog.fr",
      "Inscrire Deralib sur Cylex-France.fr",
      "Publier ou remonter l'annonce Leboncoin (Services → Autres services)",
      "Demander à un fournisseur ou partenaire un lien vers deralib.com",
      "Vérifier que les anciennes inscriptions affichent bien le 01 72 68 21 30",
    ],
  },
  {
    categorie: "Fiche Google",
    couleur: "#a8410f",
    taches: [
      "Ajouter 2 photos d'intervention sur la fiche Google",
      "Publier un post Google (conseil de saison, disponibilité 24h/24…)",
      "Vérifier les questions/réponses de la fiche et y répondre",
      "Contrôler les statistiques d'appels de la fiche (Performances)",
      "Vérifier que les horaires et services de la fiche sont à jour",
    ],
  },
  {
    categorie: "À confier à Claude",
    couleur: "#5b4a9e",
    taches: [
      "Demander un nouvel article /conseils (ex. « Cafards en hiver : pourquoi ils rentrent »)",
      "Faire ajouter les nouveaux avis Google sur le site (content/avis.json)",
      "Faire mettre à jour les tarifs si vos prix réels ont changé",
      "Demander une relecture SEO d'une page qui ne décolle pas dans Search Console",
      "Faire remplacer une photo générique par une vraie photo d'intervention",
      "Demander un bilan : nouvelles pages à créer selon les recherches Google",
    ],
  },
  {
    categorie: "Prospection terrain",
    couleur: "#8a6516",
    taches: [
      "Déposer une carte chez 3 gardiens d'immeubles du secteur",
      "Passer voir 2 restaurants en fin de service (argument : registre sanitaire)",
      "Contacter une agence immobilière ou une conciergerie Airbnb",
      "Distribuer des flyers dans un quartier ancien (vérifier le bon numéro dessus)",
      "Proposer un contrat annuel à un commerce déjà client",
    ],
  },
  {
    categorie: "Suivi",
    couleur: "#0e7490",
    taches: [
      "Ouvrir Search Console : positions et nouvelles requêtes de la semaine",
      "Traiter toutes les demandes en statut « nouveau » du dashboard",
      "Vérifier que la facturation Vercel est à jour",
    ],
  },
];

/** Numéro de semaine ISO — sert de graine pour la rotation */
function semaineIso(d: Date): { annee: number; semaine: number } {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const jour = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - jour);
  const debutAnnee = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const semaine = Math.ceil(((date.getTime() - debutAnnee.getTime()) / 864e5 + 1) / 7);
  return { annee: date.getUTCFullYear(), semaine };
}

type Tache = { texte: string; categorie: string; couleur: string };

function tachesDeLaSemaine(graine: number): Tache[] {
  const taches: Tache[] = [];
  VIVIER.forEach((cat, iCat) => {
    // 2 tâches pour les gros viviers, 1 pour les petits
    const n = cat.taches.length >= 6 ? 2 : 1;
    for (let k = 0; k < n; k++) {
      const idx = (graine * (iCat + 3) + k * 3 + iCat) % cat.taches.length;
      const texte = cat.taches[idx];
      if (!taches.some((t) => t.texte === texte)) {
        taches.push({ texte, categorie: cat.categorie, couleur: cat.couleur });
      }
    }
  });
  return taches;
}

// ---------- Graphiques SVG ----------

const PALETTE = ["#1e5b46", "#cf4f17", "#23548f", "#8a6516", "#5b4a9e", "#0e7490"];

function Donut({ donnees }: { donnees: { label: string; n: number }[] }) {
  const total = donnees.reduce((s, d) => s + d.n, 0);
  if (!total) return null;
  const rayon = 15.9155; // circonférence = 100
  let cumul = 0;
  return (
    <div className="acc-donut">
      <svg viewBox="0 0 42 42" role="img" aria-label="Répartition des demandes par nuisible">
        <circle cx="21" cy="21" r={rayon} fill="none" stroke="#eceee9" strokeWidth="6" />
        {donnees.map((d, i) => {
          const part = (d.n / total) * 100;
          const el = (
            <circle
              key={d.label}
              cx="21"
              cy="21"
              r={rayon}
              fill="none"
              stroke={PALETTE[i % PALETTE.length]}
              strokeWidth="6"
              strokeDasharray={`${part} ${100 - part}`}
              strokeDashoffset={25 - cumul}
            />
          );
          cumul += part;
          return el;
        })}
        <text x="21" y="20" textAnchor="middle" className="acc-donut-chiffre">
          {total}
        </text>
        <text x="21" y="26" textAnchor="middle" className="acc-donut-libelle">
          demandes
        </text>
      </svg>
      <ul className="acc-legende">
        {donnees.map((d, i) => (
          <li key={d.label}>
            <span style={{ background: PALETTE[i % PALETTE.length] }} />
            {d.label} <strong>{d.n}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------- Composant principal ----------

export default function Accueil({
  leads,
  reglages,
  aller,
}: {
  leads: Lead[];
  reglages: Reglages | null;
  aller: (onglet: "demandes" | "stats" | "suivi" | "site" | "prospection") => void;
}) {
  const { annee, semaine } = semaineIso(new Date());
  const cleSemaine = `deralib_taches_${annee}-S${semaine}`;
  const taches = useMemo(() => tachesDeLaSemaine(annee * 100 + semaine), [annee, semaine]);
  const [faites, setFaites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const brut = localStorage.getItem(cleSemaine);
      setFaites(brut ? (JSON.parse(brut) as string[]) : []);
    } catch {
      /* stockage local indisponible */
    }
  }, [cleSemaine]);

  function basculer(texte: string) {
    const suivant = faites.includes(texte)
      ? faites.filter((t) => t !== texte)
      : [...faites, texte];
    setFaites(suivant);
    try {
      localStorage.setItem(cleSemaine, JSON.stringify(suivant));
    } catch {
      /* ignoré */
    }
  }

  const stats = useMemo(() => {
    const maintenant = Date.now();
    const j7 = maintenant - 7 * 864e5;
    const parNuisible = new Map<string, number>();
    leads.forEach((l) => {
      const v = l.nuisible?.trim() || "Autre";
      parNuisible.set(v, (parNuisible.get(v) || 0) + 1);
    });
    const jours: { label: string; n: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(maintenant - i * 864e5);
      jours.push({
        label: d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" }),
        n: leads.filter((l) => l.date.slice(0, 10) === d.toISOString().slice(0, 10)).length,
      });
    }
    return {
      aTraiter: leads.filter((l) => l.statut === "nouveau").length,
      semaine: leads.filter((l) => new Date(l.date).getTime() > j7).length,
      gagnes: leads.filter((l) => l.statut === "gagne").length,
      total: leads.length,
      parNuisible: [...parNuisible.entries()]
        .map(([label, n]) => ({ label, n }))
        .sort((a, b) => b.n - a.n)
        .slice(0, 6),
      jours,
      dernieres: leads.slice(0, 4),
    };
  }, [leads]);

  const dateLongue = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const progression = taches.length
    ? Math.round((taches.filter((t) => faites.includes(t.texte)).length / taches.length) * 100)
    : 0;
  const maxJour = Math.max(...stats.jours.map((j) => j.n), 1);

  return (
    <section className="acc">
      {/* ===== Bandeau de bienvenue ===== */}
      <div className="acc-bandeau">
        <div>
          <h1>Bonjour 👋</h1>
          <p className="acc-date">{dateLongue} — semaine {semaine}</p>
        </div>
        <div className="acc-bandeau-etat">
          {stats.aTraiter > 0 ? (
            <button className="acc-alerte-btn" onClick={() => aller("demandes")}>
              🔔 {stats.aTraiter} demande{stats.aTraiter > 1 ? "s" : ""} à rappeler
            </button>
          ) : (
            <span className="acc-etat-ok">✓ Aucune demande en attente</span>
          )}
        </div>
      </div>

      {/* ===== KPI colorés ===== */}
      <div className="acc-kpis">
        <button className="acc-kpi acc-kpi-orange" onClick={() => aller("demandes")}>
          <strong>{stats.aTraiter}</strong>
          <span>à traiter</span>
        </button>
        <button className="acc-kpi acc-kpi-vert" onClick={() => aller("stats")}>
          <strong>{stats.semaine}</strong>
          <span>demandes sur 7 jours</span>
        </button>
        <button className="acc-kpi acc-kpi-bleu" onClick={() => aller("stats")}>
          <strong>{stats.gagnes}</strong>
          <span>clients gagnés</span>
        </button>
        <button className="acc-kpi acc-kpi-ambre" onClick={() => aller("stats")}>
          <strong>{stats.total}</strong>
          <span>demandes au total</span>
        </button>
      </div>

      <div className="acc-grille">
        {/* ===== Tâches de la semaine ===== */}
        <div className="admin-carte acc-taches">
          <div className="acc-taches-tete">
            <h2>Tâches de la semaine</h2>
            <span className="acc-progression">
              <span className="acc-progression-piste">
                <span className="acc-progression-jauge" style={{ width: `${progression}%` }} />
              </span>
              {progression} %
            </span>
          </div>
          <p className="admin-mini">
            Un nouveau programme chaque lundi, pour faire progresser le site et
            la visibilité en continu.
          </p>
          <ul className="acc-liste-taches">
            {taches.map((t) => (
              <li key={t.texte} className={faites.includes(t.texte) ? "faite" : ""}>
                <label>
                  <input
                    type="checkbox"
                    checked={faites.includes(t.texte)}
                    onChange={() => basculer(t.texte)}
                  />
                  <span className="acc-cat" style={{ background: t.couleur }}>
                    {t.categorie}
                  </span>
                  <span className="acc-texte">{t.texte}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== Dernières demandes ===== */}
        <div className="admin-carte">
          <div className="acc-carte-tete">
            <h2>Dernières demandes</h2>
            <button className="acc-lien" onClick={() => aller("demandes")}>
              Tout voir →
            </button>
          </div>
          {stats.dernieres.length === 0 ? (
            <div className="acc-vide">
              <p>📭 Aucune demande pour l&apos;instant.</p>
              <p className="admin-mini">
                Elles apparaîtront ici dès qu&apos;un visiteur remplira un
                formulaire du site.
              </p>
            </div>
          ) : (
            <ul className="acc-demandes">
              {stats.dernieres.map((l) => (
                <li key={l.id} className={`s-bord-${l.statut}`}>
                  <div>
                    <strong>{l.nom}</strong>
                    <span className="admin-mini">
                      {l.nuisible || "—"} · {l.ville || "—"}
                    </span>
                  </div>
                  <a href={`tel:${l.tel.replace(/\s/g, "")}`} className="acc-tel">
                    {l.tel}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ===== Activité 14 jours ===== */}
        <div className="admin-carte">
          <h2>Activité des 14 derniers jours</h2>
          <div className="acc-histo">
            {stats.jours.map((j, i) => (
              <div key={i} className="acc-histo-col" title={`${j.label} : ${j.n} demande(s)`}>
                <span
                  className={`acc-histo-barre${j.n > 0 ? " active" : ""}`}
                  style={{ height: `${Math.max((j.n / maxJour) * 100, 4)}%` }}
                />
                <span className="acc-histo-label">{j.label.slice(0, 2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Répartition par nuisible ===== */}
        <div className="admin-carte">
          <h2>Demandes par nuisible</h2>
          {stats.parNuisible.length ? (
            <Donut donnees={stats.parNuisible} />
          ) : (
            <div className="acc-vide">
              <p>🪤 Pas encore de données.</p>
              <p className="admin-mini">
                Le graphique se remplira avec les premières demandes.
              </p>
            </div>
          )}
        </div>

        {/* ===== Raccourcis ===== */}
        <div className="admin-carte acc-raccourcis">
          <h2>Raccourcis</h2>
          <div className="acc-raccourcis-grille">
            <a href="https://business.google.com" target="_blank" rel="noreferrer">
              🏪 Fiche Google
            </a>
            <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer">
              📈 Search Console
            </a>
            {reglages?.lienAvisGoogle ? (
              <button onClick={() => aller("prospection")}>⭐ Demander un avis</button>
            ) : (
              <button onClick={() => aller("suivi")}>⭐ Configurer le lien d&apos;avis</button>
            )}
            <button onClick={() => aller("site")}>🧰 État du site</button>
            <a href="/" target="_blank" rel="noreferrer">
              🌐 Voir le site
            </a>
            <a href="https://vercel.com/dashboard" target="_blank" rel="noreferrer">
              ⚙️ Hébergement
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

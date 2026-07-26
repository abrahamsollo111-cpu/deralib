"use client";

import { useMemo } from "react";
import type { Lead } from "@/lib/store";

function jourCle(d: Date) {
  return d.toISOString().slice(0, 10);
}

function Barres({
  donnees,
  vide,
}: {
  donnees: { label: string; n: number }[];
  vide: string;
}) {
  if (!donnees.length) return <p className="admin-vide-mini">{vide}</p>;
  const max = Math.max(...donnees.map((d) => d.n)) || 1;
  return (
    <ul className="admin-barres">
      {donnees.map((d) => (
        <li key={d.label}>
          <span className="admin-barre-label">{d.label}</span>
          <span className="admin-barre-piste">
            <span className="admin-barre-jauge" style={{ width: `${(d.n / max) * 100}%` }} />
          </span>
          <span className="admin-barre-valeur">{d.n}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Statistiques({ leads }: { leads: Lead[] }) {
  const stats = useMemo(() => {
    const maintenant = Date.now();
    const j7 = maintenant - 7 * 864e5;
    const j30 = maintenant - 30 * 864e5;

    const parChamp = (champ: keyof Lead) => {
      const m = new Map<string, number>();
      leads.forEach((l) => {
        const v = (l[champ] as string)?.trim() || "Non précisé";
        m.set(v, (m.get(v) || 0) + 1);
      });
      return [...m.entries()]
        .map(([label, n]) => ({ label, n }))
        .sort((a, b) => b.n - a.n)
        .slice(0, 8);
    };

    // 14 derniers jours
    const jours: { label: string; n: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(maintenant - i * 864e5);
      const cle = jourCle(d);
      jours.push({
        label: d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" }),
        n: leads.filter((l) => l.date.slice(0, 10) === cle).length,
      });
    }

    const gagnes = leads.filter((l) => l.statut === "gagne").length;
    const traites = leads.filter((l) => l.statut !== "nouveau").length;

    return {
      total: leads.length,
      semaine: leads.filter((l) => new Date(l.date).getTime() > j7).length,
      mois: leads.filter((l) => new Date(l.date).getTime() > j30).length,
      nouveaux: leads.filter((l) => l.statut === "nouveau").length,
      gagnes,
      tauxConversion: leads.length ? Math.round((gagnes / leads.length) * 100) : 0,
      tauxTraitement: leads.length ? Math.round((traites / leads.length) * 100) : 0,
      parNuisible: parChamp("nuisible"),
      parVille: parChamp("ville"),
      parSource: parChamp("source"),
      parUrgence: parChamp("urgence"),
      jours,
    };
  }, [leads]);

  return (
    <section className="admin-stats">
      <div className="admin-kpis">
        {[
          { l: "Demandes totales", v: stats.total },
          { l: "7 derniers jours", v: stats.semaine },
          { l: "30 derniers jours", v: stats.mois },
          { l: "À traiter", v: stats.nouveaux, alerte: stats.nouveaux > 0 },
          { l: "Clients gagnés", v: stats.gagnes },
          { l: "Taux de conversion", v: `${stats.tauxConversion} %` },
        ].map((k) => (
          <div key={k.l} className={`admin-kpi${k.alerte ? " admin-kpi-alerte" : ""}`}>
            <strong>{k.v}</strong>
            <span>{k.l}</span>
          </div>
        ))}
      </div>

      <div className="admin-grille2">
        <div className="admin-carte">
          <h2>Demandes des 14 derniers jours</h2>
          <div className="admin-histo">
            {stats.jours.map((j, i) => {
              const max = Math.max(...stats.jours.map((x) => x.n)) || 1;
              return (
                <div key={i} className="admin-histo-col" title={`${j.label} : ${j.n}`}>
                  <span
                    className="admin-histo-barre"
                    style={{ height: `${Math.max((j.n / max) * 100, 3)}%` }}
                  />
                  <span className="admin-histo-label">{j.label.slice(0, 2)}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="admin-carte">
          <h2>Par type de nuisible</h2>
          <Barres donnees={stats.parNuisible} vide="Pas encore de données." />
        </div>

        <div className="admin-carte">
          <h2>Par ville / secteur</h2>
          <Barres donnees={stats.parVille} vide="Pas encore de données." />
        </div>

        <div className="admin-carte">
          <h2>Par formulaire d&apos;origine</h2>
          <Barres donnees={stats.parSource} vide="Pas encore de données." />
        </div>

        <div className="admin-carte">
          <h2>Par niveau d&apos;urgence</h2>
          <Barres donnees={stats.parUrgence} vide="Pas encore de données." />
        </div>

        <div className="admin-carte">
          <h2>Suivi commercial</h2>
          <p className="admin-mini">
            {stats.tauxTraitement} % des demandes ont été traitées (statut mis à
            jour). Objectif : rappeler chaque demande dans l&apos;heure — c&apos;est
            le premier facteur de transformation sur les urgences nuisibles.
          </p>
          <p className="admin-mini" style={{ marginTop: 10 }}>
            Pensez à envoyer votre lien d&apos;avis Google après chaque
            intervention réussie (onglet Prospection).
          </p>
        </div>
      </div>

      <p className="admin-note-bas">
        Ces statistiques portent sur les demandes reçues via les formulaires du
        site. Pour l&apos;audience (visiteurs, pages vues, mots-clés), utilisez
        Google Search Console et Google Analytics — voir l&apos;onglet « Suivi
        &amp; balises ».
      </p>
    </section>
  );
}

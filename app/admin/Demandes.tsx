"use client";

import { useMemo, useState } from "react";
import type { Lead } from "@/lib/store";

const STATUTS: { cle: Lead["statut"]; label: string }[] = [
  { cle: "nouveau", label: "Nouveau" },
  { cle: "rappele", label: "Rappelé" },
  { cle: "devis", label: "Devis envoyé" },
  { cle: "gagne", label: "Client gagné" },
  { cle: "perdu", label: "Perdu" },
];

function dateLisible(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function depuis(iso: string) {
  const min = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (min < 1) return "à l'instant";
  if (min < 60) return `il y a ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `il y a ${h} h`;
  const j = Math.floor(h / 24);
  return `il y a ${j} j`;
}

export default function Demandes({
  leads,
  recharger,
}: {
  leads: Lead[];
  recharger: () => void;
}) {
  const [filtre, setFiltre] = useState<"tous" | Lead["statut"]>("tous");
  const [recherche, setRecherche] = useState("");
  const [ouvert, setOuvert] = useState<string | null>(null);

  const visibles = useMemo(() => {
    const q = recherche.toLowerCase().trim();
    return leads.filter((l) => {
      if (filtre !== "tous" && l.statut !== filtre) return false;
      if (!q) return true;
      return [l.nom, l.tel, l.ville, l.nuisible, l.message]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [leads, filtre, recherche]);

  async function changerStatut(id: string, statut: Lead["statut"]) {
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, statut }),
    });
    recharger();
  }

  async function enregistrerNote(id: string, note: string) {
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, note }),
    });
    recharger();
  }

  async function supprimer(id: string) {
    if (!confirm("Supprimer définitivement cette demande ?")) return;
    await fetch("/api/admin/leads", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    recharger();
  }

  function exporterCsv() {
    const entetes = [
      "Date",
      "Nom",
      "Téléphone",
      "Ville",
      "Nuisible",
      "Lieu",
      "Urgence",
      "Message",
      "Source",
      "Statut",
      "Note",
    ];
    const lignes = visibles.map((l) =>
      [
        dateLisible(l.date),
        l.nom,
        l.tel,
        l.ville,
        l.nuisible,
        l.lieu,
        l.urgence,
        l.message.replace(/\n/g, " "),
        l.source,
        l.statut,
        l.note,
      ]
        .map((c) => `"${String(c).replace(/"/g, '""')}"`)
        .join(";")
    );
    const csv = "﻿" + [entetes.join(";"), ...lignes].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `demandes-deralib-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section>
      <div className="admin-actions">
        <div className="admin-filtres">
          <button
            className={filtre === "tous" ? "actif" : ""}
            onClick={() => setFiltre("tous")}
          >
            Toutes ({leads.length})
          </button>
          {STATUTS.map((s) => {
            const n = leads.filter((l) => l.statut === s.cle).length;
            return (
              <button
                key={s.cle}
                className={filtre === s.cle ? "actif" : ""}
                onClick={() => setFiltre(s.cle)}
              >
                {s.label} ({n})
              </button>
            );
          })}
        </div>
        <div className="admin-actions-droite">
          <input
            type="search"
            placeholder="Rechercher un nom, une ville…"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
          />
          <button onClick={recharger} className="admin-btn-sec">
            Actualiser
          </button>
          <button onClick={exporterCsv} className="admin-btn-sec" disabled={!visibles.length}>
            Export CSV
          </button>
        </div>
      </div>

      {visibles.length === 0 ? (
        <p className="admin-vide">
          {leads.length === 0
            ? "Aucune demande pour l'instant. Elles apparaîtront ici dès qu'un visiteur remplira un formulaire du site."
            : "Aucune demande ne correspond à ce filtre."}
        </p>
      ) : (
        <div className="admin-liste">
          {visibles.map((l) => (
            <article
              key={l.id}
              className={`admin-lead statut-${l.statut}${l.urgence.toLowerCase().includes("plus vite") ? " urgent" : ""}`}
            >
              <div className="admin-lead-tete" onClick={() => setOuvert(ouvert === l.id ? null : l.id)}>
                <div className="admin-lead-principal">
                  <strong>{l.nom}</strong>
                  <a href={`tel:${l.tel.replace(/\s/g, "")}`} className="admin-tel" onClick={(e) => e.stopPropagation()}>
                    {l.tel}
                  </a>
                  <span className="admin-lead-meta">
                    {l.nuisible || "—"} · {l.ville || "—"}
                  </span>
                </div>
                <div className="admin-lead-droite">
                  {l.urgence && <span className="admin-tag">{l.urgence}</span>}
                  <span className="admin-lead-date" title={dateLisible(l.date)}>
                    {depuis(l.date)}
                  </span>
                  <span className={`admin-statut s-${l.statut}`}>
                    {STATUTS.find((s) => s.cle === l.statut)?.label}
                  </span>
                </div>
              </div>

              {ouvert === l.id && (
                <div className="admin-lead-detail">
                  <dl>
                    <div>
                      <dt>Reçue le</dt>
                      <dd>{dateLisible(l.date)}</dd>
                    </div>
                    <div>
                      <dt>Type de lieu</dt>
                      <dd>{l.lieu || "—"}</dd>
                    </div>
                    <div>
                      <dt>Origine</dt>
                      <dd>
                        {l.source}
                        {l.page ? ` · ${l.page}` : ""}
                      </dd>
                    </div>
                  </dl>
                  {l.message && (
                    <p className="admin-lead-message">« {l.message} »</p>
                  )}

                  <div className="admin-lead-outils">
                    <select
                      value={l.statut}
                      onChange={(e) => changerStatut(l.id, e.target.value as Lead["statut"])}
                    >
                      {STATUTS.map((s) => (
                        <option key={s.cle} value={s.cle}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    <a href={`tel:${l.tel.replace(/\s/g, "")}`} className="btn btn-primary admin-btn-appel">
                      Appeler
                    </a>
                    <button className="admin-btn-danger" onClick={() => supprimer(l.id)}>
                      Supprimer
                    </button>
                  </div>

                  <textarea
                    className="admin-note"
                    placeholder="Note interne (diagnostic, prix annoncé, date d'intervention…)"
                    defaultValue={l.note}
                    onBlur={(e) => {
                      if (e.target.value !== l.note) enregistrerNote(l.id, e.target.value);
                    }}
                  />
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

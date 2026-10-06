"use client";

import { useMemo, useState } from "react";
import type { Lead } from "@/lib/store";

/**
 * Candidatures de techniciens (page /recrutement).
 * Ce sont des leads avec source "candidature" ; les champs sont réutilisés :
 *   nuisible → domaine d'activité · ville → zones IDF ·
 *   lieu → société du candidat · urgence → Certibiocide
 */
const STATUTS: { cle: Lead["statut"]; label: string }[] = [
  { cle: "nouveau", label: "Nouvelle" },
  { cle: "rappele", label: "Contacté" },
  { cle: "devis", label: "Entretien prévu" },
  { cle: "gagne", label: "Retenu" },
  { cle: "perdu", label: "Écarté" },
];

function dateLisible(iso: string) {
  return new Date(iso).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Candidatures({
  leads,
  recharger,
}: {
  leads: Lead[];
  recharger: () => void;
}) {
  const [filtre, setFiltre] = useState<"tous" | Lead["statut"]>("tous");
  const [ouvert, setOuvert] = useState<string | null>(null);

  const visibles = useMemo(
    () => leads.filter((l) => filtre === "tous" || l.statut === filtre),
    [leads, filtre]
  );

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
    if (!confirm("Supprimer définitivement cette candidature ?")) return;
    await fetch("/api/admin/leads", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    recharger();
  }

  return (
    <section>
      <div className="admin-actions">
        <div className="admin-filtres">
          <button className={filtre === "tous" ? "actif" : ""} onClick={() => setFiltre("tous")}>
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
          <button onClick={recharger} className="admin-btn-sec">
            Actualiser
          </button>
        </div>
      </div>

      {visibles.length === 0 ? (
        <p className="admin-vide">
          {leads.length === 0
            ? "Aucune candidature pour l'instant. Elles arriveront ici depuis la page « Nous recrutons » du site."
            : "Aucune candidature ne correspond à ce filtre."}
        </p>
      ) : (
        <div className="admin-liste">
          {visibles.map((l) => (
            <article key={l.id} className={`admin-lead statut-${l.statut}`}>
              <div
                className="admin-lead-tete"
                onClick={() => setOuvert(ouvert === l.id ? null : l.id)}
              >
                <div className="admin-lead-principal">
                  <strong>{l.nom}</strong>
                  <a
                    href={`tel:${l.tel.replace(/\s/g, "")}`}
                    className="admin-tel"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {l.tel}
                  </a>
                  <span className="admin-lead-meta">
                    {l.nuisible || "—"} · zones : {l.ville || "—"}
                  </span>
                </div>
                <div className="admin-lead-droite">
                  {l.urgence && (
                    <span
                      className="admin-tag"
                      style={
                        l.urgence.toLowerCase().includes("oui")
                          ? { background: "#e6f9f4", color: "#0d6a52" }
                          : undefined
                      }
                    >
                      {l.urgence}
                    </span>
                  )}
                  <span className="admin-lead-date">{dateLisible(l.date)}</span>
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
                      <dt>Société</dt>
                      <dd>{l.lieu || "Indépendant / non précisé"}</dd>
                    </div>
                    <div>
                      <dt>Zones</dt>
                      <dd>{l.ville || "—"}</dd>
                    </div>
                  </dl>
                  {l.message && <p className="admin-lead-message">{l.message}</p>}

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
                    <a
                      href={`tel:${l.tel.replace(/\s/g, "")}`}
                      className="btn btn-primary admin-btn-appel"
                    >
                      Appeler
                    </a>
                    <button className="admin-btn-danger" onClick={() => supprimer(l.id)}>
                      Supprimer
                    </button>
                  </div>

                  <textarea
                    className="admin-note"
                    placeholder="Note interne (matériel, impression téléphone, conditions discutées…)"
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

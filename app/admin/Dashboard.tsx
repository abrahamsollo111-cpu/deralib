"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Lead, Reglages } from "@/lib/store";
import Demandes from "./Demandes";
import Statistiques from "./Statistiques";
import Suivi from "./Suivi";
import SiteInfos from "./SiteInfos";
import Prospection from "./Prospection";

const ONGLETS = [
  { cle: "demandes", label: "Demandes" },
  { cle: "stats", label: "Statistiques" },
  { cle: "suivi", label: "Suivi & balises" },
  { cle: "site", label: "Site" },
  { cle: "prospection", label: "Prospection" },
] as const;

type Onglet = (typeof ONGLETS)[number]["cle"];

export default function Dashboard({
  stockagePersistant,
}: {
  stockagePersistant: boolean;
}) {
  const [onglet, setOnglet] = useState<Onglet>("demandes");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [reglages, setReglages] = useState<Reglages | null>(null);
  const [chargement, setChargement] = useState(true);

  const chargerLeads = useCallback(async () => {
    const res = await fetch("/api/admin/leads", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      setLeads(data.leads as Lead[]);
    }
    setChargement(false);
  }, []);

  useEffect(() => {
    chargerLeads();
    fetch("/api/admin/reglages", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setReglages(d.reglages as Reglages));
  }, [chargerLeads]);

  const nouveaux = useMemo(
    () => leads.filter((l) => l.statut === "nouveau").length,
    [leads]
  );

  async function deconnexion() {
    await fetch("/api/admin/login", { method: "DELETE" });
    window.location.reload();
  }

  return (
    <div className="admin">
      <header className="admin-barre">
        <div className="admin-barre-gauche">
          <strong>Deralib</strong>
          <span className="admin-badge-env">Administration</span>
        </div>
        <nav className="admin-onglets">
          {ONGLETS.map((o) => (
            <button
              key={o.cle}
              className={onglet === o.cle ? "actif" : ""}
              onClick={() => setOnglet(o.cle)}
            >
              {o.label}
              {o.cle === "demandes" && nouveaux > 0 && (
                <span className="admin-pastille">{nouveaux}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="admin-barre-droite">
          <a href="/" target="_blank" rel="noreferrer">
            Voir le site ↗
          </a>
          <button onClick={deconnexion} className="admin-lien-bouton">
            Déconnexion
          </button>
        </div>
      </header>

      {!stockagePersistant && (
        <div className="admin-alerte admin-alerte-large">
          <strong>⚠️ Stockage temporaire.</strong> Les demandes ne sont pas
          encore enregistrées durablement : elles seront perdues au prochain
          déploiement. Ajoutez les variables{" "}
          <code>UPSTASH_REDIS_REST_URL</code> et{" "}
          <code>UPSTASH_REDIS_REST_TOKEN</code> dans Vercel (gratuit, 5
          minutes — voir l&apos;onglet « Site » ou le fichier ADMIN.md).
        </div>
      )}

      <main className="admin-contenu">
        {chargement && onglet === "demandes" ? (
          <p className="admin-vide">Chargement…</p>
        ) : (
          <>
            {onglet === "demandes" && (
              <Demandes leads={leads} recharger={chargerLeads} />
            )}
            {onglet === "stats" && <Statistiques leads={leads} />}
            {onglet === "suivi" && (
              <Suivi reglages={reglages} setReglages={setReglages} />
            )}
            {onglet === "site" && (
              <SiteInfos
                stockagePersistant={stockagePersistant}
                nbLeads={leads.length}
              />
            )}
            {onglet === "prospection" && (
              <Prospection lienAvis={reglages?.lienAvisGoogle || ""} />
            )}
          </>
        )}
      </main>
    </div>
  );
}

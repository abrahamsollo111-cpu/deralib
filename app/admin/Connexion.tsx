"use client";

import { useState } from "react";
import Image from "next/image";

export default function Connexion({ configure }: { configure: boolean }) {
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [envoi, setEnvoi] = useState(false);

  async function connecter(e: React.FormEvent) {
    e.preventDefault();
    setEnvoi(true);
    setErreur("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ motDePasse }),
    });
    const data = await res.json();
    if (data.ok) {
      window.location.reload();
    } else {
      setErreur(data.erreur || "Connexion impossible.");
      setEnvoi(false);
    }
  }

  return (
    <div className="admin-login">
      <form className="admin-login-carte" onSubmit={connecter}>
        <Image
          src="/images/logo-deralib.png"
          alt=""
          width={506}
          height={512}
          style={{ width: 52, height: "auto", margin: "0 auto 16px" }}
        />
        <h1>Administration Deralib</h1>
        <p className="admin-login-sous">Espace réservé au dirigeant</p>

        {!configure && (
          <div className="admin-alerte">
            <strong>Accès non configuré.</strong> Ajoutez la variable
            d&apos;environnement <code>ADMIN_PASSWORD</code> dans Vercel puis
            redéployez. Procédure détaillée dans le fichier ADMIN.md.
          </div>
        )}

        <label htmlFor="mdp">Mot de passe</label>
        <input
          id="mdp"
          type="password"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          autoFocus
          autoComplete="current-password"
          disabled={!configure}
        />
        {erreur && <p className="admin-erreur">{erreur}</p>}
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%", marginTop: 16 }}
          disabled={envoi || !configure}
        >
          {envoi ? "Connexion…" : "Se connecter"}
        </button>
        <a href="/" className="admin-login-retour">
          ← Retour au site
        </a>
      </form>
    </div>
  );
}

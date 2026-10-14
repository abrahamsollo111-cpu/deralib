"use client";

import { useEffect, useState } from "react";

/**
 * Lien « Gestion des cookies » du pied de page : rouvre le bandeau de
 * consentement pour modifier ou retirer son choix. N'apparaît que si un
 * outil de suivi est configuré (sinon il n'y a rien à gérer).
 */
export default function BoutonCookies() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    // le suivi peut s'activer juste après ce composant (ordre de montage)
    const maj = () => setVisible(document.documentElement.dataset.suivi === "1");
    maj();
    window.addEventListener("deralib:suivi-actif", maj);
    return () => window.removeEventListener("deralib:suivi-actif", maj);
  }, []);
  if (!visible) return null;
  return (
    <button
      type="button"
      className="footer-cookies"
      onClick={() => window.dispatchEvent(new Event("deralib:cookies"))}
    >
      Gestion des cookies
    </button>
  );
}

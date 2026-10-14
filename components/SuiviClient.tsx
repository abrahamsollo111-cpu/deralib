"use client";

import { useCallback, useEffect, useState } from "react";
import { signalerConversion, type TypeConversion } from "@/lib/conversions";

/**
 * Consentement + suivi des conversions.
 *
 * - Aucun script Google ou Meta n'est chargé avant l'accord du visiteur
 *   (exigence CNIL) ; le mode consentement v2 de Google est ensuite
 *   renseigné à « accordé ».
 * - Le choix est conservé 6 mois, puis redemandé (recommandation CNIL).
 * - Clics sur un numéro (tel:) ou sur WhatsApp : conversion envoyée.
 *   Les formulaires appellent signalerConversion() eux-mêmes.
 */

const CLE = "deralib-consentement";
const DUREE = 1000 * 60 * 60 * 24 * 182; // ≈ 6 mois

type Choix = "accepte" | "refuse";

function lireChoix(): Choix | null {
  try {
    const brut = window.localStorage.getItem(CLE);
    if (!brut) return null;
    const { choix, date } = JSON.parse(brut) as { choix: Choix; date: number };
    if (Date.now() - date > DUREE) return null;
    return choix;
  } catch {
    return null;
  }
}

function ecrireChoix(choix: Choix) {
  try {
    window.localStorage.setItem(CLE, JSON.stringify({ choix, date: Date.now() }));
  } catch {
    /* navigation privée : le bandeau sera simplement redemandé */
  }
}

let charge = false;

function chargerScripts(gaId: string, adsId: string, metaPixel: string) {
  if (charge) return;
  charge = true;
  const premier = gaId || adsId;
  if (premier) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("consent", "default", {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
    });
    window.gtag("js", new Date());
    if (gaId) window.gtag("config", gaId);
    if (adsId) window.gtag("config", adsId);
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${premier}`;
    document.head.appendChild(s);
  }
  if (metaPixel) {
    /* eslint-disable */
    (function (f: any, b: Document, e: string, v: string) {
      if (f.fbq) return;
      const n: any = (f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      });
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      const t = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = v;
      b.head.appendChild(t);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */
    window.fbq!("init", metaPixel);
    window.fbq!("track", "PageView");
  }
}

export default function SuiviClient({
  gaId,
  adsId,
  metaPixel,
  conversions,
}: {
  gaId: string;
  adsId: string;
  metaPixel: string;
  conversions: Partial<Record<TypeConversion, string>>;
}) {
  const [bandeau, setBandeau] = useState(false);

  const accepter = useCallback(() => {
    ecrireChoix("accepte");
    setBandeau(false);
    chargerScripts(gaId, adsId, metaPixel);
  }, [gaId, adsId, metaPixel]);

  const refuser = useCallback(() => {
    ecrireChoix("refuse");
    setBandeau(false);
    // retrait d'un accord donné plus tôt : on recharge sans les scripts
    if (charge) window.location.reload();
  }, []);

  useEffect(() => {
    // le tableau de bord n'est jamais suivi
    if (window.location.pathname.startsWith("/admin")) return;

    window.__deralibConv = conversions;
    document.documentElement.dataset.suivi = "1";
    window.dispatchEvent(new Event("deralib:suivi-actif"));

    const choix = lireChoix();
    if (choix === "accepte") chargerScripts(gaId, adsId, metaPixel);
    else if (choix === null) setBandeau(true);

    // le lien « Gestion des cookies » du pied de page rouvre le bandeau
    const rouvrir = () => setBandeau(true);
    window.addEventListener("deralib:cookies", rouvrir);

    // clics sur un numéro de téléphone ou sur WhatsApp
    const surClic = (e: MouseEvent) => {
      const lien = (e.target as HTMLElement | null)?.closest?.("a");
      const href = lien?.getAttribute("href") || "";
      if (href.startsWith("tel:")) signalerConversion("appel");
      else if (/wa\.me|whatsapp/i.test(href)) signalerConversion("whatsapp");
    };
    document.addEventListener("click", surClic, { capture: true });

    return () => {
      window.removeEventListener("deralib:cookies", rouvrir);
      document.removeEventListener("click", surClic, { capture: true });
    };
  }, [gaId, adsId, metaPixel, conversions]);

  if (!bandeau) return null;

  return (
    <div className="consentement" role="dialog" aria-live="polite" aria-label="Cookies">
      <p>
        <strong>Cookies de mesure.</strong> Avec votre accord, nous utilisons
        des cookies Google pour mesurer l&apos;efficacité de nos annonces et la
        fréquentation du site. Aucun cookie n&apos;est déposé si vous refusez.{" "}
        <a href="/politique-de-confidentialite">En savoir plus</a>
      </p>
      <div className="consentement-actions">
        <button type="button" className="btn btn-marine" onClick={refuser}>
          Refuser
        </button>
        <button type="button" className="btn btn-marine" onClick={accepter}>
          Accepter
        </button>
      </div>
    </div>
  );
}

/**
 * Envoi des conversions (Google Ads, Google Analytics 4, Meta) côté
 * navigateur. Ne fait rien tant que le visiteur n'a pas accepté les
 * cookies : les scripts publicitaires ne sont chargés qu'après son accord
 * (voir components/SuiviClient.tsx).
 */

export type TypeConversion = "formulaire" | "appel" | "whatsapp";

type Fonction = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Fonction;
    fbq?: Fonction;
    dataLayer?: unknown[];
    // « AW-123/libellé » par type de conversion, renseigné depuis /admin
    __deralibConv?: Partial<Record<TypeConversion, string>>;
  }
}

const EVENEMENT_GA: Record<TypeConversion, string> = {
  formulaire: "generate_lead",
  appel: "click_to_call",
  whatsapp: "click_whatsapp",
};

export function signalerConversion(type: TypeConversion, details: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  // les clics depuis le tableau de bord (rappel des clients) ne comptent pas
  if (window.location.pathname.startsWith("/admin")) return;

  if (window.gtag) {
    const sendTo = window.__deralibConv?.[type];
    if (sendTo) window.gtag("event", "conversion", { send_to: sendTo });
    window.gtag("event", EVENEMENT_GA[type], { page: window.location.pathname, ...details });
  }
  if (window.fbq) window.fbq("track", type === "formulaire" ? "Lead" : "Contact");
}

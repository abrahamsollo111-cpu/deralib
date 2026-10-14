import { lireReglages } from "@/lib/store";
import SuiviClient from "./SuiviClient";

/**
 * Balises de vérification + suivi configuré depuis /admin (onglet
 * « Suivi & balises »). Tant qu'aucun identifiant n'est renseigné, rien
 * n'est chargé et aucun bandeau n'apparaît. Dès qu'un identifiant existe,
 * les scripts Google / Meta ne se chargent qu'après l'accord du visiteur
 * (bandeau de consentement, voir SuiviClient).
 *
 * La lecture est mise en cache 5 minutes : les pages restent servies
 * statiquement, et une modification est visible en quelques minutes.
 */
export default async function Tracking() {
  const r = await lireReglages(300);
  const avecSuivi = Boolean(r.gaId || r.adsId || r.metaPixel);
  const envoi = (libelle: string) => (r.adsId && libelle ? `${r.adsId}/${libelle}` : "");

  return (
    <>
      {r.verifGoogle && (
        <meta name="google-site-verification" content={r.verifGoogle} />
      )}
      {r.verifBing && <meta name="msvalidate.01" content={r.verifBing} />}

      {avecSuivi && (
        <SuiviClient
          gaId={r.gaId}
          adsId={r.adsId}
          metaPixel={r.metaPixel}
          conversions={{
            formulaire: envoi(r.adsLabel),
            appel: envoi(r.adsLabelAppel),
            whatsapp: envoi(r.adsLabelWhatsapp || r.adsLabelAppel),
          }}
        />
      )}
    </>
  );
}

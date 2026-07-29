import { IconPhone, IconWhatsApp } from "./Icons";
import { site } from "@/lib/config";

/**
 * Barre d'action fixe en bas d'écran, mobile uniquement (≤ 900 px).
 * Un visiteur en urgence a toujours les deux gestes sous le pouce :
 * appeler, ou envoyer une photo du problème sur WhatsApp.
 * Masquée sur /admin (via body:has(.admin-page) dans globals.css).
 */
export default function BarreAppelMobile() {
  return (
    <div className="barre-appel" role="complementary" aria-label="Nous contacter">
      <a href={site.telephoneHref} className="barre-appel-tel">
        <IconPhone size={17} /> Appeler
      </a>
      <a
        href={site.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="barre-appel-wa"
      >
        <IconWhatsApp size={17} /> WhatsApp
      </a>
    </div>
  );
}

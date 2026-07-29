import { IconCheck } from "./Icons";

/**
 * Micro-réassurance affichée sous les boutons d'appel : lève la peur
 * du « combien ça va me coûter ? » au moment exact de la décision.
 */
export default function CtaRassure({ clair = false }: { clair?: boolean }) {
  return (
    <p className={`cta-rassure${clair ? " cta-rassure-clair" : ""}`}>
      <IconCheck size={14} /> Prix confirmé avant intervention — devis gratuit
    </p>
  );
}

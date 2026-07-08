import { IconShield, IconClock, IconTeam, IconDoc } from "./Icons";
import { site } from "@/lib/config";

// Carte de réassurance flottante, à cheval sur le bas du hero
export default function Reassurance() {
  const items = [
    {
      icon: <IconShield />,
      tile: "tile-bleu",
      strong: `Certifiés ${site.certification}`,
      sub: "Réglementation biocides respectée",
    },
    {
      icon: <IconClock />,
      tile: "tile-cyan",
      strong: "Intervention rapide",
      sub: `Partout en ${site.zone}`,
    },
    {
      icon: <IconTeam />,
      tile: "tile-indigo",
      strong: "Techniciens salariés",
      sub: "Jamais de sous-traitance",
    },
    {
      icon: <IconDoc />,
      tile: "tile-teal",
      strong: "Devis gratuit",
      sub: "Prix confirmé avant intervention",
    },
  ];
  return (
    <div className="container reassure-wrap">
      <div className="reassure-card" data-stagger>
        {items.map((it) => (
          <div key={it.strong} className="reassure-item" data-reveal>
            <span className={`reassure-icon ${it.tile}`}>{it.icon}</span>
            <div>
              <strong>{it.strong}</strong>
              <span>{it.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

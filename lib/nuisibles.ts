// Constantes partagées client/serveur (aucun accès disque ici)

// Ordre d'affichage des 4 familles de nuisibles dans le menu et le maillage
export const NUISIBLES_SLUGS = [
  "deratisation",
  "punaises-de-lit",
  "cafards",
  "guepes-frelons",
] as const;

export const NUISIBLES_LABELS: Record<string, string> = {
  deratisation: "Dératisation",
  "punaises-de-lit": "Punaises de lit",
  cafards: "Cafards",
  "guepes-frelons": "Guêpes & frelons",
};

// Couleur de la tuile d'icône associée à chaque nuisible
export const NUISIBLES_TILES: Record<string, string> = {
  deratisation: "tile-bleu",
  "punaises-de-lit": "tile-indigo",
  cafards: "tile-cyan",
  "guepes-frelons": "tile-teal",
};

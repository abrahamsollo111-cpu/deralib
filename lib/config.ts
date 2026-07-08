// ============================================================
// CONFIGURATION CENTRALE DU SITE
// Toutes les infos de l'entreprise sont ici, à un seul endroit.
// Les valeurs marquées "À COMPLÉTER" sont provisoires :
// les remplacer ici met à jour tout le site d'un coup.
// ============================================================

export const site = {
  // Marque (issue de la charte graphique)
  marque: "Deralib",
  slogan: "Experts anti-nuisibles",

  // Société — À COMPLÉTER avec les vraies informations légales
  raisonSociale: "Deralib [forme juridique à compléter]",
  siren: "000 000 000", // À COMPLÉTER
  adresse: "Adresse à compléter, 75000 Paris", // À COMPLÉTER
  dirigeant: "Prénom Nom", // À COMPLÉTER (nom du dirigeant expert)
  dirigeantTitre: "Dirigeant fondateur, expert certifié en lutte anti-nuisibles", // À COMPLÉTER (diplômes)

  // Contact — À COMPLÉTER
  telephone: "01 23 45 67 89", // À COMPLÉTER : numéro unique de l'entreprise
  telephoneHref: "tel:+33123456789", // À COMPLÉTER : même numéro au format international
  email: "contact@deralib.com", // À COMPLÉTER

  // Web
  url: "https://www.deralib.com",

  // Zone d'intervention
  zone: "Île-de-France",
  horaires: "7j/7 — 8h à 20h", // À COMPLÉTER

  // Preuves de confiance (ne pas afficher de nombre de techniciens sur le site)
  certification: "Certibiocide",
} as const;

export const couleurs = {
  marine: "#0D2440",
  bleu: "#1577DB",
  azur: "#EEF5FC",
} as const;

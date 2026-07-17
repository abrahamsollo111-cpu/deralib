// ============================================================
// CONFIGURATION CENTRALE DU SITE
// Toutes les infos de l'entreprise sont ici, à un seul endroit.
//
// ⚠️⚠️⚠️ TODO AVANT MISE EN LIGNE — DONNÉES RÉELLES MANQUANTES ⚠️⚠️⚠️
// Chaque champ marqué « TODO » ci-dessous contient une valeur
// provisoire. Les remplacer ici met à jour TOUT le site d'un coup
// (header, footer, pages, données structurées, mentions légales).
// Le NAP (nom, adresse, téléphone) doit être identique au caractère
// près à celui de la fiche Google Business Profile.
// ============================================================

export const site = {
  // Marque
  marque: "Deralib",
  slogan: "Dératisation & anti-nuisibles",

  // ⚠️ TODO : raison sociale complète (ex. « Deralib SARL »)
  raisonSociale: "Deralib [TODO : forme juridique]",
  // ⚠️ TODO : SIRET réel (14 chiffres) — affiché au footer et aux mentions légales
  siret: "TODO — SIRET à compléter",
  // ⚠️ TODO : adresse réelle du siège — identique à la fiche Google Business Profile
  adresse: "TODO — adresse du siège à compléter",
  codePostal: "TODO",
  villeSiege: "TODO",
  // ⚠️ TODO : année de création réelle de la société ACTUELLE (pour le
  // footer et les mentions légales). Ne pas confondre avec l'expérience.
  anneeCreation: "TODO",
  // Expérience personnelle du dirigeant dans le métier (fait réel fourni
  // par le client). On affiche « 20 ans de métier », jamais « entreprise
  // fondée il y a 20 ans » : la société actuelle est récente.
  anneesMetier: "20",
  // ⚠️ TODO : prénom et nom réels du dirigeant
  dirigeant: "TODO — Prénom Nom du dirigeant",
  dirigeantTitre: "Dirigeant fondateur", // TODO : compléter avec diplômes/certifications réels
  // ⚠️ TODO : nombre réel de techniciens (utilisé sur la page À propos)
  nbTechniciens: "TODO",

  // Contact
  // ⚠️ TODO : numéro réel de l'entreprise — remplace le placeholder partout
  telephone: "01 23 45 67 89",
  // ⚠️ TODO : même numéro au format international (tel:+33...)
  telephoneHref: "tel:+33123456789",
  // ⚠️ TODO : adresse email réelle de contact
  email: "contact@deralib.com",

  // Web
  url: "https://www.deralib.com",

  // Zone d'intervention
  zone: "Île-de-France",
  horaires: "7j/7 — 8h à 20h", // TODO : confirmer les horaires réels
  // Horaires au format schema.org (openingHoursSpecification)
  horairesSchema: { jours: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], ouverture: "08:00", fermeture: "20:00" },

  // Assurance et certification
  certification: "Certibiocide",
  // ⚠️ TODO : numéro de certificat Certibiocide (ne rien afficher tant qu'il manque)
  certibiocideNumero: "",
  // ⚠️ TODO : assureur RC pro + n° de contrat (ne rien afficher tant qu'il manque)
  rcProAssureur: "",
  rcProContrat: "",
} as const;

// Les 8 départements d'Île-de-France couverts (utilisés pour le
// maillage interne et le champ areaServed des données structurées)
export const DEPARTEMENTS = [
  { slug: "paris", nom: "Paris", code: "75" },
  { slug: "hauts-de-seine", nom: "Hauts-de-Seine", code: "92" },
  { slug: "seine-saint-denis", nom: "Seine-Saint-Denis", code: "93" },
  { slug: "val-de-marne", nom: "Val-de-Marne", code: "94" },
  { slug: "seine-et-marne", nom: "Seine-et-Marne", code: "77" },
  { slug: "yvelines", nom: "Yvelines", code: "78" },
  { slug: "essonne", nom: "Essonne", code: "91" },
  { slug: "val-d-oise", nom: "Val-d'Oise", code: "95" },
] as const;

export const couleurs = {
  marine: "#0D2440",
  bleu: "#1577DB",
  azur: "#EEF5FC",
} as const;

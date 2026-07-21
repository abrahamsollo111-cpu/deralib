import fs from "fs";
import path from "path";

export type Signe = { titre: string; detail: string };
export type Etape = { etape: string; detail: string };
export type Prix = { prestation: string; fourchette: string; note: string };
export type FaqItem = { q: string; r: string };

export type Nuisible = {
  nom: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  h1: string;
  intro: string;
  signes: Signe[];
  comprendre_espece: string;
  plan_action: Etape[];
  gestes_urgence: string[];
  // Sections longues (déroulé détaillé, méthodes, cas particuliers…)
  sections_longues?: { titre: string; paragraphes: string[] }[];
  prix: Prix[];
  prix_note: string;
  faq: FaqItem[];
};

export type Section = { titre: string; paragraphes: string[] };

// Fiche département (75, 77, 78, 91, 92, 93, 94, 95) — contenu local
// unique par département, rendu par app/deratisation/[ville]/page.tsx
export type Ville = {
  nom: string;
  slug: string;
  departement: string;
  meta_title: string;
  meta_description: string;
  h1: string;
  intro: string;
  villes_principales: string[];
  sections: Section[];
  signalement: {
    espace_public: string;
    logement_insalubre: string;
    prive: string;
  };
  delais: string;
  faq_locale: FaqItem[];
};

// Article de la section /conseils
export type Article = {
  slug: string;
  titre: string;
  meta_title: string;
  meta_description: string;
  h1: string;
  date: string; // AAAA-MM-JJ
  extrait: string;
  service: string; // slug de la page service liée
  sections: Section[];
  faq: FaqItem[];
  cta_texte: string;
};

const contentDir = path.join(process.cwd(), "content");

export function getNuisible(slug: string): Nuisible {
  const raw = fs.readFileSync(
    path.join(contentDir, "nuisibles", `${slug}.json`),
    "utf-8"
  );
  return JSON.parse(raw) as Nuisible;
}

export function getAllNuisibles(): Nuisible[] {
  const dir = path.join(contentDir, "nuisibles");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => getNuisible(f.replace(/\.json$/, "")));
}

export function getVille(slug: string): Ville {
  const raw = fs.readFileSync(
    path.join(contentDir, "villes", `${slug}.json`),
    "utf-8"
  );
  return JSON.parse(raw) as Ville;
}

// Ordre d'affichage : Paris puis petite couronne puis grande couronne
const ORDRE_DEPARTEMENTS = ["75", "92", "93", "94", "77", "78", "91", "95"];

export function getAllVilles(): Ville[] {
  const dir = path.join(contentDir, "villes");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => getVille(f.replace(/\.json$/, "")))
    .sort(
      (a, b) =>
        ORDRE_DEPARTEMENTS.indexOf(a.departement) -
        ORDRE_DEPARTEMENTS.indexOf(b.departement)
    );
}

export function getArticle(slug: string): Article {
  const raw = fs.readFileSync(
    path.join(contentDir, "conseils", `${slug}.json`),
    "utf-8"
  );
  return JSON.parse(raw) as Article;
}

export function getAllArticles(): Article[] {
  const dir = path.join(contentDir, "conseils");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => getArticle(f.replace(/\.json$/, "")))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Réexport des constantes partagées (voir lib/nuisibles.ts)
export { NUISIBLES_SLUGS, NUISIBLES_LABELS } from "./nuisibles";

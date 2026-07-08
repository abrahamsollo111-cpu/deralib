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
  prix: Prix[];
  prix_note: string;
  faq: FaqItem[];
};

export type Ville = {
  nom: string;
  slug: string;
  departement: string;
  quartiers: string[];
  contexte_local: string;
  signalement: {
    espace_public: string;
    logement_insalubre: string;
    prive: string;
  };
  prix_locaux: { note: string; renvoi: string };
  faq_locale: FaqItem[];
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

export function getAllVilles(): Ville[] {
  const dir = path.join(contentDir, "villes");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => getVille(f.replace(/\.json$/, "")));
}

// Réexport des constantes partagées (voir lib/nuisibles.ts)
export { NUISIBLES_SLUGS, NUISIBLES_LABELS } from "./nuisibles";

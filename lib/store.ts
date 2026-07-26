import fs from "fs";
import path from "path";
import os from "os";

/**
 * Stockage des demandes (leads) et des réglages du dashboard.
 *
 * Deux modes, choisis automatiquement :
 *  1. Upstash Redis (recommandé, gratuit) si les variables
 *     UPSTASH_REDIS_REST_URL et UPSTASH_REDIS_REST_TOKEN existent.
 *     → persistance réelle, survit aux déploiements.
 *  2. Fichier local, sinon. Pratique en développement, mais sur Vercel
 *     le disque est éphémère : les demandes seraient perdues au
 *     redéploiement. Voir ADMIN.md pour la configuration.
 */

export type Lead = {
  id: string;
  date: string; // ISO
  nom: string;
  tel: string;
  ville: string;
  nuisible: string;
  lieu: string;
  urgence: string;
  message: string;
  source: string; // "devis-express" | "formulaire-devis" | "contact"
  page: string; // page d'origine
  statut: "nouveau" | "rappele" | "devis" | "gagne" | "perdu";
  note: string;
};

export type Reglages = {
  gaId: string; // G-XXXXXXX (Google Analytics 4)
  adsId: string; // AW-XXXXXXX (Google Ads)
  adsLabel: string; // étiquette de conversion
  metaPixel: string; // Meta / Facebook Pixel
  verifGoogle: string; // contenu de la balise google-site-verification
  verifBing: string;
  lienAvisGoogle: string; // lien court g.page/r/.../review
  notes: string;
};

const REGLAGES_VIDE: Reglages = {
  gaId: "",
  adsId: "",
  adsLabel: "",
  metaPixel: "",
  verifGoogle: "",
  verifBing: "",
  lienAvisGoogle: "",
  notes: "",
};

const CLE_LEADS = "deralib:leads";
const CLE_REGLAGES = "deralib:reglages";

const urlUpstash = process.env.UPSTASH_REDIS_REST_URL;
const tokenUpstash = process.env.UPSTASH_REDIS_REST_TOKEN;
export const stockagePersistant = Boolean(urlUpstash && tokenUpstash);

// ---------- Upstash (API REST, aucune dépendance npm) ----------

async function redis(commande: (string | number)[], revalidate?: number) {
  const res = await fetch(urlUpstash!, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenUpstash}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commande),
    // par défaut : aucune mise en cache (données d'administration)
    ...(revalidate === undefined
      ? { cache: "no-store" as const }
      : { next: { revalidate } }),
  });
  if (!res.ok) throw new Error(`Upstash ${res.status}`);
  const data = (await res.json()) as { result: unknown };
  return data.result;
}

// ---------- Fichier local (développement / secours) ----------

function cheminFichier(nom: string) {
  // en production le dépôt est en lecture seule : on écrit dans /tmp
  const base =
    process.env.NODE_ENV === "production"
      ? path.join(os.tmpdir(), "deralib")
      : path.join(process.cwd(), ".data");
  fs.mkdirSync(base, { recursive: true });
  return path.join(base, nom);
}

function lireFichier<T>(nom: string, defaut: T): T {
  try {
    const p = cheminFichier(nom);
    if (!fs.existsSync(p)) return defaut;
    return JSON.parse(fs.readFileSync(p, "utf-8")) as T;
  } catch {
    return defaut;
  }
}

function ecrireFichier(nom: string, valeur: unknown) {
  try {
    fs.writeFileSync(cheminFichier(nom), JSON.stringify(valeur, null, 2));
  } catch {
    // disque en lecture seule : on n'interrompt pas la requête
  }
}

// ---------- API publique ----------

export async function ajouterLead(
  lead: Omit<Lead, "id" | "date" | "statut" | "note">
): Promise<Lead> {
  const complet: Lead = {
    ...lead,
    id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`,
    date: new Date().toISOString(),
    statut: "nouveau",
    note: "",
  };
  if (stockagePersistant) {
    await redis(["HSET", CLE_LEADS, complet.id, JSON.stringify(complet)]);
  } else {
    const tous = lireFichier<Lead[]>("leads.json", []);
    tous.unshift(complet);
    ecrireFichier("leads.json", tous);
  }
  return complet;
}

export async function listerLeads(): Promise<Lead[]> {
  let leads: Lead[] = [];
  if (stockagePersistant) {
    const plat = (await redis(["HGETALL", CLE_LEADS])) as string[] | null;
    // HGETALL renvoie [champ, valeur, champ, valeur, ...]
    for (let i = 1; i < (plat?.length ?? 0); i += 2) {
      try {
        leads.push(JSON.parse(plat![i]) as Lead);
      } catch {
        /* entrée illisible ignorée */
      }
    }
  } else {
    leads = lireFichier<Lead[]>("leads.json", []);
  }
  return leads.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function majLead(
  id: string,
  champs: Partial<Pick<Lead, "statut" | "note">>
): Promise<Lead | null> {
  const tous = await listerLeads();
  const lead = tous.find((l) => l.id === id);
  if (!lead) return null;
  const maj = { ...lead, ...champs };
  if (stockagePersistant) {
    await redis(["HSET", CLE_LEADS, id, JSON.stringify(maj)]);
  } else {
    ecrireFichier(
      "leads.json",
      tous.map((l) => (l.id === id ? maj : l))
    );
  }
  return maj;
}

export async function supprimerLead(id: string): Promise<void> {
  if (stockagePersistant) {
    await redis(["HDEL", CLE_LEADS, id]);
  } else {
    const tous = await listerLeads();
    ecrireFichier(
      "leads.json",
      tous.filter((l) => l.id !== id)
    );
  }
}

/** Réglages du site. `revalidate` permet de mettre en cache la lecture
 *  faite par le layout public (balises de suivi). */
export async function lireReglages(revalidate?: number): Promise<Reglages> {
  try {
    if (stockagePersistant) {
      const brut = (await redis(["GET", CLE_REGLAGES], revalidate)) as
        | string
        | null;
      return brut
        ? { ...REGLAGES_VIDE, ...(JSON.parse(brut) as Partial<Reglages>) }
        : REGLAGES_VIDE;
    }
    return { ...REGLAGES_VIDE, ...lireFichier<Partial<Reglages>>("reglages.json", {}) };
  } catch {
    return REGLAGES_VIDE;
  }
}

export async function ecrireReglages(r: Partial<Reglages>): Promise<Reglages> {
  const actuel = await lireReglages();
  const maj = { ...actuel, ...r };
  if (stockagePersistant) {
    await redis(["SET", CLE_REGLAGES, JSON.stringify(maj)]);
  } else {
    ecrireFichier("reglages.json", maj);
  }
  return maj;
}

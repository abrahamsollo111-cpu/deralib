import fs from "fs";
import path from "path";
import os from "os";
import { put, list, del, get } from "@vercel/blob";

/**
 * Stockage des demandes (leads) et des réglages du dashboard.
 *
 * Trois modes, choisis automatiquement dans cet ordre :
 *  1. Vercel Blob (actif en production) — natif, aucun compte tiers.
 *     Une demande = un fichier : aucune écriture concurrente possible,
 *     donc aucune demande ne peut en écraser une autre.
 *  2. Upstash Redis, si les variables UPSTASH_* sont présentes.
 *  3. Fichier local, en dernier recours (développement).
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

const PREFIXE_LEADS = "leads/";
const CHEMIN_REGLAGES = "reglages.json";
const CLE_LEADS = "deralib:leads";
const CLE_REGLAGES = "deralib:reglages";

const tokenBlob = process.env.BLOB_READ_WRITE_TOKEN;
const urlUpstash = process.env.UPSTASH_REDIS_REST_URL;
const tokenUpstash = process.env.UPSTASH_REDIS_REST_TOKEN;

const modeBlob = Boolean(tokenBlob);
const modeUpstash = !modeBlob && Boolean(urlUpstash && tokenUpstash);
/** Vrai si les données survivent aux redéploiements */
export const stockagePersistant = modeBlob || modeUpstash;

// ---------- Upstash (API REST) ----------

async function redis(commande: (string | number)[], revalidate?: number) {
  const res = await fetch(urlUpstash!, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenUpstash}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commande),
    ...(revalidate === undefined
      ? { cache: "no-store" as const }
      : { next: { revalidate } }),
  });
  if (!res.ok) throw new Error(`Upstash ${res.status}`);
  const data = (await res.json()) as { result: unknown };
  return data.result;
}

// ---------- Fichier local (développement) ----------

function cheminFichier(nom: string) {
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
    /* disque en lecture seule : on n'interrompt pas la requête */
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

  if (modeBlob) {
    await put(`${PREFIXE_LEADS}${complet.id}.json`, JSON.stringify(complet), {
      access: "private", // données personnelles : jamais accessibles par URL
      contentType: "application/json",
      addRandomSuffix: false,
      token: tokenBlob,
      allowOverwrite: true,
    });
  } else if (modeUpstash) {
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

  if (modeBlob) {
    const { blobs } = await list({ prefix: PREFIXE_LEADS, token: tokenBlob });
    // lecture en parallèle par lots pour rester rapide
    const lots: (typeof blobs)[] = [];
    for (let i = 0; i < blobs.length; i += 20) lots.push(blobs.slice(i, i + 20));
    for (const lot of lots) {
      const resultats = await Promise.all(
        lot.map(async (b) => {
          try {
            const r = await get(b.pathname, { token: tokenBlob, access: "private" });
            if (!r) return null;
            return (await new Response(r.stream).json()) as Lead;
          } catch {
            return null;
          }
        })
      );
      leads.push(...resultats.filter((l): l is Lead => l !== null));
    }
  } else if (modeUpstash) {
    const plat = (await redis(["HGETALL", CLE_LEADS])) as string[] | null;
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

  if (modeBlob) {
    await put(`${PREFIXE_LEADS}${id}.json`, JSON.stringify(maj), {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      token: tokenBlob,
      allowOverwrite: true,
    });
  } else if (modeUpstash) {
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
  if (modeBlob) {
    const { blobs } = await list({
      prefix: `${PREFIXE_LEADS}${id}`,
      token: tokenBlob,
    });
    await Promise.all(blobs.map((b) => del(b.url, { token: tokenBlob })));
  } else if (modeUpstash) {
    await redis(["HDEL", CLE_LEADS, id]);
  } else {
    const tous = await listerLeads();
    ecrireFichier(
      "leads.json",
      tous.filter((l) => l.id !== id)
    );
  }
}

/** Réglages du site. `revalidate` met en cache la lecture faite par le
 *  layout public (balises de suivi) pour préserver la performance. */
export async function lireReglages(revalidate?: number): Promise<Reglages> {
  try {
    if (modeBlob) {
      const { blobs } = await list({ prefix: CHEMIN_REGLAGES, token: tokenBlob });
      if (!blobs.length) return REGLAGES_VIDE;
      const res = await get(blobs[0].pathname, {
        token: tokenBlob,
        access: "private",
      });
      if (!res) return REGLAGES_VIDE;
      const data = (await new Response(res.stream).json()) as Partial<Reglages>;
      return { ...REGLAGES_VIDE, ...data };
    }
    if (modeUpstash) {
      const brut = (await redis(["GET", CLE_REGLAGES], revalidate)) as string | null;
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

  if (modeBlob) {
    await put(CHEMIN_REGLAGES, JSON.stringify(maj), {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      token: tokenBlob,
      allowOverwrite: true,
    });
  } else if (modeUpstash) {
    await redis(["SET", CLE_REGLAGES, JSON.stringify(maj)]);
  } else {
    ecrireFichier("reglages.json", maj);
  }
  return maj;
}

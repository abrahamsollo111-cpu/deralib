import { cookies } from "next/headers";

/**
 * Authentification du dashboard /admin.
 *
 * Principe : un mot de passe unique (variable d'environnement
 * ADMIN_PASSWORD) échangé contre un cookie signé HMAC-SHA256, valable
 * 30 jours, httpOnly (illisible par JavaScript).
 *
 * ⚠️ Sécurité : si ADMIN_PASSWORD n'est pas défini, l'accès est REFUSÉ
 * (jamais d'ouverture par défaut). Le dépôt étant public, aucun secret
 * ne doit figurer dans le code.
 */

const NOM_COOKIE = "deralib_admin";
const DUREE_JOURS = 30;

function secret() {
  // à défaut de secret dédié, on dérive du mot de passe
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "";
}

export function authConfiguree() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

async function signer(valeur: string): Promise<string> {
  const cle = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    cle,
    new TextEncoder().encode(valeur)
  );
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Comparaison à temps constant (évite les attaques temporelles) */
function egalConstant(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function creerJeton(): Promise<string> {
  const expire = Date.now() + DUREE_JOURS * 24 * 60 * 60 * 1000;
  const charge = String(expire);
  return `${charge}.${await signer(charge)}`;
}

export async function jetonValide(jeton?: string): Promise<boolean> {
  if (!authConfiguree() || !jeton) return false;
  const [charge, sig] = jeton.split(".");
  if (!charge || !sig) return false;
  if (Number(charge) < Date.now()) return false;
  return egalConstant(sig, await signer(charge));
}

export async function motDePasseValide(saisi: string): Promise<boolean> {
  const attendu = process.env.ADMIN_PASSWORD;
  if (!attendu) return false;
  // on compare les empreintes : longueurs identiques, temps constant
  const [a, b] = await Promise.all([signer(saisi), signer(attendu)]);
  return egalConstant(a, b);
}

/** Vrai si la requête courante est authentifiée (Server Component ou route) */
export async function estConnecte(): Promise<boolean> {
  const jeton = (await cookies()).get(NOM_COOKIE)?.value;
  return jetonValide(jeton);
}

export async function poserCookie() {
  (await cookies()).set(NOM_COOKIE, await creerJeton(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: DUREE_JOURS * 24 * 60 * 60,
  });
}

export async function retirerCookie() {
  (await cookies()).delete(NOM_COOKIE);
}

import { NextResponse } from "next/server";
import { ajouterLead, stockagePersistant } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Anti-spam simple : nombre d'envois par IP et par heure
const compteurs = new Map<string, { n: number; debut: number }>();
const MAX_PAR_HEURE = 10;

function trop(ip: string) {
  const maintenant = Date.now();
  const c = compteurs.get(ip);
  if (!c || maintenant - c.debut > 3_600_000) {
    compteurs.set(ip, { n: 1, debut: maintenant });
    return false;
  }
  c.n += 1;
  return c.n > MAX_PAR_HEURE;
}

function texte(v: unknown, max = 2000) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "inconnue";
  if (trop(ip)) {
    return NextResponse.json(
      { ok: false, erreur: "Trop de demandes. Appelez-nous directement." },
      { status: 429 }
    );
  }

  let corps: Record<string, unknown>;
  try {
    corps = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, erreur: "Requête invalide" }, { status: 400 });
  }

  // piège à robots : champ caché qui doit rester vide
  if (texte(corps.societe)) {
    return NextResponse.json({ ok: true, id: "ignore" });
  }

  const nom = texte(corps.nom, 120);
  const tel = texte(corps.tel, 40);
  if (!nom || !tel) {
    return NextResponse.json(
      { ok: false, erreur: "Nom et téléphone obligatoires" },
      { status: 400 }
    );
  }

  try {
    const lead = await ajouterLead({
      nom,
      tel,
      ville: texte(corps.ville, 120),
      nuisible: texte(corps.nuisible, 80),
      lieu: texte(corps.lieu, 80),
      urgence: texte(corps.urgence, 80),
      message: texte(corps.message),
      source: texte(corps.source, 40) || "inconnue",
      page: texte(corps.page, 200),
    });

    // Journal : filet de sécurité consultable dans les logs Vercel même
    // si le stockage persistant n'est pas encore configuré
    console.log(
      `[LEAD]${stockagePersistant ? "" : " (NON PERSISTÉ)"} ${lead.date} | ${lead.nom} | ${lead.tel} | ${lead.ville} | ${lead.nuisible} | ${lead.urgence} | ${lead.source}`
    );

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (e) {
    console.error("[LEAD] échec d'enregistrement", e);
    return NextResponse.json(
      { ok: false, erreur: "Enregistrement impossible" },
      { status: 500 }
    );
  }
}

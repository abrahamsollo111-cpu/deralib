import { NextResponse } from "next/server";
import { estConnecte } from "@/lib/auth";
import { lireReglages, ecrireReglages, type Reglages } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await estConnecte())) {
    return NextResponse.json({ ok: false, erreur: "Non autorisé" }, { status: 401 });
  }
  return NextResponse.json({ ok: true, reglages: await lireReglages() });
}

export async function PUT(req: Request) {
  if (!(await estConnecte())) {
    return NextResponse.json({ ok: false, erreur: "Non autorisé" }, { status: 401 });
  }
  const corps = (await req.json().catch(() => ({}))) as Partial<Reglages>;
  const champs: (keyof Reglages)[] = [
    "gaId",
    "adsId",
    "adsLabel",
    "metaPixel",
    "verifGoogle",
    "verifBing",
    "lienAvisGoogle",
    "notes",
  ];
  const propre: Partial<Reglages> = {};
  for (const c of champs) {
    if (typeof corps[c] === "string") propre[c] = corps[c].trim().slice(0, 500);
  }
  return NextResponse.json({ ok: true, reglages: await ecrireReglages(propre) });
}

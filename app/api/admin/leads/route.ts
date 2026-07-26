import { NextResponse } from "next/server";
import { estConnecte } from "@/lib/auth";
import { listerLeads, majLead, supprimerLead } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function garde() {
  if (!(await estConnecte())) {
    return NextResponse.json({ ok: false, erreur: "Non autorisé" }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const refus = await garde();
  if (refus) return refus;
  return NextResponse.json({ ok: true, leads: await listerLeads() });
}

export async function PATCH(req: Request) {
  const refus = await garde();
  if (refus) return refus;
  const { id, statut, note } = (await req.json().catch(() => ({}))) as {
    id?: string;
    statut?: string;
    note?: string;
  };
  if (!id) {
    return NextResponse.json({ ok: false, erreur: "id manquant" }, { status: 400 });
  }
  const champs: { statut?: never; note?: string } & Record<string, unknown> = {};
  const statutsValides = ["nouveau", "rappele", "devis", "gagne", "perdu"];
  if (statut && statutsValides.includes(statut)) champs.statut = statut as never;
  if (typeof note === "string") champs.note = note.slice(0, 2000);
  const lead = await majLead(id, champs);
  return NextResponse.json({ ok: Boolean(lead), lead });
}

export async function DELETE(req: Request) {
  const refus = await garde();
  if (refus) return refus;
  const { id } = (await req.json().catch(() => ({}))) as { id?: string };
  if (!id) {
    return NextResponse.json({ ok: false, erreur: "id manquant" }, { status: 400 });
  }
  await supprimerLead(id);
  return NextResponse.json({ ok: true });
}

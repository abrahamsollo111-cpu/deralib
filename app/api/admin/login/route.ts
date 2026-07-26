import { NextResponse } from "next/server";
import { authConfiguree, motDePasseValide, poserCookie, retirerCookie } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Limitation des tentatives : 8 essais par IP et par quart d'heure
const essais = new Map<string, { n: number; debut: number }>();

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "inconnue";
  const maintenant = Date.now();
  const e = essais.get(ip);
  if (!e || maintenant - e.debut > 900_000) {
    essais.set(ip, { n: 1, debut: maintenant });
  } else if (++e.n > 8) {
    return NextResponse.json(
      { ok: false, erreur: "Trop de tentatives. Réessayez dans 15 minutes." },
      { status: 429 }
    );
  }

  if (!authConfiguree()) {
    return NextResponse.json(
      {
        ok: false,
        erreur:
          "Accès non configuré : ajoutez la variable ADMIN_PASSWORD dans Vercel (voir ADMIN.md).",
      },
      { status: 503 }
    );
  }

  const { motDePasse } = (await req.json().catch(() => ({}))) as {
    motDePasse?: string;
  };

  if (!motDePasse || !(await motDePasseValide(motDePasse))) {
    // léger délai : ralentit les tentatives automatisées
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json(
      { ok: false, erreur: "Mot de passe incorrect." },
      { status: 401 }
    );
  }

  await poserCookie();
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await retirerCookie();
  return NextResponse.json({ ok: true });
}

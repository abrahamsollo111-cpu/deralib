import { ImageResponse } from "next/og";
import { site } from "@/lib/config";

// Image Open Graph 1200×630 générée au build (partages réseaux sociaux
// et messageries). TODO : la remplacer un jour par une vraie photo
// d'équipe avec le logo — en attendant, visuel sobre aux couleurs du site.
export const alt = `${site.marque} — Dératisation & anti-nuisibles en ${site.zone}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#1b2f27",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 18,
              background: "#1e5b46",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 56,
              fontWeight: 800,
            }}
          >
            D
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 54, fontWeight: 800 }}>{site.marque}</div>
            <div style={{ fontSize: 26, color: "#8fd0b0" }}>
              Dératisation & anti-nuisibles
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: 58,
            fontWeight: 800,
            marginTop: 56,
            lineHeight: 1.15,
          }}
        >
          Nuisibles éliminés. Maison assainie.
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#cfe5d8", marginTop: 28 }}>
          {`${site.zone} — sur place en 30-45 min — ${site.anneesMetier} ans de métier`}
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 32,
            fontWeight: 700,
            color: "#ffffff",
          }}
        >
          <div
            style={{
              background: "#cf4f17",
              borderRadius: 12,
              padding: "14px 28px",
              display: "flex",
            }}
          >
            {site.telephone}
          </div>
          <div style={{ color: "#cfe5d8", fontSize: 26, display: "flex" }}>
            7j/7 — 24h/24 — Devis gratuit
          </div>
        </div>
      </div>
    ),
    size
  );
}

import Link from "next/link";
import { IconPhone } from "./Icons";
import { site } from "@/lib/config";

export default function CtaBand({
  title = "Un nuisible ? Appelez.",
  text = `Un technicien vous répond et vous donne un prix clair. Intervention généralement sous 24 à 48 h partout en ${site.zone}.`,
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section>
      <div className="container">
        <div className="cta-band" data-reveal>
          <div className="fx-layer" aria-hidden>
            <div
              className="deco deco-ring-light deco-ring"
              data-parallax="0.25"
              style={{ width: 340, height: 340, top: -140, right: -80 }}
            />
            <div
              className="deco deco-ring-light deco-ring-dash"
              style={{ width: 200, height: 200, bottom: -80, right: "22%" }}
            />
            <span
              className="deco-plus"
              data-parallax="0.5"
              style={{ top: "20%", right: "38%", fontSize: 26, color: "rgba(255,255,255,0.25)" }}
            >
              +
            </span>
          </div>
          <div style={{ position: "relative", zIndex: 2 }}>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div style={{ position: "relative", zIndex: 2 }}>
            <div className="cta-band-actions">
              <a href={site.telephoneHref} className="btn btn-white btn-lg">
                <IconPhone /> {site.telephone}
              </a>
              <Link href="/devis" className="btn btn-marine btn-lg">
                Devis gratuit en ligne
              </Link>
            </div>
            <p className="dispo dispo-light" style={{ marginTop: 14 }}>
              <span className="dot" /> <span>Nous répondons <em>{site.horaires}</em></span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

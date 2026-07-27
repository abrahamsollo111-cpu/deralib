import fs from "fs";
import path from "path";
import JsonLd from "./JsonLd";
import { site } from "@/lib/config";

type AvisClient = {
  prenom: string;
  ville: string;
  date: string; // AAAA-MM
  note: number; // sur 5
  texte: string;
};

type AvisData = {
  urlProfilGoogle: string;
  avis: AvisClient[];
};

function getAvis(): AvisData {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "content", "avis.json"),
    "utf-8"
  );
  return JSON.parse(raw) as AvisData;
}

/** Logo « G » de Google — indique la provenance réelle des avis */
function LogoGoogle({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function formatDate(d: string) {
  const [annee, mois] = d.split("-");
  const noms = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  return `${noms[Number(mois) - 1]} ${annee}`;
}

/**
 * Avis clients — n'affiche RIEN tant que content/avis.json est vide.
 * ⚠️ TODO : remplir content/avis.json avec les VRAIS avis Google de
 * l'entreprise (recopiés à l'identique : prénom, ville, date, note, texte).
 * Ne jamais inventer d'avis : c'est illégal (pratique commerciale trompeuse)
 * et Google sait les détecter.
 */
export default function Avis() {
  const { avis, urlProfilGoogle } = getAvis();
  if (avis.length === 0) return null;

  const moyenne = avis.reduce((s, a) => s + a.note, 0) / avis.length;

  return (
    <section className="section-azur">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="kicker">Avis clients</span>
          <h2>Ce que disent nos clients</h2>
          <p className="avis-source">
            <LogoGoogle size={20} />
            <span>
              <strong>Avis Google</strong> — note moyenne{" "}
              {moyenne.toFixed(1).replace(".", ",")}/5 sur {avis.length} avis.
            {urlProfilGoogle && (
              <>
                {" "}
                <a href={urlProfilGoogle} rel="noopener noreferrer" target="_blank">
                  Voir tous les avis sur Google
                </a>
              </>
            )}
            </span>
          </p>
        </div>
        <div className="avis-grid" data-stagger>
          {avis.map((a) => (
            <figure key={`${a.prenom}-${a.date}-${a.ville}`} className="avis-card" data-reveal>
              <div className="avis-tete">
                <div className="avis-note" aria-label={`Note : ${a.note} sur 5`}>
                  {"★".repeat(a.note)}
                  {"☆".repeat(5 - a.note)}
                </div>
                <span className="avis-g" title="Avis publié sur Google">
                  <LogoGoogle size={16} />
                </span>
              </div>
              <blockquote>{a.texte}</blockquote>
              <figcaption>
                {a.prenom} — {a.ville}, {formatDate(a.date)}
                <span className="avis-provenance">Publié sur Google</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      {/* aggregateRating uniquement parce que les avis ci-dessus sont réels */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `${site.url}/#localbusiness`,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: moyenne.toFixed(1),
            reviewCount: avis.length,
            bestRating: 5,
          },
        }}
      />
    </section>
  );
}

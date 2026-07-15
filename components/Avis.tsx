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
          <p>
            Note moyenne {moyenne.toFixed(1).replace(".", ",")}/5 sur{" "}
            {avis.length} avis.
            {urlProfilGoogle && (
              <>
                {" "}
                <a href={urlProfilGoogle} rel="noopener noreferrer" target="_blank">
                  Voir tous les avis sur Google
                </a>
              </>
            )}
          </p>
        </div>
        <div className="avis-grid" data-stagger>
          {avis.map((a) => (
            <figure key={`${a.prenom}-${a.date}-${a.ville}`} className="avis-card" data-reveal>
              <div className="avis-note" aria-label={`Note : ${a.note} sur 5`}>
                {"★".repeat(a.note)}
                {"☆".repeat(5 - a.note)}
              </div>
              <blockquote>{a.texte}</blockquote>
              <figcaption>
                {a.prenom} — {a.ville}, {formatDate(a.date)}
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

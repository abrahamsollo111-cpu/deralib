import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import { IconArrow } from "@/components/Icons";
import { site } from "@/lib/config";
import { getAllArticles, NUISIBLES_LABELS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Conseils anti-nuisibles — guides pratiques",
  description: `Reconnaître une infestation, comprendre les prix, éviter les erreurs : les conseils des techniciens ${site.marque}, ${site.anneesMetier} ans de métier en ${site.zone}.`,
  alternates: { canonical: "/conseils" },
};

function formatDate(d: string) {
  const [a, m, j] = d.split("-");
  const noms = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  return `${Number(j)} ${noms[Number(m) - 1]} ${a}`;
}

export default function Page() {
  const articles = getAllArticles();

  return (
    <>
      <Breadcrumbs crumbs={[{ label: "Conseils" }]} />

      <section className="hero hero-page">
        <div className="container">
          <h1>Conseils anti-nuisibles</h1>
          <p className="lead" style={{ maxWidth: 740, marginTop: 16 }}>
            Reconnaître une infestation, comprendre les prix, éviter les
            erreurs qui aggravent le problème : les réponses de nos
            techniciens, tirées de {site.anneesMetier} ans de terrain en{" "}
            {site.zone}.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="cards-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }} data-stagger>
            {articles.map((a) => (
              <Link key={a.slug} href={`/conseils/${a.slug}`} className="card" data-reveal>
                <span className="chip" style={{ alignSelf: "flex-start" }}>
                  {NUISIBLES_LABELS[a.service]}
                </span>
                <h2 style={{ fontSize: "1.15rem" }}>{a.titre}</h2>
                <p>{a.extrait}</p>
                <span className="card-link">
                  Lire l&apos;article <IconArrow size={14} />
                </span>
                <span style={{ fontSize: "0.78rem", color: "var(--text-light)" }}>
                  {formatDate(a.date)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import { site } from "@/lib/config";
import { getAllArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Conseils anti-nuisibles — guides pratiques",
  description: `Reconnaître une infestation, comprendre les prix, éviter les erreurs : les conseils des techniciens ${site.marque}, ${site.anneesMetier} ans de métier en ${site.zone}.`,
  alternates: { canonical: "/conseils" },
};

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
          <div className="cards-grid cards-grid-2" data-stagger>
            {articles.map((a) => (
              <ArticleCard key={a.slug} article={a} extrait />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

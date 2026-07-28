import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { IconArrow, IconPhone } from "@/components/Icons";
import { site } from "@/lib/config";
import { getArticle, getAllArticles, NUISIBLES_LABELS } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  return {
    title: { absolute: a.meta_title },
    description: a.meta_description,
    alternates: { canonical: `/conseils/${a.slug}` },
    openGraph: { title: a.meta_title, description: a.meta_description, type: "article" },
  };
}

function formatDate(d: string) {
  const [an, m, j] = d.split("-");
  const noms = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  return `${Number(j)} ${noms[Number(m) - 1]} ${an}`;
}

// ancre lisible à partir d'un titre de section (pour le sommaire)
function ancre(titre: string) {
  return titre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticle(slug);
  const autres = getAllArticles().filter((x) => x.slug !== a.slug);
  // temps de lecture estimé (220 mots/min), calculé sur le vrai contenu
  const nbMots = a.sections
    .flatMap((s) => s.paragraphes)
    .join(" ")
    .split(/\s+/).length;
  const minutes = Math.max(1, Math.round(nbMots / 220));

  return (
    <>
      <Breadcrumbs
        crumbs={[{ label: "Conseils", href: "/conseils" }, { label: a.titre }]}
      />

      <section className="hero hero-page">
        <div className="container">
          <span className="kicker">
            Conseils — {NUISIBLES_LABELS[a.service]}
          </span>
          <h1 style={{ maxWidth: 820 }}>{a.h1}</h1>
          <p className="article-meta">
            Publié le {formatDate(a.date)} par l&apos;équipe {site.marque} —{" "}
            {site.anneesMetier} ans de métier · Lecture : {minutes} min
          </p>
        </div>
      </section>

      {/* ===== CORPS — sommaire collant + sections numérotées ===== */}
      <section>
        <div className="container article-layout">
          <aside className="article-aside">
            <nav className="toc" data-reveal aria-label="Sommaire de l'article">
              <p className="toc-titre">Sommaire</p>
              <ol>
                {a.sections.map((s) => (
                  <li key={s.titre}>
                    <a href={`#${ancre(s.titre)}`}>{s.titre}</a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="toc-cta" data-reveal>
              <p>Un doute ? Un technicien vous répond {site.horaires}.</p>
              <a href={site.telephoneHref} className="btn btn-primary btn-call">
                <IconPhone size={15} /> {site.telephone}
              </a>
            </div>
          </aside>

          <div className="prose article-corps">
            {a.sections.map((s, i) => (
              <div key={s.titre} id={ancre(s.titre)} className="article-section">
                <h2>
                  <span className="article-num" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.titre}
                </h2>
                {s.paragraphes.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            ))}

            {/* CTA vers la page service (ancre descriptive) */}
            <div className="notice" style={{ marginTop: 34 }}>
              <strong>Besoin d&apos;un professionnel ?</strong> Découvrez notre
              page{" "}
              <Link href={`/${a.service}`}>{a.cta_texte}</Link> — intervention
              en 30-45 min, devis gratuit, ou appelez le{" "}
              <a href={site.telephoneHref} style={{ fontWeight: 700 }}>
                {site.telephone}
              </a>
              .
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      {a.faq.length > 0 && (
        <section className="section-azur">
          <div className="container">
            <div className="section-head" data-reveal>
              <span className="kicker">FAQ</span>
              <h2>Questions fréquentes</h2>
            </div>
            <Faq items={a.faq} />
          </div>
        </section>
      )}

      {/* ===== AUTRES ARTICLES ===== */}
      <section>
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="kicker">À lire aussi</span>
            <h2>Autres conseils</h2>
          </div>
          <div className="cards-grid cards-grid-3" data-stagger>
            {autres.map((x) => (
              <Link key={x.slug} href={`/conseils/${x.slug}`} className="card" data-reveal>
                <span className="kicker">{NUISIBLES_LABELS[x.service]}</span>
                <h3 style={{ marginTop: 8 }}>{x.titre}</h3>
                <span className="card-link">
                  Lire l&apos;article <IconArrow size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={`${NUISIBLES_LABELS[a.service]} : demandez votre devis gratuit`}
        text="Un technicien vous rappelle avec un diagnostic et un prix clair — intervention en 30-45 min."
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.titre,
          description: a.meta_description,
          datePublished: a.date,
          inLanguage: "fr-FR",
          url: `${site.url}/conseils/${a.slug}`,
          author: {
            "@type": "Organization",
            name: site.marque,
            url: site.url,
          },
          publisher: { "@id": `${site.url}/#organization` },
          mainEntityOfPage: `${site.url}/conseils/${a.slug}`,
        }}
      />
    </>
  );
}

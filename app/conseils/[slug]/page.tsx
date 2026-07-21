import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { IconArrow } from "@/components/Icons";
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

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticle(slug);
  const autres = getAllArticles().filter((x) => x.slug !== a.slug);

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
          <p style={{ marginTop: 14, fontSize: "0.85rem", color: "var(--text-light)" }}>
            Publié le {formatDate(a.date)} par l&apos;équipe {site.marque} —{" "}
            {site.anneesMetier} ans de métier
          </p>
        </div>
      </section>

      {/* ===== CORPS DE L'ARTICLE ===== */}
      <section>
        <div className="container prose" style={{ maxWidth: 780 }}>
          {a.sections.map((s) => (
            <div key={s.titre}>
              <h2>{s.titre}</h2>
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
          <div className="chip-list" data-reveal>
            {autres.map((x) => (
              <Link key={x.slug} href={`/conseils/${x.slug}`} className="chip">
                {x.titre} <IconArrow size={12} />
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

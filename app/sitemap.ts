import type { MetadataRoute } from "next";
import { site } from "@/lib/config";
import { getAllVilles, getAllArticles, NUISIBLES_SLUGS } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const statiques = ["", "/a-propos", "/devis", "/contact"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    priority: p === "" ? 1 : 0.7,
  }));

  const piliers = NUISIBLES_SLUGS.map((slug) => ({
    url: `${site.url}/${slug}`,
    lastModified: now,
    priority: 0.9,
  }));

  // Pages départements (dératisation)
  const villes = getAllVilles().map((v) => ({
    url: `${site.url}/deratisation/${v.slug}`,
    lastModified: now,
    priority: 0.8,
  }));

  // Section conseils
  const conseils = [
    { url: `${site.url}/conseils`, lastModified: now, priority: 0.6 },
    ...getAllArticles().map((a) => ({
      url: `${site.url}/conseils/${a.slug}`,
      lastModified: new Date(a.date),
      priority: 0.6,
    })),
  ];

  return [...statiques, ...piliers, ...villes, ...conseils];
}

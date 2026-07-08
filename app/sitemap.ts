import type { MetadataRoute } from "next";
import { site } from "@/lib/config";
import { getAllVilles, NUISIBLES_SLUGS } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const statiques = ["", "/a-propos", "/devis"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    priority: p === "" ? 1 : 0.7,
  }));

  const piliers = NUISIBLES_SLUGS.map((slug) => ({
    url: `${site.url}/${slug}`,
    lastModified: now,
    priority: 0.9,
  }));

  // Pages villes : uniquement dératisation pour l'instant (règle §3.1 du PLAN)
  const villes = getAllVilles().map((v) => ({
    url: `${site.url}/deratisation/${v.slug}`,
    lastModified: now,
    priority: 0.8,
  }));

  return [...statiques, ...piliers, ...villes];
}

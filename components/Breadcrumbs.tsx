import Link from "next/link";
import JsonLd from "./JsonLd";
import { site } from "@/lib/config";

export type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const all: Crumb[] = [{ label: "Accueil", href: "/" }, ...crumbs];
  return (
    <>
      <nav className="breadcrumbs container" aria-label="Fil d'Ariane">
        <ol>
          {all.map((c, i) => (
            <li key={c.label} aria-current={i === all.length - 1 ? "page" : undefined}>
              {c.href && i < all.length - 1 ? <Link href={c.href}>{c.label}</Link> : c.label}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            ...(c.href ? { item: `${site.url}${c.href === "/" ? "" : c.href}` } : {}),
          })),
        }}
      />
    </>
  );
}

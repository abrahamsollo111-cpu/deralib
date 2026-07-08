import type { Metadata } from "next";
import NuisiblePage from "@/components/NuisiblePage";
import { getNuisible } from "@/lib/content";

const SLUG = "guepes-frelons";

export function generateMetadata(): Metadata {
  const n = getNuisible(SLUG);
  return {
    title: { absolute: n.meta_title },
    description: n.meta_description,
    alternates: { canonical: `/${SLUG}` },
    openGraph: { title: n.meta_title, description: n.meta_description },
  };
}

export default function Page() {
  return <NuisiblePage slug={SLUG} />;
}

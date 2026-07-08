import Link from "next/link";
import { site } from "@/lib/config";

export default function Logo({ invert = false }: { invert?: boolean }) {
  return (
    <Link href="/" className={`logo${invert ? " logo-invert" : ""}`} aria-label={`${site.marque} — accueil`}>
      <span className="logo-badge">D</span>
      <span className="logo-text">
        <span className="logo-word">
          Dera<em>lib</em>
        </span>
        <span className="logo-tagline">{site.slogan}</span>
      </span>
    </Link>
  );
}

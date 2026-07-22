import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/config";

// Logo officiel : « D » vert bouteille avec silhouette de rat
// (public/images/logo-deralib.png, fond transparent)
export default function Logo({ invert = false }: { invert?: boolean }) {
  return (
    <Link href="/" className={`logo${invert ? " logo-invert" : ""}`} aria-label={`${site.marque} — accueil`}>
      <Image
        src="/images/logo-deralib.png"
        alt=""
        width={506}
        height={512}
        priority={!invert}
        className="logo-img"
      />
      <span className="logo-text">
        <span className="logo-word">
          Dera<em>lib</em>
        </span>
        <span className="logo-tagline">{site.slogan}</span>
      </span>
    </Link>
  );
}

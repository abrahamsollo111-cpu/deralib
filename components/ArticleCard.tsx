import Link from "next/link";
import Image from "next/image";
import { IconArrow } from "./Icons";
import { NUISIBLES_LABELS, type Article } from "@/lib/content";

/** Carte d'article conseil avec photo de couverture. */
export default function ArticleCard({
  article,
  extrait = false,
}: {
  article: Article;
  extrait?: boolean;
}) {
  const img = article.image;
  return (
    <Link href={`/conseils/${article.slug}`} className="card card-media" data-reveal>
      {img && (
        <div className="card-media-img">
          <Image
            src={img.src}
            alt=""
            width={img.w}
            height={img.h}
            sizes="(max-width: 560px) 100vw, (max-width: 1000px) 50vw, 380px"
          />
          <span className="card-media-tag">{NUISIBLES_LABELS[article.service]}</span>
        </div>
      )}
      <div className="card-body">
        <h3>{article.titre}</h3>
        {extrait && <p>{article.extrait}</p>}
        <span className="card-link">
          Lire le guide <IconArrow size={14} />
        </span>
      </div>
    </Link>
  );
}

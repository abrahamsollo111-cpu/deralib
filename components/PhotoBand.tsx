import Image from "next/image";

/**
 * Bande photo immersive avec effet parallax au défilement.
 * L'image glisse doucement dans son cadre (data-parallax, moteur ScrollFx),
 * une carte de légende vient se poser sur le coin bas-gauche.
 */
export default function PhotoBand({
  src,
  alt,
  titre,
  texte,
}: {
  src: string;
  alt: string;
  titre: string;
  texte?: string;
}) {
  return (
    <section className="photo-band-section">
      <div className="container">
        <figure className="photo-band" data-reveal>
          {/* l'image est plus haute que son cadre : la marge absorbe le
              déplacement parallax sans jamais laisser voir un bord */}
          <Image
            src={src}
            alt={alt}
            width={1400}
            height={900}
            sizes="(max-width: 900px) 100vw, 1160px"
            data-parallax="0.07"
          />
          <figcaption className="photo-band-card">
            <strong>{titre}</strong>
            {texte && <p>{texte}</p>}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

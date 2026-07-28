import Image from "next/image";
import type { Section } from "@/lib/content";

/**
 * Sections locales d'une page département : fini le bloc de texte unique.
 * Chaque section alterne titre à gauche / titre à droite, porte un grand
 * numéro décoratif en parallax, et une bande photo immersive vient couper
 * la lecture au milieu. La photo et la teinte varient d'un département à
 * l'autre (voir VARIANTES_VILLE dans la page) : huit pages sœurs, jamais
 * identiques.
 */
export default function SectionsLocales({
  sections,
  bandePhoto,
  bandeTitre,
  bandeApres,
}: {
  sections: Section[];
  bandePhoto: { src: string; alt: string };
  bandeTitre: string;
  bandeApres: number; // index de section après laquelle insérer la photo
}) {
  return (
    <section className="locales">
      <div className="container">
        {sections.map((s, i) => (
          <div key={s.titre}>
            <div className={`locale-row${i % 2 === 1 ? " locale-inverse" : ""}`}>
              <div className="locale-tete" data-reveal>
                <span className="locale-num" data-parallax="0.045" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2>{s.titre}</h2>
              </div>
              <div className="locale-corps" data-reveal>
                {s.paragraphes.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </div>

            {i === bandeApres && (
              <figure className="photo-band photo-band-locale" data-reveal>
                <Image
                  src={bandePhoto.src}
                  alt={bandePhoto.alt}
                  width={1400}
                  height={900}
                  sizes="(max-width: 900px) 100vw, 1160px"
                  data-parallax="0.07"
                />
                <figcaption className="photo-band-card">
                  <strong>{bandeTitre}</strong>
                </figcaption>
              </figure>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

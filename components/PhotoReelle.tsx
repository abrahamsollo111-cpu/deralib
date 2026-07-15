import fs from "fs";
import path from "path";
import Image from "next/image";

/**
 * Emplacement pour une VRAIE photo de l'entreprise.
 *
 * ⚠️ TODO PHOTOS : déposer les fichiers dans /public/images/ avec un nom
 * SEO en français (jamais IMG_2041.jpg). Photos attendues :
 *   - dirigeant-deralib.jpg                      (portrait du dirigeant)
 *   - equipe-deralib-techniciens.jpg             (équipe en tenue)
 *   - vehicule-intervention-deralib.jpg          (véhicule siglé)
 *   - deratisation-cave-paris-11.jpg             (poste d'appâtage posé en cave)
 *   - poste-appatage-securise-avant-apres.jpg    (avant/après)
 *   - nid-de-guepes-retire-pavillon.jpg          (nid retiré)
 *   - traitement-punaises-vapeur-chambre.jpg     (vapeur sèche en chambre)
 *
 * Tant que le fichier n'existe pas, le composant n'affiche rien :
 * aucune image générique ou de stock ne doit prendre la place.
 */
export default function PhotoReelle({
  fichier,
  alt,
  largeur = 800,
  hauteur = 600,
  priorite = false,
}: {
  fichier: string; // nom du fichier dans /public/images/
  alt: string; // description en français, précise et utile
  largeur?: number;
  hauteur?: number;
  priorite?: boolean;
}) {
  const chemin = path.join(process.cwd(), "public", "images", fichier);
  if (!fs.existsSync(chemin)) return null;

  return (
    <Image
      src={`/images/${fichier}`}
      alt={alt}
      width={largeur}
      height={hauteur}
      priority={priorite}
      loading={priorite ? undefined : "lazy"}
      style={{ borderRadius: 12, width: "100%", height: "auto" }}
    />
  );
}

import fs from "fs";
import path from "path";

type ReferencesData = { mention: string; enseignes: string[] };

function getReferences(): ReferencesData {
  const raw = fs.readFileSync(path.join(process.cwd(), "content", "references.json"), "utf-8");
  return JSON.parse(raw) as ReferencesData;
}

/**
 * Bandeau des enseignes clientes, en texte (pas de logo sans accord écrit
 * de la marque). Ne s'affiche pas tant que content/references.json est vide.
 */
export default function References() {
  const { mention, enseignes } = getReferences();
  if (enseignes.length === 0) return null;

  // la liste est répétée pour remplir les grands écrans, puis doublée
  // pour que la boucle du défilement soit invisible
  const serie = Array.from({ length: Math.max(2, Math.ceil(12 / enseignes.length)) }, () => enseignes).flat();

  return (
    <section className="references" aria-labelledby="references-titre">
      <div className="container">
        <p id="references-titre" className="references-titre">
          Ils nous ont fait confiance
        </p>
        {/* liste lisible une seule fois par les lecteurs d'écran */}
        <ul className="sr-only">
          {enseignes.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </div>
      <div className="references-defilant" aria-hidden>
        <div className="references-piste">
          {[0, 1].map((copie) => (
            <ul key={copie}>
              {serie.map((e, i) => (
                <li key={`${copie}-${i}`}>{e}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className="container">
        <p className="references-mention">{mention}</p>
      </div>
    </section>
  );
}

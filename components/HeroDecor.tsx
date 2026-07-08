/**
 * Décor parallax commun des sections hero :
 * grille de points, anneaux (dont un pointillé « champ stérile » qui tourne),
 * halo dégradé et croix médicales. Chaque couche a sa propre vitesse.
 */
export default function HeroDecor({ dense = false }: { dense?: boolean }) {
  return (
    <div className="fx-layer" aria-hidden>
      <div data-parallax="0.06" data-depth="6" style={{ position: "absolute", inset: 0 }}>
        <div className="bg-dots" />
      </div>
      <div
        className="deco deco-blob"
        data-parallax="0.14"
        data-depth="10"
        style={{ width: 560, height: 560, top: -160, right: -140 }}
      />
      {/* pas de data-parallax ici : l'animation CSS `spin` occupe déjà transform */}
      <div
        className="deco deco-ring-dash"
        style={{ width: 420, height: 420, top: -110, right: -60 }}
      />
      <div
        className="deco deco-ring"
        data-parallax="0.3"
        data-depth="14"
        style={{ width: 260, height: 260, bottom: -70, left: "-4%" }}
      />
      <span
        className="deco-plus"
        data-parallax="0.45"
        data-depth="22"
        style={{ top: "16%", left: "44%", fontSize: 30 }}
      >
        +
      </span>
      <span
        className="deco-plus deco-plus-cyan"
        data-parallax="0.32"
        data-depth="16"
        style={{ bottom: "18%", right: "6%", fontSize: 44 }}
      >
        +
      </span>
      {dense && (
        <>
          <div
            className="deco deco-blob"
            data-parallax="0.2"
            style={{ width: 460, height: 460, bottom: -220, left: -180 }}
          />
          <span
            className="deco-plus"
            data-parallax="0.55"
            data-depth="28"
            style={{ top: "58%", left: "8%", fontSize: 22 }}
          >
            +
          </span>
          <span
            className="deco-plus deco-plus-cyan"
            data-parallax="0.4"
            style={{ top: "8%", right: "30%", fontSize: 24 }}
          >
            +
          </span>
          <div
            className="deco deco-ring"
            data-parallax="0.5"
            style={{ width: 120, height: 120, top: "12%", left: "22%" }}
          />
        </>
      )}
    </div>
  );
}

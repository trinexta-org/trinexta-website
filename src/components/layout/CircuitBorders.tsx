/**
 * CircuitBorders — circuit des marges de page (>= 2xl).
 *
 * Server Component, zero JS. Il n'y a qu'un courant et il change de cote : la
 * marge gauche mene, se retire, la droite prend le relais, la gauche revient
 * pour la fin de page. Les deux ne sont allumees ensemble que sur les passages
 * de relais. Trace, retrait et impulsion sont tous pilotes par
 * `animation-timeline: scroll(root)`.
 *
 * Les deux dessins sont distincts (pas un miroir) et leurs tuiles ont des
 * hauteurs differentes : les rythmes verticaux ne retombent jamais en phase.
 *
 * Le contraste avec la section traversee est automatique : le motif est un
 * masque sur un `backdrop-filter`, il n'a pas de couleur propre.
 *
 * Toute la mecanique vit dans `.circuit-border` (globals.css) — commentaires
 * detailles la-bas.
 */
export function CircuitBorders() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 hidden 2xl:flex justify-between overflow-hidden"
    >
      <div className="circuit-border circuit-border--left" />
      <div className="circuit-border circuit-border--right" />
    </div>
  )
}

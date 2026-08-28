import { cn } from "@/lib/utils"

/**
 * CircuitBorders — circuit des marges de page (>= 2xl).
 *
 * Server Component, zero JS. Il n'y a qu'un courant et il change de cote a
 * chaque raccord traversant : la marge gauche mene, se retire, la droite prend
 * le relais, la gauche revient, et ainsi de suite jusqu'au bas de page. Les
 * deux marges ne sont allumees ensemble sur aucun instant. Trace, retrait et
 * impulsion sont tous pilotes par le scroll.
 *
 * Une marge s'allume et s'eteint plusieurs fois, sur des timelines
 * differentes : sa presence ne tient donc pas en une animation. Le courant est
 * decoupe en SEGMENTS, un par passage sur une marge, et chaque segment ouvre
 * puis referme deux vannes (`--circuit-gate-in` / `--circuit-gate-out`, dont
 * le produit est son opacite). Ces vannes vivent sur le trace lui-meme : un
 * parent qui animerait l'opacite ouvrirait un backdrop root et priverait le
 * `backdrop-filter` du trace de la page qui defile derriere.
 *
 * L'ordre des segments doit rester l'alternance stricte gauche/droite, leur
 * rang doit correspondre aux classes `--seg-N` de globals.css, et les raccords
 * cites aux `crossing={N}` poses sur les WaveDivider de la page.
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

/**
 * Un passage du courant sur une marge. Le commentaire donne les raccords qui
 * l'encadrent ; les timings, eux, sont dans les regles `--seg-N`.
 */
const SEGMENTS = [
  "left", //  jusqu'au raccord 1
  "right", // du raccord 1 au 2
  "left", //  du raccord 2 au 3
  "right", // du raccord 3 au 4
  "left", //  du raccord 4 au bas de page
] as const

export function CircuitBorders() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 hidden 2xl:block overflow-hidden"
    >
      {SEGMENTS.map((side, index) => (
        <div
          key={index}
          className={cn(
            "circuit-border",
            `circuit-border--seg-${index + 1}`,
            side === "right" && "circuit-border--right",
          )}
        />
      ))}
    </div>
  )
}

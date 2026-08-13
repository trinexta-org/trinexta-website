import { cn } from "@/lib/utils"

/**
 * WaveDivider — remplace la démarcation rectiligne entre deux sections de
 * couleurs différentes par une courbe qui dérive au scroll.
 *
 * À poser ENTRE deux sections, dans le flux (pas en absolute) :
 *
 *   <WhyChooseUs />                                              // bg-surface
 *   <WaveDivider from="surface" to="primary" amplitude="low" />
 *   <InterventionMap />                                          // bg-primary
 *
 * `from` = couleur de la section du dessus, `to` = couleur de celle du dessous.
 * Le fond du bloc porte `from`, une courbe unique et pleine peint `to`.
 *
 * `amplitude` module la respiration : `"ample"` sur les raccords structurants
 * (sortie de hero, entrée et sortie du bloc sombre central), `"low"` ailleurs.
 *
 * Le mouvement est piloté par le scroll (`animation-timeline: view()`), jamais
 * par une boucle permanente : la courbe est figée si le navigateur ne sait pas
 * faire, ou si l'utilisateur a demandé moins de mouvement.
 *
 * `crossing` fait de ce raccord un point de passage du circuit des marges
 * (`CircuitBorders`) : le courant quitte une marge, emprunte la crête de la
 * vague pour traverser la page, et repart dans l'autre. La valeur est le rang
 * du raccord traversant dans la page, à numéroter de 1 en 1 dans l'ordre de
 * lecture — le sens en découle : impair = vers la droite, pair = retour vers
 * la gauche. Ces rangs doivent correspondre à ceux déclarés dans
 * `CircuitBorders`. Sur un raccord traversant la vague ne dérive plus : la
 * traversée est le mouvement.
 */

type Tone = "surface" | "surface-strong" | "primary" | "primary-elevated" | "white"

const TONE_VALUES: Record<Tone, string> = {
  surface: "var(--surface)",
  "surface-strong": "var(--surface-strong)",
  primary: "var(--primary)",
  "primary-elevated": "var(--primary-elevated)",
  white: "var(--primary-foreground)",
}

type Amplitude = "ample" | "low"

const AMPLITUDE_CLASSES: Record<Amplitude, string> = {
  ample: "h-16 md:h-28",
  low: "h-8 md:h-12",
}

interface WaveDividerProps {
  from: Tone
  to: Tone
  /** Hauteur du raccord. Défaut : `"ample"`. */
  amplitude?: Amplitude
  /**
   * Rang de ce raccord parmi les traversées du circuit (1, 2, 3…), dans
   * l'ordre de la page. Absent = raccord ordinaire.
   */
  crossing?: CrossingIndex
  className?: string
}

/** Les rangs déclarés dans globals.css et dans `CircuitBorders`. */
export type CrossingIndex = 1 | 2 | 3 | 4

/**
 * Trois cycles identiques de période 1200, de x=-1200 à x=2400. La dérive au
 * scroll translate d'exactement une période, donc la boucle est invisible et
 * la courbe couvre toujours la zone visible (0 → 1200).
 */
const CYCLE_STARTS = [-1200, 0, 1200]

const WAVE_PATH = [
  `M${CYCLE_STARTS[0]},60`,
  ...CYCLE_STARTS.map(
    (x) => `C${x + 200},18 ${x + 400},102 ${x + 600},60 C${x + 800},18 ${x + 1000},102 ${x + 1200},60`,
  ),
  // Le remplissage deborde sous le viewBox : sans ce debord, l'antialiasing
  // de la derniere ligne de pixels laisse passer le fond du bloc et dessine
  // un lisere d'1 px sur toute la largeur.
  "L2400,140 L-1200,140 Z",
].join(" ")

/**
 * Le seul cycle visible (x = 0 → 1200), en ligne et non en remplissage. Sur le
 * raccord `crossing` la vague ne dérive pas, donc cette courbe est exactement
 * la frontière des deux couleurs : le courant passe sur l'arête, pas à côté.
 */
const WAVE_LINE = `M0,60 C200,18 400,102 600,60 C800,18 1000,102 1200,60`

/**
 * Version pleine du seul cycle visible. Le raccord `crossing` ne dérive pas :
 * il n'a pas besoin des trois cycles, et cette version tient dans la boîte du
 * SVG — c'est ce qui permet de lever le rognage pour laisser le halo déborder.
 */
const WAVE_PATH_STATIC = `${WAVE_LINE} L1200,140 L0,140 Z`

/**
 * Demi-largeur de la bande de révélation, en unités de courbe (1200 = largeur
 * du viewport). Large : c'est ce qui fait qu'une portion entière de l'arête est
 * allumée à la fois, au lieu d'un point qui la parcourt.
 *
 * Toute retouche impose de recalculer `circuit-cross` et les deux relais de
 * marges (`circuit-handoff-*`) — le détail du calcul est dans globals.css.
 */
const SWEEP_HALF_WIDTH = 470

/** Débord vertical du masque : la nappe floutée sort largement de la bande. */
const SWEEP_BLEED = 200

export function WaveDivider({
  from,
  to,
  amplitude = "ample",
  crossing,
  className,
}: WaveDividerProps) {
  /* Plusieurs raccords traversants coexistent dans le document : les défs SVG
     sont donc suffixées par le rang, sinon les masques se confondent. */
  const sweepFadeId = `wave-sweep-fade-${crossing}`
  const sweepMaskId = `wave-sweep-mask-${crossing}`
  const sweepBloomId = `wave-sweep-bloom-${crossing}`

  return (
    <div
      aria-hidden="true"
      className={cn(
        "wave-divider",
        AMPLITUDE_CLASSES[amplitude],
        crossing && [
          "wave-divider--crossing",
          `wave-divider--crossing-${crossing}`,
          crossing % 2 === 0 && "wave-divider--crossing-rtl",
        ],
        className,
      )}
      style={{ backgroundColor: TONE_VALUES[from] }}
    >
      <svg className="wave-divider__svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          className="wave-divider__path"
          fill={TONE_VALUES[to]}
          d={crossing ? WAVE_PATH_STATIC : WAVE_PATH}
        />
        {crossing && (
          /**
           * L'arête entière est doublée d'une ligne de lumière — nappe floutée
           * et cœur blanc — et c'est un masque qui décide de ce qui est allumé
           * à un instant donné. Rien ne se déplace le long de la courbe : c'est
           * une bande de révélation qui balaie, et la ligne s'allume puis
           * s'éteint sur son passage.
           *
           * D'où la lecture voulue : la transition s'illumine progressivement,
           * au lieu qu'un objet la parcoure. Les deux bords de la bande sont
           * dégradés, donc la lumière n'a ni tête ni fin.
           */
          <>
            <defs>
              <linearGradient id={sweepFadeId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#fff" stopOpacity="0" />
                <stop offset="0.5" stopColor="#fff" stopOpacity="1" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
              {/* La bande est centrée sur x=0 et translatée par `--circuit-head` :
                  la variable est donc directement l'abscisse du cœur de la
                  lumière, en unités de courbe. */}
              <mask
                id={sweepMaskId}
                maskUnits="userSpaceOnUse"
                x={-SWEEP_HALF_WIDTH}
                y={-SWEEP_BLEED}
                width={1200 + SWEEP_HALF_WIDTH * 2}
                height={120 + SWEEP_BLEED * 2}
              >
                <rect
                  className="wave-divider__sweep"
                  x={-SWEEP_HALF_WIDTH}
                  y={-SWEEP_BLEED}
                  width={SWEEP_HALF_WIDTH * 2}
                  height={120 + SWEEP_BLEED * 2}
                  fill={`url(#${sweepFadeId})`}
                />
              </mask>
              {/* Flou déclaré en filtre SVG et non en `filter: blur()` CSS : la
                  région d'un filtre CSS sur un élément SVG est sa boîte élargie
                  de 10 %, ce qui couperait la nappe aux crêtes et aux creux,
                  exactement là où elle touche le bord de la boîte. */}
              <filter
                id={sweepBloomId}
                x="-4%"
                y="-140%"
                width="108%"
                height="380%"
                colorInterpolationFilters="sRGB"
              >
                <feGaussianBlur stdDeviation="9" />
              </filter>
            </defs>
            <g mask={`url(#${sweepMaskId})`}>
              <path
                className="wave-divider__cross wave-divider__cross--halo"
                d={WAVE_LINE}
                filter={`url(#${sweepBloomId})`}
              />
              <path className="wave-divider__cross wave-divider__cross--core" d={WAVE_LINE} />
            </g>
          </>
        )}
      </svg>
    </div>
  )
}

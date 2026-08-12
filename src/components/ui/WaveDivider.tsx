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
  className?: string
}

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

export function WaveDivider({ from, to, amplitude = "ample", className }: WaveDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("wave-divider", AMPLITUDE_CLASSES[amplitude], className)}
      style={{ backgroundColor: TONE_VALUES[from] }}
    >
      <svg className="wave-divider__svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path className="wave-divider__path" fill={TONE_VALUES[to]} d={WAVE_PATH} />
      </svg>
    </div>
  )
}

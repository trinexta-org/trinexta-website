import { cn } from "@/lib/utils"

/**
 * WaveDivider — remplace la démarcation rectiligne entre deux sections de
 * couleurs différentes par la vague animée utilisée dans la section partenaires.
 *
 * À poser ENTRE deux sections, dans le flux (pas en absolute) :
 *
 *   <WhyChooseUs />                              // bg-surface
 *   <WaveDivider from="surface" to="primary" />
 *   <InterventionMap />                          // bg-primary
 *
 * `from` = couleur de la section du dessus, `to` = couleur de celle du dessous.
 * Le fond du bloc porte `from`, une courbe unique et pleine peint `to`.
 */

type Tone = "surface" | "surface-strong" | "primary" | "primary-elevated" | "white"

const TONE_VALUES: Record<Tone, string> = {
  surface: "var(--surface)",
  "surface-strong": "var(--surface-strong)",
  primary: "var(--primary)",
  "primary-elevated": "var(--primary-elevated)",
  white: "var(--primary-foreground)",
}

interface WaveDividerProps {
  from: Tone
  to: Tone
  /** Hauteur de la vague (classes Tailwind). Défaut : h-16 md:h-28. */
  className?: string
}

/** Courbe unique et nette, déphasée d'un demi-cycle puis ramenée à l'origine. */
const WAVE_KEYFRAMES = [
  "M0,60 C200,18 400,102 600,60 C800,18 1000,102 1200,60 L1200,120 L0,120 Z",
  "M0,60 C200,102 400,18 600,60 C800,102 1000,18 1200,60 L1200,120 L0,120 Z",
  "M0,60 C200,18 400,102 600,60 C800,18 1000,102 1200,60 L1200,120 L0,120 Z",
]

export function WaveDivider({ from, to, className }: WaveDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("wave-divider h-16 md:h-28", className)}
      style={{ backgroundColor: TONE_VALUES[from] }}
    >
      <svg className="wave-divider__svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path fill={TONE_VALUES[to]} d={WAVE_KEYFRAMES[0]}>
          <animate
            attributeName="d"
            dur="18s"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;0.5;1"
            keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
            values={WAVE_KEYFRAMES.join(";")}
          />
        </path>
      </svg>
    </div>
  )
}

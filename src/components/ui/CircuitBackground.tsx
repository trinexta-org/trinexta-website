import { cn } from "@/lib/utils"

/**
 * CircuitBackground — couche graphique de fond, abstraite et premium : des
 * halos lumineux flous (dégradés radiaux) qui respirent doucement, sans aucune
 * ligne. Bleu `secondary` dominant + quelques touches de lumière blanche pour
 * la profondeur.
 *
 * Server Component pur : SVG, zero JS au runtime. Le mouvement (respiration :
 * drift d'opacité + légère échelle, lent et désynchronisé) est en CSS pur —
 * désactivé si prefers-reduced-motion.
 *
 * Composition ancrée aux BORDS gauche/droite (masque latéral) : le centre reste
 * libre pour le contenu, l'ensemble respire. A poser comme premier enfant d'une
 * Section bg-primary, en pensant a passer le contenu en `relative z-10`.
 */

type Intensity = "low" | "mid" | "high"

// Opacité maitre de la couche (les halos ont déja une alpha douce en interne).
const MESH_OPACITY: Record<Intensity, number> = {
  low: 0.4,
  mid: 0.55,
  high: 0.7,
}

type Tint = "blue" | "glow"

// Halos répartis sur les bandes latérales. r en unités viewBox (1440x900).
type Blob = { cx: number; cy: number; r: number; tint: Tint; dur: number; delay: number }

// cy resserrés sur la bande centrale (~300-600) : les halos n'accrochent jamais
// le bord haut/bas, donc aucune discontinuité avec la section voisine.
const BLOBS: Blob[] = [
  // bord gauche
  { cx: 120, cy: 320, r: 260, tint: "blue", dur: 16, delay: 0 },
  { cx: 250, cy: 450, r: 140, tint: "glow", dur: 13, delay: 4 },
  { cx: 60, cy: 470, r: 230, tint: "blue", dur: 20, delay: 2 },
  { cx: 220, cy: 600, r: 250, tint: "blue", dur: 18, delay: 6 },
  // bord droit
  { cx: 1330, cy: 330, r: 270, tint: "blue", dur: 19, delay: 3 },
  { cx: 1190, cy: 460, r: 150, tint: "glow", dur: 14, delay: 1 },
  { cx: 1390, cy: 480, r: 230, tint: "blue", dur: 17, delay: 5 },
  { cx: 1260, cy: 610, r: 250, tint: "blue", dur: 21, delay: 2.5 },
]

interface CircuitBackgroundProps {
  intensity?: Intensity
  className?: string
}

export function CircuitBackground({
  intensity = "low",
  className,
}: CircuitBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        // Masque combiné : bandes latérales (centre libre) ∩ fondu vertical
        // (halos éteints avant le bord haut/bas → pas de couture entre sections).
        "[mask-image:linear-gradient(to_right,black_0%,black_28%,transparent_42%,transparent_58%,black_72%,black_100%),linear-gradient(to_bottom,transparent_0%,black_25%,black_75%,transparent_100%)]",
        "[mask-composite:intersect] [-webkit-mask-composite:source-in]",
        className,
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        style={{ opacity: MESH_OPACITY[intensity] }}
      >
        <defs>
          <radialGradient id="mesh-blue" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--secondary)" stopOpacity={0.55} />
            <stop offset="45%" stopColor="var(--secondary)" stopOpacity={0.22} />
            <stop offset="100%" stopColor="var(--secondary)" stopOpacity={0} />
          </radialGradient>
          <radialGradient id="mesh-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--primary-foreground)" stopOpacity={0.22} />
            <stop offset="55%" stopColor="var(--primary-foreground)" stopOpacity={0.07} />
            <stop offset="100%" stopColor="var(--primary-foreground)" stopOpacity={0} />
          </radialGradient>
        </defs>

        {BLOBS.map((b, i) => (
          <circle
            key={i}
            cx={b.cx}
            cy={b.cy}
            r={b.r}
            fill={b.tint === "blue" ? "url(#mesh-blue)" : "url(#mesh-glow)"}
            className={cn("mesh-blob", i % 2 === 1 && "mesh-blob--alt")}
            style={{ animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }}
          />
        ))}
      </svg>
    </div>
  )
}

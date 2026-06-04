import { cn } from "@/lib/utils"

/**
 * CircuitBackground — couche graphique de fond derivee de l'identite Trinexta
 * (tracé de circuit imprimé + roue dentée du logo), de maniere abstraite.
 *
 * Server Component pur : SVG, zero JS au runtime. La structure (tracés + roue)
 * reste fixe a faible opacité ; une impulsion lumineuse `secondary` parcourt les
 * tracés vers les pads (flux d'énergie), en CSS pur — désactivée si
 * prefers-reduced-motion. A poser comme premier enfant d'une Section bg-primary,
 * en pensant a passer le contenu en `relative z-10`.
 */

type Intensity = "low" | "mid" | "high"
type Variant = "traces" | "gear" | "both"

// Opacité de la structure fixe (tracés, pads, roue) — discrète.
const STRUCTURE_OPACITY: Record<Intensity, number> = {
  low: 0.06,
  mid: 0.08,
  high: 0.11,
}

// Opacité du flux animé — plus marquée pour donner la sensation d'énergie.
const FLUX_OPACITY: Record<Intensity, number> = {
  low: 0.45,
  mid: 0.6,
  high: 0.75,
}

// Tracés orthogonaux avec chanfreins 45° terminés par un pad — langage PCB.
// viewBox 1440x900, composition asymetrique volontaire (entrees gauche + droite).
const TRACES: { d: string; end: [number, number]; dur: number; delay: number }[] = [
  { d: "M0,180 H240 l48,48 H560", end: [560, 228], dur: 5.5, delay: 0 },
  { d: "M0,360 H140 l64,-64 H380 l40,40 H620", end: [620, 336], dur: 6.5, delay: 1.8 },
  { d: "M0,560 H300 l48,48 H520 l0,80", end: [520, 688], dur: 5, delay: 3.2 },
  { d: "M0,740 H180 l56,-56 H480", end: [480, 684], dur: 6, delay: 0.9 },
  { d: "M1440,120 H1200 l-48,48 H980", end: [980, 168], dur: 5.8, delay: 2.6 },
  { d: "M1440,420 H1160 l-64,64 H900 l-48,-48 H700", end: [700, 436], dur: 7, delay: 1.2 },
  { d: "M1440,680 H1240 l-40,-40 H1020", end: [1020, 640], dur: 5.3, delay: 4 },
]

// Vias / nodes isoles, pour densifier sans surcharger.
const VIAS: { cx: number; cy: number; r: number }[] = [
  { cx: 760, cy: 300, r: 4 },
  { cx: 1080, cy: 560, r: 3 },
  { cx: 360, cy: 470, r: 3 },
  { cx: 900, cy: 760, r: 4 },
]

/**
 * Génère le path d'une roue dentée trapezoïdale (dents droites, propres a bas
 * opacity) centrée en (cx,cy). teeth dents, rayon de tête rOuter, de pied rInner.
 */
function gearPath(
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  teeth: number,
  toothRatio = 0.55,
): string {
  const step = (Math.PI * 2) / teeth
  const half = (step * toothRatio) / 2
  const pts: [number, number][] = []

  for (let i = 0; i < teeth; i++) {
    const a = i * step
    pts.push([a - half, rOuter]) // montée tête
    pts.push([a + half, rOuter]) // tête
    pts.push([a + half, rInner]) // descente pied
    pts.push([a + step - half, rInner]) // pied jusqu'a la dent suivante
  }

  return (
    pts
      .map(([ang, r], idx) => {
        const x = (cx + Math.cos(ang) * r).toFixed(2)
        const y = (cy + Math.sin(ang) * r).toFixed(2)
        return `${idx === 0 ? "M" : "L"}${x},${y}`
      })
      .join(" ") + " Z"
  )
}

interface CircuitBackgroundProps {
  variant?: Variant
  intensity?: Intensity
  className?: string
}

export function CircuitBackground({
  variant = "both",
  intensity = "low",
  className,
}: CircuitBackgroundProps) {
  const showTraces = variant === "traces" || variant === "both"
  const showGear = variant === "gear" || variant === "both"

  // Roue fragmentée dans le coin bas-droit : centre hors-cadre => ~1/4 visible.
  const gear = gearPath(1380, 880, 300, 244, 18)

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        "[mask-image:radial-gradient(120%_120%_at_50%_40%,black_55%,transparent_100%)]",
        className,
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Structure fixe : tracés + vias */}
        {showTraces && (
          <g style={{ opacity: STRUCTURE_OPACITY[intensity] }}>
            <g
              stroke="var(--primary-foreground)"
              strokeWidth={1.25}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            >
              {TRACES.map((t, i) => (
                <path key={i} d={t.d} />
              ))}
            </g>
            {VIAS.map((v, i) => (
              <circle
                key={i}
                cx={v.cx}
                cy={v.cy}
                r={v.r}
                fill="var(--primary-foreground)"
              />
            ))}
          </g>
        )}

        {/* Flux d'énergie : impulsion lumineuse qui court le tracé vers le pad */}
        {showTraces && (
          <g
            style={{ opacity: FLUX_OPACITY[intensity], filter: "drop-shadow(0 0 3px var(--secondary))" }}
            stroke="var(--secondary)"
            strokeWidth={2}
            strokeLinecap="round"
            fill="none"
          >
            {TRACES.map((t, i) => (
              <path
                key={i}
                d={t.d}
                pathLength={1000}
                strokeDasharray="36 964"
                className="circuit-flux"
                vectorEffect="non-scaling-stroke"
                style={{ animationDuration: `${t.dur}s`, animationDelay: `${t.delay}s` }}
              />
            ))}
          </g>
        )}

        {/* Pads de terminaison : s'illuminent quand l'impulsion les atteint (sync dur/delay) */}
        {showTraces && (
          <g>
            {TRACES.map((t, i) => (
              <g
                key={i}
                className="circuit-pad"
                style={{ animationDuration: `${t.dur}s`, animationDelay: `${t.delay}s` }}
              >
                <circle
                  cx={t.end[0]}
                  cy={t.end[1]}
                  r={6}
                  fill="none"
                  stroke="var(--secondary)"
                  strokeWidth={1.5}
                  vectorEffect="non-scaling-stroke"
                />
                <circle cx={t.end[0]} cy={t.end[1]} r={2.5} fill="var(--secondary)" />
              </g>
            ))}
          </g>
        )}

        {/* Structure fixe : roue dentée fragmentée */}
        {showGear && (
          <g
            style={{ opacity: STRUCTURE_OPACITY[intensity] }}
            stroke="var(--secondary)"
            strokeWidth={1.5}
            strokeLinejoin="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
          >
            <path d={gear} />
            <circle cx={1380} cy={880} r={150} />
            <circle cx={1380} cy={880} r={92} />
          </g>
        )}
      </svg>
    </div>
  )
}

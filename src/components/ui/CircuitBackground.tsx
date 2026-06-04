import { cn } from "@/lib/utils"

/**
 * CircuitBackground — couche graphique de fond derivee de l'identite Trinexta
 * (tracé de circuit imprimé), de maniere abstraite.
 *
 * Server Component pur : SVG, zero JS au runtime. La structure (tracés) reste
 * fixe a faible opacité ; une impulsion lumineuse `secondary` entre par le bord
 * et court jusqu'au pad qu'elle illumine (flux d'énergie), en CSS pur —
 * désactivée si prefers-reduced-motion.
 *
 * Composition ancrée aux BORDS gauche/droite : le centre reste libre pour le
 * contenu (masque latéral). A poser comme premier enfant d'une Section
 * bg-primary, en pensant a passer le contenu en `relative z-10`.
 */

type Intensity = "low" | "mid" | "high"

// Opacité de la structure fixe (tracés, vias) — discrète.
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

// Tracés orthogonaux + chanfreins 45°, terminés par un pad — langage PCB.
// viewBox 1440x900. Deux grappes ancrées aux bords : pads hors zone centrale.
const TRACES: { d: string; end: [number, number]; dur: number; delay: number }[] = [
  // bord gauche
  { d: "M0,120 H180 l40,40 H300", end: [300, 160], dur: 5.5, delay: 0 },
  { d: "M0,300 H120 l48,-48 H260 l32,32 H380", end: [380, 284], dur: 6.5, delay: 1.8 },
  { d: "M0,480 H220 l40,40 H340", end: [340, 520], dur: 5, delay: 3.2 },
  { d: "M0,660 H140 l56,56 H300", end: [300, 716], dur: 6, delay: 0.9 },
  { d: "M0,820 H260", end: [260, 820], dur: 5.3, delay: 2.4 },
  // bord droit
  { d: "M1440,160 H1260 l-40,40 H1120", end: [1120, 200], dur: 5.8, delay: 2.6 },
  { d: "M1440,340 H1320 l-48,-48 H1180 l-32,32 H1040", end: [1040, 324], dur: 7, delay: 1.2 },
  { d: "M1440,520 H1220 l-40,40 H1100", end: [1100, 560], dur: 5.4, delay: 3.6 },
  { d: "M1440,700 H1300 l-56,-56 H1140", end: [1140, 644], dur: 6.2, delay: 0.4 },
  { d: "M1440,860 H1180", end: [1180, 860], dur: 5, delay: 4 },
]

// Vias / nodes isolés dans les bandes latérales, pour densifier sans surcharger.
const VIAS: { cx: number; cy: number; r: number }[] = [
  { cx: 90, cy: 400, r: 3 },
  { cx: 200, cy: 610, r: 3 },
  { cx: 130, cy: 230, r: 4 },
  { cx: 1350, cy: 460, r: 3 },
  { cx: 1240, cy: 760, r: 4 },
  { cx: 1310, cy: 250, r: 3 },
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
        // bandes latérales gauche/droite, centre libre pour le contenu
        "[mask-image:linear-gradient(to_right,black_0%,black_24%,transparent_38%,transparent_62%,black_76%,black_100%)]",
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
            <circle key={i} cx={v.cx} cy={v.cy} r={v.r} fill="var(--primary-foreground)" />
          ))}
        </g>

        {/* Flux d'énergie : impulsion lumineuse qui court le tracé vers le pad */}
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

        {/* Pads de terminaison : s'illuminent quand l'impulsion les atteint (sync dur/delay) */}
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
      </svg>
    </div>
  )
}

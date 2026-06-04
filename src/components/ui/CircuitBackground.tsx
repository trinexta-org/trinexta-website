import { cn } from "@/lib/utils"

/**
 * CircuitBackground — couche graphique de fond derivee de l'identite Trinexta
 * (tracé de circuit imprimé), de maniere abstraite mais credible.
 *
 * Server Component pur : SVG, zero JS au runtime. La structure (tracés, vias,
 * pads, plots de fixation) reste fixe a faible opacité ; sur quelques routes
 * « spine », une impulsion lumineuse `secondary` entre par le bord et court
 * jusqu'au pad qu'elle illumine (flux d'énergie), en CSS pur — désactivée si
 * prefers-reduced-motion.
 *
 * Réalisme PCB : bus de tracés parallèles, coudes a 45° marqués par des vias,
 * méandres d'égalisation de longueur, pads ronds (traversants) et SMD, plots de
 * fixation. Composition ancrée aux BORDS gauche/droite (masque latéral) : le
 * centre reste libre pour le contenu. A poser comme premier enfant d'une Section
 * bg-primary, en pensant a passer le contenu en `relative z-10`.
 */

type Intensity = "low" | "mid" | "high"

// Opacité de la structure fixe — discrète (densité plus élevée -> on baisse).
const STRUCTURE_OPACITY: Record<Intensity, number> = {
  low: 0.05,
  mid: 0.07,
  high: 0.1,
}

// Opacité du flux animé — plus marquée pour donner la sensation d'énergie.
const FLUX_OPACITY: Record<Intensity, number> = {
  low: 0.45,
  mid: 0.6,
  high: 0.75,
}

// Coudes a 45° + segments orthogonaux. viewBox 1440x900.
// Méandre d'égalisation de longueur (le « serpentin » des traces haute vitesse).
const MEANDER_L = "v20 h22 v-40 h22 v40 h22 v-40 h22 v20"
const MEANDER_R = "v20 h-22 v-40 h-22 v40 h-22 v-40 h-22 v20"

type Trace = { d: string; w?: number }

// Routes « spine » : portent l'impulsion et se terminent sur un pad illuminé.
type Spine = Trace & {
  end: [number, number]
  pad: "round" | "smd"
  dur: number
  delay: number
}

const SPINES: Spine[] = [
  // bord gauche
  { d: "M0,120 H140 l34,-34 H300", end: [300, 86], pad: "round", w: 1.5, dur: 5.6, delay: 0 },
  { d: `M0,430 H120 ${MEANDER_L} H320`, end: [320, 430], pad: "round", w: 1.25, dur: 7.2, delay: 1.6 },
  { d: "M0,650 H70 l44,44 H300", end: [300, 694], pad: "smd", w: 2, dur: 6, delay: 3.1 },
  // bord droit
  { d: "M1440,150 H1300 l-34,-34 H1140", end: [1140, 116], pad: "round", w: 1.5, dur: 5.9, delay: 2.4 },
  { d: `M1440,450 H1320 ${MEANDER_R} H1120`, end: [1120, 450], pad: "round", w: 1.25, dur: 7, delay: 0.7 },
  { d: "M1440,670 H1370 l-44,44 H1140", end: [1140, 714], pad: "smd", w: 2, dur: 6.3, delay: 3.8 },
]

// Tracés statiques : compagnons de bus, stubs et branches — densité PCB.
const STATIC: Trace[] = [
  // gauche
  { d: "M0,138 H122 l34,-34 H280", w: 1 },
  { d: "M0,210 H100 l30,30 H260", w: 1.25 },
  // bus de puissance (3 traces parallèles, coude commun)
  { d: "M0,300 H80 l40,40 H360", w: 2 },
  { d: "M0,320 H80 l40,40 H340", w: 2 },
  { d: "M0,340 H80 l40,40 H320", w: 2 },
  { d: "M0,540 H160 l30,-30 H300", w: 1.25 },
  { d: "M0,672 H70 l44,44 H280", w: 1 },
  { d: "M0,770 H120 l28,28 H300", w: 1.25 },
  { d: "M0,840 H240", w: 1 },
  // droite
  { d: "M1440,240 H1340 l-30,30 H1180", w: 1.25 },
  { d: "M1440,330 H1360 l-40,40 H1080", w: 2 },
  { d: "M1440,350 H1360 l-40,40 H1100", w: 2 },
  { d: "M1440,370 H1360 l-40,40 H1120", w: 2 },
  { d: "M1440,560 H1280 l-30,-30 H1140", w: 1.25 },
  { d: "M1440,692 H1370 l-44,44 H1160", w: 1 },
  { d: "M1440,780 H1320 l-28,28 H1140", w: 1.25 },
  { d: "M1440,850 H1200", w: 1 },
]

// Vias aux coudes / jonctions — petits plots métallisés.
const VIAS: { cx: number; cy: number; r: number }[] = [
  { cx: 140, cy: 120, r: 2.5 },
  { cx: 100, cy: 210, r: 2.5 },
  { cx: 80, cy: 300, r: 3 },
  { cx: 80, cy: 320, r: 3 },
  { cx: 80, cy: 340, r: 3 },
  { cx: 120, cy: 430, r: 2.5 },
  { cx: 160, cy: 540, r: 2.5 },
  { cx: 70, cy: 650, r: 3 },
  { cx: 70, cy: 672, r: 2.5 },
  { cx: 120, cy: 770, r: 2.5 },
  { cx: 1300, cy: 150, r: 2.5 },
  { cx: 1340, cy: 240, r: 2.5 },
  { cx: 1360, cy: 330, r: 3 },
  { cx: 1360, cy: 350, r: 3 },
  { cx: 1360, cy: 370, r: 3 },
  { cx: 1320, cy: 450, r: 2.5 },
  { cx: 1280, cy: 560, r: 2.5 },
  { cx: 1370, cy: 670, r: 3 },
  { cx: 1320, cy: 780, r: 2.5 },
]

// Plots de fixation (mounting holes) — anneau + couronne.
const MOUNTS: { cx: number; cy: number }[] = [
  { cx: 60, cy: 480 },
  { cx: 1380, cy: 420 },
]

interface CircuitBackgroundProps {
  intensity?: Intensity
  className?: string
}

const SMD_W = 11
const SMD_H = 7

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
        {/* Structure fixe : tracés (largeurs variées), vias, plots, pads éteints */}
        <g
          style={{ opacity: STRUCTURE_OPACITY[intensity] }}
          stroke="var(--primary-foreground)"
          fill="var(--primary-foreground)"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <g fill="none" vectorEffect="non-scaling-stroke">
            {STATIC.map((t, i) => (
              <path key={i} d={t.d} strokeWidth={t.w ?? 1.25} vectorEffect="non-scaling-stroke" />
            ))}
          </g>
          {VIAS.map((v, i) => (
            <circle key={i} cx={v.cx} cy={v.cy} r={v.r} />
          ))}
          {/* Plots de fixation : couronne + anneau interne */}
          {MOUNTS.map((m, i) => (
            <g key={i} fill="none" vectorEffect="non-scaling-stroke">
              <circle cx={m.cx} cy={m.cy} r={11} strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
              <circle cx={m.cx} cy={m.cy} r={5} strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
            </g>
          ))}
        </g>

        {/* Base des routes spine : même conducteur que la pulse et le pad (bleu
            faible), pour que la terminaison se fonde sans trait fixe derrière. */}
        <g
          style={{ opacity: STRUCTURE_OPACITY[intensity] * 1.6 }}
          stroke="var(--secondary)"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          {SPINES.map((t, i) => (
            <path key={i} d={t.d} strokeWidth={(t.w ?? 1.25) + 0.75} vectorEffect="non-scaling-stroke" />
          ))}
          {/* Plot plein sous chaque pad : fond uniforme = aucun liseré du tracé. */}
          {SPINES.map((t, i) =>
            t.pad === "round" ? (
              <circle key={i} cx={t.end[0]} cy={t.end[1]} r={6} fill="var(--secondary)" stroke="none" />
            ) : (
              <rect
                key={i}
                x={t.end[0] - SMD_W / 2}
                y={t.end[1] - SMD_H / 2}
                width={SMD_W}
                height={SMD_H}
                rx={1.5}
                fill="var(--secondary)"
                stroke="none"
              />
            ),
          )}
        </g>

        {/* Flux d'énergie : impulsion lumineuse qui court le tracé vers le pad */}
        <g
          style={{ opacity: FLUX_OPACITY[intensity], filter: "drop-shadow(0 0 3px var(--secondary))" }}
          stroke="var(--secondary)"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          {SPINES.map((t, i) => (
            <path
              key={i}
              d={t.d}
              pathLength={1000}
              strokeWidth={(t.w ?? 1.25) + 0.75}
              strokeDasharray="36 964"
              className="circuit-flux"
              vectorEffect="non-scaling-stroke"
              style={{ animationDuration: `${t.dur}s`, animationDelay: `${t.delay}s` }}
            />
          ))}
        </g>

        {/* Pads de terminaison : s'illuminent quand l'impulsion les atteint */}
        <g>
          {SPINES.map((t, i) => (
            <g
              key={i}
              className="circuit-pad"
              style={{ animationDuration: `${t.dur}s`, animationDelay: `${t.delay}s` }}
            >
              {t.pad === "round" ? (
                <>
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
                </>
              ) : (
                <rect
                  x={t.end[0] - SMD_W / 2}
                  y={t.end[1] - SMD_H / 2}
                  width={SMD_W}
                  height={SMD_H}
                  rx={1.5}
                  fill="var(--secondary)"
                />
              )}
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}

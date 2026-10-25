import { cn } from "@/lib/utils"

// Engrenage de la maquette du diagnostic : huit dents, moyeu évidé. Il ne
// tourne que s'il est affiché (pendant la requête) et jamais sous
// prefers-reduced-motion (variante motion-safe).

function cheminEngrenage(): string {
  const cx = 32
  const cy = 32
  const dents = 8
  const sommet = 30
  const pied = 23
  const moyeu = 12
  const pas = (2 * Math.PI) / dents
  const largeurPied = pas * 0.62
  const largeurSommet = pas * 0.34
  const point = (angle: number, rayon: number) =>
    `${(cx + Math.cos(angle) * rayon).toFixed(1)},${(cy + Math.sin(angle) * rayon).toFixed(1)}`
  const points: string[] = []
  for (let i = 0; i < dents; i++) {
    const milieu = i * pas
    points.push(
      point(milieu - largeurPied / 2, pied),
      point(milieu - largeurSommet / 2, sommet),
      point(milieu + largeurSommet / 2, sommet),
      point(milieu + largeurPied / 2, pied)
    )
  }
  return `M ${points.join(" L ")} Z M ${cx + moyeu} ${cy} A ${moyeu} ${moyeu} 0 1 0 ${cx - moyeu} ${cy} A ${moyeu} ${moyeu} 0 1 0 ${cx + moyeu} ${cy} Z`
}

const CHEMIN = cheminEngrenage()

export function Engrenage({ className, tourne = false }: { className?: string; tourne?: boolean }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width="96"
      height="96"
      aria-hidden="true"
      className={cn("shrink-0 fill-secondary", tourne && "motion-safe:animate-[spin_1.6s_linear_infinite]", className)}
    >
      <path d={CHEMIN} fillRule="evenodd" />
    </svg>
  )
}

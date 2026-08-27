import { cn } from "@/lib/utils"

/**
 * SectionBackground — fond decoratif unique des sections de la landing.
 * Server Component, zero JS, mesh de degrades radiaux en CSS pur : aucun
 * filtre SVG plein ecran, rien d'anime.
 *
 * A poser en premier enfant d'une Section `relative overflow-hidden`, le
 * contenu restant en `relative z-10` :
 *
 *   <Section container={false} className="relative bg-primary overflow-hidden">
 *     <SectionBackground tone="dark" intensity="mid" />
 *     <Container className="relative z-10">…</Container>
 *   </Section>
 *
 * La primitive ne peint PAS la couleur de fond : elle module celle que porte
 * deja la Section (`bg-surface` ou `bg-primary`). `tone` doit donc s'accorder
 * a cette couleur, sinon le mesh se lit comme un voile.
 */

type Tone = "light" | "dark"
type Intensity = "low" | "mid" | "high"

interface SectionBackgroundProps {
  /** Accorde le mesh a la couleur de la Section. */
  tone: Tone
  /** Amplitude du mesh. Defaut : `"mid"`. */
  intensity?: Intensity
  className?: string
}

export function SectionBackground({
  tone,
  intensity = "mid",
  className,
}: SectionBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("section-bg", `section-bg--${tone}`, `section-bg--${intensity}`, className)}
    />
  )
}

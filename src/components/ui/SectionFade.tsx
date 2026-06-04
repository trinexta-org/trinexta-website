import { cn } from "@/lib/utils"

/**
 * SectionFade — raccord doux entre deux sections sombres. Éteint le décor de
 * fond (halos, vignettes, motifs) en `primary` uni sur le bord choisi, pour
 * remplacer une ligne de démarcation nette par un dégradé.
 *
 * À poser dans une Section `relative overflow-hidden`, APRÈS les couches de
 * fond décoratives et AVANT le contenu (que l'on garde en `relative z-10`) :
 *
 *   <Section className="relative bg-primary overflow-hidden">
 *     <HaloBackground />
 *     <SectionFade edge="bottom" />
 *     <Container className="relative z-10">…</Container>
 *   </Section>
 *
 * `edge="both"` rend les deux bords.
 */

type Edge = "top" | "bottom" | "both"

interface SectionFadeProps {
  edge?: Edge
  /** Hauteur du fondu (classes Tailwind). Défaut : h-24 md:h-32. */
  className?: string
}

function Fade({ edge, className }: { edge: "top" | "bottom"; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 z-0 h-24 md:h-32",
        edge === "top"
          ? "top-0 bg-gradient-to-b from-primary to-transparent"
          : "bottom-0 bg-gradient-to-t from-primary to-transparent",
        className,
      )}
    />
  )
}

export function SectionFade({ edge = "bottom", className }: SectionFadeProps) {
  if (edge === "both") {
    return (
      <>
        <Fade edge="top" className={className} />
        <Fade edge="bottom" className={className} />
      </>
    )
  }
  return <Fade edge={edge} className={className} />
}

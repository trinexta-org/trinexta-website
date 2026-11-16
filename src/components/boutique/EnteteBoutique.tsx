import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { SectionBackground } from "@/components/ui/SectionBackground"
import { Heading } from "@/components/ui/Typography"
import { FilAriane, type Etape } from "./FilAriane"
import { Recherche } from "./Recherche"

/** En-tête compact des pages boutique : fil d'Ariane, titre, accroche, recherche. */
export function EnteteBoutique({
  etapes,
  surtitre,
  titre,
  intro,
  recherche = true,
  valeurRecherche,
}: {
  etapes: Etape[]
  surtitre?: string
  titre: string
  intro?: string
  recherche?: boolean
  valeurRecherche?: string
}) {
  return (
    <Section container={false} className="relative overflow-hidden bg-primary py-10 md:py-14 lg:py-16">
      <SectionBackground tone="dark" intensity="low" />
      <Container className="relative z-10 flex flex-col gap-6">
        <FilAriane etapes={etapes} sombre />
        <div className="flex flex-col gap-4">
          {surtitre && (
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary-soft">{surtitre}</p>
          )}
          <Heading as="h1" className="max-w-4xl text-3xl leading-tight text-white md:text-5xl">
            {titre}
          </Heading>
          {intro && <p className="max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">{intro}</p>}
        </div>
        {recherche && <Recherche valeur={valeurRecherche} sombre />}
      </Container>
    </Section>
  )
}

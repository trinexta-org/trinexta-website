import Link from "next/link"
import { Section } from "@/components/layout/Section"
import { Heading, Text } from "@/components/ui/Typography"
import { Button } from "@/components/ui/Button"
import { BOUTIQUE_BIENTOT } from "@/data/boutique/ouverture"

/** Page d'attente tant que la boutique n'est pas ouverte (voir `BOUTIQUE_OUVERTE`). */
export function BoutiqueBientot() {
  return (
    <Section className="bg-surface">
      <div className="mx-auto flex min-h-[50vh] max-w-2xl flex-col items-center justify-center gap-6 text-center">
        <Text className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{BOUTIQUE_BIENTOT.surtitre}</Text>
        <Heading as="h1">{BOUTIQUE_BIENTOT.titre}</Heading>
        <Text className="text-muted-foreground">{BOUTIQUE_BIENTOT.texte}</Text>
        <Button asChild variant="secondary" size="lg">
          <Link href={BOUTIQUE_BIENTOT.href}>{BOUTIQUE_BIENTOT.cta}</Link>
        </Button>
      </div>
    </Section>
  )
}

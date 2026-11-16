import Link from "next/link"
import { Section } from "@/components/layout/Section"
import { Heading, Text } from "@/components/ui/Typography"
import { Button } from "@/components/ui/Button"
import { BOUTIQUE_REPLI } from "@/data/boutique"

/** Affiché quand l'API ne répond pas : jamais d'erreur technique visible. */
export function Repli() {
  return (
    <Section className="bg-surface">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <Heading as="h2" emphasis={false}>
          {BOUTIQUE_REPLI.titre}
        </Heading>
        <Text className="text-muted-foreground">{BOUTIQUE_REPLI.texte}</Text>
        <Button asChild variant="secondary" size="lg">
          <Link href={BOUTIQUE_REPLI.href}>{BOUTIQUE_REPLI.cta}</Link>
        </Button>
      </div>
    </Section>
  )
}

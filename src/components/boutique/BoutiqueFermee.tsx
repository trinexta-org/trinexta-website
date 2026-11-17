import Link from "next/link"
import { Section } from "@/components/layout/Section"
import { Heading } from "@/components/ui/Typography"
import { BOUTIQUE_FERMEE } from "@/data/boutique/ouverture"

export function BoutiqueFermee() {
  return (
    <Section className="py-16 md:py-24 lg:py-28">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-secondary-strong">{BOUTIQUE_FERMEE.surtitre}</p>
        <Heading as="h1" className="text-3xl md:text-4xl">{BOUTIQUE_FERMEE.titre}</Heading>
        <p className="text-lg leading-relaxed text-muted-foreground">{BOUTIQUE_FERMEE.texte}</p>
        <Link
          href={BOUTIQUE_FERMEE.cta.href}
          className="rounded-full bg-primary px-6 py-3 font-bold text-white transition-colors hover:bg-primary/90"
        >
          {BOUTIQUE_FERMEE.cta.label}
        </Link>
      </div>
    </Section>
  )
}

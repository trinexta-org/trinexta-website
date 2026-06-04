import type { Metadata } from "next"
import { Section } from "@/components/layout/Section"
import { LegalContent } from "@/components/legal/LegalContent"
import { FinalCTA } from "@/components/FinalCTA"
import { dpaData } from "@/data/dpa"

export const metadata: Metadata = {
  title: `${dpaData.hero.title} - Trinexta`,
  description: "Accord de traitement des données personnelles (DPA) - cadre contractuel RGPD encadrant les traitements réalisés par TRINEXTA pour le compte de ses clients.",
}

export default function AccordTraitementDonneesPage() {
  return (
    <main className="bg-primary min-h-screen relative space-y-12 pb-12">
      <Section className="bg-primary pt-24 pb-24">
        <LegalContent data={dpaData} />
      </Section>

      <FinalCTA
        line1="Vous aider à"
        line2="surmonter vos"
        line3="défis technologiques"
        description="Trinexta by Trustech IT Support simplifie et sécurise votre informatique. Un accompagnement fiable, souple et adapté à votre performance."
        ctaLabel="En savoir plus"
        ctaHref="/nos-offres"
      />
    </main>
  )
}

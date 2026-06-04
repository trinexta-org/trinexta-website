import type { Metadata } from "next"
import { Section } from "@/components/layout/Section"
import { LegalContent } from "@/components/legal/LegalContent"
import { FinalCTA } from "@/components/FinalCTA"
import { slaData } from "@/data/sla"

export const metadata: Metadata = {
  title: `${slaData.hero.title} - Trinexta`,
  description: "Accord de niveau de service (SLA) TRINEXTA - horaires de support, délais d'intervention, niveaux de priorité et engagements de disponibilité.",
}

export default function NiveauDeServicePage() {
  return (
    <main className="bg-primary min-h-screen relative space-y-12 pb-12">
      <Section className="bg-primary pt-24 pb-24">
        <LegalContent data={slaData} />
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

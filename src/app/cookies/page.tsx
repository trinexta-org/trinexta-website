import type { Metadata } from "next"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { PageHero } from "@/components/layout/PageHero"
import { LegalContent } from "@/components/legal/LegalContent"
import { FinalCTA } from "@/components/FinalCTA"
import { cookiesData } from "@/data/cookies"

export const metadata: Metadata = {
  title: `${cookiesData.hero.title} — Trinexta`,
  description: "Politique de gestion des cookies du site Trinexta. Découvrez comment nous utilisons les cookies et gérez vos préférences.",
}

export default function CookiesPage() {
  return (
    <main className="bg-primary min-h-screen relative space-y-12 pb-12">
      <PageHero title={cookiesData.hero.title} imageSrc={cookiesData.hero.imageSrc} />
      
      <Section className="bg-primary pb-24">
        <Container>
          <LegalContent data={cookiesData} />
        </Container>
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
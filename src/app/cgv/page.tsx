import type { Metadata } from "next"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { PageHero } from "@/components/layout/PageHero"
import { LegalContent } from "@/components/legal/LegalContent"
import { FinalCTA } from "@/components/FinalCTA"
import { cgvData } from "@/data/cgv"

export const metadata: Metadata = {
  title: `${cgvData.hero.title} — Trinexta`,
  description: "Conditions Générales d'Utilisation du site Trinexta et description de nos services informatiques.",
}

export default function CgvPage() {
  return (
    <main className="bg-primary min-h-screen relative space-y-12 pb-12">
      <PageHero title={cgvData.hero.title} imageSrc={cgvData.hero.imageSrc} />
      
      <Section className="bg-primary pb-24">
        <Container>
          <LegalContent data={cgvData} />
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
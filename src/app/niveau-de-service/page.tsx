import type { Metadata } from "next"
import { Section } from "@/components/layout/Section"
import { LegalContent } from "@/components/legal/LegalContent"
import { FinalCTA } from "@/components/FinalCTA"
import { slaData } from "@/data/sla"
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd"

export const metadata: Metadata = {
  title: "Horaires et niveaux de service",
  description: "Horaires du support, qualification des incidents et objectifs de prise en charge : consultez les engagements applicables selon votre proposition.",
  alternates: {
    canonical: "/niveau-de-service",
  },
}

export default function NiveauDeServicePage() {
  return (
     <main className="min-h-screen bg-surface">
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" },
          { name: "Niveaux de service", url: "/niveau-de-service" },
        ]}
      />

      <Section className="bg-surface pt-24 pb-24">
        <LegalContent data={slaData} />
      </Section>

      <FinalCTA
        line1="Vous aider à"
        line2="surmonter vos"
        line3="défis technologiques"
        description="Trinexta by Trustech IT Support simplifie et sécurise votre informatique. Un accompagnement fiable, souple et adapté à votre performance."
        ctaLabel="En savoir plus"
        ctaHref="/serenite"
      />
    </main>
  )
}
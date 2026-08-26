import type { Metadata } from "next"
import { Section } from "@/components/layout/Section"
import { LegalContent } from "@/components/legal/LegalContent"
import { FinalCTA } from "@/components/FinalCTA"
import { charteAssistanceData } from "@/data/charte-assistance"
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd"

export const metadata: Metadata = {
  title: charteAssistanceData.hero.title,
  description:
    "Assistance cybersécurité TRINEXTA - procédures d'urgence, conseils pratiques et ressources officielles en cas d'incident de sécurité informatique.",
  alternates: {
    canonical: "/charte-assistance",
  },
}

export default function CharteAssistancePage() {
  return (
    <main className="min-h-screen bg-[#EEF4FB]">
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" },
          {
            name: "Charte assistance",
            url: "/charte-assistance",
          },
        ]}
      />

      <Section className="bg-[#EEF4FB] pt-24 pb-24">
        <LegalContent data={charteAssistanceData} />
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
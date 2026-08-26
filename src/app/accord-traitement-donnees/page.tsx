import type { Metadata } from "next"
import { Section } from "@/components/layout/Section"
import { LegalContent } from "@/components/legal/LegalContent"
import { FinalCTA } from "@/components/FinalCTA"
import { dpaData as accordTraitementDonneesData } from "@/data/dpa"
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd"

export const metadata: Metadata = {
  title: accordTraitementDonneesData.hero.title,
  description:
    "Accord de traitement des données de TRINEXTA conformément au RGPD.",
  alternates: {
    canonical: "/accord-traitement-donnees",
  },
}

export default function AccordTraitementDonneesPage() {
  return (
    <main className="min-h-screen bg-[#EEF4FB]">
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" },
          {
            name: "Accord de traitement des données",
            url: "/accord-traitement-donnees",
          },
        ]}
      />

      <Section className="bg-[#EEF4FB] pt-24 pb-24">
        <LegalContent data={accordTraitementDonneesData} />
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
import type { Metadata } from "next"
import { Section } from "@/components/layout/Section"
import { LegalContent } from "@/components/legal/LegalContent"
import { FinalCTA } from "@/components/FinalCTA"
import { cgvData } from "@/data/cgv"
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd"

export const metadata: Metadata = {
  title: cgvData.hero.title,
  description:
    "Conditions Générales de Vente de TRINEXTA.",
  alternates: {
    canonical: "/cgv",
  },
}

export default function CGVPage() {
  return (
    <main className="min-h-screen bg-[#EEF4FB]">
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" },
          {
            name: "Conditions Générales de Vente",
            url: "/cgv",
          },
        ]}
      />

      <Section className="bg-[#EEF4FB] pt-24 pb-24">
        <LegalContent data={cgvData} />
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
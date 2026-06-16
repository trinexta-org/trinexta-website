import type { Metadata } from "next"
import { Section } from "@/components/layout/Section"
import { LegalContent } from "@/components/legal/LegalContent"
import { FinalCTA } from "@/components/FinalCTA"
import { confidentialiteData } from "@/data/confidentialite"
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd"

export const metadata: Metadata = {
  title: `${confidentialiteData.hero.title}`,
  description: "Politique de confidentialité de Trinexta : découvrez comment nous protégeons et traitons vos données personnelles.",
  alternates: {
    canonical: "/confidentialite",
  },
}

export default function ConfidentialitePage() {
  return (
    <main className="bg-primary min-h-screen relative space-y-12 pb-12">
      <BreadcrumbJsonLd 
        items={[
        { name: "Accueil", url: "/" },
        { name: "confidentialite", url: "/confidentialite" }
        ]} 
      />
      <Section className="bg-primary pt-24 pb-24">
        <LegalContent data={confidentialiteData} />
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

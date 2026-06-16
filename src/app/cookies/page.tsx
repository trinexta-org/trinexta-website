import type { Metadata } from "next"
import { Section } from "@/components/layout/Section"
import { LegalContent } from "@/components/legal/LegalContent"
import { FinalCTA } from "@/components/FinalCTA"
import { cookiesData } from "@/data/cookies"
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd"

export const metadata: Metadata = {
  title: `${cookiesData.hero.title}`,
  description: "Politique de gestion des cookies du site Trinexta. Découvrez comment nous utilisons les cookies et gérez vos préférences.",
  alternates: {
    canonical: "/cookies",
  },
}

export default function CookiesPage() {
  return (
    <main className="bg-primary min-h-screen relative space-y-12 pb-12">
      <BreadcrumbJsonLd 
        items={[
          { name: "Accueil", url: "/" },
          { name: "cookies", url: "/cookies" }
        ]} 
      />
      <Section className="bg-primary pt-24 pb-24">
        <LegalContent data={cookiesData} />
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

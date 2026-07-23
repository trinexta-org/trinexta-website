import type { Metadata } from "next"
import { Section } from "@/components/layout/Section"
import { LegalContent } from "@/components/legal/LegalContent"
import { FinalCTA } from "@/components/FinalCTA"
import { dpaData } from "@/data/dpa"
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd"

export const metadata: Metadata = {
  title: `${dpaData.hero.title}`,
  description: "Accord de traitement des données personnelles (DPA) - cadre contractuel RGPD encadrant les traitements réalisés par TRINEXTA pour le compte de ses clients.",
  alternates: {
    canonical: "/accord-traitement-donnees",
  }
}

export default function AccordTraitementDonneesPage() {
  return (
    <main className="bg-primary min-h-screen relative space-y-12 pb-12">
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" },
          { name: "accord-traitement-donnees", url: "/accord-traitement-donnees" }
        ]}
      />
      <Section dark className="pt-24 pb-24">
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

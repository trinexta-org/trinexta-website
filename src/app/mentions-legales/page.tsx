import type { Metadata } from "next"
import { Section } from "@/components/layout/Section"
import { LegalContent } from "@/components/legal/LegalContent"
import { FinalCTA } from "@/components/FinalCTA"

import { mentionsLegalesData } from "@/data/mentions-legales"
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd"

export const metadata: Metadata = {
  title: `${mentionsLegalesData.hero.title} · Informations juridiques`,
  description:
    "Mentions légales et obligations réglementaires concernant l'éditeur et l'hébergeur du site Trinexta (Trustech IT Support).",
  alternates: {
    canonical: "/mentions-legales",
  },
}

export default function MentionsLegalesPage() {
  return (
    <main className="bg-primary min-h-screen relative space-y-12 pb-12">
      <BreadcrumbJsonLd 
        items={[
          { name: "Accueil", url: "/" },
          { name: "mentions-legales", url: "/mentions-legales" }
        ]} 
      />
      <Section className="bg-primary pt-24 pb-24">
        <LegalContent data={mentionsLegalesData} />
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

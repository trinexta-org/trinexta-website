import type { Metadata } from "next"
import { Section } from "@/components/layout/Section"
import { LegalContent } from "@/components/legal/LegalContent"
import { FinalCTA } from "@/components/FinalCTA"
import { planReponseIncidentsData } from "@/data/plan-reponse-incidents"
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd"

export const metadata: Metadata = {
  title: `${planReponseIncidentsData.hero.title}`,
  description: "Plan de réponse aux incidents de cybersécurité TRINEXTA - méthodologie structurée en 8 étapes pour détecter, contenir et résoudre les incidents.",
  alternates: {
    canonical: "/plan-reponse-incidents-securite",
  },
}

export default function PlanReponseIncidentsPage() {
  return (
     <main className="min-h-screen bg-surface">
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" },
          { name: "Plan de réponse aux incidents", url: "/plan-reponse-incidents-securite" },
        ]}
      />

      <Section className="bg-surface pt-24 pb-24">
        <LegalContent data={planReponseIncidentsData} />
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
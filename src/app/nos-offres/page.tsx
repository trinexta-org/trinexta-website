import type { Metadata } from "next"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { PricingSection } from "@/components/nos-offres/PricingSection"
import { NosOffresHero } from "@/components/nos-offres/NosOffresHero"
import { DifferentiatorSection } from "@/components/nos-offres/DifferentiatorSection"
import { HaloBackground } from "@/components/ui/HaloBackground"
import { TransitionTitle } from "@/components/TransitionTitle"
import { FinalCTA } from "@/components/FinalCTA"

export const metadata: Metadata = {
  title: "Nos offres | Tarifs et abonnements",
  description: "Découvrez nos offres d'infogérance pour TPE et PME. Tarifs clairs, support illimité et cybersécurité incluse.",
  openGraph: {
    title: "Nos offres | Trinexta - Tarifs et abonnements",
    description: "Découvrez nos offres d'infogérance pour TPE et PME. Tarifs clairs, support illimité et cybersécurité incluse.",
    url: "/nos-offres",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nos offres | Trinexta - Tarifs et abonnements",
    description: "Découvrez nos offres d'infogérance pour TPE et PME. Tarifs clairs, support illimité et cybersécurité incluse.",
    images: ["/images/og-default.png"],
  },
}

export default function NosOffresPage() {
  return (
    <main className="bg-primary min-h-screen relative space-y-12 pb-24"> 
      <NosOffresHero />

      <TransitionTitle
        surtitle="Tarification transparente"
        line1="Nos formules"
        line2="claires & adaptées"
      />
      <Section id="details" container={false} className="relative bg-primary py-24 overflow-hidden">
        <HaloBackground intensity="low" />
        <Container className="relative z-10">
          <PricingSection />
        </Container>
      </Section>

      <TransitionTitle
        surtitle="Pourquoi nous choisir ?"
        line1="Trinexta"
        line2="vs Le Marché"
      />
      <Section className="bg-primary pt-12">
        <Container>
          <DifferentiatorSection />
        </Container>
      </Section>

      <div className="pt-12">
        <FinalCTA
          line1="Prêt à trouver"
          line2="le technicien qui"
          line3="fera la différence ?"
          description="Donnez une nouvelle impulsion à votre support IT. Nous vous aidons à surmonter vos défis technologiques."
          ctaLabel="Contactez-nous dès maintenant"
        />
      </div>
    </main>
  )
}
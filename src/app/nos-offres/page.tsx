import { JsonLd } from "@/components/seo/JsonLd"
import { Suspense } from "react"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { PricingSection } from "@/components/nos-offres/PricingSection"
import { NosOffresHero } from "@/components/nos-offres/NosOffresHero"
import { DifferentiatorSection } from "@/components/nos-offres/DifferentiatorSection"
import { FaqSection } from "@/components/nos-offres/FaqSection"
import { CircuitBackground } from "@/components/ui/CircuitBackground"
import { SectionFade } from "@/components/ui/SectionFade"
import { TransitionTitle } from "@/components/TransitionTitle"
import { officialFaqs } from "@/components/nos-offres/faqData" 
import { FinalCTA } from "@/components/FinalCTA"
import { OffersTabs } from "@/components/nos-offres/OffersTabs"

export const metadata = {
  title: "Nos offres | Trinexta - Tarifs et abonnements",
  description: "Découvrez nos offres d'infogérance pour TPE et PME. Tarifs clairs, support illimité et cybersécurité incluse.",
}

export default function NosOffresPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": officialFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  }

  return (
    <main className="bg-primary min-h-screen relative space-y-12"> 
      <JsonLd data={jsonLd} />

      <NosOffresHero />

      <TransitionTitle
        surtitle="Tarification transparente"
        line1="Nos formules"
        line2="claires & adaptées"
      />
      <Section id="details" className="bg-primary py-24">
        <Container>
          <PricingSection />
        </Container>
      </Section>

      <TransitionTitle
        surtitle="Zoom sur nos métiers"
        line1="Le catalogue"
        line2="en détail"
      />
      <Section className="bg-primary pb-24 pt-12">
        <Container>
          <Suspense fallback={
            <div className="w-full text-center py-12 text-white/50 font-mono text-sm animate-pulse">
              Chargement du catalogue Trinexta...
            </div>
          }>
            <OffersTabs />
          </Suspense>
        </Container>
      </Section>

      <TransitionTitle
        surtitle="Pourquoi nous choisir ?"
        line1="Trinexta"
        line2="vs Le Marché"
      />
      <Section className="bg-primary pb-24 pt-12">
        <Container>
          <DifferentiatorSection />
        </Container>
      </Section>

      <TransitionTitle
        surtitle="Des réponses à vos questions"
        line1="Questions"
        line2="Fréquentes"
      />
      <Section container={false} className="relative overflow-hidden bg-primary pb-32 pt-12">
        <CircuitBackground intensity="low" />
        <SectionFade edge="both" />
        <Container className="relative z-10">
          <FaqSection />
        </Container>
      </Section>

      <FinalCTA
        line1="Prêt à trouver"
        line2="le technicien qui"
        line3="fera la différence ?"
        description="Donnez une nouvelle impulsion à votre support IT. Nous vous aidons à surmonter vos défis technologiques."
        ctaLabel="Contactez-nous dès maintenant"
      />
    </main>
  )
}
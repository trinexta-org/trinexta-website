import { Metadata } from "next"
import { JsonLd } from "@/components/seo/JsonLd"
import { OfferHero } from "@/components/shared/OfferHero"
import { FaqSection } from "@/components/shared/FaqSection"
import { officialFaqs } from "@/components/shared/faqData"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { TransitionTitle } from "@/components/TransitionTitle"
import { StudioIntro } from "@/components/studio/StudioIntro"
import { StudioDifferentiator } from "@/components/studio/StudioDifferentiator"
import { StudioGrid } from "@/components/studio/StudioGrid"
import StudioDemos from "@/components/studio/StudioDemos"

export const metadata: Metadata = {
  title: "Trinexta Studio - Création Web & SaaS | Trinexta",
  description: "Développement de sites internet sur mesure. Plateformes et solutions web performantes conçues par notre entreprise.",
}

export default function TrinextaStudioPage() {
  const filteredFaqs = officialFaqs.filter(faq =>
    faq.tags?.includes('studio') || faq.tags?.includes('general')
  )

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": filteredFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
    })),
  }

  return (
    <main className="bg-primary min-h-screen relative pb-24">
      <JsonLd data={faqJsonLd} />
      
      <OfferHero 
        part1="Trinexta" 
        part2="Studio" 
        subtitles={[
          "Développement de sites internet sur mesure. Plateformes et solutions web performantes conçues par notre entreprise.",
          "Un accompagnement technique complet pour la création de vos outils métiers, portails clients ou vitrines digitales.",
          "Hébergement en France et conception sécurisée par design (Secure by Design) pour protéger vos utilisateurs."
        ]} 
        imageSrc="/images/nos-offres/hero-studio.jpg"
      />

      <div className="w-full relative z-10 pt-12">
        <div id="studio" className="space-y-32 pb-16">
          <Section container={false} className="pt-0">
            <Container className="max-w-[1400px]">
              <StudioIntro />
            </Container>
          </Section>
          
          <div className="space-y-12">
            <TransitionTitle 
              surtitle="Notre vision" 
              line1="Pourquoi choisir" 
              line2="notre Studio" 
            />
            <Section container={false}>
              <Container className="max-w-[1400px]">
                <StudioDifferentiator />
              </Container>
            </Section>
          </div>

          <div className="space-y-12">
            <TransitionTitle 
              surtitle="Développement" 
              line1="Nos solutions" 
              line2="Web & SaaS" 
            />
            <Section container={false}>
              <Container className="max-w-[1400px]">
                <StudioGrid />
              </Container>
            </Section>
          </div>

          <div className="space-y-12">
            <TransitionTitle 
              surtitle="Démonstrations" 
              line1="Testez nos modèles" 
              line2="en conditions réelles" 
            />
            <Section container={false}>
              <Container className="max-w-[1400px]">
                <StudioDemos />
              </Container>
            </Section>
          </div>
        </div>
      </div>

      <FaqSection faqs={filteredFaqs} />
    </main>
  )
}
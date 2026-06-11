import { Metadata } from "next"
import { JsonLd } from "@/components/seo/JsonLd"
import { OfferHero } from "@/components/shared/OfferHero"
import { FaqSection } from "@/components/shared/FaqSection"
import { officialFaqs } from "@/components/shared/faqData"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { TransitionTitle } from "@/components/TransitionTitle"
import { ServicesIntro } from "@/components/services-annexes/ServicesIntro"
import { ServicesApproach } from "@/components/services-annexes/ServicesApproach"
import { ServicesGrid } from "@/components/services-annexes/ServicesGrid"
import { ServicesProcess } from "@/components/services-annexes/ServicesProcess"
import { ServicesPartners } from "@/components/services-annexes/ServicesPartners"

export const metadata: Metadata = {
  title: "Services Annexes IT & Cybersécurité | Trinexta",
  description: "Prestations IT sur mesure et à la demande. Conseils, matériel, réseaux et sauvegardes professionnelles.",
}

export default function ServicesAnnexesPage() {
  const filteredFaqs = officialFaqs.filter(faq =>
    faq.tags?.includes('services-annexes') || faq.tags?.includes('general')
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
        part1="Services" 
        part2="Annexes" 
        subtitles={[
          "Prestations IT sur mesure et à la demande. Conseils, matériel, réseaux et sauvegardes professionnelles.",
          "Des interventions ponctuelles ou projets spécifiques, pilotés de bout en bout par nos experts.",
          "Une approche « Fondations » : nous sécurisons et stabilisons vos infrastructures avec des solutions fiables et évolutives."
        ]} 
        imageSrc="/images/nos-offres/hero-services.jpg"
      />

      <div className="w-full relative z-10 pt-12">
        <div id="services-annexes" className="space-y-24 pb-24">
          <Section container={false} className="pt-0">
            <Container className="max-w-[1400px] space-y-24">
              <ServicesIntro />
              <ServicesApproach />
            </Container>
          </Section>

          <div className="space-y-12">
            <TransitionTitle
              surtitle="Prestations à la carte"
              line1="Nos services"
              line2="sur devis"
            />
            <Section container={false} className="py-0">
              <Container className="max-w-[1400px]">
                <ServicesGrid />
              </Container>
            </Section>

            <Section container={false} className="py-0">
              <Container className="max-w-[1400px]">
                <ServicesProcess />
              </Container>
            </Section>
          </div>

          <div className="space-y-12">
            <TransitionTitle
              surtitle="Écosystème"
              line1="Nos"
              line2="partenaires"
            />
            <Section container={false} className="py-0">
              <Container className="max-w-[1400px]">
                <ServicesPartners />
              </Container>
            </Section>
          </div>
        </div>
      </div>

      <FaqSection faqs={filteredFaqs} />
    </main>
  )
}
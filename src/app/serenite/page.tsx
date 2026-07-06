import { Metadata } from "next"
import { JsonLd } from "@/components/seo/JsonLd"
import { OfferHero } from "@/components/shared/OfferHero"
import { FaqSection } from "@/components/shared/FaqSection"
import { officialFaqs } from "@/components/shared/faqData"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { TransitionTitle } from "@/components/TransitionTitle"
import { SereniteIntro } from "@/components/serenite/SereniteIntro"
import { SereniteStats } from "@/components/serenite/SereniteStats"
import { SereniteConcret } from "@/components/serenite/SereniteConcret"
import { SerenitePillars } from "@/components/serenite/SerenitePillars"
import { SereniteTargets } from "@/components/serenite/SereniteTargets"
import { SerenitePricing } from "@/components/serenite/SerenitePricing"
import { SereniteOptions } from "@/components/serenite/SereniteOptions"
import { SereniteDifferentiator } from "@/components/serenite/SereniteDifferentiator"
import { FinalCTA } from "@/components/FinalCTA"

export const metadata: Metadata = {
  title: "Offre Sérénité - Infogérance complète | Trinexta",
  description: "L'informatique PME clé en main. Support illimité, maintenance proactive et cybersécurité avancée.",
  alternates: {
    canonical: "/serenite",
  },
}

export default function NotreOffrePage() {
  const filteredFaqs = officialFaqs.filter(faq =>
    faq.tags?.includes('serenite') || faq.tags?.includes('general')
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
        part1="Offre"
        part2="Sérénité"
        subtitles={[
          "L'informatique PME clé en main. Support illimité, maintenance proactive et cybersécurité avancée.",
          "Un modèle hybride unique : services managés, technicien sur site et un seul interlocuteur qui coordonne tout.",
          "Sécurisation systématique de vos données : sauvegardes, accès, et hébergement en France conforme RGPD."
        ]}
        imageSrc="/images/nos-offres/hero-serenite.jpg"
      />

      <div className="w-full relative z-10 pt-12">
        <div id="serenite" className="space-y-24 pb-24">

          <Section container={false} className="pt-0">
            <Container className="max-w-[1400px] space-y-24">
              <SereniteIntro />
              <SereniteStats />
              <SereniteConcret />
            </Container>
          </Section>

          <div className="space-y-12">
            <TransitionTitle
              surtitle="Pourquoi Trinexta"
              line1="Ce qui nous distingue"
              line2="du marché"
            />
            <Section container={false} className="py-0">
              <Container className="max-w-[1400px]">
                <SereniteDifferentiator />
              </Container>
            </Section>
          </div>

          <div className="space-y-12">
            <TransitionTitle
              surtitle="Les piliers"
              line1="Les 3 piliers de"
              line2="l'offre Sérénité"
            />
            <Section container={false} className="py-0">
              <Container className="max-w-[1400px]">
                <SerenitePillars />
              </Container>
            </Section>
          </div>

          <div className="space-y-12">
            <TransitionTitle
              surtitle="Bénéficiaires"
              line1="Pour qui est"
              line2="l'offre Sérénité ?"
            />
            <Section container={false} className="py-0">
              <Container className="max-w-[1400px]">
                <SereniteTargets />
              </Container>
            </Section>
          </div>

          <div className="space-y-12">
            <TransitionTitle
              surtitle="Tarifs"
              line1="Une tarification claire"
              line2="et sans surprise"
            />
            <Section container={false} className="py-0">
              <Container className="max-w-[1400px]">
                <SerenitePricing />
              </Container>
            </Section>
          </div>

          <div className="space-y-12">
            <TransitionTitle
              surtitle="Options"
              line1="Options disponibles"
              line2="sur mesure"
            />
            <Section container={false} className="py-0">
              <Container className="max-w-[1400px]">
                <SereniteOptions />
              </Container>
            </Section>
          </div>

        </div>
      </div>

      <FinalCTA
        line1="Prêt à déléguer"
        line2="votre informatique ?"
        line3="Gagnez en sérénité."
        description="Concentrez-vous sur votre cœur de métier. Trinexta s'occupe de la stabilité, de la sécurité et de la maintenance de votre infrastructure."
        ctaLabel="Demander un audit gratuit"
        ctaHref="/contact"
      />

      <FaqSection faqs={filteredFaqs} />
    </main>
  )
}
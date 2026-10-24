import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { OfferHero } from "@/components/shared/OfferHero";
import { FaqSection } from "@/components/shared/FaqSection";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { TransitionTitle } from "@/components/TransitionTitle";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { ServicesIntro } from "@/components/services-annexes/ServicesIntro";
import { ServicesApproach } from "@/components/services-annexes/ServicesApproach";
import { ServicesGrid } from "@/components/services-annexes/ServicesGrid";
import { ServicesProcess } from "@/components/services-annexes/ServicesProcess";
import { ServicesPartners } from "@/components/services-annexes/ServicesPartners";
import { FinalCTA } from "@/components/FinalCTA";
import { SA_FAQ, SA_HERO } from "@/data/services-annexes";

export const metadata: Metadata = {
  title: "Dépannage et interventions informatiques à Évry",
  description:
    "Dépannage, installation de postes, Windows 11, déménagement : interventions informatiques sur devis pour entreprises à Évry et en Essonne.",
  alternates: {
    canonical: "/services-annexes",
  },
};

export default function ServicesAnnexesPage() {
  const filteredFaqs = SA_FAQ;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: filteredFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <main className="bg-primary min-h-screen relative pb-24">
      <JsonLd data={faqJsonLd} />

      <section className="relative bg-primary">
        <OfferHero
          part1={SA_HERO.part1}
          part2={SA_HERO.part2}
          subtitles={SA_HERO.subtitles}
          cta={SA_HERO.cta}
          imageSrc="/images/nos-offres/hero-services.webp"
        />

        <div className="w-full relative z-10 pt-12">
          <div className="space-y-24 pb-24">
            <Section container={false} className="pt-0">
              <Container className="max-w-[1400px] space-y-24">
                <ServicesIntro />
              </Container>
            </Section>
          </div>
        </div>
      </section>

      <WaveDivider from="primary" to="surface" amplitude="ample" crossing={1} />

      <section className="relative bg-surface">
        <div className="space-y-24 py-12">
          <Section container={false} className="pt-0">
            <Container className="max-w-[1400px] space-y-24">
              <ServicesApproach />
            </Container>
          </Section>

          <div className="space-y-12">
            <TransitionTitle
              surtitle="Prestations à la carte"
              line1="Nos interventions"
              line2="sur devis"
            />
            <Section container={false} className="py-0">
              <Container className="max-w-[1400px]">
                <ServicesGrid />
              </Container>
            </Section>
          </div>
        </div>
      </section>

      <WaveDivider from="surface" to="primary" amplitude="low" crossing={2} />

      <ServicesProcess />

      <WaveDivider from="primary" to="surface" amplitude="low" crossing={3} />

      <section className="relative bg-surface">
        <div className="space-y-24 py-12">
          <div className="space-y-12">
            <TransitionTitle
              surtitle="Matériel"
              line1="Nos partenaires"
              line2="matériel"
            />
            <Section container={false} className="py-0">
              <Container className="max-w-[1400px]">
                <ServicesPartners />
              </Container>
            </Section>
          </div>
        </div>
      </section>

      <FinalCTA
        line1="Une panne,"
        line2="un projet,"
        line3="un déménagement ?"
        description="Décrivez votre besoin : nous revenons vers vous avec une proposition et une date d'intervention. Du lundi au vendredi, de 8 h 30 à 19 h, au 09 78 25 07 46."
        ctaLabel="Demander un devis"
        ctaHref="/contact#formulaire"
      />

      <FaqSection faqs={filteredFaqs} />
    </main>
  );
}
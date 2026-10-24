import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { OfferHero } from "@/components/shared/OfferHero";
import { FaqSection } from "@/components/shared/FaqSection";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { TransitionTitle } from "@/components/TransitionTitle";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { TechnicienIntro } from "@/components/technicien-sous-regie/TechnicienIntro";
import { TechnicienConcret } from "@/components/technicien-sous-regie/TechnicienConcret";
import { TechnicienSteps } from "@/components/technicien-sous-regie/TechnicienSteps";
import { TechnicienPillars } from "@/components/technicien-sous-regie/TechnicienPillars";
import { TechnicienProfiles } from "@/components/technicien-sous-regie/TechnicienProfiles";
import { TechnicienPricing } from "@/components/technicien-sous-regie/TechnicienPricing";
import { TechnicienAssurances } from "@/components/technicien-sous-regie/TechnicienAssurances";
import { FinalCTA } from "@/components/FinalCTA";
import { REGIE_ALTERNATIVES, REGIE_FAQ, REGIE_HERO, TALENTERO_URL } from "@/data/technicien-sous-regie";

export const metadata: Metadata = {
  title: "Technicien informatique en régie en Île-de-France",
  description:
    "Un technicien support ou réseau en régie pour renforcer votre équipe IT, absorber un pic d'activité ou couvrir une absence, sans recruter en CDI. Île-de-France.",
  alternates: {
    canonical: "/technicien-sous-regie",
  },
};

export default function TechnicienSousRegiePage() {
  const filteredFaqs = REGIE_FAQ;

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

      {/* =========================================================
          BLOC SOMBRE
          Hero + Intro
          ========================================================= */}
      <section className="relative bg-primary">
        <OfferHero
          part1={REGIE_HERO.part1}
          part2={REGIE_HERO.part2}
          subtitles={REGIE_HERO.subtitles}
          cta={REGIE_HERO.cta}
          announcement={{ label: "Découvrir Talentero", href: TALENTERO_URL }}
          imageSrc="/images/nos-offres/hero-impulsion.jpg"
        />

        <div className="w-full relative z-10 pt-12">
          <div className="space-y-24 pb-24">
            <Section container={false} className="pt-0">
              <Container className="max-w-[1400px] space-y-24">
                <TechnicienIntro />
              </Container>
            </Section>
          </div>
        </div>
      </section>

      {/* =========================================================
          TRANSITION SOMBRE → CLAIR
          ========================================================= */}
      <WaveDivider from="primary" to="surface" amplitude="ample" crossing={1} />

      {/* =========================================================
          CONCRET + PÉRIMÈTRE D'INTERVENTION (clair)
          ========================================================= */}
      <section className="relative bg-surface">
        <div className="space-y-24 py-12">

          <TechnicienConcret />

          <div className="space-y-12">
            <TransitionTitle
              surtitle="Périmètre d'intervention"
              line1="Ce que fait"
              line2="votre technicien"
            />
            <Section container={false} className="py-0">
              <Container className="max-w-[1400px]">
                <TechnicienPillars />
              </Container>
            </Section>
          </div>
        </div>
      </section>

      {/* =========================================================
          TRANSITION CLAIR → SOMBRE
          ========================================================= */}
      <WaveDivider from="surface" to="primary" amplitude="low" crossing={2} />

      {/* =========================================================
          PROCESSUS (sombre)
          ========================================================= */}
      <TechnicienSteps />

      {/* =========================================================
          TRANSITION SOMBRE → CLAIR
          ========================================================= */}
      <WaveDivider from="primary" to="surface" amplitude="low" crossing={3} />

      {/* =========================================================
          PROFILS, TARIFS, ENGAGEMENTS (clair)
          ========================================================= */}
      <section className="relative bg-surface">
        <div className="space-y-24 py-12">

          <div className="space-y-12">
            <TransitionTitle
              surtitle="Profils"
              line1="Les profils que"
              line2="nous proposons"
            />
            <Section container={false} className="py-0">
              <Container className="max-w-[1400px]">
                <TechnicienProfiles />
              </Container>
            </Section>
          </div>

          <Section container={false} className="py-0">
            <TechnicienPricing />
          </Section>

          <div className="space-y-12">
            <TransitionTitle
              surtitle={REGIE_ALTERNATIVES.surtitre}
              line1={REGIE_ALTERNATIVES.ligne1}
              line2={REGIE_ALTERNATIVES.ligne2}
            />
            <Section container={false} className="py-0">
              <Container className="max-w-[1400px]">
                <TechnicienAssurances />
              </Container>
            </Section>
          </div>

        </div>
      </section>

      {/* =========================================================
          CTA FINAL
          ========================================================= */}
      <FinalCTA
        line1="Besoin d'un technicien"
        line2="pour renforcer"
        line3="votre équipe ?"
        description="Dites-nous le profil, la durée et le lieu de la mission : nous revenons vers vous avec une proposition écrite. Du lundi au vendredi, de 8 h 30 à 19 h, au 09 78 25 07 46."
        ctaLabel="Décrire mon besoin"
        ctaHref="/contact#formulaire"
      />

      {/* =========================================================
          FAQ
          ========================================================= */}
      <FaqSection faqs={filteredFaqs} />
    </main>
  );
}
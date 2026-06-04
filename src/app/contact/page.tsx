import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { TransitionTitle } from "@/components/TransitionTitle";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactCards } from "@/components/contact/ContactCards";
import { ContactFormSection } from "@/components/contact/ContactFormSection";
import { ContactFaq } from "@/components/contact/ContactFaq";
import { HaloBackground } from "@/components/ui/HaloBackground";
import { SectionFade } from "@/components/ui/SectionFade";
import { ContactMap } from "@/components/contact/ContactMap";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Contact — Trinexta · Infogérance & Support informatique",
  description:
    "Discutons de votre projet. Demande de devis, support ou candidature, l'équipe Trinexta vous répond sous 24h ouvrées.",
};

export default function ContactPage() {
  return (
    <main className="bg-primary min-h-screen relative">
      <ContactHero />
      
      <ContactCards />

      <TransitionTitle
        surtitle="Un projet en tête ?"
        line1="Laissez-nous"
        line2="Un message"
      />

      <ContactFormSection />
      
      <Section container={false} className="relative overflow-hidden bg-primary pb-32 pt-24">
        <HaloBackground intensity="low" />
        <SectionFade edge="both" />
        <Container className="relative z-10">
          <ContactFaq />
        </Container>
      </Section>

      <TransitionTitle
        surtitle="Rencontrons-nous"
        line1="Où nous"
        line2="Trouver ?"
      />

      <ContactMap />

      <FinalCTA
        line1="Vous aider à"
        line2="surmonter vos"
        line3="défis technologiques"
        description="Trinexta by Trustech IT Support simplifie et sécurise votre informatique. Un accompagnement fiable, souple et adapté à votre performance."
        ctaLabel="En savoir plus"
        ctaHref="/nos-offres"
      />
    </main>
  );
}
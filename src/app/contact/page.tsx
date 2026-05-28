import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { TransitionTitle } from "@/components/TransitionTitle";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactCards } from "@/components/contact/ContactCards";
import { ContactFormSection } from "@/components/contact/ContactFormSection";
import { ContactFaq } from "@/components/contact/ContactFaq";
import { ContactMap } from "@/components/contact/ContactMap";
import { ContactFinalCTA } from "@/components/contact/ContactFinalCTA";

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
      
      <Section className="bg-primary pb-32 pt-24">
        <Container>
          <ContactFaq />
        </Container>
      </Section>

      <TransitionTitle
        surtitle="Rencontrons-nous"
        line1="Où nous"
        line2="Trouver ?"
      />

      <ContactMap />

      <ContactFinalCTA />
    </main>
  );
}
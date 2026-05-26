// src/app/contact/page.tsx

import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { FadeIn } from "@/components/ui/FadeIn";
import ContactForm from "@/components/contact/ContactForm";
import { FaqSection } from "@/components/contact/FaqSection";
import { AnimatedReassurance } from "@/components/contact/AnimatedReassurance";
import ExpertiseSection from "@/components/contact/ExpertiseSection";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Contact — Trinexta · Infogérance & Support informatique",
  description:
    "Discutons de votre projet. Demande de devis, support ou candidature, l'équipe Trinexta vous répond sous 24h ouvrées.",
};

// ─── Constantes ──────────────────────────────────────────────────────────────

const CONTACT_ITEMS = [
  {
    delay: 0.1,
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: "Notre Siège",
    content: (
      <Text variant="small" className="text-white/60 leading-relaxed">
        505 Place des Champs-Élysées<br />
        91080 Évry-Courcouronnes
      </Text>
    ),
  },
  {
    delay: 0.2,
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    title: "Téléphone",
    content: (
      <>
        <a href="tel:+33978250746" className="text-secondary font-bold hover:underline block">
          09 78 25 07 46
        </a>
        <Text variant="small" className="text-white/60 font-medium mt-2">
          Urgence : 07 56 82 10 47
        </Text>
      </>
    ),
  },
  {
    delay: 0.3,
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: "Email",
    content: (
      <>
        <a href="mailto:contact@trinexta.fr" className="text-secondary font-bold hover:underline block">
          contact@trinexta.fr
        </a>
        <Text variant="small" className="text-white/60 mt-2">
          support@trinexta.fr
        </Text>
      </>
    ),
  },
];

// ─── Sous-composants de page ──────────────────────────────────────────────────

function HeroSection() {
  return (
    <Section
      container={false}
      className="relative pt-40 pb-24 min-h-[85vh] flex items-center overflow-hidden bg-primary"
    >
      {/* Arrière-plan */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/image-contact.jpg')" }}
      />
      <div className="absolute inset-0 bg-primary/70 z-0" />
      <div className="absolute inset-0 bg-linear-to-r from-primary/90 via-primary/50 to-transparent z-0" />

      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Colonne gauche — Texte */}
          <div className="lg:col-span-5 space-y-8">
            <FadeIn direction="up">
              <Text variant="small" className="uppercase tracking-widest text-secondary font-bold mb-4 block">
                Hub de contact
              </Text>
              <Heading as="h1" className="text-white mb-6 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
                Propulsez votre IT avec Trinexta
              </Heading>
              <Text variant="lead" className="text-white/80 mb-8 leading-relaxed">
                Besoin d&apos;un devis sur-mesure, d&apos;une assistance technique ou d&apos;une expertise ponctuelle ?
                Nos experts vous répondent sous 24 heures ouvrées.
              </Text>
              <AnimatedReassurance />
            </FadeIn>
          </div>

          {/* Colonne droite — Formulaire */}
          <div className="lg:col-span-7">
            <FadeIn direction="none" delay={0.2}>
              <div className="p-8 md:p-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ContactCards() {
  return (
    <Section className="bg-primary py-20 border-t border-white/10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CONTACT_ITEMS.map(({ delay, icon, title, content }) => (
            <FadeIn key={title} delay={delay}>
              <div className="h-full p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-secondary mb-6">{icon}</div>
                <Heading as="h4" className="mb-2 text-white">{title}</Heading>
                {content}
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function MapSection() {
  return (
    <Section className="bg-primary pb-24 pt-12 border-t border-white/10">
      <Container>
        <FadeIn direction="up">
          <div className="space-y-6 text-center max-w-2xl mx-auto mb-12">
            <Heading as="h2" className="text-white text-3xl font-black tracking-tight">
              Où nous trouver ?
            </Heading>
            <Text className="text-white/60">
              Nos bureaux sont situés au cœur de l&apos;écosystème numérique d&apos;Évry.
              Venez nous rencontrer ou planifiez une intervention sur site.
            </Text>
          </div>

          <div className="relative w-full h-125 rounded-2xl overflow-hidden border border-white/10 shadow-lg group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2634.612711094056!2d2.4248883768840244!3d48.62687151694605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e5e197d620579b%3A0xb1a9d1bb82ad3ad7!2sAll.%20de%20l'Agora%2C%2091000%20%C3%89vry-Courcouronnes!5e0!3m2!1sfr!2sfr!4v1716132000000!5m2!1sfr!2sfr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Localisation des bureaux de Trinexta à Évry-Courcouronnes"
              className="transition-all duration-700 grayscale-60 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.3)] rounded-2xl" />
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <main className="bg-primary">
      <HeroSection />
      <ContactCards />
      <FaqSection />
      <ExpertiseSection />
      <MapSection />
    </main>
  );
}
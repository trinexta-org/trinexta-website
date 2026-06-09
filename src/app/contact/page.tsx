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
import { contactFaqs } from "@/components/contact/contactFaqData";
import { JsonLd } from "@/components/seo/JsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Contact · Infogérance & Support informatique",
  description:
    "Discutons de votre projet. Demande de devis ou de support technique, l'équipe Trinexta vous répond sous 24h ouvrées.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact — Trinexta · Infogérance & Support informatique",
    description: "Discutons de votre projet. Demande de devis ou de support technique, l'équipe Trinexta vous répond sous 24h ouvrées.",
    url: "/contact",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Trinexta · Infogérance & Support informatique",
    description: "Discutons de votre projet. Demande de devis ou de support technique, l'équipe Trinexta vous répond sous 24h ouvrées.",
    images: ["/images/og-default.png"],
  },
};

export default function ContactPage() {
  const jsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": contactFaqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    }

  return (
    <main className="bg-primary min-h-screen relative">
      <JsonLd data={jsonLd} />
      <BreadcrumbJsonLd 
        items={[
          { name: "Accueil", url: "/" },
          { name: "Contact", url: "/contact" }
        ]} 
      />

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
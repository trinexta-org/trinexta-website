import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { TransitionTitle } from "@/components/TransitionTitle";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactCards } from "@/components/contact/ContactCards";
import { ContactFormSection } from "@/components/contact/ContactFormSection";
import { ContactFaq } from "@/components/contact/ContactFaq";
import { SectionFade } from "@/components/ui/SectionFade";
import { ContactMap } from "@/components/contact/ContactMap";
import { FinalCTA } from "@/components/FinalCTA";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { contactFaqs } from "@/components/contact/contactFaqData";
import Link from "next/link";
import { JsonLd, trinextaLocalBusiness } from "@/components/seo/JsonLd";
import { Text } from "@/components/ui/Typography";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const DESCRIPTION =
  "Parlez de votre informatique avec TRINEXTA : formulaire, téléphone 09 78 25 07 46 ou bureau à Évry-Courcouronnes. Lundi au vendredi, 8 h 30 à 19 h.";

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: "https://trinexta.fr/contact",
  about: { "@id": trinextaLocalBusiness["@id"] },
  mainEntity: trinextaLocalBusiness,
};

export const metadata: Metadata = {
  title: "Contact et demande de devis informatique à Évry",
  description: DESCRIPTION,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact et demande de devis informatique à Évry | TRINEXTA",
    description: DESCRIPTION,
    url: "/contact",
    type: "website",
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact et demande de devis informatique à Évry | TRINEXTA",
    description: DESCRIPTION,
    images: ["/images/og-default.png"],
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: contactFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="bg-primary min-h-screen relative">
      {/* SEO */}
      <JsonLd data={jsonLd} />
      <JsonLd data={contactPageJsonLd} />

      <BreadcrumbJsonLd
        items={[
          {
            name: "Accueil",
            url: "/",
          },
          {
            name: "Contact",
            url: "/contact",
          },
        ]}
      />

      {/* HERO */}
      <ContactHero />

      {/* COORDONNÉES */}
      <ContactCards />

      {/* VAGUE APRÈS LES CONTACT CARDS */}
      <WaveDivider
        from="primary"
        to="surface"
        amplitude="low"
        crossing={1}
      />

      {/* FORMULAIRE */}
      <TransitionTitle
        surtitle="Votre demande"
        line1="Décrivez"
        line2="votre besoin"
      />

      <ContactFormSection />

     

      {/* CARTE */}
      <TransitionTitle
        surtitle="Nous joindre"
        line1="7 rue Montespan"
        line2="Évry-Courcouronnes"
      />

      <ContactMap />

      {/* CTA FINAL */}
      <FinalCTA
        line1="Nos formules"
        line2="et leurs"
        line3="prix"
        description="Sérénité Essentiel et Sérénité Complète, facturées par poste et par mois : comparez ce qu'elles couvrent. Téléphone : 09 78 25 07 46, du lundi au vendredi, de 8 h 30 à 19 h."
        ctaLabel="Voir l'offre Sérénité"
        ctaHref="/serenite"
      />
       {/* FAQ */}
      <Section
        container={false}
        className="relative overflow-hidden bg-primary pb-32 pt-24"
      >
        <SectionFade edge="both" />

        <Container className="relative z-10">
          <ContactFaq />
          <Text className="mt-10 text-center text-white/70 text-sm md:text-base">
            <Link href="/charte-assistance" className="text-secondary-soft font-bold hover:underline">Ordinateur ou compte piraté</Link>
            {" · "}
            <a href="https://www.cybermalveillance.gouv.fr/" target="_blank" rel="noopener noreferrer" className="text-secondary-soft font-bold hover:underline">cybermalveillance.gouv.fr</a>
            {" · "}
            <Link href="/nous-rejoindre" className="text-secondary-soft font-bold hover:underline">Nous rejoindre</Link>
            {" · "}
            <Link href="/serenite" className="text-secondary-soft font-bold hover:underline">Nos formules et leurs prix</Link>
          </Text>
        </Container>
      </Section>
    </main>
  );
}
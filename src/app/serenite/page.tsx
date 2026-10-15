import { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqSection } from "@/components/shared/FaqSection";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { TransitionTitle } from "@/components/TransitionTitle";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Typography";
import { SereniteHero } from "@/components/serenite/SereniteHero";
import { SereniteIntro } from "@/components/serenite/SereniteIntro";
import { SereniteStats } from "@/components/serenite/SereniteStats";
import { SereniteOffres } from "@/components/serenite/SereniteOffres";
import { SereniteComparatif } from "@/components/serenite/SereniteComparatif";
import { SerenitePillars } from "@/components/serenite/SerenitePillars";
import { SereniteConcret } from "@/components/serenite/SereniteConcret";
import { SereniteRapports } from "@/components/serenite/SereniteRapports";
import { SereniteTargets } from "@/components/serenite/SereniteTargets";
import { SereniteEtapes } from "@/components/serenite/SereniteEtapes";
import { SereniteOptions } from "@/components/serenite/SereniteOptions";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { FinalCTA } from "@/components/FinalCTA";
import {
  SERENITE_CTA,
  SERENITE_DEVIS_HREF,
  SERENITE_FAQ,
  SERENITE_HERO,
  SERENITE_LOCAL,
  SERENITE_OFFRES,
} from "@/data/serenite";

const TITLE = "Maintenance informatique PME dès 29,99 € | TRINEXTA Sérénité";
const DESCRIPTION =
  "TRINEXTA Sérénité : protection EDR, supervision et maintenance informatique dès 29,99 € HT/poste/mois. Deux offres pour les TPE et PME en Essonne.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: "/serenite",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/serenite",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/og-default.png"],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: SERENITE_FAQ.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer.replace(/\s*\n+\s*/g, " "),
    },
  })),
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "TRINEXTA Sérénité",
  serviceType: "Maintenance, cybersécurité et support informatique pour PME",
  description: SERENITE_HERO.description,
  url: "https://trinexta.fr/serenite",
  provider: { "@type": "LocalBusiness", "@id": "https://trinexta.fr", name: "Trinexta" },
  areaServed: ["Évry-Courcouronnes", "Essonne", "Île-de-France"],
  offers: SERENITE_OFFRES.map((offre) => ({
    "@type": "Offer",
    name: offre.nom,
    description: `${offre.pitch} ${offre.prix} HT par poste et par mois.`,
    price: offre.prixSchema,
    priceCurrency: "EUR",
    url: "https://trinexta.fr/serenite",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: offre.prixSchema,
      priceCurrency: "EUR",
      unitText: "poste par mois",
      valueAddedTaxIncluded: false,
    },
  })),
};

function Bloc({
  surtitle,
  line1,
  line2,
  id,
  children,
}: {
  surtitle: string;
  line1: string;
  line2: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="space-y-12 scroll-mt-32">
      <TransitionTitle surtitle={surtitle} line1={line1} line2={line2} />
      <Section container={false} className="py-0">
        <Container className="max-w-[1400px]">{children}</Container>
      </Section>
    </div>
  );
}

export default function SerenitePage() {
  return (
    <main className="bg-primary min-h-screen relative pb-24">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={serviceJsonLd} />

      <section className="relative bg-primary">
        <SereniteHero />

        <div className="w-full relative z-10 pt-12 pb-24">
          <Section container={false} className="pt-0">
            <Container className="max-w-[1400px] space-y-24">
              <SereniteIntro />
              <SereniteStats />
            </Container>
          </Section>
        </div>
      </section>

      <WaveDivider from="primary" to="surface" amplitude="ample" crossing={1} />

      <section className="relative bg-surface">
        <div className="space-y-24 py-12">
          <Bloc id="offres" surtitle="Tarifs" line1="Deux formules" line2="pour votre entreprise">
            <div className="space-y-16">
              <SereniteOffres />
              <SereniteComparatif />
              <div className="flex justify-center">
                <Button asChild variant="secondary" size="lg" className="text-white">
                  <Link href={SERENITE_DEVIS_HREF}>Demander une étude pour mon entreprise</Link>
                </Button>
              </div>
            </div>
          </Bloc>

          <Bloc surtitle="Pourquoi Sérénité" line1="Pourquoi choisir" line2="TRINEXTA Sérénité ?">
            <SerenitePillars />
          </Bloc>

          <SereniteConcret />

          <Bloc surtitle="Rapports" line1="Des rapports pour" line2="piloter votre informatique">
            <SereniteRapports />
          </Bloc>

          <Bloc surtitle="Bénéficiaires" line1="Une offre pensée pour" line2="les TPE et PME en Essonne">
            <Text className="text-center text-primary/75 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              {SERENITE_LOCAL}
            </Text>
            <SereniteTargets />
          </Bloc>

          <Bloc surtitle="Mise en place" line1="Comment démarrer" line2="avec Sérénité ?">
            <SereniteEtapes />
          </Bloc>

          <Bloc surtitle="Options" line1="Options pour les" line2="besoins spécifiques">
            <div className="space-y-10">
              <SereniteOptions />
              <div className="flex justify-center">
                <Button asChild variant="outline" size="lg">
                  <Link href={SERENITE_DEVIS_HREF}>Demander une offre personnalisée</Link>
                </Button>
              </div>
            </div>
          </Bloc>
        </div>
      </section>

      <FinalCTA
        line1={SERENITE_CTA.line1}
        line2={SERENITE_CTA.line2}
        line3={SERENITE_CTA.line3}
        description={SERENITE_CTA.description}
        ctaLabel={SERENITE_CTA.ctaLabel}
        ctaHref={SERENITE_CTA.ctaHref}
      />

      <div className="bg-primary pt-12 pb-24 text-center px-6">
        <Heading as="h2" className="text-white">
          Questions fréquentes sur les offres *Sérénité*
        </Heading>
      </div>
      <FaqSection faqs={SERENITE_FAQ} />
    </main>
  );
}

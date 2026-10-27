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
import { SereniteOffres } from "@/components/serenite/SereniteOffres";
import { SereniteComparatif } from "@/components/serenite/SereniteComparatif";
import { SereniteCalculateur } from "@/components/serenite/SereniteCalculateur";
import { SerenitePillars } from "@/components/serenite/SerenitePillars";
import { SereniteConcret } from "@/components/serenite/SereniteConcret";
import { SereniteRapports } from "@/components/serenite/SereniteRapports";
import { SereniteTargets } from "@/components/serenite/SereniteTargets";
import { SereniteEtapes } from "@/components/serenite/SereniteEtapes";
import { SereniteOptions } from "@/components/serenite/SereniteOptions";
import { SerenitePreuves } from "@/components/serenite/SerenitePreuves";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { FinalCTA } from "@/components/FinalCTA";
import {
  SERENITE_CTA,
  SERENITE_DEVIS_HREF,
  SERENITE_EN_BREF,
  SERENITE_FAQ,
  SERENITE_HERO,
  SERENITE_LOCAL,
  SERENITE_OFFRES,
} from "@/data/serenite";

const TITLE = "Infogérance PME : 39,99 € ou 79 € HT par poste | TRINEXTA";
const DESCRIPTION =
  "Essentiel à 39,99 € HT par poste et par mois (protection, supervision, sans assistance) ou Complète à 79 € HT (assistance incluse, sans durée minimale).";

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
  serviceType: "Infogérance informatique",
  description: SERENITE_HERO.description,
  url: "https://trinexta.fr/serenite",
  provider: { "@type": "LocalBusiness", "@id": "https://trinexta.fr", name: "TRINEXTA" },
  areaServed: ["Essonne", "Île-de-France"],
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

/*
 * Section a en-tete compact (surtitre + h2), meme grammaire que ServicePage.
 * Le grand TransitionTitle est reserve a la section Tarifs.
 */
function Bloc({
  surtitle,
  title,
  intro,
  id,
  children,
}: {
  surtitle: string;
  title: string;
  intro?: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <Section id={id} container={false} className="py-0 md:py-0 lg:py-0 scroll-mt-32">
      <Container className="max-w-[1400px]">
        <div className="text-center max-w-3xl mx-auto space-y-3 md:space-y-4 mb-10 md:mb-12">
          <span className="text-secondary-strong text-xs font-mono font-bold uppercase tracking-widest block">
            {surtitle}
          </span>
          <Heading as="h2" className="text-primary text-3xl md:text-4xl">
            {title}
          </Heading>
          {intro && (
            <Text className="text-primary/75 text-base md:text-lg leading-relaxed">{intro}</Text>
          )}
        </div>
        {children}
      </Container>
    </Section>
  );
}

export default function SerenitePage() {
  return (
    <main className="bg-primary min-h-screen relative pb-24">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={serviceJsonLd} />

      <section className="relative bg-primary">
        <SereniteHero />

        <div className="w-full relative z-10 pt-8 pb-8 md:pb-12">
          <Section container={false} className="py-0 md:py-0 lg:py-0">
            <Container className="max-w-[1400px]">
              <SereniteIntro />
              <Text className="max-w-4xl text-white/80 text-base md:text-lg leading-relaxed">
                <strong className="text-white">En bref.</strong> {SERENITE_EN_BREF}
              </Text>
            </Container>
          </Section>
        </div>
      </section>

      <WaveDivider from="primary" to="surface" amplitude="ample" crossing={1} />

      <section className="relative bg-surface">
        <div id="offres" className="scroll-mt-32 pt-4">
          <TransitionTitle surtitle="Tarifs" line1="Deux formules" line2="pour votre entreprise" />
          <Section container={false} className="pt-0 md:pt-0 lg:pt-0 pb-16 md:pb-20 lg:pb-20">
            <Container className="max-w-[1400px] space-y-12 md:space-y-16">
              <SereniteOffres />
              <SereniteCalculateur />
              <SereniteComparatif />
              <div className="flex justify-center">
                <Button asChild variant="secondary" size="lg" className="text-white">
                  <Link href={SERENITE_DEVIS_HREF}>Demander une proposition</Link>
                </Button>
              </div>
            </Container>
          </Section>
        </div>

        <div className="space-y-16 md:space-y-24 pb-16 md:pb-24">
          <Bloc surtitle="Sur le terrain" title="Ce que nous avons *réglé* pour nos clients">
            <SerenitePreuves />
          </Bloc>

          <Bloc surtitle="Pourquoi Sérénité" title="Pourquoi choisir TRINEXTA *Sérénité* ?">
            <SerenitePillars />
          </Bloc>

          <SereniteConcret />

          <Bloc surtitle="Rapports" title="Des rapports pour *piloter* votre informatique">
            <SereniteRapports />
          </Bloc>

          <Bloc surtitle="Pour qui" title="Quelle formule *choisir* ?" intro={SERENITE_LOCAL}>
            <SereniteTargets />
          </Bloc>

          <Bloc surtitle="Mise en place" title="Comment démarrer avec *Sérénité* ?">
            <SereniteEtapes />
            <Text className="mt-10 text-center text-primary/75 text-base md:text-lg leading-relaxed">
              Nos conditions sont écrites : horaires, périmètre, objectifs de délai et conditions de résiliation sont publiés avant toute signature.{" "}
              <Link href="/niveau-de-service" className="text-primary font-bold underline decoration-secondary underline-offset-4">Nos niveaux de service</Link>
              {" · "}
              <Link href="/cgv" className="text-primary font-bold underline decoration-secondary underline-offset-4">Conditions générales de vente</Link>
              {" · "}
              <Link href="/cas-clients/modernisation-it-pme-essonne" className="text-primary font-bold underline decoration-secondary underline-offset-4">Modernisation du parc d&apos;une PME en Essonne</Link>
            </Text>
          </Bloc>

          <Bloc surtitle="Hors forfait" title="Ce qui n'est pas dans le *forfait*">
            <div className="space-y-10">
              <SereniteOptions />
              <div className="flex justify-center">
                <Button asChild variant="outline" size="lg">
                  <Link href={SERENITE_DEVIS_HREF}>Demander une proposition</Link>
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

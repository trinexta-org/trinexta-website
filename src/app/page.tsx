import { Suspense } from "react"
import Link from "next/link"
import { JsonLd, trinextaLocalBusiness } from "@/components/seo/JsonLd"
import { Metadata } from "next"
import { HeroSection } from "@/components/HeroSection"
import { TransitionTitle } from "@/components/TransitionTitle"
import { ServicesSection } from "@/components/ServicesSection"
import { ApproachSection } from "@/components/ApproachSection"
import { WhyChooseUs } from "@/components/WhyChooseUs"
import { PartnersSection } from "@/components/PartnersSection"
import { FinalCTA } from "@/components/FinalCTA"
import { sanityClient } from "@/lib/sanity"
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd"
import { CustomerReviews } from "@/components/CustomerReviews"
import { Section } from "@/components/layout/Section"
import { BannerCTA } from "@/components/layout/BannerCTA"
import { CasClientFeatured } from "@/components/cas-clients/CasClientFeatured"
import { homeCaseClient } from "@/data/cas-clients"
import { isPartenaireValide } from "@/data/partenaires"
import { ACCUEIL_CTA, ACCUEIL_FAQ, ACCUEIL_OFFRES, GOOGLE_NOTE, VIDEO_TRINEXTA, VIDEO_TRINEXTA_JSONLD } from "@/data/accueil"
import { AccueilEnBref } from "@/components/accueil/AccueilEnBref"
import { VideoPresentation } from "@/components/accueil/VideoPresentation"
import { Container } from "@/components/layout/Container"
import { FadeIn } from "@/components/ui/FadeIn"
import { FaqSection } from "@/components/shared/FaqSection"
import { Heading } from "@/components/ui/Typography"
import { Button } from "@/components/ui/Button"
import { WaveDivider } from "@/components/ui/WaveDivider"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const title = "Prestataire informatique à Évry pour TPE et PME | TRINEXTA";
const description =
  "Support, maintenance et sécurité informatique des TPE et PME d'Évry-Courcouronnes et de l'Essonne. Équipe joignable du lundi au vendredi, de 8 h 30 à 19 h.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
}

async function PartnersData() {
  const partnersQuery = `*[_type == "partenaire" && type == "editeur"] | order(ordre asc) {
    "name": nom,
    "logoSrc": logo.asset->url,
    "isCircle": coalesce(isCircle, false),
    "url": urlOfficiel
  }`;
  let partnersData: { name: string; logoSrc: string; isCircle: boolean; url: string }[] = [];
  try {
    partnersData = await sanityClient.fetch(partnersQuery);
  } catch {
    // Sanity inaccessible - section partenaires masquée
  }

  // Seuls les partenaires validés s'affichent ; sans logo disponible, la section est masquée.
  const partners = partnersData.filter((partner) => isPartenaireValide(partner.name));
  if (partners.length === 0) return null;

  return (
    <>
      <TransitionTitle
        surtitle="Écosystème"
        line1="Nos partenaires"
        line2="technologiques"
      />
      <PartnersSection partners={partners} />
    </>
  );
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ACCUEIL_FAQ.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

/*
 * Accueil (24/10/2026), sur le modèle de l'accueil Studio : une porte d'entrée courte,
 * structurée SEO et GEO. Promesse fixe, « En bref » (qui nous sommes, adresse de
 * référence), services, vidéo, preuve (cas client), formules, démarrage, avis, FAQ.
 * Le détail vit sur les pages dédiées. Retirés de l'accueil : carte d'intervention
 * (zone reprise dans « En bref »), chapeau répété sous le hero.
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-surface relative">
      <JsonLd data={trinextaLocalBusiness} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={VIDEO_TRINEXTA_JSONLD} />
      <BreadcrumbJsonLd items={[{ name: "Accueil", url: "/" }]} />

      <HeroSection />

      <WaveDivider from="primary" to="surface" amplitude="ample" />

      <AccueilEnBref />

      <TransitionTitle
        surtitle="Nos services"
        line1="Ce que nous"
        line2="prenons en charge"
      />

      <ServicesSection />

      <Section container={false} className="relative bg-surface pt-12 md:pt-16 pb-0 md:pb-0 lg:pb-0">
        <Container className="max-w-[1100px]">
          <FadeIn>
            <VideoPresentation {...VIDEO_TRINEXTA} />
          </FadeIn>
        </Container>
      </Section>

      {homeCaseClient && (
        <Section className="pt-12 md:pt-16 pb-0 md:pb-0 lg:pb-0">
          <CasClientFeatured item={homeCaseClient} />
        </Section>
      )}

      <Section className="py-12 md:py-16">
        <BannerCTA
          variant="surface"
          title={ACCUEIL_OFFRES.title}
          description={ACCUEIL_OFFRES.description}
          action={
            <Button asChild variant="secondary" size="lg">
              <Link href={ACCUEIL_OFFRES.ctaHref}>{ACCUEIL_OFFRES.ctaLabel}</Link>
            </Button>
          }
        />
      </Section>

      {/* Bloc sombre central : le circuit passe d'une marge à l'autre à chaque raccord. */}
      <WaveDivider from="surface" to="primary" amplitude="ample" crossing={1} />

      <ApproachSection />

      <WaveDivider from="primary" to="surface" amplitude="ample" crossing={2} />

      <TransitionTitle
        surtitle="Pourquoi TRINEXTA"
        line1="L'humain avant"
        line2="les tickets"
      />
      <WhyChooseUs />

      <Suspense fallback={null}>
        <PartnersData />
      </Suspense>

      <TransitionTitle
        surtitle={`${GOOGLE_NOTE.note} sur ${GOOGLE_NOTE.avis} avis Google`}
        line1="Ce qu'en disent"
        line2="nos clients"
      />
      <CustomerReviews />

      <WaveDivider from="surface" to="primary" amplitude="low" crossing={3} />

      <div className="bg-primary pt-12 pb-24 text-center px-6">
        <Heading as="h2" className="text-white">
          Questions *fréquentes*
        </Heading>
      </div>
      <FaqSection faqs={ACCUEIL_FAQ} />

      <FinalCTA
        line1={ACCUEIL_CTA.line1}
        line2={ACCUEIL_CTA.line2}
        line3={ACCUEIL_CTA.line3}
        description={ACCUEIL_CTA.description}
        ctaLabel={ACCUEIL_CTA.ctaLabel}
        ctaHref={ACCUEIL_CTA.ctaHref}
      />
    </main>
  )
}

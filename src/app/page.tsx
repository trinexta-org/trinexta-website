import { Suspense } from "react"
import Link from "next/link"
import { JsonLd, trinextaLocalBusiness } from "@/components/seo/JsonLd"
import { Metadata } from "next"
import { HeroSection } from "@/components/HeroSection"
import { TransitionTitle } from "@/components/TransitionTitle"
import { ReassuranceSection } from "@/components/ReassuranceSection"
import { ServicesSection } from "@/components/ServicesSection"
import { ApproachSection } from "@/components/ApproachSection"
import { InterventionMap } from "@/components/InterventionMap"
import { KpiSection } from "@/components/KpiSection"
import { WhyChooseUs } from "@/components/WhyChooseUs"
import { PartnersSection } from "@/components/PartnersSection"
import { FinalCTA } from "@/components/FinalCTA"
import { sanityClient } from "@/lib/sanity"
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd"
import { NewsletterCTA } from "@/components/blog/NewsletterCTA"
import { CustomerReviews } from "@/components/CustomerReviews"
import { Section } from "@/components/layout/Section"
import { BannerCTA } from "@/components/layout/BannerCTA"
import { CasClientFeatured } from "@/components/cas-clients/CasClientFeatured"
import { featuredCaseClient } from "@/data/cas-clients"
import { Button } from "@/components/ui/Button"
import { WaveDivider } from "@/components/ui/WaveDivider"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const title = "Prestataire informatique PME à Évry (91) | TRINEXTA";
const description =
  "Prestataire informatique des TPE et PME à Évry-Courcouronnes et en Essonne : infogérance, support, maintenance et cybersécurité, sur site ou à distance.";

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

  return <PartnersSection partners={partnersData} />;
}

export default function Home() {
  return (
    <main className="min-h-screen bg-surface relative">
      <JsonLd data={trinextaLocalBusiness} />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" }
        ]} 
      />
      <HeroSection />

      <WaveDivider from="primary" to="surface" amplitude="ample" />

      <TransitionTitle
        surtitle="Notre cœur de métier"
        line1="Nos Services"
        line2="Infogérance"
      />

      <ServicesSection />

      {featuredCaseClient && (
        <Section className="pt-12 md:pt-16 pb-0 md:pb-0 lg:pb-0">
          <CasClientFeatured item={featuredCaseClient} />
        </Section>
      )}

      <Section className="py-12 md:py-16">
        <BannerCTA
          variant="surface"
          title="Votre site est-il vraiment vu par Google ?"
          description="Obtenez votre score SEO en 30 secondes, gratuitement et sans engagement."
          action={
            <Button asChild variant="secondary" size="lg">
              <Link href="/audit-seo">Lancer mon audit gratuit</Link>
            </Button>
          }
        />
      </Section>

      {/* Entrée du bloc sombre central : le circuit passe de la marge gauche
          à la droite. Les raccords traversants se numérotent ensuite de 1 en 1
          dans l'ordre de la page, et le courant alterne à chacun. */}
      <WaveDivider from="surface" to="primary" amplitude="ample" crossing={1} />

      <ApproachSection />

      <KpiSection />

      {/* Sortie du bloc sombre : le courant repart vers la marge gauche. */}
      <WaveDivider from="primary" to="surface" amplitude="ample" crossing={2} />

      <TransitionTitle
        surtitle="Ce que nous offrons"
        line1="Pourquoi"
        line2="Trinexta ?"
      />
      <WhyChooseUs />

      <WaveDivider from="surface" to="primary" amplitude="low" crossing={3} />

      <InterventionMap />

      <WaveDivider from="primary" to="surface" amplitude="low" crossing={4} />

      <ReassuranceSection />

      <TransitionTitle
        surtitle="Écosystème"
        line1="Nos Partenaires"
        line2="Technologiques"
      />
      <Suspense fallback={null}>
        <PartnersData />
      </Suspense>

      <TransitionTitle
        surtitle="Expérience"
        line1="Ce qu'ils disent"
        line2="de nous"
      />
      <CustomerReviews/>
      <FinalCTA />
      <NewsletterCTA/>

    </main>
  )
}

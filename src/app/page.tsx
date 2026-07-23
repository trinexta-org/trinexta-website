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
import { Button } from "@/components/ui/Button"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const title = "Partenaire Informatique à Évry, en Essonne | Trinexta";
const description =
  "Support illimité, maintenance proactive et cybersécurité pour les TPE et PME en Île-de-France. Intervention sur site et à distance depuis Évry.";

export const metadata: Metadata = {
  title,
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
    <main className="min-h-screen bg-primary relative">
      <JsonLd data={trinextaLocalBusiness} />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" }
        ]} 
      />
      <HeroSection />
      <ReassuranceSection />

      <TransitionTitle
        surtitle="Notre cœur de métier"
        line1="Nos Services"
        line2="Infogérance"
      />
      <ServicesSection />

      <Section className="py-12 md:py-16">
        <BannerCTA
          variant="primary"
          title="Votre site est-il vraiment vu par Google ?"
          description="Obtenez votre score SEO en 30 secondes, gratuitement et sans engagement."
          action={
            <Button asChild variant="secondary" size="lg">
              <Link href="/audit-seo">Lancer mon audit gratuit</Link>
            </Button>
          }
        />
      </Section>

      <ApproachSection />

      <KpiSection />

      <TransitionTitle
        surtitle="Ce que nous offrons"
        line1="Pourquoi"
        line2="Trinexta ?"
      />
      <WhyChooseUs />

      <TransitionTitle
        surtitle="Écosystème"
        line1="Nos Partenaires"
        line2="Technologiques"
      />
      <Suspense fallback={null}>
        <PartnersData />
      </Suspense>

      <InterventionMap />

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
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

export const metadata: Metadata = {
  title: "Trinexta | Infogérance à Évry et prestataire informatique dans l'Essonne",
  description: "Support illimité, maintenance proactive et cybersécurité pour les TPE et PME en Île-de-France.",
  openGraph: {
    title: "Trinexta | Infogérance à Évry et prestataire informatique dans l'Essonne",
    description: "Support illimité, maintenance proactive et cybersécurité pour les TPE et PME en Île-de-France.",
    url: "/",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trinexta | Infogérance à Évry et prestataire informatique dans l'Essonne",
    description: "Support illimité, maintenance proactive et cybersécurité pour les TPE et PME en Île-de-France.",
    images: ["/images/og-default.png"],
  },
}

export default async function Home() {
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

  return (
    <main className="min-h-screen bg-primary relative">
      <JsonLd data={trinextaLocalBusiness} />
      <HeroSection />
      <ReassuranceSection />

      <TransitionTitle
        surtitle="Notre cœur de métier"
        line1="Nos Services"
        line2="Infogérance"
      />
      <ServicesSection />

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
      <PartnersSection partners={partnersData} />

      <InterventionMap />

      <FinalCTA />

    </main>
  )
}
import { Metadata } from "next"
import { sanityClient } from "@/lib/sanity"
import { TransitionTitle } from "@/components/TransitionTitle"
import { AProposHero } from "@/components/a-propos/AProposHero"
import { TrinextaMeaning } from "@/components/a-propos/TrinextaMeaning"
import { OurValues } from "@/components/a-propos/OurValues"
import { OurNetwork } from "@/components/a-propos/OurNetwork"
import { PartnersSection } from "@/components/PartnersSection"

export const metadata: Metadata = {
  title: "À propos | Trinexta",
  description: "Découvrez l'histoire, l'équipe et les engagements de Trinexta. Une informatique plus simple, plus humaine et plus utile à votre entreprise.",
  openGraph: {
    title: "À propos | Trinexta",
    description: "Découvrez l'histoire, l'équipe et les engagements de Trinexta. Une informatique plus simple, plus humaine et plus utile à votre entreprise.",
    url: "/a-propos",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos | Trinexta",
    description: "Découvrez l'histoire, l'équipe et les engagements de Trinexta. Une informatique plus simple, plus humaine et plus utile à votre entreprise.",
    images: ["/images/og-default.png"],
  },
}

export default async function AProposPage() {
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
    // Sanity inaccessible - on évite de faire crasher la page
  }

  return (
    <main className="bg-primary min-h-screen relative text-white">
      <AProposHero />

      <TransitionTitle
        surtitle="Notre ADN"
        line1="La signification"
        line2="de Trinexta"
      />
      <TrinextaMeaning />

      <TransitionTitle
        surtitle="Nos engagements"
        line1="Nos valeurs"
        line2="au quotidien"
      />
      <OurValues />

      <TransitionTitle
        surtitle="L'Humain au centre"
        line1="Notre réseau"
        line2="d'experts"
      />
      <OurNetwork />
      <PartnersSection partners={partnersData} /> 
    </main>
  )
}
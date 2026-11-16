import type { Metadata } from "next"
import { Section } from "@/components/layout/Section"
import { FilAriane } from "@/components/boutique/FilAriane"
import { ContenuPanier } from "@/components/boutique/ContenuPanier"
import { PANIER_TEXTES } from "@/data/boutique"
import { ETAPE_ACCUEIL, ETAPE_BOUTIQUE } from "@/lib/boutique/site"

export const metadata: Metadata = {
  title: "Panier de la boutique",
  description: "Votre panier de matériel professionnel TRINEXTA.",
  alternates: { canonical: "/boutique/panier" },
  // Page propre à chaque visiteur : rien à indexer.
  robots: { index: false, follow: true },
}

export default function PanierPage() {
  return (
    <Section className="py-8 md:py-12 lg:py-14">
      <div className="flex flex-col gap-8">
        <FilAriane etapes={[ETAPE_ACCUEIL, ETAPE_BOUTIQUE, { nom: "Panier", url: "/boutique/panier" }]} />
        <h1 className="text-3xl font-black text-primary md:text-4xl">{PANIER_TEXTES.titre}</h1>
        <ContenuPanier />
      </div>
    </Section>
  )
}

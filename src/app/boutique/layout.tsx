import type { Metadata } from "next"
import { BandeauSimulation } from "@/components/boutique/BandeauSimulation"
import { BarreBoutique } from "@/components/boutique/BarreBoutique"
import { BoutiqueFermee } from "@/components/boutique/BoutiqueFermee"
import { boutiqueVisible } from "@/data/boutique/ouverture"
import { simulationActive } from "@/lib/boutique/api"

// Boutique pas encore ouverte en production : aucune page de la boutique n'est indexée ni affichée.
export const metadata: Metadata = boutiqueVisible ? {} : { title: "Boutique", robots: { index: false, follow: false } }

export default function BoutiqueLayout({ children }: { children: React.ReactNode }) {
  if (!boutiqueVisible) {
    return (
      <div className="bg-surface">
        <BoutiqueFermee />
      </div>
    )
  }
  return (
    <div className="bg-surface">
      <BarreBoutique />
      {simulationActive() && <BandeauSimulation />}
      {children}
    </div>
  )
}

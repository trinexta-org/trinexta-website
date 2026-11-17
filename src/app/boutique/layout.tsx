import { BandeauSimulation } from "@/components/boutique/BandeauSimulation"
import { BarreBoutique } from "@/components/boutique/BarreBoutique"
import { simulationActive } from "@/lib/boutique/api"
import { boutiqueVisible } from "@/data/boutique/ouverture"

export default function BoutiqueLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface">
      {boutiqueVisible && <BarreBoutique />}
      {boutiqueVisible && simulationActive() && <BandeauSimulation />}
      {children}
    </div>
  )
}

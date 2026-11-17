import { BandeauSimulation } from "@/components/boutique/BandeauSimulation"
import { BarreBoutique } from "@/components/boutique/BarreBoutique"
import { simulationActive } from "@/lib/boutique/api"
import { BOUTIQUE_OUVERTE } from "@/data/boutique/ouverture"

export default function BoutiqueLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface">
      {BOUTIQUE_OUVERTE && <BarreBoutique />}
      {BOUTIQUE_OUVERTE && simulationActive() && <BandeauSimulation />}
      {children}
    </div>
  )
}

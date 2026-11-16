import { BandeauSimulation } from "@/components/boutique/BandeauSimulation"
import { simulationActive } from "@/lib/boutique/api"

export default function BoutiqueLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface">
      {simulationActive() && <BandeauSimulation />}
      {children}
    </div>
  )
}

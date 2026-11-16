import { DISPONIBILITE_LIBELLE } from "@/data/boutique"
import type { Disponibilite as Dispo } from "@/lib/boutique/types"
import { cn } from "@/lib/utils"

export function Disponibilite({ valeur }: { valeur: Dispo }) {
  const stock = valeur === "en stock"
  return (
    <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
      <span aria-hidden="true" className={cn("h-2.5 w-2.5 rounded-full", stock ? "bg-secondary-strong" : "border-2 border-secondary-strong")} />
      {DISPONIBILITE_LIBELLE[valeur]}
    </span>
  )
}

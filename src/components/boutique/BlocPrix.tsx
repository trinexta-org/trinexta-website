import { Truck, Wrench } from "lucide-react"
import { dernierJourPromotion, euros } from "@/lib/boutique/format"
import type { Avantage, Prix } from "@/lib/boutique/types"
import { cn } from "@/lib/utils"

/**
 * Prix tel que l'API le donne : TTC en grand, HT dessous, éco-participation à part.
 * Prix barré, pourcentage, opération et avantages arrivent tout calculés (contrat `api-boutique.md`) :
 * le site les affiche tels quels et ne recalcule rien. Sans `barreTtc`, aucun prix barré ni pourcentage.
 */
export function BlocPrix({ prix, taille = "carte" }: { prix: Prix; taille?: "carte" | "fiche" }) {
  const fiche = taille === "fiche"
  const barre = prix.barreTtc
  const reduction = barre !== null
  const badge = prix.operation ?? prix.promotion
  const jusquau = reduction ? dernierJourPromotion(prix.finPromotion) : null
  return (
    <div className="flex flex-col gap-1">
      {barre !== null && (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {badge && <span className="rounded-full bg-secondary-strong px-2.5 py-0.5 text-xs font-bold text-white">{badge}</span>}
          {prix.pourcentage !== null && prix.pourcentage > 0 && (
            <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-black text-white">-{prix.pourcentage} %</span>
          )}
          <span className="text-muted-foreground">
            Au lieu de <s>{euros(barre)}</s> TTC
          </span>
        </div>
      )}
      <p className={cn("font-black text-primary", fiche ? "text-4xl md:text-5xl" : "text-2xl")}>
        {euros(prix.ttc)} <span className={cn("font-bold", fiche ? "text-lg" : "text-sm")}>TTC</span>
      </p>
      <p className={cn("text-muted-foreground", fiche ? "text-base" : "text-sm")}>{euros(prix.ht)} HT</p>
      {jusquau && <p className="text-xs font-semibold text-secondary-strong">Offre valable jusqu&apos;au {jusquau} inclus</p>}
      {prix.ecoParticipationTtc > 0 && (
        <p className="text-xs text-muted-foreground">
          + {euros(prix.ecoParticipationTtc)} TTC d&apos;éco-participation ({euros(prix.ecoParticipationHt)} HT)
        </p>
      )}
      {prix.avantages.length > 0 && (
        <ul className={cn("flex flex-col gap-1", fiche ? "mt-2" : "mt-1")}>
          {prix.avantages.map((a) => (
            <li key={`${a.type}-${a.nom}`} className="flex items-start gap-1.5 text-xs font-semibold text-primary">
              {a.type === "installation_offerte" ? (
                <Wrench aria-hidden="true" className="mt-px h-3.5 w-3.5 shrink-0 text-secondary-strong" />
              ) : (
                <Truck aria-hidden="true" className="mt-px h-3.5 w-3.5 shrink-0 text-secondary-strong" />
              )}
              <span>{libelleAvantage(a, fiche)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function libelleAvantage(a: Avantage, fiche: boolean): string {
  const base =
    a.type === "installation_offerte"
      ? `Installation du premier poste offerte${a.valeurTtc !== null ? ` (valeur ${euros(a.valeurTtc)} TTC)` : ""}`
      : "Livraison offerte"
  return fiche ? `${base}, ${a.nom}` : base
}

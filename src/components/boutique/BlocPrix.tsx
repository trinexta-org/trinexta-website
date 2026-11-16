import { euros } from "@/lib/boutique/format"
import type { Prix } from "@/lib/boutique/types"
import { cn } from "@/lib/utils"

/**
 * Prix tel que l'API le donne : TTC en grand, HT dessous, éco-participation à part.
 * Prix barré seulement si l'API renvoie `barreTtc` : le site ne calcule ni prix barré ni pourcentage.
 */
export function BlocPrix({ prix, taille = "carte" }: { prix: Prix; taille?: "carte" | "fiche" }) {
  const fiche = taille === "fiche"
  return (
    <div className="flex flex-col gap-1">
      {prix.barreTtc !== null && (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {prix.promotion && (
            <span className="rounded-full bg-secondary-strong px-2.5 py-0.5 text-xs font-bold text-white">{prix.promotion}</span>
          )}
          <span className="text-muted-foreground">
            Au lieu de <s>{euros(prix.barreTtc)}</s> TTC
          </span>
        </div>
      )}
      <p className={cn("font-black text-primary", fiche ? "text-4xl md:text-5xl" : "text-2xl")}>
        {euros(prix.ttc)} <span className={cn("font-bold", fiche ? "text-lg" : "text-sm")}>TTC</span>
      </p>
      <p className={cn("text-muted-foreground", fiche ? "text-base" : "text-sm")}>{euros(prix.ht)} HT</p>
      {prix.ecoParticipationTtc > 0 && (
        <p className="text-xs text-muted-foreground">
          + {euros(prix.ecoParticipationTtc)} TTC d&apos;éco-participation ({euros(prix.ecoParticipationHt)} HT)
        </p>
      )}
    </div>
  )
}

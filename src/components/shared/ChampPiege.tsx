import type { Ref } from "react"
import { CHAMP_PIEGE } from "@/data/anti-abus"

/**
 * Champ caché anti-robots. Hors écran plutôt que display:none (que certains
 * robots ignorent), sorti de l'ordre de tabulation et masqué aux lecteurs d'écran.
 */
export function ChampPiege({ ref }: { ref: Ref<HTMLInputElement> }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Ne pas remplir ce champ
        <input ref={ref} type="text" name={CHAMP_PIEGE} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  )
}

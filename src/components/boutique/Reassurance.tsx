import { Wrench, ShieldCheck, MapPin } from "lucide-react"
import { BOUTIQUE_REASSURANCE } from "@/data/boutique"

const ICONES = [ShieldCheck, Wrench, MapPin]

export function Reassurance() {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {BOUTIQUE_REASSURANCE.map((r, i) => {
        const Icone = ICONES[i] ?? ShieldCheck
        return (
          <li key={r.titre} className="flex gap-4 rounded-2xl border border-border bg-white p-5">
            <Icone aria-hidden="true" className="h-6 w-6 shrink-0 text-secondary-strong" />
            <div className="flex flex-col gap-1">
              <p className="font-bold text-primary">{r.titre}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{r.texte}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

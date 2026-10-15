"use client"

import { useState } from "react"
import Link from "next/link"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Heading, Text } from "@/components/ui/Typography"
import { SERENITE_CALCULATEUR as CALC, SERENITE_OFFRES } from "@/data/serenite"

const euros = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function clamp(value: number) {
  if (Number.isNaN(value)) return CALC.min
  return Math.min(CALC.max, Math.max(CALC.min, Math.round(value)))
}

export function SereniteCalculateur() {
  const [postes, setPostes] = useState<number>(CALC.defaut)

  return (
    <div className="rounded-[2rem] border border-secondary/25 bg-background p-6 md:p-10 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-center">
        <div className="space-y-5">
          <span className="text-secondary-strong text-xs font-mono font-bold uppercase tracking-widest block">
            {CALC.surtitle}
          </span>
          <Heading as="h3" emphasis={false} className="text-foreground text-2xl md:text-3xl">
            {CALC.titre}
          </Heading>
          <Text className="text-muted-foreground text-base leading-relaxed">{CALC.intro}</Text>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPostes((n) => clamp(n - 1))}
                disabled={postes <= CALC.min}
                aria-label="Retirer un poste"
                className="h-11 w-11 shrink-0 rounded-full border border-border bg-surface flex items-center justify-center text-primary hover:border-secondary disabled:opacity-40 transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <label className="flex items-baseline gap-2">
                <span className="sr-only">Nombre de postes</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={CALC.min}
                  max={CALC.max}
                  value={postes}
                  onChange={(e) => setPostes(clamp(e.target.valueAsNumber))}
                  className="w-20 rounded-xl border border-border bg-surface px-3 py-2 text-center text-2xl font-black text-primary tabular-nums focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <span className="text-foreground font-bold">{postes > 1 ? "postes" : "poste"}</span>
              </label>
              <button
                type="button"
                onClick={() => setPostes((n) => clamp(n + 1))}
                disabled={postes >= CALC.max}
                aria-label="Ajouter un poste"
                className="h-11 w-11 shrink-0 rounded-full border border-border bg-surface flex items-center justify-center text-primary hover:border-secondary disabled:opacity-40 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <input
              type="range"
              min={CALC.min}
              max={CALC.max}
              value={postes}
              onChange={(e) => setPostes(clamp(e.target.valueAsNumber))}
              aria-label="Nombre de postes"
              className="w-full accent-[var(--secondary-strong)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" aria-live="polite">
          {SERENITE_OFFRES.map((offre) => {
            const dark = offre.highlighted
            const total = parseFloat(offre.prixSchema) * postes
            return (
              <div
                key={offre.id}
                className={`flex flex-col gap-4 rounded-2xl border p-5 md:p-6 ${
                  dark ? "bg-primary border-primary text-white" : "bg-surface-strong border-secondary/25"
                }`}
              >
                <div>
                  <p className={`text-sm font-bold ${dark ? "text-secondary-soft" : "text-primary"}`}>{offre.nom}</p>
                  <p className={`mt-2 text-3xl md:text-4xl font-black tabular-nums ${dark ? "text-white" : "text-primary"}`}>
                    {euros.format(total)}
                  </p>
                  <p className={`text-sm ${dark ? "text-white/70" : "text-muted-foreground"}`}>
                    HT par mois, {postes} × {offre.prix}
                  </p>
                  <p className={`mt-1 text-xs font-bold ${dark ? "text-white/80" : "text-primary"}`}>
                    {offre.conditions[0]}
                  </p>
                </div>
                <Button
                  asChild
                  variant={dark ? "secondary" : "outline"}
                  className={`mt-auto w-full h-auto py-3 text-sm font-bold whitespace-normal ${dark ? "text-white" : ""}`}
                >
                  <Link href={`${offre.cta.href}&postes=${postes}`}>Demander ce devis</Link>
                </Button>
              </div>
            )
          })}
        </div>
      </div>

      <Text className="text-muted-foreground text-xs md:text-sm mt-6 md:mt-8">{CALC.note}</Text>
    </div>
  )
}

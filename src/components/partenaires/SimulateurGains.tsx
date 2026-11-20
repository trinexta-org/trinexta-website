"use client"

import { useState } from "react"
import {
  PARTENAIRES_PRIX_POSTE,
  PARTENAIRES_SIMULATEUR as S,
  commissionMensuelle,
  formaterEuros,
} from "@/data/programme-partenaires"

function Curseur({
  id,
  label,
  valeur,
  min,
  max,
  onChange,
}: {
  id: string
  label: string
  valeur: number
  min: number
  max: number
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-bold text-primary">
          {label}
        </label>
        <output htmlFor={id} className="text-2xl font-extrabold text-primary">
          {valeur}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={valeur}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-primary"
      />
      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}

/** Simulateur de commission : entreprises présentées × postes moyens × 79 € × 15 %. */
export function SimulateurGains() {
  const [entreprises, setEntreprises] = useState(S.entreprises.defaut)
  const [postes, setPostes] = useState(S.postes.defaut)
  const parMois = commissionMensuelle(entreprises * postes)

  return (
    <div className="mt-16 grid gap-10 rounded-3xl border border-border bg-background p-6 sm:p-10 lg:grid-cols-2">
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-bold text-primary md:text-2xl">{S.titre}</h3>
          <p className="mt-2 text-muted-foreground">{S.intro}</p>
        </div>
        <Curseur
          id="sim-entreprises"
          label="Entreprises signées"
          valeur={entreprises}
          min={S.entreprises.min}
          max={S.entreprises.max}
          onChange={setEntreprises}
        />
        <Curseur
          id="sim-postes"
          label="Postes par entreprise, en moyenne"
          valeur={postes}
          min={S.postes.min}
          max={S.postes.max}
          onChange={setPostes}
        />
      </div>
      <div className="flex flex-col justify-center rounded-2xl bg-primary p-8 text-primary-foreground" aria-live="polite">
        <p className="text-sm text-primary-foreground/75">Votre complément de revenu</p>
        <p className="mt-1 text-5xl font-extrabold text-secondary">{formaterEuros(parMois)}</p>
        <p className="text-sm text-primary-foreground/75">par mois, pendant 12 mois</p>
        <p className="mt-6 border-t border-primary-foreground/20 pt-6 text-lg font-semibold">
          Soit {formaterEuros(parMois * 12)} sur 12 mois
        </p>
        <p className="mt-2 text-xs text-primary-foreground/60">
          {entreprises * postes} postes × {PARTENAIRES_PRIX_POSTE} € HT × 15 %
        </p>
      </div>
    </div>
  )
}

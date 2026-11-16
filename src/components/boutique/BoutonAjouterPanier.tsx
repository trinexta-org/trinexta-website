"use client"

import Link from "next/link"
import { useState } from "react"
import { Check, ShoppingCart } from "lucide-react"
import { usePanier } from "./usePanier"
import { ajouter, QUANTITE_MAX, type LignePanier } from "@/lib/boutique/panier"
import type { CodeVariante } from "@/lib/boutique/types"

type Cible = { type: "article"; slug: string } | { type: "kit"; slug: string; variante: CodeVariante }

/** « Ajouter au panier » avec choix de la quantité. Le panier reste dans le navigateur. */
export function BoutonAjouterPanier({ cible, libelle = "Ajouter au panier" }: { cible: Cible; libelle?: string }) {
  const { modifier } = usePanier()
  const [quantite, setQuantite] = useState(1)
  const [ajoute, setAjoute] = useState(false)

  const ajouterAuPanier = () => {
    const ligne: LignePanier = cible.type === "kit" ? { ...cible, quantite } : { ...cible, quantite }
    modifier((l) => ajouter(l, ligne))
    setAjoute(true)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <label className="sr-only" htmlFor={`quantite-${cible.slug}`}>
          Quantité
        </label>
        <input
          id={`quantite-${cible.slug}`}
          type="number"
          inputMode="numeric"
          min={1}
          max={QUANTITE_MAX}
          value={quantite}
          onChange={(e) => {
            const n = Number(e.target.value)
            setQuantite(Number.isInteger(n) ? Math.min(Math.max(n, 1), QUANTITE_MAX) : 1)
            setAjoute(false)
          }}
          className="h-14 w-20 rounded-xl border border-border bg-white text-center text-lg font-bold text-primary focus:outline-2 focus:outline-secondary-strong"
        />
        <button
          type="button"
          onClick={ajouterAuPanier}
          className="inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-xl bg-secondary-strong px-6 text-lg font-black text-white shadow-md transition-all hover:bg-secondary-strong/90 active:scale-95"
        >
          <ShoppingCart aria-hidden="true" className="h-5 w-5" />
          {libelle}
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-6 text-sm">
        {ajoute && (
          <span className="inline-flex flex-wrap items-center gap-2 font-semibold text-primary">
            <Check aria-hidden="true" className="h-4 w-4 text-secondary-strong" />
            Ajouté au panier.
            <Link href="/boutique/panier" className="text-secondary-strong underline underline-offset-4">
              Voir le panier
            </Link>
          </span>
        )}
      </p>
    </div>
  )
}

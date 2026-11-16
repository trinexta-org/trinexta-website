"use client"

import { useCallback, useSyncExternalStore } from "react"
import { CLE_PANIER, EVENEMENT_PANIER, ecrirePanier, lirePanier, type LignePanier } from "@/lib/boutique/panier"

// Panier partagé par tous les composants de la page et les autres onglets (événement `storage`).

let cache: { brut: string | null; lignes: LignePanier[] } = { brut: null, lignes: [] }
const VIDE: LignePanier[] = []

function instantane(): LignePanier[] {
  let brut: string | null = null
  try {
    brut = window.localStorage.getItem(CLE_PANIER)
  } catch {
    return VIDE
  }
  if (brut !== cache.brut) cache = { brut, lignes: lirePanier() }
  return cache.lignes
}

function abonner(rappel: () => void) {
  const surStockage = (e: StorageEvent) => {
    if (e.key === null || e.key === CLE_PANIER) rappel()
  }
  window.addEventListener(EVENEMENT_PANIER, rappel)
  window.addEventListener("storage", surStockage)
  return () => {
    window.removeEventListener(EVENEMENT_PANIER, rappel)
    window.removeEventListener("storage", surStockage)
  }
}

export function usePanier() {
  const lignes = useSyncExternalStore(abonner, instantane, () => VIDE)
  const modifier = useCallback((f: (l: LignePanier[]) => LignePanier[]) => ecrirePanier(f(lirePanier())), [])
  return { lignes, modifier }
}

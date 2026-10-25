"use client"

import { useSyncExternalStore } from "react"

const REQUETE = "(prefers-reduced-motion: reduce)"

function abonner(callback: () => void) {
  const mql = window.matchMedia(REQUETE)
  mql.addEventListener("change", callback)
  return () => mql.removeEventListener("change", callback)
}

/** true si le visiteur a demandé à réduire les animations (réglage système). */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    abonner,
    () => window.matchMedia(REQUETE).matches,
    () => false
  )
}

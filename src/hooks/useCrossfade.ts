"use client"

import { useEffect, useState } from "react"

/**
 * Anime un crossfade lors du changement de valeur affichée (switch d'onglet),
 * en remplacement d'AnimatePresence mode="wait" pour les cas simples.
 * Dérivation purement par effet (cf. bug usePresence : jamais de setState pendant le render).
 */
export function useCrossfade<T>(value: T, duration = 300) {
  const [displayValue, setDisplayValue] = useState(value)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (value === displayValue) return

    queueMicrotask(() => setIsVisible(false))
    const timeout = setTimeout(() => {
      setDisplayValue(value)
      queueMicrotask(() => setIsVisible(true))
    }, duration)
    return () => clearTimeout(timeout)
  }, [value, displayValue, duration])

  return { displayValue, isVisible }
}

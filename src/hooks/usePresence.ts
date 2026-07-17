"use client"

import { useEffect, useState } from "react"

/**
 * Garde un élément monté le temps de son animation de sortie CSS,
 * en remplacement d'AnimatePresence pour les cas simples (modals, switch d'onglet).
 */
export function usePresence(isOpen: boolean, duration = 300) {
  const [shouldRender, setShouldRender] = useState(isOpen)
  const [isVisible, setIsVisible] = useState(isOpen)

  useEffect(() => {
    if (isOpen) {
      queueMicrotask(() => setShouldRender(true))
      const raf = requestAnimationFrame(() => setIsVisible(true))
      return () => cancelAnimationFrame(raf)
    }

    queueMicrotask(() => setIsVisible(false))
    const timeout = setTimeout(() => setShouldRender(false), duration)
    return () => clearTimeout(timeout)
  }, [isOpen, duration])

  return { shouldRender, isVisible }
}

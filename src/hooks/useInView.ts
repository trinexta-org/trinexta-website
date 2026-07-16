"use client"

import { useEffect, useRef, useState } from "react"

interface UseInViewOptions extends IntersectionObserverInit {
  once?: boolean
}

export function useInView<T extends HTMLElement>({ once = true, ...observerOptions }: UseInViewOptions = {}) {
  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        if (once) observer.disconnect()
      } else if (!once) {
        setIsInView(false)
      }
    }, observerOptions)

    observer.observe(node)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [once])

  return [ref, isInView] as const
}

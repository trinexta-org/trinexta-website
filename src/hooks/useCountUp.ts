"use client"

import { useEffect, useRef } from "react"

interface UseCountUpOptions {
  value: number
  format?: (n: number) => string
  duration?: number
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

export function useCountUp<T extends HTMLElement>({
  value,
  format = (n) => String(n),
  duration = 2.3,
}: UseCountUpOptions) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    let frame: number
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (!entry.isIntersecting) return
        obs.disconnect()

        const start = performance.now()
        const durationMs = duration * 1000

        const tick = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1)
          node.textContent = format(Math.floor(value * easeOutCubic(progress)))
          if (progress < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { rootMargin: "-50px" }
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value, format, duration])

  return ref
}

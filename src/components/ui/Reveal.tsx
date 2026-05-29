"use client"

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(frame)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return

        requestAnimationFrame(() => setVisible(true))
        observer.disconnect()
      },
      {
        root: null,
        rootMargin: "0px 0px -20% 0px",
        threshold: 0.25,
      }
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  const style: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translate3d(0, 0, 0)" : "translate3d(0, 18px, 0)",
    transitionProperty: "opacity, transform",
    transitionDuration: "650ms",
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    transitionDelay: visible ? `${delay}s` : "0s",
    willChange: visible ? "auto" : "opacity, transform",
  }

  return (
    <div
      ref={ref}
      data-reveal-visible={visible ? "true" : "false"}
      className={className}
      style={style}
    >
      {children}
    </div>
  )
}

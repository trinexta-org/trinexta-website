import React, { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
}

export function FadeIn({ children, delay = 0, direction = "up", className, ...props }: FadeInProps) {
  // Offset initial via `transform` (pas les utilitaires Tailwind `translate-*`, qui posent
  // la propriété CSS `translate` — distincte de `transform` — que @keyframes fade-in-scroll
  // n'anime jamais : l'élément resterait décalé en permanence une fois l'animation "terminée").
  const directionTransforms = {
    up: "translateY(2rem)",
    down: "translateY(-2rem)",
    left: "translateX(2rem)",
    right: "translateX(-2rem)",
    none: "translate(0, 0)",
  }

  return (
    <div
      className={cn(
        "opacity-0 motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out animate-fade-in-scroll",
        "motion-reduce:opacity-100 motion-reduce:transform-none", // Gestion native de prefers-reduced-motion
        className
      )}
      style={{
        transform: directionTransforms[direction],
        transitionDelay: `${delay}s`,
        ...props.style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
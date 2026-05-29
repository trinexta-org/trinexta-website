import React, { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface EntranceProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  delay?: number // in seconds
  duration?: number // in seconds
  direction?: "up" | "down" | "left" | "right" | "none"
}

export function Entrance({
  children,
  delay = 0,
  duration = 0.8,
  direction = "up",
  className,
  style,
  ...props
}: EntranceProps) {
  const directionAnimations = {
    up: "animate-fade-in-up",
    down: "animate-fade-in-down",
    left: "animate-fade-in-left",
    right: "animate-fade-in-right",
    none: "animate-fade-in",
  }

  return (
    <div
      className={cn(
        directionAnimations[direction] || "animate-fade-in-up",
        "motion-reduce:opacity-100 motion-reduce:transform-none",
        className
      )}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

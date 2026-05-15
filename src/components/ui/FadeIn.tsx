import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
}

export function FadeIn({ children, delay = 0, direction = "up", className, ...props }: FadeInProps) {
  // On utilise des classes Tailwind personnalisées qu'on va définir dans globals.css
  const directionClasses = {
    up: "translate-y-8",
    down: "-translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
    none: "translate-x-0 translate-y-0",
  }

  return (
    <div
      className={cn(
        "opacity-0 motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out animate-fade-in-scroll",
        "motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:translate-x-0", // Gestion native de prefers-reduced-motion
        directionClasses[direction],
        className
      )}
      style={{
        transitionDelay: `${delay}s`,
        ...props.style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
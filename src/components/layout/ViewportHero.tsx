import { type ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

type ViewportHeroProps = ComponentPropsWithoutRef<"section">

export function ViewportHero({ children, className, ...props }: ViewportHeroProps) {
  return (
    <section
      className={cn(
        "relative z-10 flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden lg:min-h-[calc(100dvh-7.5rem)]",
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

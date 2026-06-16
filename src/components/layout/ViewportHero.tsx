import { type ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"
import { SectionFade } from "@/components/ui/SectionFade"

type ViewportHeroProps = ComponentPropsWithoutRef<"section"> & {
  fade?: boolean
}

export function ViewportHero({ children, className, fade = true, ...props }: ViewportHeroProps) {
  return (
    <section
      className={cn(
        "relative z-10 flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden lg:min-h-[calc(100dvh-7.5rem)]",
        className
      )}
      {...props}
    >
      {children}
      {fade && <SectionFade edge="bottom" className="h-32 md:h-48" />}
    </section>
  )
}

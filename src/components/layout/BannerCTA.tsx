import { cn } from "@/lib/utils"
import { Heading, Text } from "@/components/ui/Typography"
import { ReactNode } from "react"

type BannerVariant = "primary" | "secondary" | "accent"

export interface BannerCTAProps {
  title: string
  description?: string
  action: ReactNode 
  variant?: BannerVariant
  className?: string
  children?: ReactNode 
}

export function BannerCTA({ 
  title, 
  description, 
  action, 
  variant = "primary", 
  className,
  children
}: BannerCTAProps) {
  
  const variantStyles: Record<BannerVariant, string> = {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-white",
    accent: "bg-muted text-primary border border-border"
  }

  const textClass = variant === "primary" || variant === "secondary" ? "text-white" : ""
  const descClass = variant === "primary" || variant === "secondary" ? "text-white/80" : ""

  return (
    <div className={cn("relative overflow-hidden rounded-2xl p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8", variantStyles[variant], className)}>
      
      <div className="space-y-4 max-w-2xl text-center md:text-left z-10">
        <Heading as="h2" className={cn("text-3xl md:text-4xl", textClass)}>
          {title}
        </Heading>
        {description && (
          <Text className={cn("text-lg", descClass)}>
            {description}
          </Text>
        )}
        {children}
      </div>

      <div className="shrink-0 z-10">
        {action}
      </div>

      <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none w-64 h-64 translate-x-1/4 translate-y-1/4 rounded-full bg-white blur-3xl" />
    </div>
  )
}
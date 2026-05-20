import { cn } from "@/lib/utils"
import { ElementType, ReactNode } from "react"

type HeadingLevel = "h1" | "h2" | "h3" | "h4"

interface HeadingProps {
  children: ReactNode
  className?: string
  as?: HeadingLevel
}

export function Heading({ children, className, as: Component = "h2" }: HeadingProps) {
  const styles: Record<HeadingLevel, string> = {
    h1: "text-4xl md:text-5xl lg:text-6xl font-black text-primary tracking-tighter leading-[1.1]",
    h2: "text-3xl md:text-4xl font-black text-primary tracking-tight",
    h3: "text-xl md:text-2xl font-bold text-primary",
    h4: "text-lg font-bold text-primary",
  }
  
  const Tag = Component as ElementType
  return <Tag className={cn(styles[Component], className)}>{children}</Tag>
}

type TextVariant = "body" | "lead" | "small"

interface TextProps {
  children: ReactNode
  className?: string
  variant?: TextVariant
}

export function Text({ children, className, variant = "body" }: TextProps) {
  const styles: Record<TextVariant, string> = {
    body: "text-base text-muted-foreground leading-relaxed",
    lead: "text-lg md:text-xl text-muted-foreground font-medium",
    small: "text-sm text-muted-foreground",
  }
  return <p className={cn(styles[variant], className)}>{children}</p>
}
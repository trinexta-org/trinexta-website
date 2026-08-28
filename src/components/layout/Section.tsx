import { cn } from "@/lib/utils"
import { Container } from "./Container"

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  container?: boolean 
  style?: React.CSSProperties
}

export function Section({ children, className, id, container = true, style }: SectionProps) {
  return (
    <section 
      id={id} 
      className={cn("py-16 md:py-24 lg:py-32", className)}
      style={style}
    >
      {container ? <Container>{children}</Container> : children}
    </section>
  )
}
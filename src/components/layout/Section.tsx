import { cn } from "@/lib/utils"
import { Container } from "./Container"

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  container?: boolean 
}

export function Section({ children, className, id, container = true }: SectionProps) {
  return (
    <section 
      id={id} 
      className={cn("py-16 md:py-24 lg:py-32", className)}
    >
      {container ? <Container>{children}</Container> : children}
    </section>
  )
}
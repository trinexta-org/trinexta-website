import { cn } from "@/lib/utils"

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
      {children}
    </section>
  )
}
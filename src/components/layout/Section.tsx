import { cn } from "@/lib/utils"
import { Container } from "./Container"
import { HaloBackground } from "@/components/ui/HaloBackground"

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  container?: boolean
  dark?: boolean
}

export function Section({ children, className, id, container = true, dark = false }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24 lg:py-32",
        dark && "bg-primary relative isolate overflow-hidden",
        className,
      )}
    >
      {dark && <HaloBackground intensity="mid" />}
      {container ? <Container>{children}</Container> : children}
    </section>
  )
}
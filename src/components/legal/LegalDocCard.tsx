import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface LegalDocCardProps {
  title: string
  description: string
  href: string
}

export function LegalDocCard({ title, description, href }: LegalDocCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-xl border border-secondary/20 bg-surface-strong p-6 transition-all duration-300 hover:border-secondary/40 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-bold text-primary leading-snug">{title}</h3>
        <ArrowRight className="w-4 h-4 text-secondary-strong shrink-0 mt-0.5 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
      <p className="text-sm text-primary/60 leading-relaxed">{description}</p>
    </Link>
  )
}
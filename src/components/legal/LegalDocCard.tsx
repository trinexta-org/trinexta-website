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
      className="group flex flex-col gap-3 rounded-xl border border-white/[0.09] bg-white/[0.04] p-6 transition-all duration-300 hover:border-secondary/35 hover:bg-white/[0.07]"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-bold text-white leading-snug">{title}</h3>
        <ArrowRight className="w-4 h-4 text-secondary shrink-0 mt-0.5 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
      <p className="text-sm text-white/60 leading-relaxed">{description}</p>
    </Link>
  )
}

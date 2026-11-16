import Link from "next/link"
import { BadgeCheck } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { IconePanier } from "./IconePanier"
import { MENTION_PROFESSIONNELS } from "@/data/boutique"

/** Barre de la boutique, sous l'en-tête du site : accès à la boutique, mention professionnels, panier. */
export function BarreBoutique() {
  return (
    <div className="sticky top-16 z-30 border-b border-white/10 bg-primary lg:top-[7.5rem]">
      <Container className="flex items-center justify-between gap-4 py-2.5">
        <div className="flex min-w-0 items-center gap-4">
          <Link href="/boutique" className="font-black text-white hover:underline">
            Boutique TRINEXTA
          </Link>
          <span className="inline-flex min-w-0 items-center gap-1.5 text-sm text-white/70">
            <BadgeCheck aria-hidden="true" className="h-4 w-4 shrink-0 text-secondary-soft" />
            <span className="truncate">{MENTION_PROFESSIONNELS}</span>
          </span>
        </div>
        <IconePanier />
      </Container>
    </div>
  )
}

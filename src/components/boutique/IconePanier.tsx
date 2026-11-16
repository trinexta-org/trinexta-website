"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { usePanier } from "./usePanier"
import { nombreArticles } from "@/lib/boutique/panier"

export function IconePanier() {
  const { lignes } = usePanier()
  const n = nombreArticles(lignes)
  return (
    <Link
      href="/boutique/panier"
      aria-label={n > 0 ? `Panier, ${n} article${n > 1 ? "s" : ""}` : "Panier vide"}
      className="relative inline-flex items-center gap-2 rounded-xl border border-white/30 px-4 py-2 font-bold text-white transition-colors hover:bg-white/10"
    >
      <ShoppingCart aria-hidden="true" className="h-5 w-5" />
      <span className="hidden sm:inline">Panier</span>
      {n > 0 && (
        <span className="min-w-6 rounded-full bg-white px-1.5 text-center text-xs font-black leading-6 text-primary">{n > 99 ? "99+" : n}</span>
      )}
    </Link>
  )
}

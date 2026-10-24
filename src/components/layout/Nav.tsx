"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { liensDe, menuItems } from "@/data/navigation"

export function Nav() {
  const pathname = usePathname()
  const [ouvert, setOuvert] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)
  // Ouvert par le survol : le clic qui suit ne doit pas le refermer.
  const parSurvol = useRef(false)

  // Ferme le sous-menu au clic extérieur et sur Échap.
  useEffect(() => {
    if (!ouvert) return
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOuvert(null)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOuvert(null)
    }
    document.addEventListener("mousedown", onClick)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [ouvert])

  const estActif = (href: string) => {
    const path = href.split(/[?#]/)[0]
    return pathname === path || (path !== "/" && pathname?.startsWith(path))
  }

  return (
    <nav ref={navRef} className="hidden lg:flex items-center gap-8" aria-label="Menu principal">
      {menuItems.map((item) => {
        const isActive = liensDe(item).some(estActif)
        const lienClasse = cn(
          "text-sm font-bold transition-colors relative py-6 flex items-center gap-1",
          isActive ? "text-secondary-strong" : "text-primary hover:text-secondary-strong"
        )
        const soulignement = (
          <span
            className={cn(
              "absolute bottom-4 left-0 h-0.5 bg-secondary transition-all duration-300",
              isActive ? "w-full" : "w-0 group-hover:w-full"
            )}
          />
        )

        if (!item.groups) {
          return (
            <div key={item.label} className="relative group">
              <Link href={item.href ?? "/"} className={lienClasse}>
                {item.label}
                {soulignement}
              </Link>
            </div>
          )
        }

        const estOuvert = ouvert === item.label
        const colonnes = item.groups.length
        return (
          <div
            key={item.label}
            className="relative group"
            onMouseEnter={() => {
              parSurvol.current = true
              setOuvert(item.label)
            }}
            onMouseLeave={() => {
              parSurvol.current = false
              setOuvert((o) => (o === item.label ? null : o))
            }}
          >
            <button
              type="button"
              aria-expanded={estOuvert}
              aria-haspopup="true"
              onClick={() => {
                if (parSurvol.current && estOuvert) return
                setOuvert(estOuvert ? null : item.label)
              }}
              className={cn(lienClasse, "outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded")}
            >
              {item.label}
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", estOuvert && "rotate-180")} aria-hidden="true" />
              {soulignement}
            </button>

            <div
              className={cn(
                "absolute top-[80%] left-1/2 -translate-x-1/2 pt-4 transition-all duration-200 z-50",
                colonnes > 1 ? "w-[600px]" : "w-[320px]",
                estOuvert ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"
              )}
            >
              <div
                className={cn(
                  "bg-background border border-border rounded-xl shadow-xl p-4 grid gap-4",
                  colonnes > 1 ? "grid-cols-2" : "grid-cols-1"
                )}
              >
                {item.groups.map((groupe) => (
                  <div key={groupe.titre}>
                    <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                      {groupe.titre}
                    </p>
                    <ul className="space-y-0.5">
                      {groupe.items.map((sub) => (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            onClick={() => setOuvert(null)}
                            aria-current={estActif(sub.href) ? "page" : undefined}
                            className={cn(
                              "block rounded-lg px-3 py-2 transition-colors hover:bg-accent",
                              estActif(sub.href) && "bg-accent"
                            )}
                          >
                            <span className="block text-sm font-semibold text-primary">{sub.label}</span>
                            {sub.desc && <span className="block text-xs text-muted-foreground">{sub.desc}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </nav>
  )
}

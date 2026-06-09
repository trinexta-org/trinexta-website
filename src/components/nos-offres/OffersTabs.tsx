"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Container } from "@/components/layout/Container"

const tabs = [
  { id: "impulsion", label: "Offre Impulsion", sub: "Régie & Renfort IT" },
  { id: "serenite", label: "Offre Sérénité", sub: "Clefs en main / MSP" },
  { id: "services-annexes", label: "Services Annexes", sub: "Prestations sur devis" },
  { id: "studio", label: "Trinexta Studio", sub: "Création Web & SaaS" }
]

export function OffersTabs({ activeSlug }: { activeSlug?: string }) {
  const [headerHeight, setHeaderHeight] = useState(60)

  useEffect(() => {
    const header = document.querySelector('header')
    if (!header) return

    const observer = new ResizeObserver((entries) => {
      setHeaderHeight(entries[0].target.getBoundingClientRect().height)
    })

    observer.observe(header)
    return () => observer.disconnect()
  }, [])

  return (
    <div id="offers-explorer" style={{ scrollMarginTop: `${headerHeight}px` }} className="w-full space-y-8">
      <div
        className="sticky z-30 bg-primary/95 backdrop-blur-md py-3 w-full"
        style={{ top: `${headerHeight}px` }}
      >
        <Container className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {tabs.map((tab) => {
            const isSelected = activeSlug === tab.id
            return (
              <Link
                key={tab.id}
                href={`/nos-offres/${tab.id}`}
                scroll={false}
                className={`relative p-3 rounded-lg text-left transition-all duration-300 flex flex-col justify-center overflow-hidden group h-16 md:h-20 min-w-0 ${isSelected
                  ? "bg-secondary/10"
                  : "bg-white/[0.02] hover:bg-white/[0.05]"
                  }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeHorizontalGlow"
                    className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent pointer-events-none"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative z-10 truncate min-w-0">
                  <span className={`text-[8px] md:text-[9px] font-mono font-bold uppercase tracking-widest block ${isSelected ? "text-secondary" : "text-white/40"}`}>
                    {tab.sub}
                  </span>
                  <div className={`text-[10px] md:text-sm font-black transition-colors ${isSelected ? "text-secondary" : "text-white group-hover:text-secondary"}`}>
                    {tab.label}
                  </div>
                </div>
              </Link>
            )
          })}
        </Container>
      </div>
    </div>
  )
}
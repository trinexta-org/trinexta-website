"use client"

import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { type CaseClient } from "@/data/cas-clients"
import { Button } from "@/components/ui/Button"
import { Text } from "@/components/ui/Typography"
import { TrinextaGear } from "@/components/ui/TrinextaGear"

export function CasClientCard({ item }: { item: CaseClient }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] overflow-hidden backdrop-blur-sm"
      animate={{
        borderColor: hovered ? "rgba(92,146,184,0.32)" : "rgba(255,255,255,0.1)",
      }}
      transition={{ duration: 0.4 }}
    >
      {/* Labels */}
      <div className="flex items-center justify-between px-6 pt-5">
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
          {item.label}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
          {item.sectorLabel}
        </span>
      </div>

      {/* Défi — fond neutre légèrement surélevé, s'atténue au hover */}
      <motion.div
        className="relative px-6 pt-5 pb-6 bg-white/[0.04]"
        animate={{ opacity: hovered ? 0.6 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <Text className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
          Défi
        </Text>
        <Text className="text-white/80 leading-relaxed">{item.cardChallenge}</Text>
      </motion.div>

      {/* Pivot — la roue génératrice */}
      <div className="relative flex items-center gap-4 border-y border-white/[0.07] px-6 py-4">
        {/* Faisceau montant vers Défi — grandit depuis la roue */}
        <motion.div
          className="pointer-events-none absolute bottom-full w-[2px] bg-gradient-to-t from-secondary/75 to-transparent"
          style={{ left: 46, height: 64, originY: 1 }}
          animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />

        {/* Faisceau descendant vers Résultat — part après le faisceau montant */}
        <motion.div
          className="pointer-events-none absolute top-full w-[2px] bg-gradient-to-b from-secondary/75 to-transparent"
          style={{ left: 46, height: 64, originY: 0 }}
          animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
        />

        {/* Halo radial — s'expand au hover */}
        <motion.div
          className="pointer-events-none absolute top-1/2 rounded-full bg-secondary/30 blur-xl"
          style={{ left: 46 }}
          animate={{
            width: hovered ? 110 : 50,
            height: hovered ? 110 : 50,
            x: "-50%",
            y: "-50%",
            opacity: hovered ? 0.75 : 0.2,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Roue — impulsion CSS +20° au hover, en plus de l'animation SVG interne */}
        <motion.div
          className="relative z-10 flex-shrink-0"
          animate={{ rotate: hovered ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 14 }}
        >
          <TrinextaGear size={44} />
        </motion.div>

        {/* Client + taille — corrigé */}
        <Text className="relative z-10 text-sm font-medium text-white/60 md:text-base">
          {item.clientName} · {item.size}
        </Text>
      </div>

      {/* Résultat — teinte froide, s'illumine (le résultat est "produit") */}
      <div className="relative px-6 pt-5 pb-4">
        <motion.div
          className="pointer-events-none absolute inset-0 bg-secondary/[0.1]"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        />
        <div className="relative z-10">
          <Text className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary/80">
            Résultat
          </Text>
          <Text className="text-white/80 leading-relaxed">{item.cardResult}</Text>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto px-6 pb-6 pt-3">
        <Text className="mb-4 text-sm text-white/35 line-clamp-1">{item.title}</Text>
        <Button asChild variant="secondary" className="w-full">
          <Link href={`/cas-clients/${item.slug}`}>Voir le parcours</Link>
        </Button>
      </div>
    </motion.article>
  )
}

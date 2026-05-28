"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { type CaseClient } from "@/data/cas-clients"
import { Button } from "@/components/ui/Button"
import { TrinextaGear } from "@/components/ui/TrinextaGear"

export function CasClientCard({ item }: { item: CaseClient }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl">
      {/* Card image */}
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={item.cardImage}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary/80" />
        <span className="absolute right-3 top-3 rounded-full bg-secondary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg shadow-secondary/30">
          {item.label}
        </span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-white/[0.07] px-6 py-4">
        <TrinextaGear size={18} />
        <span className="text-sm font-semibold text-white/90">{item.clientName}</span>
        <span className="text-white/20">·</span>
        <span className="text-sm text-white/60">{item.sectorLabel}</span>
        <span className="text-white/20">·</span>
        <span className="text-sm text-white/60">{item.size}</span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-6 py-5">
        <h3 className="mb-3 text-lg font-bold leading-snug text-white md:text-xl">
          {item.title}
        </h3>
        <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-white/70">
          {item.cardChallenge}
        </p>

        {/* Metrics — split AVANT / APRÈS */}
        <div className="space-y-2">
          {item.metrics.map((metric, i) => (
            <motion.div
              key={metric.indicator}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="overflow-hidden rounded-xl border border-white/10"
            >
              <div className="border-b border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
                {metric.indicator}
              </div>
              <div className="grid grid-cols-2">
                <div className="border-r border-white/[0.07] px-3 py-3">
                  <div className="mb-1.5 text-[9px] font-bold uppercase tracking-widest text-white/50">
                    Avant
                  </div>
                  <div className="text-sm font-medium leading-tight text-white/65">
                    {metric.before}
                  </div>
                </div>
                <div className="bg-secondary/[0.08] px-3 py-3">
                  <div className="mb-1.5 text-[9px] font-bold uppercase tracking-widest text-secondary">
                    Après
                  </div>
                  <div className="text-sm font-bold leading-tight text-white">
                    {metric.after}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/[0.07] px-6 py-4">
        <p className="mb-4 line-clamp-1 text-xs text-white/60">{item.cardResult}</p>
        <Button asChild variant="secondary" className="w-full">
          <Link href={`/cas-clients/${item.slug}`}>Voir le parcours</Link>
        </Button>
      </div>
    </article>
  )
}

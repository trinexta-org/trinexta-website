"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { type CaseClient } from "@/data/cas-clients"
import { Button } from "@/components/ui/Button"
import { TrinextaGear } from "@/components/ui/TrinextaGear"

const METRIC_DURATION = 2600

export function CasClientCard({ item }: { item: CaseClient }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setTimeout(
      () => setActive((a) => (a + 1) % item.metrics.length),
      METRIC_DURATION
    )
    return () => clearTimeout(t)
  }, [active, item.metrics.length])

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-white/[0.07] px-6 py-4">
        <TrinextaGear size={18} />
        <span className="text-sm font-semibold text-white/80">{item.clientName}</span>
        <span className="text-white/20">·</span>
        <span className="text-sm text-white/40">{item.sectorLabel}</span>
        <span className="text-white/20">·</span>
        <span className="text-sm text-white/40">{item.size}</span>
        <span className="ml-auto rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white/35">
          {item.label}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-6 py-5">
        <h3 className="mb-3 text-base font-bold leading-snug text-white md:text-[17px]">
          {item.title}
        </h3>
        <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-white/50">
          {item.cardChallenge}
        </p>

        {/* Metrics */}
        <div className="space-y-2">
          {item.metrics.map((metric, i) => {
            const isActive = active === i
            return (
              <motion.div
                key={metric.indicator}
                className="rounded-xl border px-4 py-3"
                animate={{
                  borderColor: isActive
                    ? "rgba(92,146,184,0.35)"
                    : "rgba(255,255,255,0.05)",
                  backgroundColor: isActive
                    ? "rgba(92,146,184,0.07)"
                    : "rgba(255,255,255,0.01)",
                }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-1 text-[11px] font-medium uppercase tracking-wider text-white/35">
                  {metric.indicator}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-white/30 line-through decoration-white/20">
                    {metric.before}
                  </span>
                  <span className="text-white/25">→</span>
                  <motion.span
                    className="font-semibold"
                    animate={{
                      color: isActive
                        ? "rgba(255,255,255,0.95)"
                        : "rgba(255,255,255,0.6)",
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {metric.after}
                  </motion.span>
                  {isActive && (
                    <motion.span
                      className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-secondary"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/[0.07] px-6 py-4">
        <p className="mb-4 line-clamp-1 text-xs text-white/35">{item.cardResult}</p>
        <Button asChild variant="secondary" className="w-full">
          <Link href={`/cas-clients/${item.slug}`}>Voir le parcours</Link>
        </Button>
      </div>
    </article>
  )
}

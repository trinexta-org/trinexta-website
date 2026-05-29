"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { motion, useAnimationControls } from "framer-motion"
import { type CaseClient } from "@/data/cas-clients"
import { Button } from "@/components/ui/Button"
import { TrinextaGear } from "@/components/ui/TrinextaGear"

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

function MetricRow({
  metric,
  rowIndex,
}: {
  metric: CaseClient["metrics"][number]
  rowIndex: number
}) {
  const avantCtrl = useAnimationControls()
  const apresCtrl = useAnimationControls()
  const flashCtrl = useAnimationControls()

  useEffect(() => {
    let alive = true

    ;(async () => {
      await sleep(rowIndex * 1300)
      if (!alive) return

      while (alive) {
        // AVANT
        await avantCtrl.start(
          { opacity: 1, y: 0 },
          { duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }
        )
        await sleep(2200)
        if (!alive) break

        await avantCtrl.start(
          { opacity: 0, y: -12 },
          { duration: 0.26, ease: [0.55, 0, 1, 0.45] }
        )

        // Sweep: secondary bar travels left→right across the row
        // clipPath phase 1: right-inset 100%→0% (bar appears L→R)
        // clipPath phase 2: left-inset 0%→100% (bar exits L→R)
        await flashCtrl.start(
          {
            clipPath: [
              "inset(0 100% 0 0%)",
              "inset(0 0%   0 0%)",
              "inset(0 0%   0 100%)",
            ],
          },
          { duration: 0.48, times: [0, 0.38, 1], ease: "linear" }
        )
        flashCtrl.set({ clipPath: "inset(0 100% 0 0%)" })

        // APRÈS
        if (!alive) break
        await apresCtrl.start(
          { opacity: 1, y: 0 },
          { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }
        )
        await sleep(2800)
        if (!alive) break

        await apresCtrl.start(
          { opacity: 0, y: 10 },
          { duration: 0.26, ease: "easeIn" }
        )

        avantCtrl.set({ y: -8 })
      }
    })()

    return () => {
      alive = false
    }
  }, [avantCtrl, apresCtrl, flashCtrl, rowIndex])

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10">
      <motion.div
        animate={flashCtrl}
        initial={{ clipPath: "inset(0 100% 0 0%)" }}
        className="pointer-events-none absolute inset-0 z-10 bg-secondary/20"
      />
      <div className="relative z-20 border-b border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
        {metric.indicator}
      </div>
      <div className="relative min-h-[54px]">
        <motion.div
          animate={avantCtrl}
          initial={{ opacity: 0, y: -8 }}
          className="absolute inset-0 z-0 flex flex-col justify-center px-3 py-3"
        >
          <div className="mb-1 text-[9px] font-bold uppercase tracking-widest text-white/40">
            Avant
          </div>
          <div className="text-sm font-medium leading-tight text-white/65">
            {metric.before}
          </div>
        </motion.div>
        <motion.div
          animate={apresCtrl}
          initial={{ opacity: 0, y: 10 }}
          className="absolute inset-0 z-0 flex flex-col justify-center px-3 py-3"
        >
          <div className="mb-1 text-[9px] font-bold uppercase tracking-widest text-secondary">
            Après
          </div>
          <div className="text-sm font-bold leading-tight text-white">
            {metric.after}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export function CasClientCard({ item }: { item: CaseClient }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl">
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

      <div className="flex items-center gap-2.5 border-b border-white/[0.07] px-6 py-4">
        <TrinextaGear size={18} />
        <span className="text-sm font-semibold text-white/90">{item.clientName}</span>
        <span className="text-white/20">·</span>
        <span className="text-sm text-white/60">{item.sectorLabel}</span>
        <span className="text-white/20">·</span>
        <span className="text-sm text-white/60">{item.size}</span>
      </div>

      <div className="flex flex-1 flex-col px-6 py-5">
        <h3 className="mb-3 text-lg font-bold leading-snug text-white md:text-xl">{item.title}</h3>
        <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-white/70">{item.cardChallenge}</p>

        <div className="space-y-2">
          {item.metrics.map((metric, i) => (
            <MetricRow key={metric.indicator} metric={metric} rowIndex={i} />
          ))}
        </div>
      </div>

      <div className="border-t border-white/[0.07] px-6 py-4">
        <p className="mb-4 line-clamp-1 text-xs text-white/60">{item.cardResult}</p>
        <Button asChild variant="secondary" className="w-full">
          <Link href={`/cas-clients/${item.slug}`}>Voir le parcours</Link>
        </Button>
      </div>
    </article>
  )
}

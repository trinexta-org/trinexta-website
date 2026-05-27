"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { caseClientSectors, type CaseClient } from "@/data/cas-clients"
import { Button } from "@/components/ui/Button"
import { Heading, Text } from "@/components/ui/Typography"

export function CasClientsFilters({ items }: { items: CaseClient[] }) {
  const [activeSector, setActiveSector] = useState<(typeof caseClientSectors)[number]["value"]>("all")

  const filteredItems = useMemo(() => {
    if (activeSector === "all") return items
    return items.filter((item) => item.sector === activeSector)
  }, [activeSector, items])

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {caseClientSectors.map((sector) => {
          const isActive = sector.value === activeSector

          return (
            <button
              key={sector.value}
              type="button"
              onClick={() => setActiveSector(sector.value)}
              className={[
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                isActive
                  ? "border-secondary bg-secondary text-white"
                  : "border-white/15 bg-white/5 text-white/75 hover:border-secondary/40 hover:text-white",
              ].join(" ")}
            >
              {sector.label}
            </button>
          )
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredItems.map((item) => (
          <article
            key={item.slug}
            className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                {item.label}
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                {item.sectorLabel}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Text className="text-white/60">{item.clientName} · {item.size}</Text>
              <Heading as="h3" className="text-white text-2xl">
                {item.title}
              </Heading>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <Text className="text-white/50 text-sm uppercase tracking-[0.14em] font-semibold">Défi</Text>
                <Text className="mt-2 text-white/80">{item.cardChallenge}</Text>
              </div>
              <div>
                <Text className="text-white/50 text-sm uppercase tracking-[0.14em] font-semibold">Résultat</Text>
                <Text className="mt-2 text-white/80">{item.cardResult}</Text>
              </div>
            </div>

            <div className="mt-8">
              <Button asChild variant="secondary" className="w-full">
                <Link href={`/cas-clients/${item.slug}`}>Lire l'étude</Link>
              </Button>
            </div>
          </article>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-8 text-center">
          <Heading as="h3" className="text-white">Aucun cas dans ce secteur</Heading>
          <Text className="mt-3 text-white/70">
            Aucun cas n'est encore affiché pour ce filtre.
          </Text>
        </div>
      ) : null}
    </div>
  )
}

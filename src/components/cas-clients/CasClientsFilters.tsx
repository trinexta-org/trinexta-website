"use client"

import { useMemo, useState } from "react"
import { caseClientSectors, type CaseClient } from "@/data/cas-clients"
import { Heading, Text } from "@/components/ui/Typography"
import { CasClientCard } from "@/components/cas-clients/CasClientCard"

export function CasClientsFilters({ items }: { items: CaseClient[] }) {
  const [activeSector, setActiveSector] = useState<(typeof caseClientSectors)[number]["value"]>("all")

  const filteredItems = useMemo(() => {
    if (activeSector === "all") return items
    return items.filter((item) => item.sector === activeSector)
  }, [activeSector, items])

  return (
    <div className="space-y-10">
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

      <div className="grid gap-6 md:grid-cols-2">
        {filteredItems.map((item) => (
          <CasClientCard key={item.slug} item={item} />
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-8 text-center">
          <Heading as="h3" className="text-white">Aucun cas dans ce secteur</Heading>
          <Text className="mt-3 text-white/70">
            Aucun cas n&apos;est encore affiché pour ce filtre.
          </Text>
        </div>
      ) : null}
    </div>
  )
}

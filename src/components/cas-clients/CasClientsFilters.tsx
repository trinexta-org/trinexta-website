"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { caseClientSectors, type CaseClient } from "@/data/cas-clients";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Typography";
import { TrinextaGear } from "@/components/ui/TrinextaGear";

export function CasClientsFilters({ items }: { items: CaseClient[] }) {
  const [activeSector, setActiveSector] =
    useState<(typeof caseClientSectors)[number]["value"]>("all");

  const filteredItems = useMemo(() => {
    if (activeSector === "all") return items;
    return items.filter((item) => item.sector === activeSector);
  }, [activeSector, items]);

  return (
    <div className="space-y-10">
      {/* Sector filter pills */}
      <div className="flex flex-wrap gap-3">
        {caseClientSectors.map((sector) => {
          const isActive = sector.value === activeSector;
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
          );
        })}
      </div>

      {/* Cards — 2 columns max */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredItems.map((item) => (
          <article
            key={item.slug}
            className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] overflow-hidden backdrop-blur-sm"
          >
            {/* Top label row */}
            <div className="flex items-center justify-between px-6 pt-5">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
                {item.label}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
                {item.sectorLabel}
              </span>
            </div>

            {/* Challenge band */}
            <div className="px-6 pt-5 pb-6">
              <Text className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
                Défi
              </Text>
              <Text className="text-white/80 leading-relaxed">
                {item.cardChallenge}
              </Text>
            </div>

            {/* Gear divider */}
            <div className="flex items-center gap-3 border-y border-white/[0.07] bg-secondary/[0.15] px-6 py-3">
              <TrinextaGear size={44} />
              <Text className="text-xs lg:text-lg text-white/70">
                {item.clientName} · {item.size}
              </Text>
            </div>

            {/* Result band */}
            <div className="px-6 pt-5 pb-4">
              <Text className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary/75">
                Résultat
              </Text>
              <Text className="text-white/80 leading-relaxed">
                {item.cardResult}
              </Text>
            </div>

            {/* Footer */}
            <div className="mt-auto px-6 pb-6 pt-3">
              <Text className="mb-4 text-sm text-white/35 line-clamp-1">
                {item.title}
              </Text>
              <Button asChild variant="secondary" className="w-full">
                <Link href={`/cas-clients/${item.slug}`}>Voir le parcours</Link>
              </Button>
            </div>
          </article>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-8 text-center">
          <Heading as="h3" className="text-white">
            Aucun cas dans ce secteur
          </Heading>
          <Text className="mt-3 text-white/70">
            Aucun cas n'est encore affiché pour ce filtre.
          </Text>
        </div>
      ) : null}
    </div>
  );
}

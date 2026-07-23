"use client"

import dynamic from "next/dynamic"

export const KpiSection = dynamic(() =>
  import("@/components/KpiSection").then((mod) => mod.KpiSection)
)

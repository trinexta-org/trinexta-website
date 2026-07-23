"use client"

import dynamic from "next/dynamic"

export const PartnersSection = dynamic(() =>
  import("@/components/PartnersSection").then((mod) => mod.PartnersSection)
)

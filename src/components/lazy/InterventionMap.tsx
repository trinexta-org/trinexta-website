"use client"

import dynamic from "next/dynamic"

export const InterventionMap = dynamic(() =>
  import("@/components/InterventionMap").then((mod) => mod.InterventionMap)
)

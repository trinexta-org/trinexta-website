"use client"

import dynamic from "next/dynamic"

export const FinalCTA = dynamic(() =>
  import("@/components/FinalCTA").then((mod) => mod.FinalCTA)
)

"use client"

import dynamic from "next/dynamic"

export const WhyChooseUs = dynamic(() =>
  import("@/components/WhyChooseUs").then((mod) => mod.WhyChooseUs)
)

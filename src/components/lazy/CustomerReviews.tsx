"use client"

import dynamic from "next/dynamic"

export const CustomerReviews = dynamic(() =>
  import("@/components/CustomerReviews").then((mod) => mod.CustomerReviews)
)

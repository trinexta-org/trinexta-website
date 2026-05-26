"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ImpulsionDetails } from "./ImpulsionDetails"
import { SereniteDetails } from "./SereniteDetails"
import { ServicesDetails } from "./ServicesDetails"
import { StudioDetails } from "./StudioDetails"

const tabs = [
  { id: "impulsion", label: "Offre Impulsion", sub: "Régie & Renfort IT" },
  { id: "serenite", label: "Offre Sérénité", sub: "Clefs en main / MSP" },
  { id: "services-annexes", label: "Services Annexes", sub: "Prestations sur devis" },
  { id: "studio", label: "Trinexta Studio", sub: "Création Web & SaaS" }
]

export function OffersTabs() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("impulsion")

  useEffect(() => {
    const tabParam = searchParams.get("tab")
    if (tabParam && tabs.some(tab => tab.id === tabParam) && activeTab !== tabParam) {
      setActiveTab(tabParam)
    }
  }, [searchParams, activeTab, tabs]) 

  return (
    <div id="offers-explorer" className="scroll-mt-[160px] w-full space-y-8">
      <div className="sticky top-[60px] md:top-[114px] z-30 bg-primary/95 backdrop-blur-md py-3 border-b border-white/10 w-full shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 px-2 max-w-7xl mx-auto">
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  router.push(`/nos-offres?tab=${tab.id}`, { scroll: false })
                }}
                className={`relative p-3 rounded-lg text-left border transition-all duration-300 flex flex-col justify-center overflow-hidden group h-16 md:h-20 ${isSelected
                    ? "bg-secondary/10 border-secondary shadow-md shadow-secondary/5"
                    : "bg-white/[0.01] border-white/5 hover:border-white/20 hover:bg-white/[0.02]"
                  }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeHorizontalGlow"
                    className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent pointer-events-none"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative z-10 truncate">
                  <span className={`text-[8px] md:text-[9px] font-mono font-bold uppercase tracking-widest block ${isSelected ? "text-secondary" : "text-white/40"}`}>
                    {tab.sub}
                  </span>
                  <div className={`text-[10px] md:text-sm font-black transition-colors ${isSelected ? "text-secondary" : "text-white group-hover:text-secondary"}`}>
                    {tab.label}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
      <div className="w-full min-h-[500px] pt-4 px-2 md:px-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full"
          >
            {activeTab === "impulsion" && <ImpulsionDetails />}
            {activeTab === "serenite" && <SereniteDetails />}
            {activeTab === "services-annexes" && <ServicesDetails />}
            {activeTab === "studio" && <StudioDetails />}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  )
}
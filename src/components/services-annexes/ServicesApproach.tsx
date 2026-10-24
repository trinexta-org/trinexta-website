"use client"

import { useState } from "react"
import Image from "next/image"
import { Heading } from "@/components/ui/Typography"
import { SA_SUJETS } from "@/data/services-annexes"

const approachItems = SA_SUJETS.items


export function ServicesApproach() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="py-12 lg:py-24 bg-surface">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="relative rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden shadow-2xl bg-primary min-h-[600px] flex items-center">
          <div className="md:hidden absolute inset-0 z-0">
            <Image 
              src="/images/nos-offres/max-scaling.jpg" 
              alt=""
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/70 z-0"></div>
          </div>

          <Image 
            src="/images/nos-offres/impulsion_concret.jpg" 
            alt=""
            fill
            className="hidden md:block object-cover object-right"
          />

          <div className="hidden md:block absolute inset-0 bg-black/40 z-0"></div>
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent z-0"></div>

          <div className="relative z-10 w-full lg:w-[55%] p-10 lg:p-20 h-full flex flex-col justify-center">
            <div className="space-y-6 mb-12">
              <Heading as="h3" className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                {SA_SUJETS.titreDebut} <br/> <span className="text-secondary-strong">{SA_SUJETS.titreAccent}</span>
              </Heading>
              <div className="text-base md:text-lg text-white/80 leading-relaxed">
                <p>{SA_SUJETS.intro}</p>
              </div>
            </div>

            <div className="space-y-2">
              {approachItems.map((item, index) => {
                const isActive = activeIndex === index
                return (
                  <div 
                    key={index} 
                    className="border-b border-white/10 last:border-0"
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full py-4 flex items-center justify-between text-left group"
                    >
                      <span className={`text-xl font-bold transition-colors duration-300 ${isActive ? "text-white" : "text-white/60 group-hover:text-white/90"}`}>
                        {item.label}
                      </span>
                      <svg 
                        className={`w-6 h-6 transform transition-transform duration-500 ${isActive ? "rotate-180 text-secondary-strong" : "text-white/40"}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"}`}
                    >
                      <p className="text-white/70 text-base leading-relaxed pr-8">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
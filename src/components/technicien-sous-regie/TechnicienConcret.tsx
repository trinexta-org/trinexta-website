"use client"

import { useState } from "react"
import Image from "next/image"

const situations = [
  { 
    label: "Pic d'activité", 
    desc: "Un surcroît de travail temporaire ? Nous intégrons un renfort opérationnel pour absorber la charge et maintenir vos délais sans surcharger vos équipes." 
  },
  { 
    label: "Besoin ponctuel", 
    desc: "Une mission courte ou un dépannage immédiat. Vous disposez de la compétence requise, juste le temps nécessaire." 
  },
  { 
    label: "Absence à compenser", 
    desc: "Un collaborateur absent ou en transition ? Nous assurons la continuité de service avec un profil déjà opérationnel et immédiatement disponible." 
  },
  { 
    label: "Projet de déploiement", 
    desc: "Migration, installation massive, upgrade réseau. Nous apportons la main-d'œuvre et le savoir-faire pour réussir votre déploiement." 
  },
  { 
    label: "Besoin durable IT", 
    desc: "Un besoin de support régulier mais sans le poids d'un recrutement. Une souplesse totale pour accompagner votre croissance." 
  }
]

export function TechnicienConcret() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="py-12 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="relative rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden shadow-2xl bg-[#0a1128] min-h-[700px] flex items-center">
          
          <div className="md:hidden absolute inset-0 z-0">
             <Image 
                src="/images/nos-offres/max-scaling.jpg" 
                alt="Concrètement Mobile"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/60 z-0"></div>
          </div>

          <Image 
            src="/images/nos-offres/impulsion_concret.jpg" 
            alt="Concrètement Desktop"
            fill
            className="hidden md:block object-cover object-right"
          />

          <div className="hidden md:block absolute inset-0 bg-black/40 z-0"></div>

          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#0a1128]/95 via-[#0a1128]/50 to-transparent z-0"></div>

          <div className="relative z-10 w-full lg:w-[55%] p-10 lg:p-20 h-full flex flex-col justify-center">
            
            <div className="space-y-6 mb-12">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Ce que l&apos;on fait <br/> <span className="text-secondary">concrètement</span>
              </h2>
              <div className="space-y-4 text-base md:text-lg text-white/80 leading-relaxed">
                <p>
                  La prestation Technicien sous régie est notre service de mise à disposition de personnel dédié exclusivement au support informatique. Ici, pas de dispositif complexe ni de formule figée : notre mission est simple. Vous apporter un renfort humain qualifié pour soutenir vos équipes, fluidifier le quotidien de vos utilisateurs et sécuriser le bon fonctionnement de votre environnement informatique.
                </p>
                <p>
                  C&apos;est une solution pertinente si vous faites face à un pic d&apos;activité, à un besoin ponctuel, à une absence à compenser, à un projet de déploiement ou à un besoin plus durable en support IT.
                </p>
              </div>
            </div>

            <div className="hidden lg:block space-y-2">
              {situations.map((item, index) => {
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
                        className={`w-6 h-6 transform transition-transform duration-500 ${isActive ? "rotate-180 text-secondary" : "text-white/40"}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? "max-h-40 opacity-100 pb-4" : "max-h-0 opacity-0"}`}
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
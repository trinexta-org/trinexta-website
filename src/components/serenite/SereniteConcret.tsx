"use client"

import { useState } from "react"
import Image from "next/image"

const differentiators = [
  { 
    label: "Prise en charge des logiciels métier", 
    desc: "Votre logiciel de comptabilité rencontre un bug ? Votre outil de planning ne fonctionne plus correctement ? Nous prenons le sujet en main de A à Z, au-delà du simple matériel." 
  },
  { 
    label: "Relais direct avec les éditeurs", 
    desc: "Vous n'avez plus à faire l'intermédiaire. Nous contactons l'éditeur du logiciel pour vous et nous faisons le lien avec les bons interlocuteurs techniques." 
  },
  { 
    label: "Suivi transparent et gain de temps", 
    desc: "Nous suivons le dossier de bout en bout et nous vous tenons informé à chaque étape de la résolution. Résultat : vous ne perdez plus de temps au téléphone." 
  }
]

export function SereniteConcret() {
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
                alt="Approche globale Trinexta"
                fill
                className="object-cover object-center"
             />
             <div className="absolute inset-0 bg-black/70 z-0"></div>
          </div>

          <Image 
            src="/images/nos-offres/impulsion_concret.jpg" 
            alt="Approche globale Trinexta"
            fill
            className="hidden md:block object-cover object-right"
          />

          <div className="hidden md:block absolute inset-0 bg-black/40 z-0"></div>

          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#0a1128]/95 via-[#0a1128]/80 to-transparent z-0"></div>

          <div className="relative z-10 w-full lg:w-[55%] p-10 lg:p-20 h-full flex flex-col justify-center">
            
            <div className="space-y-6 mb-12">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Ce qu&apos;on fait que les autres <br/> <span className="text-secondary">ne font pas</span>
              </h2>
              <div className="space-y-4 text-base md:text-lg text-white/80 leading-relaxed">
                <p>
                  Beaucoup de prestataires informatiques interviennent uniquement sur le matériel ou les problèmes les plus classiques. Chez TRINEXTA, notre approche est plus globale.
                </p>
                <p>
                  Nous considérons que votre informatique est un tout. Dès qu&apos;un outil freine votre activité, nous le considérons comme notre problème, même si ce n&apos;est pas &quot;notre&quot; logiciel.
                </p>
              </div>
            </div>

            <div className="hidden lg:block space-y-2">
              {differentiators.map((item, index) => {
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
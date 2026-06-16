"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function TechnicienPricing() {
  return (
    <div className="py-24 bg-primary overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-[36px] md:text-[44px] text-white mb-6 leading-tight font-black">
              Notre modèle : la transparence <br />
              <em className="italic font-light font-serif text-secondary">absolue</em>
            </h2>
            <p className="text-white/60 text-[16px] leading-[1.8] max-w-lg">
              Pas de grille tarifaire à 47 lignes. Deux options claires, adaptées à la durée de votre mission. Dans les deux cas : zéro frais de dossier, zéro frais de mise en place, zéro frais d&apos;intégration.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 flex justify-center lg:justify-end [perspective:1200px]"
          >
            <motion.div
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ transform: "rotateX(10deg) rotateY(-15deg) rotateZ(3deg)" }}
              className="relative w-[340px] h-[720px] bg-phone-body rounded-[48px] border-[8px] border-phone-frame shadow-[-25px_40px_80px_rgba(0,0,0,0.6),0_0_50px_rgba(92,146,184,0.1),inset_0_0_4px_rgba(255,255,255,0.1)] flex flex-col"
            >
              <div className="absolute top-[110px] -left-[10px] w-[3px] h-[26px] bg-phone-button rounded-l-md" />
              <div className="absolute top-[160px] -left-[10px] w-[3px] h-[50px] bg-phone-button rounded-l-md" />
              <div className="absolute top-[220px] -left-[10px] w-[3px] h-[50px] bg-phone-button rounded-l-md" />
              <div className="absolute top-[180px] -right-[10px] w-[3px] h-[70px] bg-phone-button rounded-r-md" />

              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[110px] h-[32px] bg-black rounded-full z-40 shadow-[inset_0_0_4px_rgba(255,255,255,0.1)] flex items-center justify-end px-3">
                 <div className="w-2.5 h-2.5 rounded-full bg-phone-camera border border-white/10" />
              </div>

              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] via-transparent to-white/[0.01] pointer-events-none z-20 rounded-[40px]" />

              <div className="flex-1 overflow-hidden rounded-[40px] bg-primary flex flex-col relative z-10">
                
                <div className="h-12 w-full bg-primary shrink-0" />

                <div className="py-4 px-6 bg-white flex items-center justify-between z-30 shrink-0">
                  <Image 
                    src="/images/trinexta-logo.png" 
                    alt="Trinexta" 
                    width={120} 
                    height={32} 
                    className="object-contain" 
                  />
                  <div className="flex flex-col gap-[5px] p-1">
                    <div className="w-6 h-[1.5px] bg-neutral-900" />
                    <div className="w-6 h-[1.5px] bg-neutral-900" />
                    <div className="w-6 h-[1.5px] bg-neutral-900" />
                  </div>
                </div>

                <div className="p-6 flex flex-col gap-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                  
                  <div className="text-center mt-2 mb-2">
                    <h3 className="text-white text-[28px] font-black font-serif leading-none">Nos Tarifs</h3>
                    <p className="text-secondary text-[26px] font-serif italic font-light mt-1">Transparence</p>
                    <div className="w-12 h-1 bg-secondary mx-auto mt-5 rounded-full" />
                  </div>

                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10 relative shadow-lg">
                    <h4 className="text-white font-bold text-xl mb-1">TJM</h4>
                    <p className="text-secondary text-xs mb-3 font-medium">Taux Journalier Moyen</p>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Missions courtes ou ponctuelles. Vous payez uniquement les jours travaillés. Idéal pour les remplacements.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10 relative shadow-lg">
                    <h4 className="text-white font-bold text-xl mb-1">Forfait</h4>
                    <p className="text-secondary text-xs mb-3 font-medium">Mensuel fixe</p>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Missions longue durée. Budget lissé et prévisible. Simplicité administrative.
                    </p>
                  </div>

                  <div className="h-4" />
                </div>
              </div>

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/40 rounded-full z-40" />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
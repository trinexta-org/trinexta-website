"use client"

import { motion } from "framer-motion"

export interface Partner {
  name: string;
  logoSrc: string;
  isCircle: boolean;
  url?: string;
}

export function PartnersSection({ partners }: { partners: Partner[] }) {
  const carouselPartners = [...partners, ...partners, ...partners, ...partners, ...partners]
  const itemsCount = partners.length || 11; 

  return (
    <section className="relative bg-primary pt-8 pb-16 md:pb-32 overflow-hidden">
      <style>{`
        @keyframes scroll-partners {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-184px * ${itemsCount})); }
        }
        @media (min-width: 768px) {
          @keyframes scroll-partners {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-240px * ${itemsCount})); }
          }
        }
        .animate-scroll {
          animation: scroll-partners 40s linear infinite;
          width: max-content;
        }
        .pause-on-hover:hover .animate-scroll {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative w-full flex overflow-hidden pause-on-hover mt-4">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-primary to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-primary to-transparent z-20 pointer-events-none" />

        <div className="flex animate-scroll gap-6 md:gap-8 px-4">
          {carouselPartners.map((partner, index) => (
            <PartnerCard key={`${partner.name}-${index}`} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative group w-40 md:w-52 h-28 md:h-36 flex flex-col items-center justify-center gap-3 md:gap-5 bg-primary rounded-xl border border-white/5 shadow-lg overflow-hidden shrink-0 cursor-pointer transition-all duration-300 hover:bg-white/[0.03] hover:border-white/20"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

      <div className={`relative z-10 flex items-center justify-center ${partner.isCircle ? 'h-10 w-10 md:h-14 md:w-14' : 'h-8 w-8 md:h-12 md:w-12'}`}>
        <img 
          src={partner.logoSrc} 
          alt={`Logo ${partner.name}`}
          className={`w-full h-full object-contain opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ${
            partner.isCircle ? 'rounded-full bg-white/5 shadow-inner' : 'rounded-md'
          }`}
        />
      </div>
      
      <span className="text-white/30 group-hover:text-white text-[9px] md:text-[11px] font-bold tracking-[0.2em] uppercase transition-colors duration-500 z-10">
        {partner.name}
      </span>
    </motion.div>
  )
}
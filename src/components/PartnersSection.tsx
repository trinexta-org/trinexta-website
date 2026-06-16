"use client"

import Image from "next/image"
import { Section } from "@/components/layout/Section"
import { HaloBackground } from "@/components/ui/HaloBackground"

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
    <Section container={false} className="relative pt-8 pb-16 md:pb-32 overflow-hidden">
      <HaloBackground intensity="low" />
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
          will-change: transform;
        }
        .pause-on-hover:hover .animate-scroll {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative w-full flex overflow-hidden pause-on-hover mt-4">
        <div className="flex animate-scroll gap-6 md:gap-8">
          {carouselPartners.map((partner, index) => (
            <PartnerCard 
              key={`${partner.name}-${index}`} 
              partner={partner}
              ariaHidden={index >= partners.length} 
            />
          ))}
        </div>
      </div>
    </Section>
  )
}

function PartnerCard({ partner, ariaHidden }: { partner: Partner, ariaHidden?: boolean }) {
  return (
    <div 
      aria-hidden={ariaHidden}
      className="w-40 md:w-52 h-28 md:h-36 flex flex-col items-center justify-center gap-3 md:gap-5 shrink-0 cursor-pointer hover:-translate-y-1 transition-transform duration-300"
    >
      <div className={`relative flex items-center justify-center ${partner.isCircle ? 'h-10 w-10 md:h-14 md:w-14' : 'h-8 w-8 md:h-12 md:w-12'}`}>
        <Image
          src={partner.logoSrc}
          alt={`Logo ${partner.name}`}
          fill
          sizes="(max-width: 768px) 40px, 56px"
          className={`object-contain ${partner.isCircle ? 'rounded-full bg-white/5 shadow-inner' : 'rounded-md'}`}
        />
      </div>

      <span className="text-white/70 text-[9px] md:text-[11px] font-bold tracking-[0.2em] uppercase">
        {partner.name}
      </span>
    </div>
  )
}
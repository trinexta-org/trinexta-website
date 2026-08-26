"use client"

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pushGtmEvent } from "@/lib/gtm"; 

export function CtaAudit() {
  return (
    <div className="mt-20 p-10 bg-surface-strong border border-secondary/20 rounded-3xl text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent pointer-events-none" />
      
      <h3 className="text-2xl font-bold mb-4 relative z-10 text-primary">Besoin d&apos;un audit de sécurité ou d&apos;infogérance ?</h3>
      <p className="text-primary/60 mb-8 max-w-lg mx-auto relative z-10">
        Nos experts analysent votre infrastructure pour identifier les points de blocage et renforcer votre protection.
      </p>
      
      <div className="relative z-10 pt-4">
        <Link
          href="/contact"
          onClick={() => {
            pushGtmEvent('cta_click', {
              cta_name: "Demander mon audit gratuit",
              cta_url: "/contact"
            });
          }}
          className="group relative inline-flex items-center gap-4 md:gap-6 bg-transparent border border-secondary/30 px-8 py-4 md:px-12 md:py-6 rounded-xl md:rounded-2xl overflow-hidden transition-all duration-500 hover:border-secondary"
        >
          <div className="absolute inset-0 bg-primary translate-y-[102%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />

          <span className="relative z-10 text-primary group-hover:text-white font-black text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] transition-colors duration-500">
            Demander mon audit gratuit
          </span>
          
          <div className="relative z-10 text-secondary-strong group-hover:text-white transition-colors duration-500">
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  );
}
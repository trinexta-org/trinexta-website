"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Briefcase, TrendingUp, ShieldCheck } from "lucide-react";
import { Container } from "../layout/Container";

export function BlogCasClientPromo() {
  return (
    <Container className="mb-24 relative z-10">
      <div className="bg-gradient-to-br from-white/[0.07] to-transparent border border-white/10 rounded-[32px] p-8 lg:p-12 relative overflow-hidden group">
        
        {/* Lueur de fond animée */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none transition-opacity duration-700 group-hover:opacity-100 opacity-60" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
          
          {/* COLONNE GAUCHE : Texte & CTA */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <Briefcase className="w-4 h-4 text-secondary" />
              <span className="text-secondary text-[11px] font-bold uppercase tracking-wider">
                De la théorie à la pratique
              </span>
            </div>
            
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-[1.1]">
              Découvrez comment nous <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white">transformons</span> l&apos;IT de nos clients.
            </h3>
            
            <p className="text-white/60 text-base md:text-lg mb-8 leading-relaxed">
              Vous appréciez nos articles et nos conseils ? Allez plus loin en découvrant nos études de cas concrètes. 
              Voyez les défis qu&apos;ont rencontrés nos clients et les solutions d&apos;infogérance et de cybersécurité que nous avons déployées pour eux.
            </p>

            <Link 
              href="/cas-clients" 
              className="inline-flex items-center justify-center gap-3 bg-white text-primary px-8 py-4 rounded-2xl font-bold hover:bg-secondary hover:text-white transition-all duration-300 shadow-lg hover:shadow-secondary/25"
            >
              Explorer les Cas Clients <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="relative h-full min-h-[300px] flex items-center justify-center lg:justify-end">
            
            
            <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl transform transition-transform duration-700 group-hover:scale-[1.02] group-hover:-rotate-1 bg-white/5">
              
              <Image 
                src="/images/blog/cas-clients.webp" 
                alt="Aperçu des cas clients Trinexta"
                fill
                className="object-cover" 
              />
              
              
              <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] pointer-events-none" />
              
              <div className="absolute top-0 left-0 w-full h-8 bg-black/60 backdrop-blur-md flex items-center px-4 gap-2 border-b border-white/10">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
            </div>

            {/* Carte flottante 1 : Performance */}
            <div className="absolute -left-4 md:-left-12 top-10 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce hover:scale-105 transition-transform" style={{ animationDuration: '4s' }}>
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-white/50 text-[10px] font-bold uppercase tracking-wider">Disponibilité</p>
                <p className="text-white font-black text-lg">99.9%</p>
              </div>
            </div>

            {/* Carte flottante 2 : Sécurité */}
            <div className="absolute -right-4 md:-right-8 bottom-10 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce hover:scale-105 transition-transform" style={{ animationDuration: '5s', animationDelay: '1s' }}>
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-white/50 text-[10px] font-bold uppercase tracking-wider">Sécurité renforcée</p>
                <p className="text-white font-black text-lg">Zéro faille</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </Container>
  );
}
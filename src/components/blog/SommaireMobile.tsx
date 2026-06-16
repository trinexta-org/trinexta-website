"use client";

import { useState, useEffect } from "react";
import { List, X } from "lucide-react";
import { type HeadingTOC } from "@/lib/sanity";

interface Props {
  titres: HeadingTOC[];
}

export function SommaireMobile({ titres }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // 1. GESTION INTELLIGENTE DU SCROLL
  useEffect(() => {
    const handleScroll = () => {
      const contentElement = document.querySelector('.prose');
      
      if (!contentElement) return;

      const rect = contentElement.getBoundingClientRect();
      const screenHeight = window.innerHeight;
      
      // Le bouton s'affiche si :
      // - Le haut du texte est entré dans l'écran (avec une marge de 100px)
      // - Le bas du texte n'est pas encore sorti par le haut de l'écran (marge de 150px)
      const isInsideText = rect.top < screenHeight - 100 && rect.bottom > 150;
      
      setIsVisible(isInsideText);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. BLOCAGE DU SCROLL QUAND LE MENU EST OUVERT
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!titres || titres.length === 0) return null;

  const handleClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <div className="lg:hidden">
      
      {/* BOUTON FLOTTANT (Effet Transparent / Glassmorphism) */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-[#0F172A]/60 backdrop-blur-xl border border-white/10 text-white px-5 py-2.5 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:bg-[#0F172A]/80 active:scale-95 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Ouvrir le sommaire"
      >
        <List className="w-4 h-4 text-white/80" />
        <span className="text-sm font-medium tracking-wide">Sommaire</span>
      </button>

      {/* VOILE SOMBRE */}
      <div 
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-[#0B1120]/80 backdrop-blur-sm z-[70] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* PANNEAU GLISSANT (Inchangé) */}
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-[#0F172A] border-t border-white/10 rounded-t-[32px] z-[80] transition-transform duration-500 ease-out transform shadow-2xl ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <List className="w-5 h-5 text-secondary" />
            Sommaire
          </h3>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto flex flex-col gap-5">
          {titres.map((titre) => (
            <button
              key={titre._key}
              onClick={() => handleClick(titre.id)}
              className={`text-left transition-colors ${
                titre.level === "h3" 
                  ? "ml-4 text-sm text-white/50 hover:text-secondary" 
                  : "text-base text-white/90 font-medium hover:text-white"
              }`}
            >
              {titre.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export interface SectionBlock {
  id: string;
  texte: string;
  imageUrl: string;
  altText: string;
}

interface Props {
  blocks: SectionBlock[];
}

export function DynamicImageScroll({ blocks }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="relative flex flex-col md:flex-row items-start gap-8 md:gap-16 my-16 md:my-32">
      
      {/* 1. COLONNE GAUCHE : LE TEXTE QUI DÉFILE */}
      <div className="w-full md:w-1/2 relative z-10">
        {/* On ajoute des marges massives pour forcer l'utilisateur à scroller */}
        <div className="py-[5vh] md:py-[20vh] space-y-[30vh]">
          {blocks.map((block, index) => (
            <motion.div
              key={block.id}
              onViewportEnter={() => setActiveIndex(index)}
              viewport={{ amount: "all", margin: "-40% 0px -40% 0px" }}
              className={`transition-all duration-700 ${
                activeIndex === index 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-30 -translate-x-4"
              }`}
            >
              <p className="text-xl md:text-2xl font-medium text-white/90 leading-relaxed drop-shadow-md">
                {block.texte}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 2. COLONNE DROITE : L'IMAGE COLLANTE (Uniquement sur PC) */}
      <div className="hidden md:block w-full md:w-1/2 sticky top-32 h-[400px] lg:h-[500px] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl bg-white/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {blocks[activeIndex].imageUrl ? (
              <Image
                src={blocks[activeIndex].imageUrl}
                alt={blocks[activeIndex].altText}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10" />
            )}
            
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. VERSION MOBILE : Affichage classique en cascade */}
      <div className="md:hidden w-full flex flex-col gap-16 mt-8">
        {blocks.map((block) => (
          <div key={`${block.id}-mobile`} className="space-y-6">
            <p className="text-lg font-medium text-white/90 leading-relaxed">
              {block.texte}
            </p>
            {block.imageUrl && (
              <div className="relative w-full h-[250px] rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                <Image 
                  src={block.imageUrl} 
                  alt={block.altText} 
                  fill 
                  className="object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { FadeIn } from "@/components/ui/FadeIn";

const faqData = [
  {
    question: "Je suis indépendant ou j'utilise un seul poste, allez-vous m'aider si je change de prestataire ?",
    answer: "Bien entendu ! Nous nous chargeons de coordonner le changement avec votre prestataire actuel. Nous prenons en main le transfert des accès et des droits d'administration pour que vous puissiez travailler sans interruption."
  },
  {
    question: "Est-ce que vous vous occupez de la relation avec mon fournisseur de logiciels ?",
    answer: "Oui, nous faisons le lien directement avec vos éditeurs de logiciels (comptabilité, CRM, métiers...) pour résoudre les problèmes techniques ou optimiser les configurations. Vous n'avez plus à gérer ces échanges parfois complexes."
  },
  {
    question: "Est-ce que vous pouvez gérer mon projet de migration ?",
    answer: "Absolument ! Que ce soit pour migrer votre messagerie, vos documents vers des solutions comme Microsoft 365, SharePoint ou OneDrive, nous assurons la planification, le transfert et le suivi complet du projet."
  },
  {
    question: "Est-ce que vous proposez des solutions pour sécuriser mon poste et mes données ?",
    answer: "Oui, nous mettons en place des outils de protection adaptés : antivirus, sauvegardes automatisées, pare-feu, et contrôles réguliers pour garantir la sécurité de vos équipements et de vos données."
  },
  {
    question: "Puis-je vous solliciter ponctuellement pour un dépannage ?",
    answer: "Bien sûr ! Même si vous n'avez pas d'abonnement, nous intervenons ponctuellement pour vous aider en cas de problème technique ou pour une mise à jour de votre matériel."
  }
];

export function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <Section className="bg-primary py-24 relative overflow-hidden border-t border-white/10">

      {/* Vagues décoratives */}
      <div className="absolute top-0 inset-x-0 h-40 opacity-20 pointer-events-none">
        <svg className="w-full h-full text-secondary" viewBox="0 0 1440 200" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,96 C288,160 576,32 864,96 C1152,160 1296,128 1440,64 L1440,0 L0,0 Z" fill="currentColor"/>
        </svg>
      </div>
      <div className="absolute bottom-0 inset-x-0 h-40 opacity-20 pointer-events-none rotate-180">
        <svg className="w-full h-full text-secondary" viewBox="0 0 1440 200" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,96 C288,160 576,32 864,96 C1152,160 1296,128 1440,64 L1440,0 L0,0 Z" fill="currentColor"/>
        </svg>
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
          <Text variant="small" className="uppercase tracking-widest text-secondary font-bold block">
            Des réponses claires
          </Text>
          <Heading as="h2" className="text-white text-3xl md:text-4xl font-black tracking-tight">
            Questions fréquemment posées
          </Heading>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqData.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div key={index} className="relative group">

                {/* Blobs décoratifs sur item ouvert */}
                <AnimatePresence>
                  {isOpen && (
                    <>
                      <motion.div
                        initial={{ scale: 0, opacity: 0, x: 20 }}
                        animate={{ scale: 1, opacity: 0.5, x: 0 }}
                        exit={{ scale: 0, opacity: 0, x: 20 }}
                        className="absolute -top-6 -right-4 w-32 h-28 bg-secondary/30 rounded-[40%_60%_70%_30%_/_40%_50%_60%_5rem] backdrop-blur-md pointer-events-none z-0 hidden md:block"
                      />
                      <motion.div
                        initial={{ scale: 0, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 0.3, y: 0 }}
                        exit={{ scale: 0, opacity: 0, y: 10 }}
                        className="absolute -bottom-4 right-6 w-24 h-24 bg-white/5 rounded-[60%_40%_30%_70%_/_50%_40%_70%_6rem] backdrop-blur-lg pointer-events-none z-0 hidden md:block"
                      />
                    </>
                  )}
                </AnimatePresence>

                {/* Carte FAQ */}
                <motion.div
                  layout
                  className={`relative z-10 transition-all duration-500 ease-in-out shadow-lg ${
                    isOpen
                      ? "bg-secondary/20 border border-secondary/40 rounded-[3rem_2rem_4rem_2.5rem]"
                      : "bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl"
                  }`}
                >
                  <button
                    onClick={() => setActiveIndex(isOpen ? null : index)}
                    type="button"
                    className="w-full flex items-center justify-between p-8 md:p-10 text-left"
                  >
                    {/* ✅ text-white/80 sur fond sombre — toujours lisible */}
                    <span className={`font-bold text-lg md:text-xl pr-8 leading-snug transition-colors duration-300 ${
                      isOpen ? "text-white" : "text-white/80"
                    }`}>
                      {item.question}
                    </span>

                    {/* ✅ Bouton flèche visible sur fond sombre */}
                    <span className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-secondary text-white rotate-180 shadow-md"
                        : "bg-white/10 text-white border border-white/10 group-hover:bg-secondary group-hover:border-secondary"
                    }`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>

                  {/* Réponse animée */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-8 md:px-10 pb-10 pt-2 border-t border-white/10">
                          <p className="text-white/70 leading-relaxed text-base md:text-lg max-w-3xl">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
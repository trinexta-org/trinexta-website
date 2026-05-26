

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { FadeIn } from "@/components/ui/FadeIn";

export default function ExpertiseSection() {
  return (
    <Section 
      container={false}
      className="relative py-28 overflow-hidden border-t border-white/10 bg-primary min-h-[85vh] flex items-center"
    >
      {/* 1. L'IMAGE BUREAU BLEU EN BACKGROUND GLOBAL */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-105" 
        style={{ backgroundImage: `url('/images/image-clavier-bleu.jpg')` }} 
      />

      {/* 2. OVERLAYS DE COULEUR POUR ASSURER LA LISIBILITÉ (STYLE PRO & INCORPORÉ) */}
      {/* Voile bleu nuit global pour calmer les contrastes de l'image */}
      <div className="absolute inset-0 bg-primary/30 z-[1]" />
      
      {/* Dégradé progressif plus sombre vers la droite pour faire ressortir les textes */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-primary/90 z-[2]" />

      {/* 3. CONTENU DE LA PAGE */}
      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* GAUCHE : LA GRANDE BOULE / BLOB EN GLASSMORPHISM AVEC LA QUESTION (Style My Digital Bank) */}
          <div className="lg:col-span-6 flex justify-center items-center w-full">
            <FadeIn direction="right" className="w-full max-w-[500px]">
              <div 
                className="relative w-full aspect-square bg-white/[0.03] backdrop-blur-xl border border-white/10 p-12 flex flex-col justify-center shadow-2xl"
                style={{
                  borderRadius: "50% 40% 60% 45% / 40% 55% 45% 60%", // Forme organique asymétrique fluide
                }}
              >
                {/* Petits reflets lumineux internes */}
                <div className="absolute top-10 left-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="space-y-4 relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 text-secondary text-xs font-bold uppercase tracking-widest w-fit">
                    Équipement
                  </div>
                  <Heading as="h2" className="text-white text-3xl md:text-4xl font-black tracking-tight leading-tight">
                    Dois-je acheter mon matériel auprès de vous ?
                  </Heading>
                  <Text className="text-white/80 leading-relaxed text-sm md:text-base">
                    Pas du tout obligatoire. Nous pouvons vous conseiller si vous le souhaitez, mais nous pouvons aussi intervenir sur du matériel que vous possédez déjà.
                  </Text>
                </div>

                {/* Petit badge de réassurance discret en bas du blob */}
                <div className="absolute -bottom-4 right-4 flex items-center gap-2.5 py-2.5 px-4 bg-secondary rounded-xl text-white font-bold text-xs shadow-lg border border-white/10">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Conseil & Suivi inclus
                </div>
              </div>
            </FadeIn>
          </div>

          {/* DROITE : CONTENU ET CARTES BENTO DE RÉACTIVITÉ */}
          <div className="lg:col-span-6 space-y-8">
            
            <FadeIn direction="left">
              <div className="p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex gap-4 max-w-xl">
                <div className="text-secondary shrink-0 mt-0.5">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <Text variant="small" className="font-medium text-white/90">
                  Nous vous accompagnons également dans le choix des solutions adaptées à vos besoins et à votre budget (matériel, logiciels ou cloud).
                </Text>
              </div>
            </FadeIn>

            {/* Section Réactivité */}
            <FadeIn direction="left" delay={0.2}>
              <div className="space-y-5 pt-4">
                <Heading as="h3" className="text-white text-xl md:text-2xl font-black tracking-tight">
                  Quelle est votre réactivité en cas de panne ?
                </Heading>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                  {/* Carte Urgence */}
                  <div className="p-6 bg-secondary rounded-[2.5rem_0.5rem_2.5rem_2.5rem] text-white shadow-xl border border-secondary/20 hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-4">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h4 className="font-black mb-1.5 text-white text-lg">Cas d&apos;urgence</h4>
                    <p className="text-white/80 text-xs leading-relaxed">
                      Incident bloquant : prise en charge sous <strong className="text-white font-black">30 minutes</strong>.
                    </p>
                  </div>

                  {/* Carte Standard */}
                  <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-[0.5rem_2.5rem_2.5rem_2.5rem] hover:bg-white/10 transition-colors duration-300">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mb-4">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="font-black text-white mb-1.5 text-lg">Demande standard</h4>
                    <p className="text-white/60 text-xs leading-relaxed">
                      Demande non urgente : engagement de réponse sous <strong className="text-white font-black">24 heures</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>

        </div>
      </Container>
    </Section>
  );
}
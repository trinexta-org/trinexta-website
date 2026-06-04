import { Metadata } from "next"
import Image from "next/image"
import { PageHero } from "@/components/layout/PageHero"
import { Container } from "@/components/layout/Container"
import { FinalCTA } from "@/components/FinalCTA"
import { Heading, Text } from "@/components/ui/Typography"

export const metadata: Metadata = {
  title: "Nous rejoindre | Trinexta",
  description: "Rejoignez une équipe d'experts IT. Découvrez pourquoi travailler chez TRINEXTA et consultez nos offres sur Talentero.",
}

export default function NousRejoindrePage() {
  return (
    <main className="bg-primary min-h-screen relative text-white">
      <PageHero 
        title="Nous rejoindre" 
        imageSrc="/images/nous-rejoindre/heroNousRejoindre.webp" 
      />

      <Container className="py-20 md:py-32">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <span className="text-secondary font-mono text-xs tracking-widest uppercase">
              Pourquoi nous rejoindre
            </span>
            <Heading as="h2" className="text-3xl md:text-5xl font-black leading-tight tracking-tighter text-white">
              Votre expertise mérite le bon environnement
            </Heading>
            
            <div className="space-y-6 text-white/80 text-base md:text-lg leading-relaxed">
              <Text>
                Vous cherchez un cadre où votre maîtrise technique fait la différence. Chez TRINEXTA, nous recrutons des techniciens et ingénieurs passionnés par le support et l&apos;infrastructure. 
              </Text>
              <Text>
                Nous vous confions des missions concrètes auprès de clients exigeants. Vous installez, configurez et maintenez des parcs informatiques réels. Nous écartons le micro-management pour privilégier l&apos;autonomie et la responsabilité.
              </Text>
              <Text>
                Pas de jargon marketing, pas de réunions inutiles. Vous disposez des bons outils pour travailler, d&apos;un salaire en adéquation avec votre valeur et d&apos;une équipe solide sur laquelle vous appuyer en cas de blocage technique.
              </Text>
            </div>
          </div>

          <div className="relative w-full aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl mt-8 xl:mt-0">
            <Image 
              src="/images/nous-rejoindre/technicien.webp" 
              alt="Un technicien support informatique chez Trinexta" 
              fill 
              sizes="(max-width: 1280px) 100vw, 50vw"
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent pointer-events-none" />
          </div>

        </div>
      </Container>

      <FinalCTA 
        line1="PRÊT À DONNER"
        line2="UN NOUVEL ÉLAN"
        line3="À VOTRE CARRIÈRE ?"
        description="Rejoignez une équipe où votre expertise technique est reconnue, stimulée et valorisée au quotidien."
        ctaLabel="Voir les offres sur Talentero"
        ctaHref="https://talentero.fr"
      />
    </main>
  )
}
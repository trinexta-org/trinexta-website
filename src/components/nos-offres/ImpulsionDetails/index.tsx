import Image from "next/image"
import { Heading, Text } from "@/components/ui/Typography"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { steps, pillars, profiles, assurances } from "./data"

export function ImpulsionDetails() {
  return (
    <Section id="impulsion" className="space-y-40 text-white">
      <Container>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-8">
            <span className="text-secondary font-mono text-xs tracking-widest uppercase">Offre Impulsion</span>
            <Heading as="h2" className="text-3xl md:text-5xl font-black leading-tight tracking-normal text-white">
              Votre technicien support *sur mesure*
            </Heading>
            <Text className="text-white/80 text-base md:text-lg leading-relaxed">
              Renforcez votre support informatique avec la bonne personne, au bon moment, sans les contraintes d&apos;un recrutement classique. Nous vous aidons à intégrer un technicien support adapté à votre besoin, pour la durée qui correspond réellement à votre activité.
            </Text>
            <p className="py-8 px-8 italic text-white/90 text-sm md:text-base leading-relaxed bg-white/[0.02] rounded-2xl">
              L&apos;offre Impulsion, C&apos;est une solution souple et ciblée pour renforcer vos équipes, absorber une hausse de charge, accompagner un projet ou sécuriser votre organisation au quotidien. Vous gardez la maîtrise, tout en vous appuyant sur un professionnel opérationnel et orienté terrain.
            </p>
          </div>
          <div className="relative w-full aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl mt-8 xl:mt-0">
            <Image
              src="/images/nos-offres/impulsion.avif"
              alt="Trinexta Support IT Technicien"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
          </div>
        </div>

        <div className="space-y-16 mb-24">
          <Heading as="h3" className="text-2xl md:text-3xl font-black tracking-normal text-white">
            Ce que l&apos;on fait *concrètement*
          </Heading>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
            <div className="xl:col-span-5 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/nos-offres/impulsion-concret.jpg"
                alt="Trinexta Support IT Infrastructure"
                fill
                sizes="(max-width: 1280px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
            </div>

            <div className="xl:col-span-7 space-y-6 text-white/80 text-base md:text-lg leading-relaxed">
              <p>
                L&apos;offre Impulsion est notre service de mise à disposition de personnel dédié exclusivement au support informatique. Ici, pas de dispositif complexe ni de formule figée : notre mission est simple. Vous apporter un renfort humain qualifié pour soutenir vos équipes, fluidifier le quotidien de vos utilisateurs et sécuriser le bon fonctionnement de votre environnement informatique.
              </p>
              <p className="font-semibold text-white">
                C&apos;est une solution pertinente si vous faites face à un pic d&apos;activité, à un besoin ponctuel, à une absence à compenser, à un projet de déploiement ou à un besoin plus durable en support IT.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-12 mb-24">
          <Heading as="h3" className="text-xl md:text-2xl font-bold tracking-normal text-white">
            *Comment ça se passe*, du premier appel au premier jour ?
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="p-8 bg-white/[0.02] rounded-2xl flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-xl font-mono font-black text-secondary block bg-secondary/10 w-fit px-3 py-1 rounded-lg">
                    {step.num}
                  </span>
                  <Heading as="h4" className="text-base font-bold text-white pt-1">{step.title}</Heading>
                  <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-12 mb-24">
          <div className="space-y-2">
            <Heading as="h3" className="text-xl md:text-2xl font-bold text-white tracking-normal">
              Des experts du support à votre *service*
            </Heading>
            <Text className="text-white/60 text-sm md:text-base">
              L&apos;offre Impulsion n&apos;est pas un catalogue générique. C&apos;est du sur-mesure pour les situations concrètes que vous vivez au quotidien.
            </Text>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pillars.map((p, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/[0.02] space-y-4">
                <Heading as="h4" className="text-base font-bold text-secondary">{p.title}</Heading>
                <p className="text-sm text-white/70 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8 mb-24">
          <Heading as="h3" className="text-xl md:text-2xl font-bold tracking-normal text-white">Les profils qu&apos;on *mobilise*</Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/[0.02] px-6 py-5 rounded-xl">
                <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                <span className="text-sm font-semibold text-white/90">{profile}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-white/40 italic pt-2">Vous ne savez pas exactement quel profil il vous faut ? Décrivez votre situation, on vous oriente.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 bg-white/[0.02] rounded-3xl p-10 items-center mb-24">
          <div className="xl:col-span-5 space-y-3">
            <Heading as="h3" className="text-xl md:text-2xl font-bold text-white tracking-normal">Notre modèle : la transparence *absolue*</Heading>
            <Text className="text-white/50 text-sm md:text-base">
              Pas de grille tarifaire à 47 lignes. Deux options claires, adaptées à la durée de votre mission. Dans les deux cas : zéro frais de dossier, zéro frais de mise en place, zéro frais d&apos;intégration.
            </Text>
          </div>
          <div className="xl:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            <div className="p-8 rounded-2xl bg-white/[0.03] space-y-3">
              <div className="font-bold text-secondary text-sm">TJM Taux Journalier Moyen</div>
              <p className="text-sm text-white/60 leading-relaxed">Missions courtes ou ponctuelles. Vous payez uniquement les jours travaillés. Idéal pour les remplacements.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white/[0.03] space-y-3">
              <div className="font-bold text-secondary text-sm">Forfait mensuel fixe</div>
              <p className="text-sm text-white/60 leading-relaxed">Missions longue durée. Budget lissé et prévisible. Simplicité administrative.</p>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <Heading as="h3" className="text-xl md:text-2xl font-bold text-center text-white tracking-normal">Une collaboration simple, souple et sans *surprises*</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {assurances.map((a, i) => (
              <div key={i} className="flex gap-6 items-start p-8 rounded-2xl bg-white/[0.02]">
                <span className="text-secondary text-lg mt-0.5">✓</span>
                <div className="space-y-2">
                  <div className="font-bold text-white text-base">{a.title}</div>
                  <p className="text-sm text-white/60 leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

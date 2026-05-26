import Image from "next/image"
import { Heading, Text } from "@/components/ui/Typography"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"

const steps = [
  {
    num: "01",
    title: "Vous décrivez votre besoin",
    desc: "Par téléphone ou par mail. Quel profil, quelle mission, quelle durée estimée. Pas de formulaire à rallonge, on parle entre pros."
  },
  {
    num: "02",
    title: "On cale l'ordre de mission",
    desc: "Profil validé, budget défini, conditions posées noir sur blanc. Tout est aligné avant qu'on cherche qui que ce soit."
  },
  {
    num: "03",
    title: "Vous recevez 2 à 3 profils sous 72h",
    desc: "Des candidats qualifiés, disponibles, briefés sur votre mission. Vous choisissez celui qui vous convient."
  },
  {
    num: "04",
    title: "Le technicien démarre",
    desc: "Opérationnel dès J+1. Sur votre site, en hybride, ou hébergé chez TRINEXTA. Il s'intègre à votre équipe et avance."
  }
]

const pillars = [
  {
    title: "Support utilisateur (Helpdesk)",
    desc: "Prise en charge des demandes et incidents du quotidien rencontrés par vos collaborateurs : problèmes logiciels, difficultés de connexion, comptes utilisateurs, mots de passe, matériel ou lenteurs de poste. L&apos;objectif : apporter des réponses rapides, claires et efficaces pour éviter que l’activité ne ralentisse."
  },
  {
    title: "Gestion de parc de proximité",
    desc: "Préparation, installation, renouvellement et maintenance des postes de travail, ordinateurs portables, imprimantes et périphériques. Un accompagnement concret pour garder un parc informatique propre, fonctionnel et bien suivi."
  },
  {
    title: "Accompagnement de projets de support",
    desc: "Renfort opérationnel pour vos projets de migration, de déploiement ou d’organisation du support : passage à Windows 11, migration Microsoft 365, installation de nouveaux équipements ou amélioration de votre outil de ticketing. Vous bénéficiez d’un appui fiable pour avancer plus vite et plus sereinement."
  }
]

const profiles = [
  "Technicien support utilisateurs Helpdesk N1/N2",
  "Technicien de proximité Gestion de parc",
  "Technicien systèmes et réseaux",
  "Technicien Microsoft 365 / Azure / Intune",
  "Technicien déploiement Postes, logiciels, matériel",
  "Technicien cybersécurité Sensibilisation, audit basique, remédiation"
]

const assurances = [
  { title: "Pas de frais cachés, pas de lourdeur inutile", desc: "Aucun frais de mise en place. Aucun montage compliqué. La collaboration démarre simplement et s’adapte à votre besoin réel." },
  { title: "Un budget défini avec vous", desc: "Vous nous indiquez votre budget cible ou votre TJM souhaité. Nous recherchons ensuite le profil le plus cohérent avec vos attentes, vos enjeux et votre cadre financier." },
  { title: "Une facturation lisible et logique", desc: "Vous payez uniquement le temps réellement mobilisé. Autrement dit : uniquement les jours où le technicien intervient pour votre entreprise." },
  { title: "Une réponse rapide et concrète", desc: "Basés en Île-de-France, nous sommes en mesure de réagir rapidement. Vous nous exposez votre besoin, nous vous présentons des profils qualifiés dans les meilleurs délais." }
]

export function ImpulsionDetails() {
  return (
    <Section id="impulsion" className="space-y-24 text-white">
      <Container>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center border-b border-white/10 pb-16">
          <div className="space-y-6">
            <span className="text-secondary font-mono text-xs tracking-widest uppercase">Offre Impulsion</span>
            <Heading as="h2" className="text-3xl md:text-5xl font-black leading-tight tracking-tighter text-white">
              Votre technicien support sur mesure
            </Heading>
            <Text className="text-white/80 text-base md:text-lg leading-relaxed">
              Renforcez votre support informatique avec la bonne personne, au bon moment, sans les contraintes d&apos;un recrutement classique. Nous vous aidons à intégrer un technicien support adapté à votre besoin, pour la durée qui correspond réellement à votre activité.
            </Text>
            <p className="border-t border-b border-white/10 py-4 italic text-white/90 text-sm md:text-base leading-relaxed">
              L&apos;offre Impulsion, C&apos;est une solution souple et ciblée pour renforcer vos équipes, absorber une hausse de charge, accompagner un projet ou sécuriser votre organisation au quotidien. Vous gardez la maîtrise, tout en vous appuyant sur un professionnel opérationnel et orienté terrain.
            </p>
          </div>
          <div className="relative w-full aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl mt-8 xl:mt-0">
            <Image
              src="/images/nos-offres/impulsion.avif"
              alt="Trinexta Support IT Technicien"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
          </div>
        </div>

        <div className="space-y-8 border-b border-white/10 pb-16">
          <Heading as="h3" className="text-2xl md:text-3xl font-black tracking-tight text-white">
            Ce que l&apos;on fait concrètement
          </Heading>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            <div className="xl:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/images/nos-offres/impulsion-concret.jpg"
                alt="Trinexta Support IT Infrastructure"
                fill
                sizes="(max-width: 1280px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
            </div>

            <div className="xl:col-span-7 space-y-4 text-white/80 text-base md:text-lg leading-relaxed">
              <p>
                L&apos;offre Impulsion est notre service de mise à disposition de personnel dédié exclusivement au support informatique. Ici, pas de dispositif complexe ni de formule figée : notre mission est simple. Vous apporter un renfort humain qualifié pour soutenir vos équipes, fluidifier le quotidien de vos utilisateurs et sécuriser le bon fonctionnement de votre environnement informatique.
              </p>
              <p className="font-semibold text-white">
                C&apos;est une solution pertinente si vous faites face à un pic d&apos;activité, à un besoin ponctuel, à une absence à compenser, à un projet de déploiement ou à un besoin plus durable en support IT.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <Heading as="h3" className="text-xl md:text-2xl font-bold tracking-tight text-white">
            Comment ça se passe, du premier appel au premier jour ?
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {steps.map((step, idx) => (
              <div key={idx} className="p-6 bg-white/[0.01] border border-white/5 rounded-xl flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-xl font-mono font-black text-secondary block bg-secondary/10 w-fit px-2.5 py-0.5 rounded">
                    {step.num}
                  </span>
                  <Heading as="h4" className="text-base font-bold text-white pt-1">{step.title}</Heading>
                  <p className="text-xs text-white/50 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-2">
            <Heading as="h3" className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Des experts du support à votre service
            </Heading>
            <Text className="text-white/60 text-sm md:text-base">
              L&apos;offre Impulsion n&apos;est pas un catalogue générique. C&apos;est du sur-mesure pour les situations concrètes que vous vivez au quotidien. Nos techniciens sont sélectionnés pour leur savoir-faire technique, mais aussi pour leur capacité à accompagner vos équipes avec méthode, réactivité et sens du service. Ils peuvent intervenir sur l&apos;ensemble des sujets liés au support informatique de proximité ou à distance.
            </Text>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <Heading as="h4" className="text-base font-bold text-secondary">{p.title}</Heading>
                  <p className="text-xs text-white/70 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Heading as="h3" className="text-xl md:text-2xl font-bold tracking-tight text-white">Les profils qu&apos;on mobilise</Heading>
          <Text className="text-white/60 text-sm md:text-base">
            Notre vivier couvre l&apos;ensemble des métiers du support et de l&apos;infrastructure IT. Tous nos techniciens sont validés, référencés et disponibles rapidement.
          </Text>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {profiles.map((profile, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/[0.02] px-4 py-3.5 rounded-xl border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                <span className="text-xs font-semibold text-white/90">{profile}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/40 italic pt-2">Vous ne savez pas exactement quel profil il vous faut ? Décrivez votre situation, on vous oriente.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 bg-white/[0.01] border border-white/5 rounded-2xl p-6 md:p-8 items-center">
          <div className="xl:col-span-5 space-y-3">
            <Heading as="h3" className="text-xl md:text-2xl font-bold text-white tracking-tight">Notre modèle : la transparence absolue</Heading>
            <Text className="text-white/50 text-xs md:text-sm">
              Pas de grille tarifaire à 47 lignes. Deux options claires, adaptées à la durée de votre mission. Dans les deux cas : zéro frais de dossier, zéro frais de mise en place, zéro frais d&apos;intégration. Le tarif indiqué est le tarif réel.
            </Text>
          </div>
          <div className="xl:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="p-5 rounded-xl border border-white/10 bg-primary/40 space-y-2">
              <div className="font-bold text-secondary text-sm">TJM Taux Journalier Moyen</div>
              <p className="text-xs text-white/60 leading-relaxed">Missions courtes ou ponctuelles. Vous payez uniquement les jours travaillés. Idéal pour les remplacements et projets courts. Flexibilité totale sur la durée.</p>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-primary/40 space-y-2">
              <div className="font-bold text-secondary text-sm">Forfait mensuel fixe</div>
              <p className="text-xs text-white/60 leading-relaxed">Missions longue durée. Budget lissé et prévisible. Tarif dégressif selon la durée. Simplicité administrative.</p>
            </div>
          </div>
        </div>

        <div className="space-y-8 pt-4">
          <Heading as="h3" className="text-xl md:text-2xl font-bold text-center text-white tracking-tight">Une collaboration simple, souple et sans surprises</Heading>
          <p className="text-sm text-white/60 text-center max-w-2xl mx-auto">
            Notre approche a été pensée pour vous offrir plus de visibilité, plus de souplesse et un cadre clair dès le départ.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assurances.map((a, i) => (
              <div key={i} className="flex gap-4 items-start p-5 rounded-xl bg-white/[0.01] border border-white/5">
                <span className="text-secondary text-sm mt-0.5">✓</span>
                <div className="space-y-1">
                  <div className="font-bold text-white text-sm">{a.title}</div>
                  <p className="text-xs text-white/60 leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
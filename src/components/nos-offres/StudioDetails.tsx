import Image from "next/image"
import { Heading, Text } from "@/components/ui/Typography"
import { Card } from "@/components/ui/Card"

const expertises = [
  {
    title: "Sites internet sur mesure",
    desc: "Conception de sites vitrines, institutionnels ou e-commerce modernes, performants et entièrement administrables. Nous mettons l'accent sur un design UI/UX unique qui reflète fidèlement l'identité de votre entreprise.",
    tech: "Next.js / Sanity CMS / Tailwind CSS",
    points: [
      "Création de sites vitrines & corporate sur mesure",
      "Design UI/UX moderne, fluide et responsive",
      "Optimisation avancée pour le référencement naturel (SEO)",
      "Interfaces de gestion de contenu simples et intuitives",
      "Performances d'affichage et de vitesse optimales"
    ]
  },
  {
    title: "Applications Web complexes",
    desc: "Développement d’outils métiers et d'applications web spécifiques pour automatiser vos processus internes, gérer vos bases de données ou interconnecter vos outils existants via des API sécurisées.",
    tech: "React / Node.js / PostgreSQL",
    points: [
      "Développement d'outils métiers spécifiques",
      "Architecture et gestion de bases de données sécurisées",
      "Conception et interconnexion d'API robustes",
      "Automatisation des flux et des processus internes",
      "Console d'administration et pilotage de données"
    ]
  },
  {
    title: "Plateformes SaaS",
    desc: "Accompagnement de l'idée au déploiement pour la création de vos solutions logicielles en mode SaaS. Architecture scalable, gestion des abonnements, sécurité des données et interfaces utilisateurs intuitives.",
    tech: "Next.js / Prisma / Cloud Souverain",
    points: [
      "Accompagnement complet de l'idée au déploiement",
      "Architecture cloud évolutive et hautement disponible",
      "Intégration des abonnements et paiements sécurisés",
      "Isolation stricte et protection des données utilisateurs",
      "Suivi technique continu et maintenance évolutive"
    ]
  }
]

const advantages = [
  {
    title: "Développement 100% Interne",
    desc: "Aucune sous-traitance opaque. Vos outils, plateformes et sites internet sont intégralement pensés, designés et codés par nos équipes de développeurs en interne."
  },
  {
    title: "Hébergement Souverain en France",
    desc: "Pour vous garantir une sécurité absolue et une conformité RGPD totale, l'ensemble de nos réalisations est hébergé exclusivement sur nos serveurs sécurisés situés en France."
  },
  {
    title: "Cohérence IT & Web",
    desc: "Votre site et votre infrastructure informatique sont gérés sous le même toit. Une synergie parfaite pour éviter les conflits techniques entre prestataires."
  }
]

export function StudioDetails() {
  return (
    <div id="studio" className="space-y-24 text-white">
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center border-b border-white/10 pb-16">
        <div className="space-y-6">
          <span className="text-secondary font-mono text-xs tracking-widest uppercase">TRINEXTA STUDIO</span>
          <Heading as="h2" className="text-3xl md:text-5xl font-black leading-tight tracking-tighter text-white">
            Une présence digitale alignée avec votre informatique
          </Heading>
          <Text className="text-white/80 text-base md:text-lg leading-relaxed">
            Multiplier les interlocuteurs techniques est souvent source de lenteurs et d'incompréhensions : l'hébergeur rejette la faute sur le webmaster, qui rejette la faute sur votre informaticien. Chez TRINEXTA, nous supprimons cette complexité.
          </Text>
          <p className="border-t border-b border-white/10 py-4 italic text-white/90 text-sm md:text-base leading-relaxed">
            Avec notre branche TRINEXTA Studio, nous concevons vos sites internet vitrines, vos applications web sur mesure et vos plateformes SaaS. L'avantage majeur ? Votre présence digitale et votre infrastructure informatique métier sont pilotées par la même équipe, garantissant une cohérence technique absolue.
          </p>
        </div>
        <div className="relative w-full aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl mt-8 xl:mt-0">
          <Image
            src="/images/nos-offres/studio.avif"
            alt="Trinexta Studio Développement Web et SaaS"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
        </div>
      </div>

      <div className="space-y-8">
        <div className="space-y-2">
          <Heading as="h3" className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">Pour répondre à vos besoins de création</Heading>
          <Text className="text-white/60 text-sm md:text-base">Des technologies modernes choisies pour leur rapidité, leur sécurité et leur excellent référencement naturel (SEO).</Text>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {expertises.map((exp, index) => (
            <Card key={index} className="p-5 bg-white/[0.01] border-white/5 flex flex-col justify-between hover:border-secondary/20 transition-all space-y-6 rounded-xl">
              <div className="space-y-4">
                <Heading as="h4" className="text-lg font-bold text-white leading-tight">{exp.title}</Heading>
                <p className="text-xs text-white/60 leading-relaxed">{exp.desc}</p>
                <ul className="space-y-1.5 pt-2 border-t border-white/5">
                  {exp.points.map((pt, k) => (
                    <li key={k} className="text-xs text-white/80 flex items-start gap-2">
                      <span className="text-secondary shrink-0 mt-0.5">✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-[10px] font-mono text-secondary pt-3 flex justify-between items-center border-t border-white/5">
                <span>STACK :</span>
                <span className="text-white/50">{exp.tech}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <Heading as="h3" className="text-xl md:text-2xl font-bold tracking-tight text-center text-white">
          Pourquoi nous confier vos projets web et SaaS ?
        </Heading>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {advantages.map((adv, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                <Heading as="h4" className="text-sm font-bold text-white">{adv.title}</Heading>
              </div>
              <p className="text-xs text-white/60 leading-relaxed pl-4.5">{adv.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 md:p-8 rounded-2xl bg-secondary/5 border border-secondary/10 text-center max-w-4xl mx-auto space-y-3">
        <Heading as="h3" className="text-base md:text-lg font-bold text-white">Un seul interlocuteur, de la maquette à la maintenance</Heading>
        <p className="text-xs md:text-sm text-white/70 max-w-2xl mx-auto leading-relaxed">
          Nous ne livrons pas des projets "clés en main" pour ensuite disparaître. Nous assurons le suivi, les mises à jour de sécurité et l'évolution technique continue de vos plateformes pour qu'elles restent performantes au fil des années.
        </p>
      </div>

    </div>
  )
}
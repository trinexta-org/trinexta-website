import Image from "next/image"
import { Section } from "@/components/layout/Section"
import { Heading, Text } from "@/components/ui/Typography"
import { Container } from "@/components/layout/Container"
import { FadeIn } from "@/components/ui/FadeIn"

const networkFeatures = [
    {
        title: "Techniciens qualifiés",
        desc: "Des professionnels opérationnels avec plus de 2 ans d'expérience. Nous ne laissons rien au hasard dans la sélection des intervenants. Chaque technicien est évalué sur ses compétences techniques réelles, sa capacité à résoudre des problèmes complexes et son aisance relationnelle. Ils sont capables d'intervenir concrètement sur vos enjeux et de s'intégrer naturellement à votre environnement de travail, garantissant ainsi une continuité de service irréprochable et une communication fluide avec vos équipes."
    },
    {
        title: "Planning flexible",
        desc: "Mission ponctuelle, besoin récurrent, renfort temporaire ou accompagnement dans la durée : vous gardez la maîtrise totale du cadre d'intervention. Notre organisation nous permet de dimensionner notre accompagnement en fonction de vos pics d'activité ou de vos projets de transformation tels qu'une migration, un déménagement ou le déploiement de nouveau matériel. Vous ne payez que pour l'expertise dont vous avez réellement besoin, sans vous engager dans des contrats rigides."
    },
    {
        title: "Couverture nationale",
        desc: "Une assistance sur site disponible partout en France, y compris pour les organisations multi-sites, sans frais de déplacement cachés. Que votre siège soit à Paris, avec des agences à Lyon, Bordeaux ou Lille, vous bénéficiez d'un point de contact unique. Nous coordonnons les techniciens sur place pour vous assurer une qualité de service homogène sur l'ensemble de vos sites, simplifiant ainsi considérablement la gestion globale de votre parc informatique."
    },
    {
        title: "Réponse rapide",
        desc: "Une intervention planifiée sous 24 à 48h pour gérer vos urgences informatiques avec efficacité et limiter les temps d'arrêt. Nous savons qu'une panne matérielle ou réseau peut bloquer toute votre production. Notre maillage territorial et notre système de gestion des interventions nous permettent de dépêcher un expert rapidement sur place. Nous ne nous contentons pas de résoudre l'incident : nous mettons en place des actions préventives pour éviter qu'il ne se reproduise."
    }
]

export function OurNetwork() {
       return (
        <Section id="equipe" container={false} className="relative py-12 md:py-24 bg-surface overflow-hidden">
            <Container className="relative z-10">

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center mb-12 md:mb-24">
                    <FadeIn
                        direction="right"
                        className="w-full lg:w-1/2 relative h-[250px] sm:h-[350px] md:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shrink-0"
                    >
                        <Image
                            src="/images/a-propos/reseau.webp"
                            alt="Le réseau de techniciens Trinexta en intervention"
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                    </FadeIn>

                    <FadeIn
                        direction="left"
                        className="w-full lg:w-1/2 flex flex-col gap-4 md:gap-6"
                    >
                        <Heading as="h3" className="text-3xl md:text-5xl text-primary font-black leading-tight">
                            Les bonnes compétences <br className="hidden md:block" />
                            <span className="text-secondary-strong">au bon moment</span>
                        </Heading>

                        <Text className="text-primary/80 text-base md:text-xl leading-relaxed font-light">
                            Pour vous garantir une réactivité maximale et une expertise adaptée à chaque situation, nous avons fait le choix d&apos;un modèle agile.
                        </Text>

                        <Text className="text-primary/70 text-sm md:text-lg leading-relaxed">
                            Selon la nature de la mission, nous mobilisons nos équipes ou des techniciens partenaires sélectionnés pour leur savoir-faire terrain. Contrairement aux agences traditionnelles souvent freinées par des lourdeurs administratives, cette organisation nous permet d&apos;envoyer la bonne compétence, au bon endroit, et au bon moment.
                        </Text>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {networkFeatures.map((feature, idx) => (
                        <FadeIn
                            key={idx}
                            direction="up"
                            delay={idx * 0.1}
                            className="relative overflow-hidden flex flex-col gap-4 p-6 md:p-8 rounded-2xl bg-surface-strong border border-secondary/20 hover:border-secondary/40 transition-all duration-500 group shadow-lg"
                        >
                            <span className="absolute -right-4 -top-6 text-[100px] md:text-[140px] font-black text-primary/[0.05] group-hover:text-secondary-strong/[0.10] transition-colors duration-500 pointer-events-none select-none">
                                0{idx + 1}
                            </span>

                            <Heading as="h4" className="text-primary text-lg md:text-2xl font-bold tracking-normal relative z-10 flex items-center gap-3">
                                <span className="w-4 md:w-6 h-1 bg-secondary rounded-full transition-all duration-300 group-hover:w-8 md:group-hover:w-10"></span>
                                {feature.title}
                            </Heading>

                            <Text className="text-sm md:text-base text-primary/70 leading-relaxed font-light relative z-10">
                                {feature.desc}
                            </Text>
                        </FadeIn>
                    ))}
                </div>

            </Container>
        </Section>
    )
}
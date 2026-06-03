import Image from "next/image"
import { Heading, Text } from "@/components/ui/Typography"
import { Card } from "@/components/ui/Card"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { expertises, advantages } from "./data"

export function StudioDetails() {
  return (
    <Section id="studio" className="space-y-40 text-white pb-20">
      <Container>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-20 items-center mb-24">
          <div className="space-y-8">
            <span className="text-secondary font-mono text-xs tracking-widest uppercase">TRINEXTA STUDIO</span>
            <Heading as="h2" className="text-3xl md:text-5xl font-black leading-tight tracking-tighter text-white">
              Une présence digitale alignée avec votre *informatique*
            </Heading>
            <Text className="text-white/80 text-base md:text-lg leading-relaxed">
              Multiplier les interlocuteurs techniques est souvent source de lenteurs et d&apos;incompréhensions : l&apos;hébergeur rejette la faute sur le webmaster, qui rejette la faute sur votre informaticien. Chez TRINEXTA, nous supprimons cette complexité.
            </Text>
            <p className="py-8 px-8 italic text-white/90 text-sm md:text-base leading-relaxed bg-white/[0.02] rounded-2xl">
              Avec notre branche TRINEXTA Studio, nous concevons vos sites internet vitrines, vos applications web sur mesure et vos plateformes SaaS. L&apos;avantage majeur ? Votre présence digitale et votre infrastructure informatique métier sont pilotées par la même équipe, garantissant une cohérence technique absolue.
            </p>
          </div>
          <div className="relative w-full aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl mt-8 xl:mt-0">
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

        <div className="space-y-16 mb-24">
          <div className="space-y-4 text-center max-w-2xl mx-auto">
            <Heading as="h3" className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">Pour répondre à vos besoins de *création*</Heading>
            <Text className="text-white/60 text-sm md:text-base">Des technologies modernes choisies pour leur rapidité, leur sécurité et leur excellent référencement naturel (SEO).</Text>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {expertises.map((exp, index) => (
              <Card key={index} className="p-5 bg-white/[0.01] border-white/5 flex flex-col justify-between hover:border-secondary/20 transition-all space-y-6 rounded-xl">
                <div className="space-y-4">
                  <Heading as="h4" className="text-lg font-bold text-white leading-tight">{exp.title}</Heading>
                  <p className="text-sm text-white/60 leading-relaxed">{exp.desc}</p>
                  <ul className="space-y-3 pt-4">
                    {exp.points.map((pt, k) => (
                      <li key={k} className="text-sm text-white/80 flex items-start gap-3">
                        <span className="text-secondary shrink-0 mt-1">✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-xs font-mono text-secondary pt-4 flex justify-between items-center">
                  <span>STACK :</span>
                  <span className="text-white/50">{exp.tech}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-16 mb-24">
          <Heading as="h3" className="text-xl md:text-2xl font-bold tracking-tight text-center text-white">
            Pourquoi nous *confier* vos projets web et SaaS ?
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((adv, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-white/[0.02] space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                  <Heading as="h4" className="text-base font-bold text-white">{adv.title}</Heading>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-10 rounded-3xl bg-secondary/[0.05] text-center max-w-4xl mx-auto space-y-4">
          <Heading as="h3" className="text-lg md:text-xl font-bold text-white">Un *seul* interlocuteur, de la maquette à la maintenance</Heading>
          <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
            Nous ne livrons pas des projets &quot;clés en main&quot; pour ensuite disparaître. Nous assurons le suivi, les mises à jour de sécurité et l&apos;évolution technique continue de vos plateformes pour qu&apos;elles restent performantes au fil des années.
          </p>
        </div>
      </Container>
    </Section>
  )
}

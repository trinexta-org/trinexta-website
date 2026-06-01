import Image from "next/image"
import { Heading, Text } from "@/components/ui/Typography"
import { Card } from "@/components/ui/Card"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { stats, pillars, targets, options } from "./data"

export function SereniteDetails() {
  return (
    <Section id="serenite" className="space-y-40 text-white pb-20">
      <Container>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-20 items-center mb-24">
          <div className="space-y-8">
            <span className="text-secondary font-mono text-xs tracking-widest uppercase">OFFRE SÉRÉNITÉ</span>
            <Heading as="h2" className="text-3xl md:text-5xl font-black leading-tight tracking-tighter text-white">
              Votre informatique doit soutenir votre activité. Pas la freiner.
            </Heading>
            <Text className="text-white/80 text-base md:text-lg leading-relaxed">
              Un logiciel de caisse qui bloque en plein service. Une messagerie inaccessible pendant plusieurs heures. Un poste lent qui fait perdre du temps chaque jour à vos équipes. Ce ne sont pas de simples soucis informatiques. Ce sont des blocages concrets qui ralentissent votre entreprise, créent du stress et coûtent de l'argent.
            </Text>
            <p className="py-8 px-8 italic text-white/90 text-sm md:text-base leading-relaxed bg-white/[0.02] rounded-2xl">
              Avec l'offre Sérénité, vous bénéficiez d'un accompagnement informatique simple, complet et rassurant : 79€ HT par poste et par mois, avec support informatique illimité, maintenance proactive et cybersécurité incluse. Et surtout, nous ne nous arrêtons pas à vos ordinateurs : nous vous accompagnons aussi sur vos logiciels métier, avec un seul interlocuteur pour centraliser le suivi.
            </p>
          </div>
          <div className="relative w-full aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl mt-8 xl:mt-0">
            <Image
              src="/images/nos-offres/serenite.avif"
              alt="Trinexta Supervision Informatique et Cybersécurité"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center mb-24">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-white/[0.02] space-y-2">
              <div className="text-4xl md:text-5xl font-black text-secondary tracking-tight">{stat.value}</div>
              <div className="text-xs font-bold text-white/40 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="p-10 rounded-3xl bg-secondary/[0.05] grid grid-cols-1 xl:grid-cols-3 gap-10 items-center mb-24">
          <div className="xl:col-span-1">
            <Heading as="h3" className="text-xl md:text-2xl font-black text-white leading-tight">
              Ce qu'on fait que les autres ne font pas
            </Heading>
          </div>
          <div className="xl:col-span-2 text-sm md:text-base text-white/80 space-y-4 leading-relaxed">
            <p>
              Beaucoup de prestataires informatiques interviennent uniquement sur le matériel ou les problèmes les plus classiques. Chez TRINEXTA, notre approche est plus globale.
            </p>
            <p className="font-semibold text-white">
              Votre logiciel de comptabilité rencontre un bug ? Nous prenons le sujet en main. Votre outil de planning ne fonctionne plus correctement ? Nous contactons l'éditeur pour vous. Nous suivons le dossier, nous faisons le lien avec les bons interlocuteurs et nous vous tenons informé à chaque étape. Résultat : vous ne perdez plus de temps.
            </p>
          </div>
        </div>

        <div className="space-y-16 mb-24">
          <Heading as="h3" className="text-2xl md:text-3xl font-extrabold text-center tracking-tight text-white">Les 3 piliers de l'offre Sérénité</Heading>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pillars.map((p, i) => (
              <Card key={i} className="p-6 bg-white/[0.02] border-white/10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="text-xs font-bold font-mono tracking-widest text-secondary block bg-white/5 w-fit px-3 py-1 rounded-md">{p.num}</span>
                  <Heading as="h4" className="text-lg font-bold text-white leading-tight">{p.title}</Heading>
                  <p className="text-xs text-white/60 leading-relaxed">{p.desc}</p>
                </div>
                <ul className="space-y-3 pt-4">
                  {p.inclusions.map((inc, k) => (
                    <li key={k} className="flex items-start gap-3 text-xs text-white/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-1.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-10 mb-24">
          <Heading as="h3" className="text-xl md:text-2xl font-bold tracking-tight text-white">Support informatique PME : pour qui est l'offre Sérénité ?</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {targets.map((target, i) => (
              <div key={i} className="flex items-start gap-4 bg-white/[0.02] p-6 rounded-2xl">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-2" />
                <span className="text-sm text-white/80 leading-relaxed">{target}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-10 mb-24">
          <Heading as="h3" className="text-xl md:text-2xl font-bold tracking-tight text-white">Une tarification claire et sans surprise</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white/[0.02] space-y-6">
              <div className="flex justify-between items-baseline">
                <span className="text-base font-bold">Mensuel</span>
                <span className="text-xl font-black text-secondary">79€ HT <span className="text-xs font-normal text-white/50">/ poste / mois</span></span>
              </div>
              <ul className="text-sm text-white/70 space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                  <span>Sans aucun engagement</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                  <span>Résiliable à tout moment</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                  <span>Mise en place rapide dès le démarrage</span>
                </li>
              </ul>
            </div>
            <div className="p-8 rounded-2xl bg-secondary/[0.05] space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-secondary text-white text-[10px] font-black uppercase px-4 py-1 rounded-bl-xl">Économique</div>
              <div className="flex justify-between items-baseline">
                <span className="text-base font-bold">Annuel</span>
                <span className="text-xl font-black text-secondary">869€ HT <span className="text-xs font-normal text-white/50">/ poste / an</span></span>
              </div>
              <ul className="text-sm text-white/70 space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                  <span>1 mois offert par poste</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                  <span>Budget lisible sur l'année</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <Heading as="h3" className="text-xl md:text-2xl font-bold tracking-tight text-white">Options disponibles</Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {options.map((opt, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/[0.02] flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="font-bold text-white text-base">{opt.title}</div>
                  <p className="text-sm text-white/50 leading-relaxed">{opt.desc}</p>
                </div>
                <div className="text-sm font-black text-secondary pt-2">
                  {opt.price}
                </div>
              </div>
            ))}
          </div>
        </div>

      </Container>
    </Section>
  )
}

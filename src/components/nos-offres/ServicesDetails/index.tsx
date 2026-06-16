import Image from "next/image"
import { Heading, Text } from "@/components/ui/Typography"
import { Card } from "@/components/ui/Card"
import { structuralServices, executionSteps, partnersList } from "./data"

export function ServicesDetails() {
  return (
    <div id="services-annexes" className="space-y-32 text-white pb-16">

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center mb-24">
        <div className="space-y-6">
          <span className="text-secondary font-mono text-xs tracking-widest uppercase">SERVICES ANNEXES</span>
          <Heading as="h2" className="text-3xl md:text-5xl font-black leading-tight tracking-normal text-white">
            Un accompagnement IT sur mesure, au-delà du *support*
          </Heading>
          <Text className="text-white/80 text-base md:text-lg leading-relaxed">
            Changement de messagerie, ajout de nouveaux postes, évolution de votre environnement Microsoft 365, amélioration de votre réseau ou sécurisation de vos données... Nous intervenons sur les projets informatiques du quotidien comme sur les sujets plus structurants.
          </Text>
          <p className="py-6 italic text-white/90 text-sm md:text-base leading-relaxed bg-white/[0.02] px-6 rounded-xl">
            Chaque entreprise a ses contraintes, son niveau d&apos;équipement et ses priorités. C&apos;est pour cela que ces services sont proposés sur devis : nous analysons votre besoin, nous vous recommandons une solution adaptée et nous vous annonçons un prix fixe avant toute intervention. Vous avancez avec un cadre clair, sans mauvaise surprise.
          </p>
        </div>

        <div className="hidden xl:block relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/images/nos-offres/services-annexes.avif"
            alt="Trinexta Infrastructure Réseau et Environnement Cloud"
            fill
            sizes="(max-width: 1200px) 50vw, 40vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start mb-24">
        <div className="xl:col-span-5 space-y-4">
          <Heading as="h3" className="text-2xl md:text-3xl font-black tracking-normal text-white">
            Notre approche : conseiller avant de *vendre*
          </Heading>
        </div>
        <div className="xl:col-span-7 space-y-4 text-white/80 text-sm md:text-base leading-relaxed">
          <p>
            Chez TRINEXTA, nous cherchons d&apos;abord la solution la plus utile et économique pour votre entreprise. Avant de recommander un achat de matériel, nous commençons par évaluer ce que vous avez déjà. Si un poste peut encore répondre à vos besoins grâce à une optimisation, une mise à niveau ou un ajustement technique, c&apos;est cette option budgétaire et responsable que nous privilégions.
          </p>
          <p className="font-semibold text-white">
            Notre objectif n&apos;est pas de pousser à la dépense. Nous vous aidons à faire les bons choix, au bon moment, en tenant compte à la fois de votre activité, de votre budget et de la durée de vie réelle de vos équipements. C&apos;est une approche plus responsable, à la fois pour votre entreprise et pour l&apos;environnement.
          </p>
        </div>
      </div>

      <div className="space-y-12 mb-24">
        <div className="space-y-2">
          <Heading as="h3" className="text-2xl md:text-3xl font-extrabold tracking-normal text-white">Nos services sur *devis*</Heading>
          <Text className="text-white/60 text-sm md:text-base">Voici les prestations les plus demandées par nos clients. Chaque intervention fait l&apos;objet d&apos;un échange préalable et d&apos;un devis personnalisé.</Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {structuralServices.map((service, index) => (
            <Card key={index} className="p-5 bg-white/[0.01] border-white/5 flex flex-col justify-between hover:border-secondary/20 transition-all space-y-4 rounded-xl">
              <div className="space-y-2.5">
                <Heading as="h4" className="text-base font-bold text-white leading-snug">{service.title}</Heading>
                <p className="text-xs text-white/50 leading-relaxed">{service.desc}</p>
                <ul className="space-y-1.5 pt-2 border-t border-white/5">
                  {service.points.map((pt, k) => (
                    <li key={k} className="text-xs text-white/80 flex items-start gap-2">
                      <span className="text-secondary shrink-0 mt-0.5">✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-[10px] font-bold text-secondary uppercase tracking-wider border-t border-white/5 pt-3">
                {service.meta}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <Heading as="h3" className="text-xl md:text-2xl font-bold tracking-normal text-center text-white">
          *Comment* ça se passe ?
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {executionSteps.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-white/[0.01] border border-white/5 space-y-2 relative">
              <span className="text-[9px] font-bold font-mono tracking-widest text-secondary uppercase bg-secondary/10 px-2 py-0.5 rounded">
                {item.step}
              </span>
              <Heading as="h4" className="text-sm font-bold text-white pt-1">{item.title}</Heading>
              <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 md:p-8 rounded-2xl bg-white/[0.01] border border-white/5 space-y-6">
        <div className="text-center space-y-1">
          <Heading as="h3" className="text-xl font-bold tracking-normal text-white">Nos partenaires</Heading>
          <Text className="text-white/60 text-xs md:text-sm">
            Pour vous proposer des solutions fiables et cohérentes, nous nous appuyons sur des partenaires reconnus.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partnersList.map((partner, index) => (
            <div key={index} className="p-6 rounded-xl border border-white/10 bg-white/[0.02] flex flex-col items-center text-center space-y-4 hover:border-secondary/30 transition-all">
              <div className="w-32 h-16 relative flex items-center justify-center">
                 <Image
                    src={partner.src}
                    alt={`Logo ${partner.name}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                 />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-white text-base">{partner.name}</div>
                <p className="text-xs text-white/60 leading-relaxed">{partner.role}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-white/40 text-center italic pt-3 border-t border-white/5">
          Nous négocions les meilleurs tarifs possibles pour vous et nous préparons le matériel avant livraison afin qu&apos;il soit prêt à l&apos;emploi dès son arrivée.
        </p>
      </div>

    </div>
  )
}

import Image from "next/image"
import { Heading, Text } from "@/components/ui/Typography"
import { Card } from "@/components/ui/Card"

const stats = [
  { value: "79€", label: "HT / poste / mois" },
  { value: "0", label: "engagement minimum" },
  { value: "100%", label: "illimité" }
]

const pillars = [
  {
    num: "PILIER 1",
    title: "Support & Assistance illimité",
    desc: "Quand un problème survient, vous avez besoin d’une réponse rapide, claire et efficace. Pas d’un parcours compliqué. Vous échangez avec une personne qui comprend votre situation et vous aide à la résoudre par téléphone, par e-mail ou à distance. Et si le problème concerne un logiciel métier, nous pouvons également prendre contact avec l’éditeur et assurer le suivi jusqu’à la résolution.",
    inclusions: ["Support par téléphone et par e-mail", "Portail de ticketing", "Assistance à distance", "Gestion des échanges avec les éditeurs tiers"]
  },
  {
    num: "PILIER 2",
    title: "Maintenance & Supervision proactive",
    desc: "Une bonne maintenance informatique ne consiste pas seulement à réparer après une panne. Elle consiste surtout à éviter qu’elle arrive. Un agent de supervision est installé sur chaque poste pour détecter les anomalies, surveiller l’état du système et intervenir en amont lorsque c’est possible. Cela permet de limiter les interruptions, de garder des postes performants et de réduire les incidents du quotidien.",
    inclusions: ["Alertes automatiques", "Mises à jour Windows et logiciels", "Optimisation des postes", "Maintenance préventive"]
  },
  {
    num: "PILIER 3",
    title: "Cybersécurité EDR + Intelligence Artificielle",
    desc: "Les petites entreprises sont elles aussi exposées aux cybermenaces. Aujourd’hui, la cybersécurité ne doit plus être réservée aux grandes structures. Avec l’offre Sérénité, vos postes bénéficient d’une protection avancée capable de surveiller, détecter et bloquer les comportements suspects en temps réel. Nous appliquons des bonnes pratiques en cybersécurité, notamment celles recommandées par l’ANSSI.",
    inclusions: ["Antivirus nouvelle génération", "Anti‑ransomware", "Anti‑phishing", "Détection comportementale", "Gestion des correctifs de sécurité"]
  }
]

const targets = [
  "Indépendants, entrepreneurs et petites structures dès 1 poste",
  "Cabinets professionnels : comptables, avocats, consultants, professions libérales",
  "Commerces et entreprises utilisant des outils métier : caisse, stock, planning, facturation",
  "Structures en développement qui souhaitent anticiper les pannes et sécuriser leur environnement",
  "Dirigeants qui veulent un accompagnement simple, réactif et sans jargon"
]

const options = [
  {
    title: "Sauvegarde cloud avancée",
    price: "+10€ HT / poste / mois",
    desc: "Protection renforcée pour vos données sensibles et vos fichiers essentiels."
  },
  {
    title: "Pilotage stratégique",
    price: "Sur devis",
    desc: "Un point régulier pour faire évoluer votre informatique avec votre activité."
  },
  {
    title: "Gestion serveur / NAS / réseau",
    price: "Sur devis",
    desc: "Une prise en charge adaptée aux infrastructures plus complètes ou plus spécifiques."
  }
]

export function SereniteDetails() {
  return (
    <div id="serenite" className="space-y-24 text-white">
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center border-b border-white/10 pb-16">
        <div className="space-y-6">
          <span className="text-secondary font-mono text-xs tracking-widest uppercase">OFFRE SÉRÉNITÉ</span>
          <Heading as="h2" className="text-3xl md:text-5xl font-black leading-tight tracking-tighter text-white">
            Votre informatique doit soutenir votre activité. Pas la freiner.
          </Heading>
          <Text className="text-white/80 text-base md:text-lg leading-relaxed">
            Un logiciel de caisse qui bloque en plein service. Une messagerie inaccessible pendant plusieurs heures. Un poste lent qui fait perdre du temps chaque jour à vos équipes. Ce ne sont pas de simples soucis informatiques. Ce sont des blocages concrets qui ralentissent votre entreprise, créent du stress et coûtent de l’argent.
          </Text>
          <p className="border-t border-b border-white/10 py-4 italic text-white/90 text-sm md:text-base leading-relaxed">
            Avec l’offre Sérénité, vous bénéficiez d’un accompagnement informatique simple, complet et rassurant : 79€ HT par poste et par mois, avec support informatique illimité, maintenance proactive et cybersécurité incluse. Et surtout, nous ne nous arrêtons pas à vos ordinateurs : nous vous accompagnons aussi sur vos logiciels métier, avec un seul interlocuteur pour centraliser le suivi.
          </p>
        </div>
        <div className="relative w-full aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl mt-8 xl:mt-0">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
        {stats.map((stat, idx) => (
          <div key={idx} className="p-5 rounded-xl bg-white/[0.01] border border-white/5 space-y-0.5">
            <div className="text-3xl md:text-4xl font-black text-secondary tracking-tight">{stat.value}</div>
            <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-2xl bg-secondary/5 border border-secondary/10 grid grid-cols-1 xl:grid-cols-3 gap-6 items-center">
        <div className="xl:col-span-1">
          <Heading as="h3" className="text-xl md:text-2xl font-black text-white leading-tight">
            Ce qu'on fait que les autres ne font pas
          </Heading>
        </div>
        <div className="xl:col-span-2 text-sm text-white/80 space-y-3 leading-relaxed">
          <p>
            Beaucoup de prestataires informatiques interviennent uniquement sur le matériel ou les problèmes les plus classiques. Chez TRINEXTA, notre approche est plus globale.
          </p>
          <p className="font-semibold text-white">
            Votre logiciel de comptabilité rencontre un bug ? Nous prenons le sujet en main. Votre outil de planning ne fonctionne plus correctement ? Nous contactons l’éditeur pour vous. Nous suivons le dossier, nous faisons le lien avec les bons interlocuteurs et nous vous tenons informé à chaque étape. Résultat : vous ne perdez plus de temps à chercher qui appeler, à multiplier les échanges ou à expliquer plusieurs fois le même problème. Avec TRINEXTA, vous avez un seul contact pour l’ensemble de votre informatique.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <Heading as="h3" className="text-2xl md:text-3xl font-extrabold text-center tracking-tight text-white">Les 3 piliers de l'offre Sérénité</Heading>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <Card key={i} className="p-6 bg-white/[0.02] border-white/10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold font-mono tracking-widest text-secondary block bg-white/5 w-fit px-2.5 py-1 rounded-md">{p.num}</span>
                <Heading as="h4" className="text-lg font-bold text-white leading-tight">{p.title}</Heading>
                <p className="text-xs text-white/60 leading-relaxed">{p.desc}</p>
              </div>
              <ul className="border-t border-white/5 pt-4 space-y-2">
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

      <div className="space-y-6">
        <Heading as="h3" className="text-xl md:text-2xl font-bold tracking-tight text-white">Support informatique PME : pour qui est l’offre Sérénité ?</Heading>
        <Text className="text-white/60 text-sm md:text-base">
          L’offre Sérénité s’adresse aux structures de 1 à 20 postes qui veulent une informatique fiable, sécurisée et bien suivie, sans avoir besoin d’un service informatique en interne.
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {targets.map((target, i) => (
            <div key={i} className="flex items-start gap-3 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-1.5" />
              <span className="text-xs md:text-sm text-white/80 leading-normal">{target}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <Heading as="h3" className="text-xl md:text-2xl font-bold tracking-tight text-white">Une tarification claire et sans surprise</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-base font-bold">Mensuel</span>
              <span className="text-xl font-black text-secondary">79€ HT <span className="text-xs font-normal text-white/50">/ poste / mois</span></span>
            </div>
            <ul className="text-xs text-white/60 space-y-2 leading-relaxed">
              <li className="flex items-center gap-3">
                <span className="w-1 h-1 rounded-full bg-secondary shrink-0" />
                <span>Sans aucun engagement</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1 h-1 rounded-full bg-secondary shrink-0" />
                <span>Résiliable à tout moment</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1 h-1 rounded-full bg-secondary shrink-0" />
                <span>Mise en place rapide dès le démarrage</span>
              </li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl border border-secondary/30 bg-secondary/[0.02] space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-secondary text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-bl-md">Économique</div>
            <div className="flex justify-between items-baseline">
              <span className="text-base font-bold">Annuel <span className="text-xs font-normal text-secondary block">(1 mois offert)</span></span>
              <span className="text-xl font-black text-secondary">869€ HT <span className="text-xs font-normal text-white/50">/ poste / an</span></span>
            </div>
            <ul className="text-xs text-white/60 space-y-2 leading-relaxed">
              <li className="flex items-center gap-3">
                <span className="w-1 h-1 rounded-full bg-secondary shrink-0" />
                <span>1 mois offert par poste</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1 h-1 rounded-full bg-secondary shrink-0" />
                <span>Même niveau d’accompagnement</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1 h-1 rounded-full bg-secondary shrink-0" />
                <span>Un budget plus lisible sur l’année</span>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-xs text-white/40 text-center italic">À partir du 21e poste : tarification sur devis, adaptée à votre organisation, à vos sites, à vos équipements et à vos besoins spécifiques.</p>
      </div>

      <div className="space-y-6">
        <Heading as="h3" className="text-xl md:text-2xl font-bold tracking-tight text-white">Options disponibles</Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {options.map((opt, i) => (
            <div key={i} className="p-5 rounded-xl border border-white/5 bg-white/[0.01] flex flex-col justify-between space-y-3">
              <div className="space-y-1">
                <div className="font-bold text-white text-sm">{opt.title}</div>
                <p className="text-xs text-white/50 leading-relaxed">{opt.desc}</p>
              </div>
              <div className="text-xs font-black text-secondary pt-1">
                {opt.price}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
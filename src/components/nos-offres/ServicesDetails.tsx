import Image from "next/image"
import { Heading, Text } from "@/components/ui/Typography"
import { Card } from "@/components/ui/Card"

const structuralServices = [
  {
    title: "Migration de messagerie vers Microsoft 365",
    desc: "Vous utilisez encore une messagerie hébergée chez OVH, Orange, Free ou un autre prestataire ? Nous prenons en charge votre migration vers Microsoft 365 pour vous faire gagner en fiabilité, en confort d’usage et en professionnalisme.",
    meta: "Sur devis — Généralement réalisé en 1 journée",
    points: [
      "Création de votre environnement Microsoft 365",
      "Transfert de vos e-mails, contacts et calendriers",
      "Configuration sur vos ordinateurs, téléphones et tablettes",
      "Mise en place de la double authentification (MFA)",
      "Vérification des enregistrements DNS et paramétrage anti-spam",
      "Création de boîtes mail partagées",
      "Accompagnement de vos équipes pour la prise en main d’Outlook"
    ]
  },
  {
    title: "Création et configuration d’un environnement Microsoft 365",
    desc: "Vous souhaitez structurer votre entreprise avec des outils professionnels comme Outlook, Teams, OneDrive ou SharePoint ? Nous créons et configurons votre environnement Microsoft 365 de A à Z, pour qu’il soit cohérent, sécurisé et prêt à l’emploi.",
    meta: "Sur devis — Partenaire Microsoft certifié",
    points: [
      "Création du tenant Microsoft 365 au nom de votre entreprise",
      "Création des comptes utilisateurs et attribution des licences",
      "Configuration de votre messagerie professionnelle",
      "Mise en place de OneDrive et SharePoint pour le partage des fichiers",
      "Activation de Teams pour la communication interne",
      "Sécurisation de l’ensemble avec MFA et règles de sécurité adaptées"
    ]
  },
  {
    title: "Conseil et accompagnement à l’achat de matériel",
    desc: "Besoin d’un nouvel ordinateur, d’un écran ou d’une imprimante ? Nous vous accompagnons pour choisir un équipement réellement adapté à votre activité, sans surdimensionnement inutile. Avant toute recommandation, nous analysons votre matériel existant.",
    meta: "Sur devis — On optimise avant de remplacer",
    points: [
      "Audit de votre matériel actuel",
      "Recommandation sur mesure selon vos usages et votre budget",
      "Commande et livraison via nos partenaires (Dell, Lenovo, Microsoft)",
      "Préparation complète du poste avant livraison",
      "Installation et configuration dans votre environnement"
    ]
  },
  {
    title: "Mise à niveau Windows Famille vers Windows Professionnel",
    desc: "Votre ordinateur fonctionne sous Windows Family ? Pour un usage professionnel, certaines fonctions importantes peuvent vous manquer. Nous réalisons la mise à niveau vers Windows Professionnel sans perte de données.",
    meta: "Sur devis — Intervention en 2 à 3 heures",
    points: [
      "Licence officielle Windows 11 Professionnel",
      "Mise à niveau sur place sans perte de données",
      "Activation des fonctions utiles en entreprise",
      "Optimisation et sécurisation du poste",
      "Connexion à votre environnement Microsoft 365"
    ]
  },
  {
    title: "Optimisation et remise à niveau de poste existant",
    desc: "Votre ordinateur est lent, met du temps à démarrer ou devient difficile à utiliser ? Avant d’envisager un achat neuf, nous pouvons souvent améliorer sensiblement ses performances pour un budget bien plus raisonnable.",
    meta: "Sur devis — Souvent bien plus économique qu’un ordinateur neuf",
    points: [
      "Diagnostic complet du poste",
      "Ajout de mémoire RAM si nécessaire",
      "Remplacement du disque dur par un SSD",
      "Réinstallation propre de Windows si besoin",
      "Nettoyage logiciel et suppression des programmes inutiles",
      "Vérification de la sécurité et mise à jour complète"
    ]
  },
  {
    title: "Installation et configuration réseau",
    desc: "Vous avez besoin d’un WiFi plus fiable, d’un partage de fichiers entre vos postes ou d’un accès à distance sécurisé ? Nous concevons et configurons un réseau adapté à la taille et au fonctionnement de votre entreprise.",
    meta: "Sur devis — Adapté à la taille de votre entreprise",
    points: [
      "Installation et configuration de votre box ou routeur professionnel",
      "Mise en place d’un WiFi sécurisé (séparation Invités / Entreprise)",
      "Partage de fichiers et d’imprimantes entre les postes",
      "Configuration d’un NAS pour le stockage local",
      "Mise en place d’un VPN pour l’accès à distance sécurisé"
    ]
  },
  {
    title: "Arrivée ou départ d’un collaborateur",
    desc: "L’arrivée d’un nouveau collaborateur ou le départ d’un salarié demande une gestion informatique rigoureuse. Nous prenons en charge ces étapes pour que tout soit prêt, sécurisé et bien organisé.",
    meta: "Sur devis — Pour que rien ne se perde",
    points: [
      "Arrivée : création du compte, configuration du poste, accès messagerie, logiciels et imprimantes",
      "Départ : sauvegarde des données, transfert des e-mails, suppression sécurisée du compte, récupération matériel",
      "Gestion des licences Microsoft 365",
      "Transfert d’une boîte mail vers un autre collaborateur si besoin"
    ]
  },
  {
    title: "Mise en place de sauvegarde professionnelle",
    desc: "Vos données ne doivent pas dépendre du hasard. Une panne, un vol, une erreur de manipulation ou une attaque peuvent avoir des conséquences lourdes si aucune sauvegarde fiable n’est en place.",
    meta: "Sur devis — Parce que vos données sont essentielles",
    points: [
      "Sauvegarde automatique dans le cloud",
      "Sauvegarde locale sur NAS ou disque externe",
      "Planification quotidienne ou hebdomadaire",
      "Vérification régulière de l’intégrité des sauvegardes",
      "Plan de restauration en cas d’incident (PRA)"
    ]
  },
  {
    title: "Sécurisation de la messagerie professionnelle",
    desc: "La messagerie reste l’une des principales portes d’entrée des cyberattaques. Nous renforçons la sécurité de vos comptes e-mail pour mieux protéger vos utilisateurs, vos échanges et vos données.",
    meta: "Sur devis — La sécurité commence par les e-mails",
    points: [
      "Activation de la double authentification sur tous les comptes",
      "Configuration anti-spam et anti-phishing avancée",
      "Mise en place des protections DNS : SPF, DKIM, DMARC",
      "Sensibilisation de vos équipes aux bons réflexes",
      "Audit de sécurité de votre messagerie existante"
    ]
  },
  {
    title: "Formation et accompagnement utilisateurs",
    desc: "Des outils bien choisis ne suffisent pas toujours. Encore faut-il que les équipes sachent les utiliser sereinement. Nous proposons des formations simples, concrètes et accessibles, sans jargon inutile.",
    meta: "Sur devis — Adapté au niveau de chaque équipe",
    points: [
      "Prise en main de Microsoft 365 : Outlook, Teams, OneDrive, SharePoint",
      "Bonnes pratiques de sécurité : mots de passe, phishing, sauvegardes",
      "Utilisation plus efficace du poste de travail au quotidien"
    ]
  }
]

const executionSteps = [
  {
    step: "Étape 1",
    title: "Vous nous expliquez votre besoin",
    desc: "Par téléphone, par e-mail ou en visio, vous nous présentez votre besoin simplement, avec vos mots."
  },
  {
    step: "Étape 2",
    title: "Analyse & Proposition sur mesure",
    desc: "Nous étudions votre situation, votre matériel existant et vos besoins réels. Puis nous vous transmettons un devis clair, avec un prix fixe et un périmètre défini."
  },
  {
    step: "Étape 3",
    title: "Réalisation de la prestation",
    desc: "Nous planifions l’intervention au moment le plus adapté à votre activité. La prestation est réalisée, testée, puis validée avec vous."
  },
  {
    step: "Étape 4",
    title: "Nous restons disponibles",
    desc: "Une fois l’intervention terminée, nous restons joignables si vous avez besoin d’un ajustement, d’une précision ou de guider vos équipes."
  }
]

const partnersList = [
  { name: "Microsoft", role: "Partenaire certifié.", src: "/images/partners/microsoft.png" },
  { name: "Dell", role: "PC professionnels.", src: "/images/partners/Dell.png" },
  { name: "Lenovo", role: "Postes de travail performants.", src: "/images/partners/Lenovo.jpg" }
]

export function ServicesDetails() {
  return (
    <div id="services-annexes" className="space-y-24 text-white">
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center border-b border-white/10 pb-16">
        <div className="space-y-6">
          <span className="text-secondary font-mono text-xs tracking-widest uppercase">SERVICES ANNEXES</span>
          <Heading as="h2" className="text-3xl md:text-5xl font-black leading-tight tracking-tighter text-white">
            Un accompagnement IT sur mesure, au-delà du support
          </Heading>
          <Text className="text-white/80 text-base md:text-lg leading-relaxed">
            Changement de messagerie, ajout de nouveaux postes, évolution de votre environnement Microsoft 365, amélioration de votre réseau ou sécurisation de vos données... Nous intervenons sur les projets informatiques du quotidien comme sur les sujets plus structurants.
          </Text>
          <p className="border-t border-b border-white/10 py-4 italic text-white/90 text-sm md:text-base leading-relaxed">
            Chaque entreprise a ses contraintes, son niveau d’équipement et ses priorités. C’est pour cela que ces services sont proposés sur devis : nous analysons votre besoin, nous vous recommandons une solution adaptée et nous vous annonçons un prix fixe avant toute intervention. Vous avancez avec un cadre clair, sans mauvaise surprise.
          </p>
        </div>

        <div className="hidden xl:block relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <Image
            src="/images/nos-offres/services-annexes.avif"
            alt="Trinexta Infrastructure Réseau et Environnement Cloud"
            fill
            sizes="(max-w-1200px) 50vw, 40vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start border-b border-white/10 pb-16">
        <div className="xl:col-span-5 space-y-4">
          <Heading as="h3" className="text-2xl md:text-3xl font-black tracking-tight text-white">
            Notre approche : conseiller avant de vendre
          </Heading>
        </div>
        <div className="xl:col-span-7 space-y-4 text-white/80 text-sm md:text-base leading-relaxed">
          <p>
            Chez TRINEXTA, nous cherchons d’abord la solution la plus utile et économique pour votre entreprise. Avant de recommander un achat de matériel, nous commençons par évaluer ce que vous avez déjà. Si un poste peut encore répondre à vos besoins grâce à une optimisation, une mise à niveau ou un ajustement technique, c’est cette option budgétaire et responsable que nous privilégions.
          </p>
          <p className="font-semibold text-white">
            Notre objectif n’est pas de pousser à la dépense. Nous vous aidons à faire les bons choix, au bon moment, en tenant compte à la fois de votre activité, de votre budget et de la durée de vie réelle de vos équipements. C’est une approche plus responsable, à la fois pour votre entreprise et pour l’environnement.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="space-y-2">
          <Heading as="h3" className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">Nos services sur devis</Heading>
          <Text className="text-white/60 text-sm md:text-base">Voici les prestations les plus demandées par nos clients. Chaque intervention fait l’objet d’un échange préalable et d’un devis personnalisé.</Text>
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
        <Heading as="h3" className="text-xl md:text-2xl font-bold tracking-tight text-center text-white">
          Comment ça se passe ?
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
          <Heading as="h3" className="text-xl font-bold tracking-tight text-white">Nos partenaires</Heading>
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
          Nous négocions les meilleurs tarifs possibles pour vous et nous préparons le matériel avant livraison afin qu’il soit prêt à l’emploi dès son arrivée.
        </p>
      </div>

    </div>
  )
}
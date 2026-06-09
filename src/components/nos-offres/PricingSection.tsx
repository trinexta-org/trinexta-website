import { PricingCard } from "./PricingCard"

const offers = [
  {
    name: "Impulsion",
    slug: "impulsion",
    price: "TJM / Forfait",
    target: "Mise à disposition & Régie IT",
    description: "Renforcez vos équipes avec un technicien support informatique qualifié, briefé et opérationnel immédiatement pour absorber vos surcharges.",
    features: [
      "Support utilisateurs Helpdesk N1/N2",
      "Gestion de parc de proximité",
      "Accompagnement de projets IT",
      "Sélection de profils sous 72h",
      "Zéro frais de mise en place"
    ],
  },
  {
    name: "Sérénité",
    slug: "serenite",
    price: "79€",
    target: "Solutions clés en main (1-20 postes)",
    description: "Confiez l'ensemble de vos besoins quotidiens (support, maintenance et sécurité) à un partenaire fiable avec un interlocuteur unique.",
    features: [
      "Support & Assistance à distance illimité",
      "Maintenance & Supervision proactive",
      "Cybersécurité avancée EDR + IA",
      "Prise en charge des logiciels métiers",
      "Formule mensuelle sans engagement"
    ],
    isFeatured: true,
  },
  {
    name: "Services Annexes",
    slug: "services-annexes",
    price: "Sur devis",
    target: "Prestations et projets à la demande",
    description: "Faites évoluer votre infrastructure informatique grâce à des interventions ciblées, transparentes et planifiées selon vos contraintes.",
    features: [
      "Migration et environnement Microsoft 365",
      "Optimisation et remise à niveau de postes",
      "Installation de réseaux, NAS et VPN",
      "Stratégie de sauvegarde professionnelle",
      "Gestion rigoureuse des on/off-boarding"
    ],
  },
  {
    name: "Trinexta Studio",
    slug: "studio",
    price: "Sur devis",
    target: "Création Web & SaaS",
    description: "Pour répondre précisément à vos besoins de création : concevez des sites internet sur mesure, des applications web et des plateformes SaaS.",
    features: [
      "Sites internet vitrines & corporate sur mesure",
      "Développement d'applications web et SaaS",
      "Conception intégrale par nos développeurs internes",
      "Hébergement sécurisé sur nos serveurs en France",
      "Accompagnement, suivi et maintenance technique"
    ],
  },
]

export function PricingSection() {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
      {offers.map((offer) => (
        <PricingCard key={offer.name} {...offer} />
      ))}
    </div>
  )
}
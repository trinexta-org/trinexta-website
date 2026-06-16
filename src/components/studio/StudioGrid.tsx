"use client"

import { Card } from "@/components/ui/Card"

const studioServices = [
  {
    title: "Sites internet sur mesure",
    desc: "Conception de sites vitrines, institutionnels ou e-commerce modernes, performants et entièrement administrables. Nous mettons l'accent sur un design UI/UX unique qui reflète fidèlement l'identité de votre entreprise.",
    points: [
      "Création de sites vitrines & corporate sur mesure",
      "Design UI/UX moderne, fluide et responsive",
      "Optimisation avancée pour le référencement naturel (SEO)",
      "Interfaces de gestion de contenu simples et intuitives",
      "Performances d'affichage et de vitesse optimales",
    ],
    stack: "STACK : Next.js / Sanity CMS / Tailwind CSS",
  },
  {
    title: "Applications Web complexes",
    desc: "Développement d'outils métiers et d'applications web spécifiques pour automatiser vos processus internes, gérer vos bases de données ou interconnecter vos outils existants via des API sécurisées.",
    points: [
      "Développement d'outils métiers spécifiques",
      "Architecture et gestion de bases de données sécurisées",
      "Conception et interconnexion d'API robustes",
      "Automatisation des flux et des processus internes",
      "Console d'administration et pilotage de données",
    ],
    stack: "STACK : React / Node.js / PostgreSQL",
  },
  {
    title: "Plateformes SaaS",
    desc: "Accompagnement de l'idée au déploiement pour la création de vos solutions logicielles en mode SaaS. Architecture scalable, gestion des abonnements, sécurité des données et interfaces utilisateurs intuitives.",
    points: [
      "Accompagnement complet de l'idée au déploiement",
      "Architecture cloud évolutive et hautement disponible",
      "Intégration des abonnements et paiements sécurisés",
      "Isolation stricte et protection des données utilisateurs",
      "Suivi technique continu et maintenance évolutive",
    ],
    stack: "STACK : Next.js / Prisma / Cloud Souverain",
  },
];

export function StudioGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {studioServices.map((service, index) => (
        <Card key={index} className="p-5 bg-white/[0.01] border-white/5 flex flex-col justify-between hover:border-secondary/20 transition-all space-y-4 rounded-xl">
          <div className="space-y-2.5">
            <h4 className="text-base font-bold text-white leading-snug">{service.title}</h4>
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
            {service.stack}
          </div>
        </Card>
      ))}
    </div>
  )
}
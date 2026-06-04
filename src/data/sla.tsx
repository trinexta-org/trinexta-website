import React from "react"
import type { LegalData } from "./mentions-legales"

export const slaData: LegalData = {
  hero: {
    title: "Niveaux de service",
    imageSrc: "/images/legal/hero-mentions.jpg",
  },
  sections: [
    {
      title: "Préambule",
      paragraphs: [
        "Le présent SLA définit les engagements de service applicables aux prestations de support informatique, d'infogérance, d'hébergement, de maintenance et de services numériques fournis par TRINEXTA.",
      ],
    },
    {
      title: "Article 1 - Objet",
      paragraphs: [
        "Le présent SLA précise les horaires de support, les délais de prise en charge, les niveaux de priorité, les engagements de disponibilité, les procédures d'escalade, les interventions sur site et les modalités de maintenance.",
      ],
    },
    {
      title: "Article 2 - Périmètre des services",
      content: (
        <ul className="space-y-2">
          {[
            "Support informatique et assistance utilisateurs",
            "Infogérance",
            "Microsoft 365",
            "Hébergement web, applicatif et SaaS",
            "Maintenance de sites internet et applications métiers",
            "Cybersécurité",
            "Sauvegardes et supervision",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/70">
              <span className="text-secondary shrink-0 mt-0.5">-</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Article 3 - Horaires de support standard",
      paragraphs: [
        "Sauf contrat spécifique, le support à distance est assuré du lundi au vendredi, de 08h00 à 19h00, hors jours fériés. Les demandes peuvent être effectuées par téléphone, e-mail, portail client ou ticket d'assistance.",
      ],
    },
    {
      title: "Article 4 - Niveaux de priorité",
      content: (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse min-w-[480px]">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-2 pr-4 text-white font-bold text-xs uppercase tracking-wider w-28">Priorité</th>
                <th className="text-left py-2 pr-4 text-white font-bold text-xs uppercase tracking-wider">Impact</th>
                <th className="text-left py-2 pr-4 text-white font-bold text-xs uppercase tracking-wider whitespace-nowrap">Prise en charge</th>
                <th className="text-left py-2 text-white font-bold text-xs uppercase tracking-wider whitespace-nowrap">Résolution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="py-3 pr-4 align-top">
                  <span className="text-secondary font-bold text-xs">P1 - Critique</span>
                </td>
                <td className="py-3 pr-4 text-white/70 text-sm align-top">
                  Arrêt total de production, indisponibilité générale, incident bloquant majeur (serveur inaccessible, SaaS indisponible, messagerie hors service).
                </td>
                <td className="py-3 pr-4 text-white/70 text-sm align-top whitespace-nowrap">30 minutes</td>
                <td className="py-3 text-white/70 text-sm align-top whitespace-nowrap">4 h ouvrées</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 align-top">
                  <span className="text-secondary font-bold text-xs">P2 - Haute</span>
                </td>
                <td className="py-3 pr-4 text-white/70 text-sm align-top">
                  Forte dégradation du service, plusieurs utilisateurs impactés.
                </td>
                <td className="py-3 pr-4 text-white/70 text-sm align-top whitespace-nowrap">1 h ouvrée</td>
                <td className="py-3 text-white/70 text-sm align-top whitespace-nowrap">8 h ouvrées</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 align-top">
                  <span className="text-secondary font-bold text-xs">P3 - Moyenne</span>
                </td>
                <td className="py-3 pr-4 text-white/70 text-sm align-top">
                  Dysfonctionnement isolé, impact limité.
                </td>
                <td className="py-3 pr-4 text-white/70 text-sm align-top whitespace-nowrap">4 h ouvrées</td>
                <td className="py-3 text-white/70 text-sm align-top whitespace-nowrap">24 h ouvrées</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 align-top">
                  <span className="text-secondary font-bold text-xs">P4 - Faible</span>
                </td>
                <td className="py-3 pr-4 text-white/70 text-sm align-top">
                  Demande de conseil, d&apos;évolution ou assistance non urgente.
                </td>
                <td className="py-3 pr-4 text-white/70 text-sm align-top whitespace-nowrap">1 jour ouvré</td>
                <td className="py-3 text-white/70 text-sm align-top whitespace-nowrap">Selon planification</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      title: "Article 5 - Interventions sur site",
      paragraphs: [
        "Lorsque nécessaire, TRINEXTA peut intervenir sur site. Demi-journée : selon devis. Journée complète : à partir de 300 € HT. Toute intervention urgente peut faire l'objet d'une majoration spécifique. Les frais de déplacement peuvent être facturés séparément.",
      ],
    },
    {
      title: "Article 6 - Disponibilité des services hébergés",
      paragraphs: [
        "Pour les services hébergés par TRINEXTA, la disponibilité cible est de 99,5 % sur une période mensuelle. Ne sont pas comptabilisés les maintenances planifiées, les interruptions imposées par des tiers, les cas de force majeure et les incidents Internet hors contrôle de TRINEXTA.",
      ],
    },
    {
      title: "Article 7 - Maintenances planifiées",
      paragraphs: [
        "TRINEXTA peut réaliser des opérations de maintenance préventive. Lorsque cela est possible : notification préalable, réalisation en dehors des heures de forte activité et limitation de l'impact utilisateur.",
      ],
    },
    {
      title: "Article 8 - Sauvegardes",
      paragraphs: [
        "Selon les services souscrits, des sauvegardes quotidiennes sont réalisées, avec une conservation standard de 7, 14 ou 30 jours selon l'offre contractuelle. Le Client demeure responsable de vérifier la cohérence de ses données.",
      ],
    },
    {
      title: "Article 9 - Restauration des données",
      paragraphs: [
        "En cas de demande de restauration, TRINEXTA met en oeuvre les moyens nécessaires pour récupérer les données disponibles dans les sauvegardes existantes. Aucune garantie absolue de récupération ne peut être accordée.",
      ],
    },
    {
      title: "Article 10 - Cybersécurité",
      paragraphs: [
        "TRINEXTA applique notamment la surveillance des infrastructures, les mises à jour de sécurité, la protection anti-intrusion, la protection anti-malware et la surveillance des journaux. Malgré ces mesures, aucune protection ne peut garantir un risque zéro.",
      ],
    },
    {
      title: "Article 11 - Escalade",
      content: (
        <ul className="space-y-2">
          {[
            "Niveau 1 : technicien support.",
            "Niveau 2 : technicien confirmé / administrateur.",
            "Niveau 3 : expert infrastructure ou développement.",
            "Niveau 4 : direction technique.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/70">
              <span className="text-secondary shrink-0 mt-0.5">-</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Article 12 - Obligations du client",
      content: (
        <ul className="space-y-2">
          {[
            "Fournir des informations exactes",
            "Maintenir ses équipements",
            "Coopérer lors des interventions",
            "Respecter les recommandations de sécurité",
            "Disposer des licences nécessaires",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/70">
              <span className="text-secondary shrink-0 mt-0.5">-</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Article 13 - Limites du SLA",
      paragraphs: [
        "Les objectifs définis dans le présent document constituent des objectifs de service et non une garantie de résultat. Les délais peuvent être affectés par des tiers, des fournisseurs, des opérateurs télécoms, des éditeurs logiciels ou des événements de force majeure.",
      ],
    },
    {
      title: "Article 14 - Évolution du SLA",
      paragraphs: [
        "TRINEXTA se réserve le droit de faire évoluer le présent SLA afin de tenir compte des évolutions techniques, réglementaires ou des nouveaux services proposés.",
      ],
    },
    {
      title: "Article 15 - Contact support",
      paragraphs: [
        "Téléphone : 09 78 25 07 46",
        <span key="support"><a href="mailto:support@trinexta.fr" className="text-secondary hover:underline transition-colors">support@trinexta.fr</a></span>,
        <span key="contact"><a href="mailto:contact@trinexta.fr" className="text-secondary hover:underline transition-colors">contact@trinexta.fr</a></span>,
      ],
    },
  ],
}

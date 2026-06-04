import React from "react"
import type { LegalData } from "./mentions-legales"

export const dpaData: LegalData = {
  hero: {
    title: "Accord de traitement des données",
    imageSrc: "/images/legal/hero-mentions.jpg",
  },
  sections: [
    {
      title: "Préambule",
      paragraphs: [
        "Le présent Accord de Traitement des Données (DPA) complète les Conditions Générales de Vente de TRINEXTA et s'applique à toute prestation impliquant le traitement de données personnelles pour le compte d'un client, conformément au Règlement Général sur la Protection des Données (RGPD).",
      ],
    },
    {
      title: "Article 1 - Parties",
      paragraphs: [
        "TRUSTECH IT SUPPORT - marque commerciale TRINEXTA, SASU au capital de 15 000 €, SIREN : 942 020 082 — ci-après désignée « le Sous-traitant ».",
        "Et : le Client utilisant les services de TRINEXTA, ci-après désigné « le Responsable de Traitement ».",
      ],
    },
    {
      title: "Article 2 - Objet",
      paragraphs: [
        "Le présent accord définit les conditions dans lesquelles TRINEXTA traite des données personnelles pour le compte du Client, conformément au RGPD.",
      ],
    },
    {
      title: "Article 3 - Prestations concernées",
      content: (
        <ul className="space-y-2">
          {[
            "Hébergement web, applicatif et SaaS",
            "Support informatique",
            "Infogérance et maintenance informatique",
            "Sauvegarde externalisée",
            "Microsoft 365 et solutions cloud",
            "Développement applicatif",
            "Portails clients et solutions métiers hébergées",
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
      title: "Article 4 - Nature des traitements",
      paragraphs: [
        "Selon les services souscrits, TRINEXTA peut être amenée à héberger des données, stocker des informations, sauvegarder des données, assurer la maintenance, administrer des plateformes et assister le Client dans l'exploitation de ses services. TRINEXTA n'utilise jamais les données du Client pour son propre compte.",
      ],
    },
    {
      title: "Article 5 - Catégories de données",
      paragraphs: [
        "Les données traitées peuvent notamment inclure l'identité des utilisateurs, leurs coordonnées, des informations professionnelles, des données contractuelles, des données de connexion, des données applicatives et des documents stockés par le Client. Le Client demeure seul responsable de la nature des données hébergées.",
      ],
    },
    {
      title: "Article 6 - Obligations de TRINEXTA",
      content: (
        <ul className="space-y-2">
          {[
            "Traiter les données uniquement sur instruction documentée du Client",
            "Garantir la confidentialité des données",
            "Limiter l'accès aux personnes habilitées",
            "Mettre en oeuvre des mesures de sécurité adaptées",
            "Assister le Client dans le respect du RGPD",
            "Notifier les violations de données lorsqu'elles sont constatées",
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
      title: "Article 7 - Mesures de sécurité",
      content: (
        <ul className="space-y-2">
          {[
            "Chiffrement des communications",
            "Authentification sécurisée",
            "Contrôle des accès",
            "Journalisation des événements",
            "Sauvegardes régulières",
            "Surveillance des infrastructures",
            "Protection contre les intrusions",
            "Mises à jour de sécurité",
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
      title: "Article 8 - Sous-traitance ultérieure",
      paragraphs: [
        "TRINEXTA peut recourir à des sous-traitants techniques, notamment OVHcloud, Microsoft, Google, et autres fournisseurs cloud. TRINEXTA veille à sélectionner des partenaires présentant des garanties suffisantes en matière de sécurité et de conformité.",
      ],
    },
    {
      title: "Article 9 - Violation de données",
      paragraphs: [
        "En cas de violation de données personnelles susceptible d'engendrer un risque pour les personnes concernées, TRINEXTA informera le Client dans les meilleurs délais après en avoir pris connaissance.",
      ],
    },
    {
      title: "Article 10 - Assistance RGPD",
      paragraphs: [
        "TRINEXTA assiste raisonnablement le Client pour répondre aux demandes des personnes concernées, gérer les violations de données, réaliser des audits lorsque cela est applicable et démontrer sa conformité.",
      ],
    },
    {
      title: "Article 11 - Fin de prestation",
      paragraphs: [
        "À la fin du contrat, TRINEXTA pourra restituer les données, permettre leur export ou les supprimer selon les modalités convenues. Les obligations légales de conservation demeurent applicables.",
      ],
    },
    {
      title: "Article 12 - Audit",
      paragraphs: [
        "Sous réserve d'un préavis raisonnable et du respect des obligations de confidentialité, le Client peut demander des éléments démontrant la conformité de TRINEXTA aux obligations du présent accord.",
      ],
    },
    {
      title: "Article 13 - Droit applicable",
      paragraphs: [
        "Le présent accord est soumis au droit français. Tout litige relèvera des juridictions compétentes du ressort de la Cour d'Appel de Paris.",
      ],
    },
  ],
}

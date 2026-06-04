import React from "react"
import type { LegalData } from "./mentions-legales"

export const confidentialiteData: LegalData = {
  hero: {
    title: "Politique de confidentialité",
    imageSrc: "/images/legal/hero-confidentialite.jpg",
  },
  sections: [
    {
      title: "Introduction",
      paragraphs: [
        "TRUSTECH IT SUPPORT, exploitant la marque commerciale TRINEXTA, accorde une importance particulière à la protection des données personnelles et au respect de la vie privée de ses clients, prospects, partenaires, utilisateurs et visiteurs. La présente politique vous informe des traitements réalisés par TRINEXTA, conformément au Règlement Général sur la Protection des Données (RGPD) et à la Loi Informatique et Libertés.",
      ],
    },
    {
      title: "Article 1 - Identité du responsable de traitement",
      paragraphs: [
        "TRUSTECH IT SUPPORT - marque commerciale TRINEXTA",
        "SASU au capital de 15 000 €",
        "SIREN : 942 020 082",
        "Siège social : 74 B Boulevard Henri Dunant, 91100 Corbeil-Essonnes",
        <span key="email"><a href="mailto:contact@trinexta.fr" className="text-secondary hover:underline transition-colors">contact@trinexta.fr</a></span>,
        "Téléphone : 09 78 25 07 46",
      ],
    },
    {
      title: "Article 2 - Données collectées",
      content: (
        <div className="space-y-4 text-sm text-white/70">
          <p>Selon les services utilisés, TRINEXTA peut collecter les catégories de données suivantes :</p>
          {[
            { cat: "Données d'identification", items: ["Nom, prénom, fonction", "Société, numéro SIRET, numéro de TVA intracommunautaire"] },
            { cat: "Données de contact", items: ["Adresse e-mail, numéro de téléphone, adresse postale"] },
            { cat: "Données contractuelles", items: ["Contrats, devis, factures, bons d'intervention, historique des prestations"] },
            { cat: "Données techniques", items: ["Adresse IP, journaux de connexion, type de navigateur, système d'exploitation, données de sécurité"] },
            { cat: "Données de navigation", items: ["Pages consultées, durée de visite, sources de trafic, interactions avec le site"] },
          ].map(({ cat, items }) => (
            <div key={cat}>
              <p className="text-white font-semibold text-xs uppercase tracking-wider mb-1">{cat}</p>
              <ul className="space-y-1">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-secondary shrink-0">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p>Dans le cadre de l&apos;hébergement web, applicatif ou SaaS, TRINEXTA peut être amenée à traiter des données pour le compte de ses clients, en qualité de sous-traitant.</p>
        </div>
      ),
    },
    {
      title: "Article 3 - Finalités des traitements",
      content: (
        <ul className="space-y-2">
          {[
            ["Gestion des demandes", "réponse aux formulaires de contact, demandes de devis, demandes d'assistance."],
            ["Gestion commerciale", "établissement des devis, facturation, suivi client, exécution des contrats."],
            ["Gestion des services", "support informatique, hébergement, maintenance, développement, SaaS, supervision."],
            ["Sécurité", "détection d'incidents, protection contre les accès frauduleux, prévention des cyberattaques."],
            ["Amélioration des services", "analyse statistique, optimisation de l'expérience utilisateur, amélioration des performances."],
            ["Communication", "informations commerciales, actualités, invitations professionnelles."],
          ].map(([label, desc], i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/70">
              <span className="text-secondary shrink-0 mt-0.5">-</span>
              <span><span className="text-white font-semibold">{label} :</span> {desc}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Article 4 - Bases légales",
      content: (
        <ul className="space-y-2">
          {[
            ["Exécution d'un contrat", "lorsque le traitement est nécessaire à l'exécution d'une prestation ou d'un contrat."],
            ["Obligations légales", "lorsque TRINEXTA doit respecter une obligation légale ou réglementaire."],
            ["Intérêt légitime", "pour assurer la sécurité, améliorer les services et gérer la relation client."],
            ["Consentement", "pour certaines opérations marketing ou l'utilisation de cookies non essentiels."],
          ].map(([label, desc], i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/70">
              <span className="text-secondary shrink-0 mt-0.5">-</span>
              <span><span className="text-white font-semibold">{label} :</span> {desc}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Article 5 - Destinataires des données",
      paragraphs: [
        "Les données peuvent être accessibles aux collaborateurs habilités de TRINEXTA, aux prestataires techniques, aux partenaires contractuels, aux fournisseurs cloud, ainsi qu'aux autorités administratives ou judiciaires lorsque la loi l'impose. TRINEXTA ne vend jamais les données personnelles à des tiers.",
      ],
    },
    {
      title: "Article 6 - Hébergement et sous-traitants",
      paragraphs: [
        "TRINEXTA peut faire appel à différents sous-traitants techniques, notamment pour l'hébergement web, l'hébergement cloud, les sauvegardes, la messagerie professionnelle, l'analyse d'audience et la sécurité informatique. Ces prestataires sont sélectionnés pour leurs garanties de sécurité et de conformité.",
      ],
    },
    {
      title: "Article 7 - Transferts hors Union Européenne",
      paragraphs: [
        "Certains services utilisés peuvent entraîner des transferts de données hors de l'Union Européenne. Lorsque cela est nécessaire, TRINEXTA veille à ce que ces transferts soient encadrés par les Clauses Contractuelles Types de la Commission Européenne, une décision d'adéquation ou tout autre mécanisme reconnu par le RGPD.",
      ],
    },
    {
      title: "Article 8 - Durée de conservation",
      content: (
        <ul className="space-y-2">
          {[
            ["Prospects", "3 ans à compter du dernier contact."],
            ["Clients", "pendant toute la relation contractuelle, puis archivage conformément aux obligations légales."],
            ["Facturation", "10 ans conformément aux obligations comptables et fiscales."],
            ["Données techniques", "12 mois maximum, sauf obligation légale contraire."],
            ["Cookies", "13 mois maximum."],
          ].map(([label, desc], i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/70">
              <span className="text-secondary shrink-0 mt-0.5">-</span>
              <span><span className="text-white font-semibold">{label} :</span> {desc}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Article 9 - Sécurité des données",
      paragraphs: [
        "TRINEXTA met en oeuvre des mesures techniques et organisationnelles adaptées : chiffrement des échanges, protocoles SSL/TLS, contrôle des accès, authentification, sauvegardes, supervision, journalisation et protection contre les intrusions. Malgré ces mesures, aucun système informatique ne peut garantir une sécurité absolue.",
      ],
    },
    {
      title: "Article 10 - Droits des personnes",
      content: (
        <ul className="space-y-2">
          {[
            ["Droit d'accès", "obtenir une copie de vos données."],
            ["Droit de rectification", "faire corriger des informations inexactes."],
            ["Droit à l'effacement", "demander la suppression de certaines données."],
            ["Droit à la limitation", "limiter temporairement certains traitements."],
            ["Droit d'opposition", "refuser certains traitements."],
            ["Droit à la portabilité", "recevoir vos données dans un format exploitable."],
            ["Droit de retrait du consentement", "à tout moment lorsque le traitement repose sur celui-ci."],
          ].map(([label, desc], i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/70">
              <span className="text-secondary shrink-0 mt-0.5">-</span>
              <span><span className="text-white font-semibold">{label} :</span> {desc}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Article 11 - Exercice des droits",
      paragraphs: [
        <span key="droits">Toute demande peut être adressée à TRINEXTA par e-mail à <a href="mailto:contact@trinexta.fr" className="text-secondary hover:underline transition-colors">contact@trinexta.fr</a>. Pour des raisons de sécurité, une preuve d&apos;identité pourra être demandée.</span>,
      ],
    },
    {
      title: "Article 12 - Réclamation auprès de la CNIL",
      paragraphs: [
        <span key="cnil">Si vous estimez que vos droits ne sont pas respectés, vous pouvez déposer une réclamation auprès de la Commission Nationale de l&apos;Informatique et des Libertés (CNIL) : 3 Place de Fontenoy, 75007 Paris — <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline transition-colors">www.cnil.fr</a></span>,
      ],
    },
    {
      title: "Article 13 - Données des clients hébergés",
      paragraphs: [
        "Lorsque TRINEXTA fournit des services d'hébergement, de cloud ou de SaaS, elle agit généralement en qualité de sous-traitant au sens du RGPD. Le client demeure responsable du traitement des données hébergées dans ses services. TRINEXTA met en oeuvre les mesures de sécurité nécessaires à la protection des infrastructures exploitées.",
      ],
    },
    {
      title: "Article 14 - Modification de la politique",
      paragraphs: [
        "TRINEXTA peut modifier la présente Politique de Confidentialité à tout moment afin de tenir compte des évolutions légales, réglementaires, techniques ou des nouveaux services proposés. Toute nouvelle version sera publiée sur le site.",
      ],
    },
    {
      title: "Article 15 - Contact",
      paragraphs: [
        "Téléphone : 09 78 25 07 46",
        <span key="email"><a href="mailto:contact@trinexta.fr" className="text-secondary hover:underline transition-colors">contact@trinexta.fr</a></span>,
      ],
    },
  ],
}

import React from "react"

export interface LegalHero {
  title: string
  imageSrc: string
}

export interface LegalSection {
  title: string
  paragraphs?: React.ReactNode[]
  content?: React.ReactNode
}

export interface LegalData {
  hero: LegalHero
  sections: LegalSection[]
}

export const mentionsLegalesData: LegalData = {
  hero: {
    title: "Mentions légales",
    imageSrc: "/images/legal/hero-mentions.jpg",
  },
  sections: [
    {
      title: "Éditeur du site",
      paragraphs: [
        "Le présent site internet, accessible à l'adresse https://www.trinexta.fr, est édité par TRUSTECH IT SUPPORT, société exploitant la marque commerciale TRINEXTA.",
        "Forme juridique : Société par Actions Simplifiée Unipersonnelle (SASU)",
        "Capital social : 15 000 € entièrement souscrit et libéré",
        "Siège social : 74 B Boulevard Henri Dunant, 91100 Corbeil-Essonnes, France",
        "Bureau d'activité : 7 rue Montespan, 91000 Évry-Courcouronnes, France",
        "SIREN : 942 020 082 — SIRET : 942 020 082 00015",
        "TVA intracommunautaire : FR81 942 020 082",
        "Immatriculation : Registre du Commerce et des Sociétés d'Évry",
        "Téléphone : 09 78 25 07 46",
        <span key="email">E-mail : <a href="mailto:contact@trinexta.fr" className="text-secondary hover:underline transition-colors">contact@trinexta.fr</a></span>,
        <span key="site">Site internet : <a href="https://www.trinexta.fr" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline transition-colors">https://www.trinexta.fr</a></span>,
        "TRINEXTA accompagne les entreprises, collectivités, associations et professionnels dans leur informatique au quotidien. La société intervient principalement en Île-de-France dans les domaines du support informatique, de l'infogérance, de la maintenance, de la cybersécurité, des infrastructures systèmes et réseaux, des solutions cloud, de Microsoft 365, du développement web, de l'hébergement web et applicatif, des solutions SaaS, du conseil numérique, ainsi que de l'accompagnement au référencement naturel (SEO) et à la visibilité sur les moteurs conversationnels (GEO).",
      ],
    },
    {
      title: "Directeur de la publication",
      paragraphs: [
        "Le directeur de la publication est le représentant légal de TRUSTECH IT SUPPORT en exercice.",
        <span key="contact-dir">Pour toute question relative au contenu du site : <a href="mailto:contact@trinexta.fr" className="text-secondary hover:underline transition-colors">contact@trinexta.fr</a></span>,
      ],
    },
    {
      title: "Hébergement",
      paragraphs: [
        "OVH SAS, société par actions simplifiée.",
        "Siège social : 2 rue Kellermann, 59100 Roubaix, France",
        "Immatriculée au RCS de Lille Métropole sous le numéro 424 761 419",
        "Téléphone : 1007",
        <span key="ovh">Site web : <a href="https://www.ovhcloud.com" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline transition-colors">https://www.ovhcloud.com</a></span>,
      ],
    },
    {
      title: "Objet du site",
      paragraphs: [
        "Le site a pour objet de présenter les activités, services, solutions et offres commercialisés par TRINEXTA. Les informations diffusées ont une vocation informative et commerciale et ne constituent pas une offre contractuelle au sens juridique du terme. Les prestations présentées peuvent évoluer à tout moment afin de tenir compte des évolutions technologiques, réglementaires ou commerciales.",
      ],
    },
    {
      title: "Activités proposées",
      content: (
        <ul className="space-y-2">
          {[
            "Support informatique à distance et sur site",
            "Maintenance informatique",
            "Infogérance",
            "Assistance utilisateurs",
            "Gestion de parc informatique",
            "Administration systèmes et réseaux",
            "Cybersécurité",
            "Audit et conseil informatique",
            "Transformation numérique",
            "Microsoft 365",
            "Solutions cloud",
            "Sauvegarde et continuité d'activité",
            "Création et refonte de sites internet",
            "Développement web sur mesure et applications métier",
            "Développement SaaS",
            "Hébergement web, applicatif et SaaS",
            "Vente de matériel informatique et de licences logicielles",
            "Délégation de personnel informatique et renfort technique",
            "Accompagnement au référencement naturel (SEO)",
            "Accompagnement à la visibilité sur les moteurs conversationnels (GEO)",
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
      title: "Disponibilité du site",
      paragraphs: [
        "TRINEXTA met en oeuvre tous les moyens raisonnables afin d'assurer l'accessibilité du site 24 heures sur 24 et 7 jours sur 7. L'accès peut toutefois être temporairement suspendu ou limité, notamment en cas d'opérations de maintenance, de mises à jour techniques, d'incidents techniques, d'opérations de sécurité, de force majeure ou d'événements indépendants de la volonté de TRINEXTA. Aucune indemnisation ne pourra être réclamée à ce titre.",
      ],
    },
    {
      title: "Propriété intellectuelle",
      paragraphs: [
        "L'ensemble des éléments présents sur le site constitue une oeuvre protégée par les dispositions du Code de la propriété intellectuelle. Sont notamment protégés la marque TRINEXTA, les logos, les éléments graphiques, les textes, les photographies, les illustrations, les vidéos, les documents, les bases de données, les développements informatiques, les codes sources, les interfaces utilisateurs ainsi que les contenus techniques et commerciaux.",
        "Toute reproduction, représentation, diffusion, adaptation, traduction, extraction ou réutilisation, totale ou partielle, sans autorisation écrite préalable de TRINEXTA est strictement interdite. Toute utilisation non autorisée pourra faire l'objet de poursuites civiles et pénales.",
      ],
    },
    {
      title: "Protection de la marque TRINEXTA",
      paragraphs: [
        "La marque TRINEXTA ainsi que ses signes distinctifs, logos, visuels, chartes graphiques, dénominations commerciales, noms de domaine et supports de communication bénéficient de la protection accordée par le droit français et européen de la propriété intellectuelle. Toute utilisation non autorisée est susceptible de constituer un acte de contrefaçon ou de concurrence déloyale.",
      ],
    },
    {
      title: "Responsabilité",
      paragraphs: [
        "TRINEXTA s'efforce de fournir des informations exactes, actualisées et pertinentes. Aucune garantie n'est toutefois donnée quant à l'exactitude, l'exhaustivité ou la mise à jour permanente des informations publiées.",
        "TRINEXTA ne pourra être tenue responsable des erreurs ou omissions, des interruptions du site, des dysfonctionnements techniques, des pertes de données, des cyberattaques, des dommages indirects, des pertes financières, des pertes d'exploitation, des pertes de clientèle, ni des conséquences résultant de l'utilisation des informations diffusées. L'utilisateur demeure seul responsable de l'usage qu'il fait des informations consultées.",
      ],
    },
    {
      title: "Référencement naturel (SEO) et visibilité numérique (GEO)",
      paragraphs: [
        "TRINEXTA peut proposer des prestations d'accompagnement au référencement naturel (SEO) et à l'optimisation de la visibilité sur les moteurs de recherche et les moteurs conversationnels utilisant l'intelligence artificielle.",
        "Compte tenu de la nature évolutive des algorithmes de Google, Bing, ChatGPT, Gemini, Claude, Perplexity, Copilot ou de tout autre moteur ou système tiers, TRINEXTA ne garantit aucun positionnement, classement, trafic, génération de prospects ou résultat commercial spécifique. Les prestations de référencement constituent une obligation de moyens et non une obligation de résultat.",
      ],
    },
    {
      title: "Liens hypertextes",
      paragraphs: [
        "Le site peut contenir des liens vers des sites internet tiers. TRINEXTA ne dispose d'aucun contrôle sur ces ressources externes et décline toute responsabilité concernant leur contenu, leur disponibilité ou leur politique de traitement des données.",
      ],
    },
    {
      title: "Protection des données personnelles",
      paragraphs: [
        <span key="rgpd">TRINEXTA s&apos;engage à respecter la réglementation applicable en matière de protection des données personnelles, notamment le Règlement Général sur la Protection des Données (RGPD) et la Loi Informatique et Libertés. Les modalités de collecte, d&apos;utilisation, de conservation et de protection des données personnelles sont détaillées dans la <a href="/confidentialite" className="text-secondary hover:underline transition-colors">Politique de Confidentialité</a> du site.</span>,
      ],
    },
    {
      title: "Cookies",
      paragraphs: [
        <span key="cookies">Le site utilise des cookies et technologies similaires afin d&apos;améliorer l&apos;expérience utilisateur, de mesurer l&apos;audience et d&apos;assurer certaines fonctionnalités. Les modalités de gestion des cookies sont détaillées dans la <a href="/cookies" className="text-secondary hover:underline transition-colors">Politique de Cookies</a>.</span>,
      ],
    },
    {
      title: "Sécurité",
      paragraphs: [
        "TRINEXTA met en oeuvre des mesures techniques et organisationnelles destinées à assurer la sécurité du site et des données traitées. Malgré ces précautions, aucun système informatique ne peut garantir une sécurité absolue. L'utilisateur reconnaît utiliser le site à ses propres risques.",
      ],
    },
    {
      title: "Droit applicable et juridiction compétente",
      paragraphs: [
        "Les présentes mentions légales sont soumises au droit français. Tout litige relatif à l'utilisation du site, à son contenu ou à son fonctionnement relèvera de la compétence exclusive des juridictions françaises territorialement compétentes, sauf disposition légale impérative contraire.",
      ],
    },
    {
      title: "Contact",
      paragraphs: [
        "TRINEXTA BY TRUSTECH IT SUPPORT",
        "74 B Boulevard Henri Dunant, 91100 Corbeil-Essonnes",
        "Téléphone : 09 78 25 07 46",
        <span key="email-c"><a href="mailto:contact@trinexta.fr" className="text-secondary hover:underline transition-colors">contact@trinexta.fr</a></span>,
      ],
    },
  ],
}

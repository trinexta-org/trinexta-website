import React from "react"
import type { LegalData } from "./mentions-legales"

export const cgvData: LegalData = {
  hero: {
    title: "Conditions Générales de Vente",
    imageSrc: "/images/legal/hero-utilisation.jpg",
  },
  sections: [
    {
      title: "Préambule",
      paragraphs: [
        "Les présentes CGV régissent l'ensemble des prestations informatiques commercialisées par TRINEXTA. Toute commande implique l'acceptation intégrale des présentes CGV.",
      ],
    },
    {
      title: "Article 1 - Identification du prestataire",
      paragraphs: [
        "TRUSTECH IT SUPPORT, exploitant la marque commerciale TRINEXTA.",
        "SASU au capital social de 15 000 €",
        "Immatriculée au Registre du Commerce et des Sociétés d'Évry sous le numéro 942 020 082",
        "Siège social : 74 B Boulevard Henri Dunant, 91100 Corbeil-Essonnes",
        "Téléphone : 09 78 25 07 46",
        <span key="email"><a href="mailto:contact@trinexta.fr" className="text-secondary hover:underline transition-colors">contact@trinexta.fr</a></span>,
        <span key="site"><a href="https://www.trinexta.fr" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline transition-colors">https://www.trinexta.fr</a></span>,
      ],
    },
    {
      title: "Article 2 - Champ d'application",
      paragraphs: [
        "Les présentes CGV s'appliquent à l'ensemble des prestations commercialisées par TRINEXTA auprès des professionnels et des particuliers, notamment : support informatique et assistance utilisateurs, infogérance, maintenance informatique, administration systèmes et réseaux, cybersécurité, services Microsoft 365 et services cloud, création et maintenance de sites internet, développement web et applications métier, hébergement web, applicatif et SaaS, référencement naturel (SEO) et référencement conversationnel (GEO), vente de matériel informatique et de licences logicielles, délégation de personnel informatique.",
      ],
    },
    {
      title: "Article 3 - Formation du contrat",
      paragraphs: [
        "Le contrat est réputé conclu dès la signature du devis ou du contrat, l'acceptation électronique, le versement d'un acompte ou le commencement d'exécution de la prestation. Les devis sont valables trente (30) jours à compter de leur date d'émission.",
      ],
    },
    {
      title: "Article 4 - Obligation de moyens",
      paragraphs: [
        "TRINEXTA est tenue à une obligation de moyens. TRINEXTA s'engage à mettre en oeuvre l'ensemble des compétences, ressources humaines, techniques et organisationnelles nécessaires à la bonne exécution des prestations.",
        "TRINEXTA ne garantit jamais un résultat commercial, une augmentation du chiffre d'affaires, un classement Google, un volume de visiteurs, une disponibilité absolue ni l'absence totale d'incident.",
      ],
    },
    {
      title: "Article 5 - Tarifs",
      paragraphs: [
        "Les prix sont exprimés en euros hors taxes. La TVA applicable est celle en vigueur au jour de la facturation. Les tarifs peuvent être forfaitaires, mensuels, annuels, journaliers, horaires, par utilisateur ou par équipement. Les frais de déplacement, d'hébergement ou de restauration peuvent être facturés en supplément.",
      ],
    },
    {
      title: "Article 6 - Conditions de paiement",
      paragraphs: [
        "Sauf convention particulière, le paiement intervient à 30 jours date de facture, par virement bancaire, prélèvement SEPA ou carte bancaire lorsque ce moyen est disponible. TRINEXTA se réserve le droit de demander un acompte avant tout démarrage de prestation.",
      ],
    },
    {
      title: "Article 7 - Retard de paiement",
      paragraphs: [
        "Tout retard de paiement entraîne automatiquement des pénalités de retard calculées selon la réglementation en vigueur, une indemnité forfaitaire de recouvrement de 40 €, la suspension des prestations et l'exigibilité immédiate des sommes restant dues.",
      ],
    },
    {
      title: "Article 8 - Support informatique",
      paragraphs: [
        "Les prestations de support peuvent être réalisées à distance, sur site, par téléphone, par e-mail ou via un portail de tickets. TRINEXTA s'engage à intervenir dans les meilleurs délais selon les niveaux de service convenus contractuellement. Les délais indiqués sont des objectifs de service et non des engagements de résultat, sauf mention expresse.",
      ],
    },
    {
      title: "Article 9 - Infogérance",
      paragraphs: [
        "Les prestations d'infogérance peuvent inclure la supervision, la maintenance préventive et corrective, l'administration des serveurs, l'administration Microsoft 365, la gestion des sauvegardes et la gestion du parc informatique. Le Client demeure propriétaire de ses équipements et responsable des décisions stratégiques concernant son système d'information.",
      ],
    },
    {
      title: "Article 10 - Création de sites internet",
      paragraphs: [
        "TRINEXTA réalise des prestations de conception, de développement, d'intégration, de personnalisation, de migration et de refonte. Le Client est responsable des contenus transmis (images, textes) et du respect des droits d'auteur. La validation du site par le Client vaut acceptation définitive de la prestation.",
      ],
    },
    {
      title: "Article 11 - Hébergement web et applicatif",
      paragraphs: [
        "TRINEXTA peut fournir des services d'hébergement. Le Client reconnaît qu'aucun service ne peut garantir une disponibilité de 100 %, que des opérations de maintenance peuvent être nécessaires et que des interruptions exceptionnelles peuvent survenir. TRINEXTA met en oeuvre les moyens raisonnables pour assurer la continuité des services.",
      ],
    },
    {
      title: "Article 12 - Applications SaaS",
      paragraphs: [
        "Les applications SaaS fournies par TRINEXTA sont mises à disposition sous forme de licence d'utilisation. Le Client bénéficie uniquement d'un droit d'utilisation ; aucun droit de propriété intellectuelle n'est transféré. Il est notamment interdit de copier l'application, de la revendre, de la décompiler ou de reproduire son fonctionnement.",
      ],
    },
    {
      title: "Article 13 - Référencement SEO et GEO",
      paragraphs: [
        "Les prestations de référencement naturel (SEO) et de référencement conversationnel (GEO) constituent exclusivement une obligation de moyens.",
        "TRINEXTA ne garantit jamais une position précise dans Google, une visibilité particulière dans ChatGPT, Gemini, Claude, Perplexity ou Copilot, un trafic minimum, un nombre de prospects ni un chiffre d'affaires. Les moteurs de recherche et systèmes d'intelligence artificielle étant indépendants de TRINEXTA, leurs algorithmes peuvent évoluer à tout moment.",
      ],
    },
    {
      title: "Article 14 - Vente de matériel et logiciels",
      paragraphs: [
        "Les produits vendus restent la propriété de TRINEXTA jusqu'au paiement intégral. Les garanties applicables sont celles fournies par les constructeurs ou éditeurs. TRINEXTA agit en qualité de revendeur ou d'intégrateur.",
      ],
    },
    {
      title: "Article 15 - Délégation de personnel",
      paragraphs: [
        "TRINEXTA peut mettre à disposition des ressources techniques qualifiées. Les collaborateurs demeurent sous l'autorité hiérarchique de TRINEXTA. Toute embauche directe ou indirecte d'un collaborateur présenté par TRINEXTA est interdite pendant la durée de la mission et pendant vingt-quatre (24) mois suivant son terme, sauf accord écrit préalable.",
      ],
    },
    {
      title: "Article 16 - Confidentialité",
      paragraphs: [
        "Les parties s'engagent à conserver strictement confidentielles les informations échangées dans le cadre de leurs relations commerciales. Cette obligation demeure applicable pendant cinq (5) ans après la fin du contrat.",
      ],
    },
    {
      title: "Article 17 - Protection des données",
      paragraphs: [
        "TRINEXTA s'engage à respecter la réglementation applicable en matière de protection des données personnelles. Le Client demeure responsable des données qu'il collecte et traite dans le cadre de ses activités.",
      ],
    },
    {
      title: "Article 18 - Limitation de responsabilité",
      paragraphs: [
        "La responsabilité totale de TRINEXTA est strictement limitée au montant effectivement payé par le Client au cours des douze (12) derniers mois précédant le fait générateur du dommage.",
        "TRINEXTA ne pourra être tenue responsable des pertes d'exploitation, des pertes de chiffre d'affaires, des pertes de données, des pertes de clientèle, des dommages indirects, des cyberattaques externes ni des défaillances de fournisseurs tiers.",
      ],
    },
    {
      title: "Article 19 - Force majeure",
      paragraphs: [
        "Aucune partie ne pourra être tenue responsable d'un manquement résultant d'un événement de force majeure tel que défini par le droit français.",
      ],
    },
    {
      title: "Article 20 - Résiliation",
      paragraphs: [
        "Chaque partie pourra résilier le contrat en cas de manquement grave non corrigé dans un délai de trente (30) jours suivant mise en demeure. Les prestations déjà réalisées demeurent dues.",
      ],
    },
    {
      title: "Article 21 - Droit applicable et juridiction",
      paragraphs: [
        "Les présentes CGV sont soumises au droit français. Tout litige sera soumis à la compétence exclusive des tribunaux du ressort de la Cour d'Appel de Paris, sauf disposition légale impérative contraire.",
      ],
    },
    {
      title: "Article 22 - Contact",
      paragraphs: [
        "Téléphone : 09 78 25 07 46",
        <span key="email"><a href="mailto:contact@trinexta.fr" className="text-secondary hover:underline transition-colors">contact@trinexta.fr</a></span>,
      ],
    },
    {
      title: "Conditions Générales d'Utilisation (CGU)",
      paragraphs: [
        "Les présentes CGU définissent les modalités d'accès et d'utilisation du site trinexta.fr ainsi que de l'ensemble des services numériques proposés par TRINEXTA. Toute navigation sur le site implique l'acceptation pleine et entière des présentes CGU.",
      ],
    },
    {
      title: "CGU — Article 1 - Identification de l'éditeur",
      paragraphs: [
        "TRUSTECH IT SUPPORT, exploitant la marque commerciale TRINEXTA.",
        "SASU au capital de 15 000 €",
        "SIREN : 942 020 082",
        "Siège social : 74 B Boulevard Henri Dunant, 91100 Corbeil-Essonnes",
        "Téléphone : 09 78 25 07 46",
        <span key="email"><a href="mailto:contact@trinexta.fr" className="text-secondary hover:underline transition-colors">contact@trinexta.fr</a></span>,
      ],
    },
    {
      title: "CGU — Article 2 - Objet du site",
      paragraphs: [
        "Le site a pour objet de présenter les activités de TRINEXTA, de permettre la prise de contact, de présenter les offres commerciales, de permettre l'accès aux espaces clients, de permettre l'accès aux plateformes hébergées, de permettre l'accès aux applications SaaS éditées ou exploitées par TRINEXTA, et de diffuser des contenus techniques, commerciaux ou informatifs.",
      ],
    },
    {
      title: "CGU — Article 3 - Accès au site",
      paragraphs: [
        "L'accès au site est libre et gratuit pour tout utilisateur disposant d'un accès Internet. Les frais de connexion, d'équipement informatique ou de télécommunication demeurent à la charge exclusive de l'utilisateur. TRINEXTA se réserve le droit de suspendre ou de limiter l'accès à tout ou partie du site à tout moment pour des raisons techniques, sécuritaires ou de maintenance.",
      ],
    },
    {
      title: "CGU — Article 4 - Comptes utilisateurs",
      paragraphs: [
        "Certains services peuvent nécessiter la création d'un compte utilisateur. L'utilisateur s'engage à fournir des informations exactes, à les maintenir à jour, à préserver la confidentialité de ses identifiants et à signaler toute utilisation frauduleuse.",
        "L'utilisateur demeure responsable de toute activité réalisée depuis son compte. TRINEXTA se réserve le droit de suspendre ou de supprimer tout compte en cas de non-respect des présentes CGU.",
      ],
    },
    {
      title: "CGU — Article 5 - Espaces clients et applications SaaS",
      paragraphs: [
        "TRINEXTA peut proposer des espaces sécurisés permettant la gestion des prestations, l'accès aux contrats, la consultation de documents, l'utilisation d'applications métier et l'accès à des services SaaS.",
        "Les utilisateurs s'interdisent toute tentative d'accès non autorisé, toute extraction massive de données, toute reproduction du logiciel, toute décompilation et tout détournement d'usage. Les droits accordés sont strictement limités à l'utilisation normale du service.",
      ],
    },
    {
      title: "CGU — Article 6 - Hébergement et services numériques",
      paragraphs: [
        "TRINEXTA peut fournir des prestations d'hébergement web, d'hébergement applicatif, d'hébergement SaaS, d'hébergement de bases de données et de services cloud.",
        "L'utilisateur s'engage à ne pas utiliser les infrastructures pour des activités illégales, du spam, du phishing, la diffusion de logiciels malveillants ou des contenus portant atteinte aux droits de tiers. TRINEXTA pourra suspendre immédiatement tout service utilisé à des fins illicites.",
      ],
    },
    {
      title: "CGU — Article 7 - Propriété intellectuelle",
      paragraphs: [
        "L'ensemble des éléments du site est protégé par les lois françaises et internationales relatives à la propriété intellectuelle. Sont notamment protégés la marque TRINEXTA, les logos, les contenus, les logiciels, les bases de données, les développements spécifiques et les interfaces utilisateurs.",
        "Toute reproduction ou exploitation sans autorisation écrite préalable est interdite.",
      ],
    },
    {
      title: "CGU — Article 8 - Responsabilité",
      paragraphs: [
        "TRINEXTA ne pourra être tenue responsable des interruptions de service, des pertes de données, des dommages indirects, des pertes d'exploitation, des pertes financières, des cyberattaques, des défaillances de fournisseurs tiers ni des problèmes liés au réseau Internet. L'utilisateur demeure seul responsable de l'utilisation qu'il fait des services.",
      ],
    },
    {
      title: "CGU — Article 9 - Données personnelles",
      paragraphs: [
        <span key="dp">Les traitements de données personnelles sont réalisés conformément au RGPD, à la Loi Informatique et Libertés et à la <a href="/confidentialite" className="text-secondary hover:underline transition-colors">Politique de Confidentialité</a> publiée sur le site.</span>,
      ],
    },
    {
      title: "CGU — Article 10 - Modification des CGU",
      paragraphs: [
        "TRINEXTA se réserve le droit de modifier les présentes CGU à tout moment. Les nouvelles versions deviennent applicables dès leur publication sur le site.",
      ],
    },
    {
      title: "CGU — Article 11 - Droit applicable",
      paragraphs: [
        "Les présentes CGU sont soumises au droit français. Tout litige relatif à leur interprétation ou à leur exécution relèvera des juridictions compétentes du ressort du siège social de TRINEXTA, sauf disposition légale impérative contraire.",
      ],
    },
  ],
}

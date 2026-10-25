import React from "react"
import type { LegalData } from "./mentions-legales"

/** Finalités, bases légales et durées (article 3). */
const TRAITEMENTS: { finalite: string; base: string; duree: string }[] = [
  {
    finalite: "Réponse aux demandes de contact et de devis, suivi de la demande dans notre outil de relation client",
    base: "Mesures précontractuelles prises à votre demande",
    duree: "3 ans après le dernier contact",
  },
  {
    finalite: "Newsletter",
    base: "Consentement",
    duree: "Jusqu'à la désinscription",
  },
  {
    finalite: "Prospection commerciale auprès des professionnels",
    base: "Intérêt légitime",
    duree: "3 ans après le dernier contact",
  },
  {
    finalite: "Exécution des contrats et suivi des clients",
    base: "Exécution du contrat",
    duree: "Durée de la relation contractuelle, puis archivage légal",
  },
  {
    finalite: "Facturation et comptabilité",
    base: "Obligation légale",
    duree: "10 ans",
  },
  {
    finalite: "Simulateur d'estimation anonyme (statistiques et amélioration du service)",
    base: "Intérêt légitime",
    duree: "12 mois, puis suppression automatique",
  },
  {
    finalite: "Envoi de l'estimation par e-mail et recontact à son sujet",
    base: "Consentement",
    duree: "3 ans après le dernier contact",
  },
  {
    finalite: "Sécurité du site et prévention des abus",
    base: "Intérêt légitime",
    duree: "12 mois maximum",
  },
  {
    finalite: "Mesure d'audience (Google Analytics)",
    base: "Consentement",
    duree: "Cookies : 13 mois au plus",
  },
  {
    finalite: "Mesure des campagnes publicitaires (Google Ads)",
    base: "Consentement",
    duree: "Cookies : 13 mois au plus",
  },
]

/** Sous-traitants intervenant sur les données du site (article 5). */
const SOUS_TRAITANTS: { nom: string; role: string; pays: string }[] = [
  { nom: "OVH", role: "Hébergement du site et des bases de données", pays: "France" },
  { nom: "Microsoft (Microsoft 365)", role: "Envoi des e-mails et messagerie", pays: "Union européenne" },
  { nom: "Sanity", role: "Contenus et images du blog", pays: "Norvège et États-Unis" },
  { nom: "Google", role: "Mesure d'audience et publicité, uniquement avec votre accord", pays: "Irlande et États-Unis" },
  { nom: "Anthropic", role: "Analyse par intelligence artificielle de la description saisie dans le simulateur d'estimation", pays: "États-Unis" },
  { nom: "Vercel et Render", role: "Hébergement de l'application LeadSynch, notre outil de gestion de la relation client", pays: "États-Unis" },
  { nom: "jsDelivr", role: "Diffusion du script du bandeau cookies", pays: "Réseau mondial de serveurs" },
]

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
        <span key="email"><a href="mailto:contact@trinexta.fr" className="text-secondary-strong hover:underline transition-colors">contact@trinexta.fr</a></span>,
        "Téléphone : 09 78 25 07 46",
      ],
    },
    {
      title: "Article 2 - Données collectées",
      content: (
        <div className="space-y-4 text-sm text-primary/70">
          <p>Selon les services utilisés, TRINEXTA peut collecter les catégories de données suivantes :</p>
          {[
            { cat: "Données d'identification", items: ["Nom, prénom, fonction", "Société, numéro SIRET, numéro de TVA intracommunautaire"] },
            { cat: "Données de contact", items: ["Adresse e-mail, numéro de téléphone, adresse postale"] },
            { cat: "Données contractuelles", items: ["Contrats, devis, factures, bons d'intervention, historique des prestations"] },
            { cat: "Données techniques", items: ["Adresse IP, journaux de connexion, type de navigateur, système d'exploitation, données de sécurité"] },
            { cat: "Données de navigation", items: ["Pages consultées, durée de visite, sources de trafic, interactions avec le site"] },
          ].map(({ cat, items }) => (
            <div key={cat}>
              <p className="text-primary font-semibold text-xs uppercase tracking-wider mb-1">{cat}</p>
              <ul className="space-y-1">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-secondary-strong shrink-0">-</span>
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
      title: "Article 3 - Finalités, bases légales et durées de conservation",
      content: (
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Tableau : Finalités, bases légales et durées de conservation">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm text-primary/80">
            <thead>
              <tr className="border-b border-primary text-xs uppercase tracking-wider text-primary">
                <th scope="col" className="py-2 pr-4">Finalité</th>
                <th scope="col" className="py-2 pr-4">Base légale</th>
                <th scope="col" className="py-2">Durée de conservation</th>
              </tr>
            </thead>
            <tbody>
              {TRAITEMENTS.map((t) => (
                <tr key={t.finalite} className="border-b border-primary/15 align-top">
                  <td className="py-2 pr-4 font-bold text-primary">{t.finalite}</td>
                  <td className="py-2 pr-4">{t.base}</td>
                  <td className="py-2">{t.duree}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
    {
      title: "Article 4 - Destinataires des données",
      paragraphs: [
        "Les données sont accessibles aux collaborateurs habilités de TRINEXTA et aux sous-traitants listés à l'article 5, chacun pour ce qui le concerne, ainsi qu'aux autorités administratives ou judiciaires lorsque la loi l'impose.",
        "Les informations saisies dans les formulaires du site et dans le chat sont transmises à LeadSynch, notre outil de gestion de la relation client, pour le suivi de votre demande (voir l'article 16).",
        "Google reçoit des données uniquement si vous l'acceptez dans le bandeau cookies, pour la mesure d'audience (article 14) et la mesure des campagnes publicitaires (article 15). TRINEXTA ne vend jamais les données personnelles à des tiers.",
      ],
    },
    {
      title: "Article 5 - Sous-traitants",
      content: (
        <div className="space-y-3">
          <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Tableau : Sous-traitants">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm text-primary/80">
              <thead>
                <tr className="border-b border-primary text-xs uppercase tracking-wider text-primary">
                  <th scope="col" className="py-2 pr-4">Prestataire</th>
                  <th scope="col" className="py-2 pr-4">Rôle</th>
                  <th scope="col" className="py-2">Pays</th>
                </tr>
              </thead>
              <tbody>
                {SOUS_TRAITANTS.map((t) => (
                  <tr key={t.nom} className="border-b border-primary/15 align-top">
                    <td className="py-2 pr-4 font-bold text-primary">{t.nom}</td>
                    <td className="py-2 pr-4">{t.role}</td>
                    <td className="py-2">{t.pays}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-primary/70">Chaque prestataire n&apos;accède qu&apos;aux données nécessaires à sa mission.</p>
        </div>
      ),
    },
    {
      title: "Article 6 - Transferts hors Union Européenne",
      paragraphs: [
        "Certains sous-traitants listés à l'article 5 sont établis aux États-Unis ou y traitent des données : Google (mesure d'audience et publicité, uniquement avec votre accord), Anthropic (analyse de la description saisie dans le simulateur d'estimation), Sanity (contenus et images du blog), Vercel et Render (hébergement de l'application LeadSynch).",
        "Ces transferts sont encadrés par les clauses contractuelles types de la Commission européenne ou par le cadre de protection des données UE - États-Unis (Data Privacy Framework), selon le prestataire. Pour LeadSynch, les clauses contractuelles types sont celles prévues par les accords de traitement des données de Vercel Inc. et de Render Services Inc. ; la base de données de LeadSynch est hébergée sur notre serveur OVH en France.",
      ],
    },
    {
      title: "Article 7 - Durée de conservation",
      content: (
        <div className="space-y-3">
          <p className="text-sm text-primary/70">Le détail par finalité figure à l&apos;article 3. Règles générales :</p>
          <ul className="space-y-2">
            {[
              ["Prospects", "3 ans à compter du dernier contact."],
              ["Clients", "pendant toute la relation contractuelle, puis archivage conformément aux obligations légales."],
              ["Facturation", "10 ans conformément aux obligations comptables et fiscales."],
              ["Données techniques", "12 mois maximum, sauf obligation légale contraire."],
              ["Estimations en ligne anonymes", "12 mois maximum, puis suppression automatique."],
              ["Cookies", "13 mois maximum ; votre choix sur les cookies est conservé 6 mois."],
            ].map(([label, desc], i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-primary/70">
                <span className="text-secondary-strong shrink-0 mt-0.5">-</span>
                <span><span className="text-primary font-semibold">{label} :</span> {desc}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      title: "Article 8 - Sécurité des données",
      paragraphs: [
        "TRINEXTA met en oeuvre des mesures techniques et organisationnelles adaptées : chiffrement des échanges, protocoles SSL/TLS, contrôle des accès, authentification, sauvegardes, supervision, journalisation et protection contre les intrusions. Malgré ces mesures, aucun système informatique n'offre une sécurité absolue.",
      ],
    },
    {
      title: "Article 9 - Droits des personnes",
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
            <li key={i} className="flex items-start gap-2 text-sm text-primary/70">
              <span className="text-secondary-strong shrink-0 mt-0.5">-</span>
              <span><span className="text-primary font-semibold">{label} :</span> {desc}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Article 10 - Exercice des droits",
      paragraphs: [
        <span key="droits">Toute demande peut être adressée à TRINEXTA par e-mail à <a href="mailto:contact@trinexta.fr" className="text-secondary-strong hover:underline transition-colors">contact@trinexta.fr</a>. Pour des raisons de sécurité, une preuve d&apos;identité pourra être demandée.</span>,
      ],
    },
    {
      title: "Article 11 - Réclamation auprès de la CNIL",
      paragraphs: [
        <span key="cnil">Si vous estimez que vos droits ne sont pas respectés, vous pouvez déposer une réclamation auprès de la Commission Nationale de l&apos;Informatique et des Libertés (CNIL) : 3 Place de Fontenoy, 75007 Paris - <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-secondary-strong hover:underline transition-colors">www.cnil.fr</a></span>,
      ],
    },
    {
      title: "Article 12 - Données des clients hébergés",
      paragraphs: [
        "Lorsque TRINEXTA fournit des services d'hébergement, de cloud ou de SaaS, elle agit généralement en qualité de sous-traitant au sens du RGPD. Le client demeure responsable du traitement des données hébergées dans ses services. TRINEXTA met en oeuvre les mesures de sécurité nécessaires à la protection des infrastructures exploitées.",
      ],
    },
    {
      title: "Article 13 - Simulateur d'estimation en ligne",
      paragraphs: [
        "Le site propose un simulateur d'estimation de prix accessible sur la page /estimation. Le parcours est anonyme par défaut : les réponses au questionnaire et un identifiant de session technique sont enregistrés à des fins statistiques et d'amélioration du service, sans aucune donnée identifiante. L'adresse IP n'est jamais conservée : elle est uniquement transformée de façon irréversible, en mémoire et temporairement, pour prévenir les abus.",
        "La description libre éventuellement saisie est analysée automatiquement par Anthropic, notre prestataire d'intelligence artificielle (États-Unis), dans le seul but d'affiner l'estimation. Elle n'est pas conservée : nous vous invitons à ne pas y renseigner de données personnelles.",
        "Si vous demandez l'envoi du détail par email, votre adresse est enregistrée avec votre consentement horodaté (base légale : consentement), aux fins d'envoi de l'estimation et de recontact commercial à son sujet. Vous pouvez retirer ce consentement à tout moment. Les estimations anonymes sont automatiquement supprimées après 12 mois ; les estimations associées à un email suivent la durée de conservation applicable aux prospects.",
      ],
    },
    {
      title: "Article 14 - Mesure d'audience",
      paragraphs: [
        "Avec votre accord (service « Google Analytics » du bandeau cookies), le site utilise Google Analytics 4, fourni par Google Ireland Ltd, pour savoir quelles pages sont consultées et comment le site est parcouru. Les données sont statistiques : pages vues, durée, source de la visite, type d'appareil. Google Analytics 4 ne conserve pas votre adresse IP. Les signaux Google et la personnalisation publicitaire sont désactivés.",
        "Ce traitement repose sur votre consentement. Les cookies Google Analytics durent 13 mois au plus. Les données peuvent être transférées à Google LLC aux États-Unis, transfert encadré par le cadre de protection des données UE - États-Unis (Data Privacy Framework).",
        <span key="audience-optout">Vous pouvez retirer votre accord à tout moment depuis l&apos;icône de gestion des cookies ou depuis notre <a href="/cookies" className="text-secondary-strong hover:underline transition-colors">Politique de cookies</a>.</span>,
      ],
    },
    {
      title: "Article 15 - Mesure des campagnes publicitaires",
      paragraphs: [
        "TRINEXTA diffuse des campagnes publicitaires via Google Ads. Pour savoir quelles annonces génèrent réellement des demandes, un identifiant de clic publicitaire fourni par Google est associé, si vous y avez consenti, à la validation d'un de nos formulaires. Ce traitement repose exclusivement sur votre consentement, recueilli via le bandeau de gestion des cookies, et peut être retiré à tout moment sans affecter la licéité du traitement déjà effectué.",
        "Tant que vous n'avez pas fait de choix, et si vous refusez, aucune balise Google n'est chargée : aucun cookie publicitaire n'est déposé, aucun identifiant de clic n'est associé à votre demande et aucune information n'est transmise à Google. Ce fonctionnement, appelé mode consentement de base, est décrit dans notre Politique de Cookies.",
        "Si la fonctionnalité de conversions améliorées est activée, votre adresse email et, le cas échéant, votre numéro de téléphone sont transformés dans votre navigateur en une empreinte irréversible (algorithme SHA-256) avant d'être transmis à Google. Google ne reçoit jamais ces informations en clair et TRINEXTA ne lui transmet ni votre nom, ni votre message, ni le contenu de votre demande. Cette empreinte sert uniquement à rattacher une demande à une annonce lorsqu'un même internaute a utilisé plusieurs appareils. Elle n'est jamais utilisée par TRINEXTA à des fins de profilage individuel.",
        <span key="ads-optout">Vous pouvez à tout moment modifier vos choix via le bandeau de gestion des cookies, consulter notre <a href="/cookies" className="text-secondary-strong hover:underline transition-colors">Politique de Cookies</a>, ou paramétrer la personnalisation publicitaire directement depuis votre compte Google.</span>,
      ],
    },
    {
      title: "Article 16 - Formulaires, chat et outil de gestion de la relation client",
      paragraphs: [
        "Les informations saisies dans les formulaires du site (contact, devis, estimation, newsletter) et les messages échangés dans le chat sont enregistrés dans LeadSynch, notre outil de gestion de la relation client, pour suivre votre demande et vous recontacter à son sujet. Sont concernés, selon le formulaire : nom, prénom, entreprise, adresse e-mail, numéro de téléphone et message.",
        "L'application LeadSynch est hébergée par Vercel Inc. et Render Services Inc. (États-Unis) ; sa base de données est hébergée sur notre serveur OVH en France. Le transfert hors Union européenne est encadré par les clauses contractuelles types de la Commission européenne prévues par les accords de traitement des données de ces hébergeurs.",
        "Ces données sont conservées 3 ans après le dernier contact. Le chat utilise un stockage de session du navigateur, effacé à la fermeture de l'onglet, décrit dans notre Politique de cookies.",
      ],
    },
    {
      title: "Article 17 - Modification de la politique",
      paragraphs: [
        "TRINEXTA peut modifier la présente Politique de Confidentialité à tout moment afin de tenir compte des évolutions légales, réglementaires, techniques ou des nouveaux services proposés. Toute nouvelle version sera publiée sur le site.",
      ],
    },
    {
      title: "Article 18 - Contact",
      paragraphs: [
        "Téléphone : 09 78 25 07 46",
        <span key="email"><a href="mailto:contact@trinexta.fr" className="text-secondary-strong hover:underline transition-colors">contact@trinexta.fr</a></span>,
      ],
    },
  ],
}

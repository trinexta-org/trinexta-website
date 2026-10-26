// Diagnostic sécurité gratuit (/diagnostic-securite) : textes, statuts et limites.
// Source unique pour la page, l'API et l'e-mail de rapport.

export const STATUTS = ["a-corriger", "a-surveiller", "indetermine", "conforme"] as const
export type StatutDiagnostic = (typeof STATUTS)[number]

/** Libellés affichés, dans l'ordre de tri des résultats (le plus urgent d'abord). */
export const LIBELLES_STATUT: Record<StatutDiagnostic, string> = {
  "a-corriger": "À corriger",
  "a-surveiller": "À surveiller",
  indetermine: "Non vérifiable",
  conforme: "Conforme",
}

export const VERIFICATIONS = [
  {
    id: "connexion",
    titre: "Connexion sécurisée et certificat",
    resume:
      "Le site répond en HTTPS, l'adresse en http:// renvoie vers https://, et le certificat est valide et loin de son expiration.",
  },
  {
    id: "messagerie",
    titre: "Messagerie : protection contre l'usurpation",
    resume:
      "Les enregistrements SPF, DKIM et DMARC de votre domaine, qui empêchent un tiers d'envoyer des e-mails en votre nom.",
  },
  {
    id: "entetes",
    titre: "En-têtes de sécurité",
    resume:
      "Les six protections que le serveur peut demander au navigateur : politique de contenu, HTTPS obligatoire, anti-intégration, types de fichiers, référent, fonctions du navigateur.",
  },
  {
    id: "traceurs",
    titre: "Cookies et traceurs",
    resume:
      "Les outils de mesure et de publicité présents dans la page d'accueil, et la présence d'un outil de recueil du consentement.",
  },
  {
    id: "fichiers",
    titre: "Fichiers sensibles exposés",
    resume:
      "La présence de quelques fichiers sensibles connus, sans en lire le contenu : historique de code, configuration, sauvegardes.",
  },
  {
    id: "versions",
    titre: "Logiciels et versions affichées",
    resume:
      "Les noms et numéros de version que le serveur ou le site affichent, et que les robots d'attaque recherchent.",
  },
] as const

export type IdVerification = (typeof VERIFICATIONS)[number]["id"]

export const TITRES_VERIFICATION = Object.fromEntries(
  VERIFICATIONS.map((v) => [v.id, v.titre])
) as Record<IdVerification, string>

/** Lien vers l'outil (menu Ressources, pied de page, plan du site, llms.txt, page /cybersecurite). */
export const DIAGNOSTIC_LIEN = {
  name: "Diagnostic sécurité gratuit",
  href: "/diagnostic-securite",
  desc: "Analyse non intrusive d'un site : HTTPS, messagerie (SPF, DKIM, DMARC), en-têtes, cookies, fichiers exposés, versions affichées",
} as const

/** Limites d'usage (affichées sur la page et appliquées par l'API). */
export const DIAGNOSTIC_LIMITES = {
  /** Analyses par visiteur (IP) et par 24 h. */
  parIp: 3,
  /** Analyses d'un même domaine, tous visiteurs confondus, par 24 h. */
  parDomaine: 10,
  /** Demandes de rapport par visiteur (IP) et par 24 h. */
  rapportParIp: 5,
  /** Rapports envoyés vers une même adresse e-mail par 24 h. */
  rapportParEmail: 3,
  fenetreMs: 24 * 60 * 60 * 1000,
} as const

export const DIAGNOSTIC_TEXTES = {
  surtitre: "Diagnostic gratuit · 30 secondes",
  titre: "Votre site est-il *bien protégé* ?",
  intro:
    "Connexion, messagerie, cookies, fichiers exposés : nous vérifions ce que votre site montre publiquement, comme le ferait n'importe quel visiteur. Aucune intrusion, aucun test d'attaque.",
  champ: "Adresse de votre site",
  placeholder: "votre-site.fr",
  bouton: "Analyser mon site",
  mention:
    "Analyse non intrusive, limitée à trois sites par jour et par visiteur. Le résultat s'affiche ici, sans inscription.",
  enCours: "Analyse en cours",
  ceQueCaVeutDire: "Ce que ça veut dire",
  ceQuIlFautFaire: "Ce qu'il faut faire",
  recommencer: "Analyser un autre site",
  rapportTitre: "Un technicien vous explique le résultat",
  rapportTexte:
    "Recevez le rapport détaillé par e-mail, ou soyez rappelé du lundi au vendredi, de 8 h 30 à 19 h. Nous vous disons ce qui est urgent, ce qui peut attendre, et ce que vous pouvez corriger vous-même.",
  rapportEmail: "Votre e-mail professionnel",
  rapportPrecision:
    "Nous ne vous recontactons pas de nous-mêmes : le rapport contient un bouton « Être rappelé par un technicien », à utiliser si vous le souhaitez.",
  rapportBouton: "Recevoir le rapport",
  rappelBouton: "Être rappelé",
  boutonRappelEmail: "Être rappelé par un technicien",
  rapportEnvoye: "C'est envoyé : le rapport arrive dans votre boîte d'ici quelques minutes.",
  conservation:
    "Seuls l'adresse analysée et le résultat sont conservés. Votre e-mail ne l'est que si vous demandez le rapport : 30 jours, ou 3 ans si vous demandez à être rappelé.",
} as const

/** Ce que l'outil fait et ne fait pas (section explicative sous l'outil). */
export const DIAGNOSTIC_PERIMETRE = {
  fait: [
    "Lire la page d'accueil et ses en-têtes, comme un navigateur",
    "Interroger les enregistrements DNS publics de votre domaine",
    "Vérifier le certificat présenté par le serveur",
    "Vérifier la présence de quelques fichiers sensibles connus, sans en lire le contenu",
  ],
  neFaitPas: [
    "Aucun test d'intrusion, aucune tentative de connexion",
    "Aucun scan de ports ni de failles",
    "Aucune exécution du JavaScript du site : les traceurs chargés plus tard ne sont pas vus",
  ],
} as const

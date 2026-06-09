export type OfferTag = 'impulsion' | 'serenite' | 'services-annexes' | 'studio' | 'general';

export const officialFaqs = [
  {
    question: "Concrètement, vous faites quoi pour mon entreprise ?",
    answer: "Nous prenons en charge l'ensemble de votre informatique : le support de vos collaborateurs, la maintenance de vos postes et serveurs, la gestion de vos logiciels et licences, la sécurité de vos données, et la création de vos outils web si vous en avez besoin.\n\nVous avez un seul interlocuteur, nous, qui coordonne tout. Vous nous appelez, nous intervenons. À distance ou directement sur site selon le besoin.",
    tags: ['general'] as OfferTag[] 
  },
  
  {
    question: "Qu'est-ce qui vous différencie des autres infogérants ?",
    answer: `Trois choses concrètes :\n\n1. Un modèle hybride unique : services managés, technicien sur site et création web réunis sous un même toit. Vous n'avez pas à multiplier les prestataires.\n2. La réactivité terrain : un réseau de plus de 40 techniciens qualifiés en Île-de-France, ce qui nous permet d'intervenir vite, là où une ESN classique mettrait plusieurs jours.\n3. L'humain : vous parlez à une vraie personne qui connaît votre dossier, pas à un bot ni à un centre d'appels.`,
    tags: ['impulsion', 'serenite'] as OfferTag[] 
  },
  
  {
    question: "Combien ça coûte ?",
    answer: "Nos offres démarrent à 79€ HT par poste et par mois, sans engagement de durée.\n\nLe tarif final dépend du périmètre : nombre de postes, niveau de support souhaité, services additionnels (sauvegarde, hébergement, etc.). Nous établissons toujours un devis clair et détaillé après une phase d'audit gratuite de votre environnement.",
    tags: ['serenite', 'services-annexes'] as OfferTag[] 
  },
  
  {
    question: "Pourquoi pas d'engagement ? Où est le piège ?",
    answer: "Il n'y a pas de piège. C'est un choix assumé.\n\nNous pensons que la fidélité d'un client doit se gagner chaque mois par la qualité du service, pas s'imposer par contrat. Si nous ne sommes pas à la hauteur, vous partez. C'est la meilleure garantie d'engagement que nous puissions vous donner du nôtre.",
    tags: ['serenite'] as OfferTag[] 
  },
  
  {
    question: "Vous utilisez de l'IA pour répondre aux clients ?",
    answer: "Non. Nos clients ne parlent jamais à une IA. Quand vous appelez TRINEXTA, vous avez en face de vous un humain qui connaît votre dossier.\n\nL'IA, nous l'utilisons en interne pour mieux organiser nos interventions, accélérer nos diagnostics et améliorer nos outils. Elle est au service de nos techniciens, pas en remplacement de la relation client.",
    tags: ['impulsion', 'serenite'] as OfferTag[] 
  },
  
  {
    question: "Comment ça se passe concrètement quand on signe ?",
    answer: `Quatre étapes simples :\n\n1. Audit gratuit de votre environnement informatique actuel (matériel, logiciels, sécurité, usages).\n2. Proposition adaptée et devis clair, sans engagement.\n3. Onboarding et reprise du parc : prise en main des postes, installation de nos outils de supervision, transfert des comptes.\n4. Pilotage au quotidien : un interlocuteur dédié, des points réguliers, une transparence totale sur les interventions.`,
    tags: ['serenite', 'services-annexes'] as OfferTag[]
  },
  
  {
    question: "Mes données sont-elles en sécurité ? Où sont-elles hébergées ?",
    answer: "Toutes nos solutions et hébergements sont en France. Nos serveurs, ceux que nous proposons à nos clients pour leurs sites et applications, sont hébergés en France chez des prestataires conformes RGPD.\n\nNous appliquons une approche « Fondations » : sécurisation systématique de la base (postes, accès, sauvegardes, mots de passe, mises à jour) avant toute autre intervention. Pas de cybersécurité gadget, des fondations solides.",
    tags: ['serenite', 'studio', 'services-annexes'] as OfferTag[]
  },
  
  {
    question: "Vous intervenez sous combien de temps en cas de problème ?",
    answer: `La très grande majorité des incidents se résolvent à distance depuis nos outils de supervision et de prise en main sans avoir à attendre qu'un technicien se déplace.\n\nNos engagements de réactivité :\n• Incident critique (blocage d'activité) : prise en charge sous 30 minutes.\n• Incidents courants : traités à distance dans la journée.\n\nLe suivi est piloté de bout en bout par TRINEXTA. Si l'incident ne peut pas être résolu à distance, vous recevez rapidement une intervention sur site via notre réseau de plus de 40 techniciens en Île-de-France.`,
    tags: ['impulsion', 'serenite'] as OfferTag[]
  }
]
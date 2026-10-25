/**
 * Articles de blog retires au profit d'une page service : redirection 301 de
 * /blog/{slug} vers la page qui porte desormais l'intention de recherche.
 * Lu par next.config.ts (redirections) et par sitemap.ts (exclusion), pour que
 * le sitemap ne liste jamais une URL redirigee.
 */
export const ARTICLES_REDIRIGES: { slug: string; destination: string }[] = [
  // Cannibalisait /infogerance sur « infogérance Évry » (GSC, octobre 2026)
  {
    slug: "infogerance-et-support-informatique-pour-pme-a-evry-courcouronnes",
    destination: "/infogerance",
  },
  // Articles supprimes, encore connus de Google (404)
  {
    slug: "pilotage-it-a-nanterre-aligner-votre-reseau-avec-vos-objectifs-business",
    destination: "/infogerance",
  },
  {
    slug: "supervision-reseau-en-temps-reel-a-antony-un-levier-pour-prevenir-les-incidents",
    destination: "/infogerance",
  },
  // Articles planifiés issus de l'ancien site, supprimés de Sanity (octobre 2026) :
  // même destination que leur ancienne URL WordPress
  {
    slug: "pourquoi-automatiser-les-mises-a-jour-informatiques-a-versailles",
    destination: "/infogerance",
  },
  {
    slug: "support-informatique-a-distance-pour-tpe-de-massy-assistance-reactive-et-illimitee-2tpe-de-senart-linteret-dun-partenaire-it-reactif-en-cas-de-panne",
    destination: "/support-informatique",
  },
  {
    slug: "securiser-vos-serveurs-et-donnees-critiques-a-suresnes-bonnes-pratiques",
    destination: "/cybersecurite",
  },
  {
    slug: "deploiement-dequipements-informatiques-a-malakoff-confiez-linstallation-a-un-expert",
    destination: "/infogerance",
  },
  {
    slug: "externaliser-le-support-it-de-votre-entreprise-a-rungis-un-atout-pour-la-productivite-edit-with",
    destination: "/support-informatique",
  },
  {
    slug: "besoin-temporaire-de-support-it-a-cachan-faites-appel-a-un-professionnel-mobile",
    destination: "/technicien-sous-regie",
  },
  {
    slug: "integrer-un-technicien-reseau-a-fresnes-solution-rapide-pour-pme-en-projet",
    destination: "/technicien-sous-regie",
  },
  {
    slug: "controle-des-acces-et-protection-des-postes-a-ivry-sur-seine",
    destination: "/cybersecurite",
  },
  {
    slug: "filtrage-des-e-mails-professionnels-a-vitry-sur-seine-protegez-vos-equipes-du-spam",
    destination: "/cybersecurite",
  },
  {
    slug: "gerer-les-pics-dactivite-informatique-a-noisy-le-grand-renfort-flexible",
    destination: "/technicien-sous-regie",
  },
  {
    slug: "support-technique-pme-a-saint-denis-assistance-utilisateurs-et-depannage-a-distance-2",
    destination: "/support-informatique",
  },
  {
    slug: "pme-dorly-comment-renforcer-la-cybersecurite-de-votre-messagerie-pro",
    destination: "/cybersecurite",
  },
  {
    slug: "infogerance-humaine-a-bagneux-deleguer-la-gestion-du-parc-utilisateur",
    destination: "/infogerance",
  },
  {
    slug: "structurer-votre-service-helpdesk-a-fontenay-sous-bois-avec-un-technicien-dedie",
    destination: "/infogerance",
  },
  {
    slug: "proteger-vos-postes-informatiques-a-palaiseau-antivirus-surveillance-continue",
    destination: "/cybersecurite",
  },
  {
    slug: "accompagnement-de-migration-windows-a-meudon-renfort-ponctuel-sur-site",
    destination: "/technicien-sous-regie",
  },
  {
    slug: "entreprises-de-boulogne-billancourt-comment-garder-un-systeme-informatique-a-jour",
    destination: "/infogerance",
  },
  {
    slug: "maintenir-un-serveur-local-performant-a-montreuil-conseils-aux-pme",
    destination: "/infogerance",
  },
  {
    slug: "assistance-de-proximite-a-gennevilliers-le-bon-reflexe-en-cas-de-panne-materielle",
    destination: "/support-informatique",
  },
  {
    slug: "pme-a-montrouge-pourquoi-mettre-en-place-une-politique-de-securite-proactive",
    destination: "/cybersecurite",
  },
  {
    slug: "reseaux-dentreprise-a-clamart-comment-garantir-leur-disponibilite-24-7",
    destination: "/infogerance",
  },
  {
    slug: "pme-dissy-les-moulineaux-linteret-dune-maintenance-reguliere-sur-site",
    destination: "/infogerance",
  },
  // Décision Q-003 (22/10/2026) : l'intention « technicien sans CDI » est portée par
  // la page régie (section « Régie, freelance, CDD ou intérim ? »).
  {
    slug: "poste-a-pourvoir-technicien-informatique-freelance-a-chevilly-larue",
    destination: "/technicien-sous-regie",
  },
  {
    slug: "recruter-un-technicien-support-informatique-a-villejuif-sans-passer-par-un-cdi",
    destination: "/technicien-sous-regie",
  },
  // Fusion du cluster « externalisation » (dossier final B08, octobre 2026) : le contenu
  // utile est repris dans l'article « Externaliser son informatique ».
  {
    slug: "pourquoi-externaliser-votre-support-it-peut-transformer-votre-entreprise",
    destination: "/blog/externaliser-son-informatique-le-calcul-gagnant-pour-la-rentabilite-de-votre-pme",
  },
];

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
];

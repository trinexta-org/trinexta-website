import type { NextConfig } from "next";
import { ARTICLES_REDIRIGES } from "./src/data/articles-rediriges";

const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "93ztl6y7";

/**
 * Origines vers lesquelles Google Ads emet les conversions. Verifie
 * empiriquement : sans elles, la CSP bloque les trois canaux d'envoi.
 */
const GOOGLE_ADS_ORIGINS = [
  "www.googleadservices.com",
  "googleads.g.doubleclick.net",
  "pagead2.googlesyndication.com",
  "www.google.com",
] as const;

/** Site de TRINEXTA Studio : création de sites, applications et audit SEO. */
const STUDIO_URL = "https://trinexta-studio.fr";

const nextConfig: NextConfig = {
  // Ne pas annoncer la pile technique dans les réponses (X-Powered-By).
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "base-uri 'self'",
              "form-action 'self'",
              "object-src 'none'",
              // Google Ads envoie la conversion sur trois canaux selon le
              // navigateur : fetch vers googleadservices.com et
              // www.google.com, et un pixel de repli sur googleadservices.com.
              // Les trois doivent etre autorises, sinon la conversion est
              // rejetee par la CSP sans erreur visible cote utilisateur : le
              // tag se charge, le page_view passe par googletagmanager.com qui
              // est autorise, et seules les conversions disparaissent.
              GOOGLE_ADS_ORIGINS.reduce(
                (directive, origin) => `${directive} ${origin}`,
                "img-src 'self' cdn.sanity.io data:",
              ),
              GOOGLE_ADS_ORIGINS.reduce(
                (directive, origin) => `${directive} ${origin}`,
                "script-src 'self' 'unsafe-inline' cdn.jsdelivr.net www.googletagmanager.com leadsynch-api.onrender.com",
              ),
              "style-src 'self' 'unsafe-inline' cdn.jsdelivr.net",
              "font-src 'self'",
              "frame-src 'self' www.google.com www.googletagmanager.com leadsynch-api.onrender.com",
              GOOGLE_ADS_ORIGINS.reduce(
                (directive, origin) => `${directive} ${origin}`,
                "connect-src 'self' www.google-analytics.com analytics.google.com www.googletagmanager.com leadsynch-api.onrender.com",
              ),
            ].join("; "),
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // --- Pages services / offres ---
      {
        source: "/conditions-dutilisation",
        destination: "/cgv",
        statusCode: 301,
      },
      {
        source: "/politique-de-confidentialite",
        destination: "/confidentialite",
        statusCode: 301,
      },
      {
        source: "/zone-dintervention-certifications",
        destination: "/a-propos",
        statusCode: 301,
      },
      {
        source: "/offre-serenite",
        destination: "/serenite",
        statusCode: 301,
      },
      {
        source: "/offre-impulsion",
        destination: "/technicien-sous-regie",
        statusCode: 301,
      },
      {
        source: "/nos-offres/impulsion",
        destination: "/technicien-sous-regie",
        statusCode: 301,
      },

      {
        source: "/offre-essentielle",
        destination: "/serenite",
        statusCode: 301,
      },
      { source: "/tarifs", destination: "/serenite", statusCode: 301 },
      {
        source: "/offre-decouverte-informatique-tpe-pme",
        destination: "/serenite",
        statusCode: 301,
      },
      { source: "/nos-clients", destination: "/cas-clients", statusCode: 301 },
      // --- TRINEXTA Studio : création de sites et audit SEO, sur trinexta-studio.fr ---
      { source: "/trinexta-studio", destination: STUDIO_URL, statusCode: 301 },
      { source: "/audit-seo", destination: `${STUDIO_URL}/audit-seo`, statusCode: 301 },
      { source: "/audit-seo/expert", destination: `${STUDIO_URL}/audit-seo`, statusCode: 301 },
      { source: "/audit-seo/expert/succes", destination: `${STUDIO_URL}/audit-seo`, statusCode: 301 },
      { source: "/audit-seo/expert/annulation", destination: `${STUDIO_URL}/audit-seo`, statusCode: 301 },
      { source: "/cgv-audit-expert", destination: `${STUDIO_URL}/cgv-audit-expert`, statusCode: 301 },
      // Démos métier : mêmes fichiers servis par trinexta-studio.fr (public/demos).
      { source: "/demos/:fichier", destination: `${STUDIO_URL}/demos/:fichier`, statusCode: 301 },
      // --- Typo ---
      { source: "/contac", destination: "/contact", statusCode: 301 },
      // --- Articles de blog retirés -> page service ---
      ...ARTICLES_REDIRIGES.map(({ slug, destination }) => ({
        source: `/blog/${slug}`,
        destination,
        statusCode: 301 as const,
      })),
      // --- Articles de blog publiés (slug WP -> /blog/slug/) ---
      {
        source: "/cybersecurite-7-habitudes-strategiques-pour-proteger-votre-pme",
        destination:
          "/blog/cybersecurite-7-habitudes-strategiques-pour-proteger-votre-pme",
        statusCode: 301,
      },
      {
        source: "/pourquoi-un-helpdesk-local-change-tout-pour-vos-equipes",
        destination:
          "/blog/pourquoi-un-helpdesk-local-change-tout-pour-vos-equipes",
        statusCode: 301,
      },
      {
        source:
          "/infogerance-et-support-informatique-pour-pme-a-evry-courcouronnes",
        destination: "/infogerance",
        statusCode: 301,
      },
      {
        source:
          "/cybersecurite-pour-pme-les-5-menaces-les-plus-frequentes-en-2025",
        destination:
          "/blog/cybersecurite-pour-pme-les-5-menaces-les-plus-frequentes-en-2025",
        statusCode: 301,
      },
      {
        source: "/renouvellement-parc-informatique-pme-ile-de-france",
        destination: "/blog/renouvellement-parc-informatique-pme-ile-de-france",
        statusCode: 301,
      },
      {
        source:
          "/externaliser-son-informatique-le-calcul-gagnant-pour-la-rentabilite-de-votre-pme",
        destination:
          "/blog/externaliser-son-informatique-le-calcul-gagnant-pour-la-rentabilite-de-votre-pme",
        statusCode: 301,
      },
      {
        source:
          "/pourquoi-externaliser-votre-support-it-peut-transformer-votre-entreprise",
        // Article fusionné dans « Externaliser son informatique » (B08 -> B07) : un seul saut
        destination:
          "/blog/externaliser-son-informatique-le-calcul-gagnant-pour-la-rentabilite-de-votre-pme",
        statusCode: 301,
      },
      // --- Pages orphelines -> infogerance ---
      {
        source:
          "/maintenance-informatique-pour-petites-entreprises-a-evry-courcouronnes-vos-outils-toujours-operationnels",
        destination: "/infogerance",
        statusCode: 301,
      },
      {
        source:
          "/reduire-les-pannes-informatiques-a-la-defense-les-cles-dun-parc-bien-maintenu",
        destination: "/infogerance",
        statusCode: 301,
      },
      {
        source:
          "/pilotage-it-a-nanterre-aligner-votre-reseau-avec-vos-objectifs-business",
        destination: "/infogerance",
        statusCode: 301,
      },
      {
        source:
          "/pourquoi-automatiser-les-mises-a-jour-informatiques-a-versailles",
        destination: "/infogerance",
        statusCode: 301,
      },
      {
        source:
          "/entreprises-de-boulogne-billancourt-comment-garder-un-systeme-informatique-a-jour",
        destination: "/infogerance",
        statusCode: 301,
      },
      {
        source:
          "/maintenir-un-serveur-local-performant-a-montreuil-conseils-aux-pme",
        destination: "/infogerance",
        statusCode: 301,
      },
      {
        source:
          "/deploiement-dequipements-informatiques-a-malakoff-confiez-linstallation-a-un-expert",
        destination: "/infogerance",
        statusCode: 301,
      },
      {
        source:
          "/supervision-reseau-en-temps-reel-a-antony-un-levier-pour-prevenir-les-incidents",
        destination: "/infogerance",
        statusCode: 301,
      },
      {
        source:
          "/infogerance-humaine-a-bagneux-deleguer-la-gestion-du-parc-utilisateur",
        destination: "/infogerance",
        statusCode: 301,
      },
      {
        source:
          "/structurer-votre-service-helpdesk-a-fontenay-sous-bois-avec-un-technicien-dedie",
        destination: "/infogerance",
        statusCode: 301,
      },
      {
        source:
          "/reseaux-dentreprise-a-clamart-comment-garantir-leur-disponibilite-24-7",
        destination: "/infogerance",
        statusCode: 301,
      },
      {
        source:
          "/pme-dissy-les-moulineaux-linteret-dune-maintenance-reguliere-sur-site",
        destination: "/infogerance",
        statusCode: 301,
      },
      // --- Pages orphelines -> cybersecurite ---
      {
        source:
          "/securiser-linformatique-de-votre-entreprise-a-creteil-solutions-simples-et-efficaces",
        destination: "/cybersecurite",
        statusCode: 301,
      },
      {
        source:
          "/securiser-vos-serveurs-et-donnees-critiques-a-suresnes-bonnes-pratiques",
        destination: "/cybersecurite",
        statusCode: 301,
      },
      {
        source:
          "/pme-dorly-comment-renforcer-la-cybersecurite-de-votre-messagerie-pro",
        destination: "/cybersecurite",
        statusCode: 301,
      },
      {
        source:
          "/pme-a-montrouge-pourquoi-mettre-en-place-une-politique-de-securite-proactive",
        destination: "/cybersecurite",
        statusCode: 301,
      },
      {
        source:
          "/proteger-vos-postes-informatiques-a-palaiseau-antivirus-surveillance-continue",
        destination: "/cybersecurite",
        statusCode: 301,
      },
      {
        source:
          "/controle-des-acces-et-protection-des-postes-a-ivry-sur-seine",
        destination: "/cybersecurite",
        statusCode: 301,
      },
      {
        source:
          "/filtrage-des-e-mails-professionnels-a-vitry-sur-seine-protegez-vos-equipes-du-spam",
        destination: "/cybersecurite",
        statusCode: 301,
      },
      // --- Pages orphelines -> support-informatique ---
      {
        source:
          "/support-informatique-a-distance-pour-tpe-de-massy-assistance-reactive-et-illimitee",
        destination: "/support-informatique",
        statusCode: 301,
      },
      {
        source:
          "/support-informatique-a-distance-pour-tpe-de-massy-assistance-reactive-et-illimitee-2tpe-de-senart-linteret-dun-partenaire-it-reactif-en-cas-de-panne",
        destination: "/support-informatique",
        statusCode: 301,
      },
      {
        source:
          "/support-technique-pme-a-saint-denis-assistance-utilisateurs-et-depannage-a-distance-2",
        destination: "/support-informatique",
        statusCode: 301,
      },
      {
        source:
          "/externaliser-le-support-it-de-votre-entreprise-a-rungis-un-atout-pour-la-productivite-edit-with",
        destination: "/support-informatique",
        statusCode: 301,
      },
      {
        source:
          "/assistance-de-proximite-a-gennevilliers-le-bon-reflexe-en-cas-de-panne-materielle",
        destination: "/support-informatique",
        statusCode: 301,
      },
      // --- Pages orphelines -> offre-technicien-sous-regie ---
      {
        source:
          "/recruter-un-technicien-support-informatique-a-villejuif-sans-passer-par-un-cdi",
        destination: "/technicien-sous-regie",
        statusCode: 301,
      },
      {
        source:
          "/poste-a-pourvoir-technicien-informatique-freelance-a-chevilly-larue",
        destination: "/technicien-sous-regie",
        statusCode: 301,
      },
      {
        source:
          "/besoin-temporaire-de-support-it-a-cachan-faites-appel-a-un-professionnel-mobile",
        destination: "/technicien-sous-regie",
        statusCode: 301,
      },
      {
        source:
          "/integrer-un-technicien-reseau-a-fresnes-solution-rapide-pour-pme-en-projet",
        destination: "/technicien-sous-regie",
        statusCode: 301,
      },
      {
        source:
          "/accompagnement-de-migration-windows-a-meudon-renfort-ponctuel-sur-site",
        destination: "/technicien-sous-regie",
        statusCode: 301,
      },
      {
        source:
          "/gerer-les-pics-dactivite-informatique-a-noisy-le-grand-renfort-flexible",
        destination: "/technicien-sous-regie",
        statusCode: 301,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Par défaut 4h : sur un site à faible trafic, presque chaque visite
    // retombait sur un cache froid et payait le ré-encodage AVIF (~2,7 s).
    minimumCacheTTL: 2678400, // 31 jours
    // Les sources sont plafonnées à 2560px : demander 3840 ne gagne rien
    // et multiplie les variantes à encoder à froid.
    deviceSizes: [640, 828, 1080, 1920, 2560],
    // q=50 pour les fonds de hero, masqués par un voile primary à 70-90%.
    qualities: [50, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: `/images/${sanityProjectId}/production/**`,
      },
    ],
  },
  // inlineCss retiré (24/10/2026) : la feuille Tailwind fait ~170 Ko, inlinée deux fois
  // par page (balise <style> + charge RSC) et renvoyée à chaque préchargement de lien.
  // Une feuille externe est mise en cache une fois pour tout le site.
};

export default nextConfig;

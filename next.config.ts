import type { NextConfig } from "next";

const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "93ztl6y7";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "img-src 'self' cdn.sanity.io data:",
              "script-src 'self' 'unsafe-inline' cdn.jsdelivr.net www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self'",
              "frame-src www.google.com",
              "connect-src 'self' www.google-analytics.com analytics.google.com www.googletagmanager.com",
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
      {
        source: "/demos/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "img-src 'self' images.unsplash.com picsum.photos data:",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
              "font-src 'self' fonts.gstatic.com",
              "connect-src 'self'",
            ].join("; "),
          },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
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
      // --- Typo ---
      { source: "/contac", destination: "/contact", statusCode: 301 },
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
        destination:
          "/blog/infogerance-et-support-informatique-pour-pme-a-evry-courcouronnes",
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
        destination:
          "/blog/pourquoi-externaliser-votre-support-it-peut-transformer-votre-entreprise",
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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: `/images/${sanityProjectId}/production/**`,
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "93ztl6y7";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // --- Pages services / offres ---
      {
        source: "/conditions-dutilisation",
        destination: "/cgv",
        permanent: true,
      },
      {
        source: "/politique-de-confidentialite",
        destination: "/confidentialite",
        permanent: true,
      },
      {
        source: "/zone-dintervention-certifications",
        destination: "/a-propos",
        permanent: true,
      },
      {
        source: "/services-annexes",
        destination: "/nos-offres?tab=services-annexes",
        permanent: true,
      },
      {
        source: "/offre-serenite",
        destination: "/nos-offres?tab=serenite",
        permanent: true,
      },
      {
        source: "/offre-impulsion",
        destination: "/nos-offres?tab=impulsion",
        permanent: true,
      },
      {
        source: "/offre-essentielle",
        destination: "/nos-offres",
        permanent: true,
      },
      { source: "/tarifs", destination: "/nos-offres", permanent: true },
      {
        source: "/offre-decouverte-informatique-tpe-pme",
        destination: "/nos-offres",
        permanent: true,
      },
      { source: "/nos-clients", destination: "/cas-clients", permanent: true },
      // --- Typo ---
      { source: "/contac", destination: "/contact", permanent: true },
      // --- Articles de blog publiés (slug WP -> /blog/slug/) ---
      {
        source: "/cybersecurite-7-habitudes-strategiques-pour-proteger-votre-pme",
        destination:
          "/blog/cybersecurite-7-habitudes-strategiques-pour-proteger-votre-pme",
        permanent: true,
      },
      {
        source: "/pourquoi-un-helpdesk-local-change-tout-pour-vos-equipes",
        destination:
          "/blog/pourquoi-un-helpdesk-local-change-tout-pour-vos-equipes",
        permanent: true,
      },
      {
        source:
          "/infogerance-et-support-informatique-pour-pme-a-evry-courcouronnes",
        destination:
          "/blog/infogerance-et-support-informatique-pour-pme-a-evry-courcouronnes",
        permanent: true,
      },
      {
        source:
          "/cybersecurite-pour-pme-les-5-menaces-les-plus-frequentes-en-2025",
        destination:
          "/blog/cybersecurite-pour-pme-les-5-menaces-les-plus-frequentes-en-2025",
        permanent: true,
      },
      {
        source: "/renouvellement-parc-informatique-pme-ile-de-france",
        destination: "/blog/renouvellement-parc-informatique-pme-ile-de-france",
        permanent: true,
      },
      {
        source:
          "/externaliser-son-informatique-le-calcul-gagnant-pour-la-rentabilite-de-votre-pme",
        destination:
          "/blog/externaliser-son-informatique-le-calcul-gagnant-pour-la-rentabilite-de-votre-pme",
        permanent: true,
      },
      {
        source:
          "/pourquoi-externaliser-votre-support-it-peut-transformer-votre-entreprise",
        destination:
          "/blog/pourquoi-externaliser-votre-support-it-peut-transformer-votre-entreprise",
        permanent: true,
      },
      // --- Pages orphelines -> infogerance ---
      {
        source:
          "/maintenance-informatique-pour-petites-entreprises-a-evry-courcouronnes-vos-outils-toujours-operationnels",
        destination: "/infogerance",
        permanent: true,
      },
      {
        source:
          "/reduire-les-pannes-informatiques-a-la-defense-les-cles-dun-parc-bien-maintenu",
        destination: "/infogerance",
        permanent: true,
      },
      {
        source:
          "/pilotage-it-a-nanterre-aligner-votre-reseau-avec-vos-objectifs-business",
        destination: "/infogerance",
        permanent: true,
      },
      {
        source:
          "/pourquoi-automatiser-les-mises-a-jour-informatiques-a-versailles",
        destination: "/infogerance",
        permanent: true,
      },
      {
        source:
          "/entreprises-de-boulogne-billancourt-comment-garder-un-systeme-informatique-a-jour",
        destination: "/infogerance",
        permanent: true,
      },
      {
        source:
          "/maintenir-un-serveur-local-performant-a-montreuil-conseils-aux-pme",
        destination: "/infogerance",
        permanent: true,
      },
      {
        source:
          "/deploiement-dequipements-informatiques-a-malakoff-confiez-linstallation-a-un-expert",
        destination: "/infogerance",
        permanent: true,
      },
      {
        source:
          "/supervision-reseau-en-temps-reel-a-antony-un-levier-pour-prevenir-les-incidents",
        destination: "/infogerance",
        permanent: true,
      },
      {
        source:
          "/infogerance-humaine-a-bagneux-deleguer-la-gestion-du-parc-utilisateur",
        destination: "/infogerance",
        permanent: true,
      },
      {
        source:
          "/structurer-votre-service-helpdesk-a-fontenay-sous-bois-avec-un-technicien-dedie",
        destination: "/infogerance",
        permanent: true,
      },
      {
        source:
          "/reseaux-dentreprise-a-clamart-comment-garantir-leur-disponibilite-24-7",
        destination: "/infogerance",
        permanent: true,
      },
      {
        source:
          "/pme-dissy-les-moulineaux-linteret-dune-maintenance-reguliere-sur-site",
        destination: "/infogerance",
        permanent: true,
      },
      // --- Pages orphelines -> cybersecurite ---
      {
        source:
          "/securiser-linformatique-de-votre-entreprise-a-creteil-solutions-simples-et-efficaces",
        destination: "/cybersecurite",
        permanent: true,
      },
      {
        source:
          "/securiser-vos-serveurs-et-donnees-critiques-a-suresnes-bonnes-pratiques",
        destination: "/cybersecurite",
        permanent: true,
      },
      {
        source:
          "/pme-dorly-comment-renforcer-la-cybersecurite-de-votre-messagerie-pro",
        destination: "/cybersecurite",
        permanent: true,
      },
      {
        source:
          "/pme-a-montrouge-pourquoi-mettre-en-place-une-politique-de-securite-proactive",
        destination: "/cybersecurite",
        permanent: true,
      },
      {
        source:
          "/proteger-vos-postes-informatiques-a-palaiseau-antivirus-surveillance-continue",
        destination: "/cybersecurite",
        permanent: true,
      },
      {
        source:
          "/controle-des-acces-et-protection-des-postes-a-ivry-sur-seine",
        destination: "/cybersecurite",
        permanent: true,
      },
      {
        source:
          "/filtrage-des-e-mails-professionnels-a-vitry-sur-seine-protegez-vos-equipes-du-spam",
        destination: "/cybersecurite",
        permanent: true,
      },
      // --- Pages orphelines -> support-informatique ---
      {
        source:
          "/support-informatique-a-distance-pour-tpe-de-massy-assistance-reactive-et-illimitee",
        destination: "/support-informatique",
        permanent: true,
      },
      {
        source:
          "/support-informatique-a-distance-pour-tpe-de-massy-assistance-reactive-et-illimitee-2tpe-de-senart-linteret-dun-partenaire-it-reactif-en-cas-de-panne",
        destination: "/support-informatique",
        permanent: true,
      },
      {
        source:
          "/support-technique-pme-a-saint-denis-assistance-utilisateurs-et-depannage-a-distance-2",
        destination: "/support-informatique",
        permanent: true,
      },
      {
        source:
          "/externaliser-le-support-it-de-votre-entreprise-a-rungis-un-atout-pour-la-productivite-edit-with",
        destination: "/support-informatique",
        permanent: true,
      },
      {
        source:
          "/assistance-de-proximite-a-gennevilliers-le-bon-reflexe-en-cas-de-panne-materielle",
        destination: "/support-informatique",
        permanent: true,
      },
      // --- Pages orphelines -> offre-impulsion ---
      {
        source:
          "/recruter-un-technicien-support-informatique-a-villejuif-sans-passer-par-un-cdi",
        destination: "/offre-impulsion",
        permanent: true,
      },
      {
        source:
          "/poste-a-pourvoir-technicien-informatique-freelance-a-chevilly-larue",
        destination: "/offre-impulsion",
        permanent: true,
      },
      {
        source:
          "/besoin-temporaire-de-support-it-a-cachan-faites-appel-a-un-professionnel-mobile",
        destination: "/offre-impulsion",
        permanent: true,
      },
      {
        source:
          "/integrer-un-technicien-reseau-a-fresnes-solution-rapide-pour-pme-en-projet",
        destination: "/offre-impulsion",
        permanent: true,
      },
      {
        source:
          "/accompagnement-de-migration-windows-a-meudon-renfort-ponctuel-sur-site",
        destination: "/offre-impulsion",
        permanent: true,
      },
      {
        source:
          "/gerer-les-pics-dactivite-informatique-a-noisy-le-grand-renfort-flexible",
        destination: "/offre-impulsion",
        permanent: true,
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

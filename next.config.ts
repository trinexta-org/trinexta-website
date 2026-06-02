import type { NextConfig } from "next";

const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "93ztl6y7";

const nextConfig: NextConfig = {
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
  async redirects() {
    return [
      {
        source: "/cas-clients/tpe-conseil-securisation-performance",
        destination: "/cas-clients/cybersecurite-tpe-essonne",
        permanent: true,
      },
      {
        source: "/cas-clients/societe-services-modernisation-poste-travail",
        destination: "/cas-clients/modernisation-it-pme-essonne",
        permanent: true,
      },
      {
        source: "/cas-clients/transformation-digitale-migration-cloud-pro",
        destination: "/cas-clients/migration-cloud-tpe-essonne",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

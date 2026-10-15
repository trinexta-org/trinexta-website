import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { getServiceData } from "@/data/services";

export const metadata: Metadata = {
  title: "Infogérance informatique PME en Essonne (91)",
  description: "TRINEXTA accompagne les TPE et PME en Essonne : infogérance, maintenance, supervision, cybersécurité et support informatique. Demandez votre étude personnalisée.",
  alternates: {
    canonical: "/infogerance",
  },
  openGraph: {
    title: "Infogérance informatique PME en Essonne (91) | TRINEXTA",
    description: "TRINEXTA accompagne les TPE et PME en Essonne : infogérance, maintenance, supervision, cybersécurité et support informatique. Demandez votre étude personnalisée.",
    url: "/infogerance",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Infogérance informatique PME en Essonne (91) | TRINEXTA",
    description: "TRINEXTA accompagne les TPE et PME en Essonne : infogérance, maintenance, supervision, cybersécurité et support informatique. Demandez votre étude personnalisée.",
    images: ["/images/og-default.png"],
  },
};

export default async function InfogerancePage() {
  const data = await getServiceData("infogerance");
  return <ServicePage {...data} />;
}

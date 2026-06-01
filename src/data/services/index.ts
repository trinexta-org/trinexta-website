import type { ServicePageProps } from "@/components/services/ServicePage";

const registry: Record<string, () => Promise<ServicePageProps>> = {
  cybersecurite: () => import("./cybersecurite").then((m) => m.cybersecuriteData),
  infogerance: () => import("./infogerance").then((m) => m.infogeranceData),
  "cloud-sauvegarde": () => import("./cloud-sauvegarde").then((m) => m.cloudData),
};

export async function getServiceData(slug: string): Promise<ServicePageProps> {
  const loader = registry[slug];
  if (!loader) throw new Error(`Service inconnu : ${slug}`);
  return loader();
}

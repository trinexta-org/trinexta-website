import { ServicePage } from "@/components/services/ServicePage";
import { getServiceData } from "@/data/services";

export const metadata = {
  title: "Infogérance Informatique pour TPE et PME | Trinexta",
  description: "Déléguez votre gestion informatique à des experts. Trinexta assure la supervision 24/7, la maintenance proactive et la sécurité de votre parc pour une productivité sans faille.",
};

export default async function InfogerancePage() {
  const data = await getServiceData("infogerance");
  return <ServicePage {...data} />;
}

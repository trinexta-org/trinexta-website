// Bouton principal du header, adapté à la page : les pages IT mènent au devis,
// le reste (accueil, Studio, blog...) garde l'estimation de projet web.

export interface HeaderCta {
  label: string;
  href: string;
}

export const HEADER_CTA_DEFAULT: HeaderCta = {
  label: "Estimer mon projet",
  href: "/estimation",
};

export const HEADER_CTA_IT: HeaderCta = {
  label: "Demander un devis",
  href: "/contact?type=devis",
};

export const IT_ROUTES = [
  "/serenite",
  "/infogerance",
  "/support-informatique",
  "/cybersecurite",
  "/cloud-sauvegarde",
  "/microsoft-365",
  "/solutions-metier",
  "/services-annexes",
  "/technicien-sous-regie",
  "/niveau-de-service",
  "/charte-assistance",
] as const;

export function getHeaderCta(pathname: string): HeaderCta {
  const isIt = IT_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
  return isIt ? HEADER_CTA_IT : HEADER_CTA_DEFAULT;
}

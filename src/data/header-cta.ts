// Bouton principal du header (desktop et menu mobile) : identique sur toutes les pages.
// L'ancre #formulaire est portée par la section formulaire de /contact.

export interface HeaderCta {
  label: string;
  href: string;
}

export const HEADER_CTA: HeaderCta = {
  label: "Être rappelé",
  href: "/contact#formulaire",
};


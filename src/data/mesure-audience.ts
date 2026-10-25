// Mesure d'audience Google Analytics 4 de trinexta.fr (propriété « TRINEXTA »).
// Chargée par le bandeau cookies (tarteaucitron, service « gtag ») après accord du
// visiteur, en production uniquement (jamais sur staging ni en local).

export const GA_MEASUREMENT_ID: string = "G-XWJ0C203JB"

/** Durée de vie des cookies Google Analytics : 13 mois, plafond recommandé par la CNIL. */
export const GA_COOKIE_EXPIRES = 13 * 30 * 24 * 3600

/** Cookie qui mémorise le choix du visiteur dans le bandeau (tarteaucitron). */
export const CONSENT_COOKIE = "trinexta_cookie_consent"

/** Conservation du choix du visiteur sur les cookies : 6 mois (recommandation CNIL). */
export const CONSENT_DUREE_JOURS = 183

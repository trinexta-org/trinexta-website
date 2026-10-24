// Mesure d'audience Google Analytics 4 de trinexta.fr (propriété « TRINEXTA »).
// Chargée par le bandeau cookies (tarteaucitron, service « gtag ») après accord du
// visiteur, en production uniquement (jamais sur staging ni en local).
// Vide tant que la propriété n'est pas créée : aucune balise n'est chargée.
export const GA_MEASUREMENT_ID: string = ""

/** Durée de vie des cookies Google Analytics : 13 mois, plafond recommandé par la CNIL. */
export const GA_COOKIE_EXPIRES = 13 * 30 * 24 * 3600

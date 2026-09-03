type GtmEventData = Record<string, string | number | boolean | null | undefined>;

interface Tarteaucitron {
  init: (config: Record<string, string | boolean>) => void;
  user: {
    googletagmanagerId?: string;
    gtagUa?: string;
    gtagCrossdomain?: string[];
    gtagMore?: () => void;
  };
  job?: string[];
}

declare global {
  interface Window {
    dataLayer?: Array<{ event: string } & GtmEventData>;
    tarteaucitron?: Tarteaucitron;
    gtag?: (...args: unknown[]) => void;
  }
}

/** ID Google Ads (ex. AW-16975609254). Chargé via tarteaucitron, sous consentement. */
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

/**
 * Action de conversion "lead" du compte Ads (send_to complet, ID + label).
 * Valeur publique (visible dans le tag cote navigateur) : volontairement en dur
 * plutot qu'en variable d'env, une variable absente en prod ferait disparaitre
 * la conversion en silence, exactement le bug qu'on corrige ici.
 */
export const ADS_LEAD_CONVERSION = "AW-16975609254/T_j8CLGw9rQaEKb7zJ4_";

/**
 * Déclenche une conversion Google Ads.
 * `sendTo` = "AW-XXXXXXXXXX/label" fourni par Google Ads pour chaque action.
 * Silencieux si gtag absent (consentement refusé, hors production).
 */
export const trackAdsConversion = (
  sendTo: string,
  params: GtmEventData = {},
): void => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "conversion", { send_to: sendTo, ...params });
  }
};

export const pushGtmEvent = (event: string, data: GtmEventData = {}): void => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: event,
      ...data,
    });
  }
};

/**
 * Conversion "lead" : un formulaire de prise de contact a ete accepte par l'API.
 * A n'appeler qu'apres une reponse serveur OK, jamais au clic sur un CTA :
 * un clic n'est pas un lead et gonflerait la mesure d'envois echoues.
 */
export const trackLeadConversion = (params: GtmEventData = {}): void => {
  trackAdsConversion(ADS_LEAD_CONVERSION, params);
};

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
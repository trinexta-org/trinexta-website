"use client";

import Script from "next/script";
import { isIndexable } from "@/lib/site";
import {
  CONSENT_COOKIE,
  CONSENT_DUREE_JOURS,
  GA_COOKIE_EXPIRES,
  GA_MEASUREMENT_ID,
} from "@/data/mesure-audience";

export function CookieBanner() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const enhancedConversions =
    process.env.NEXT_PUBLIC_ADS_ENHANCED_CONVERSIONS === "true";

  // Google Analytics : production uniquement, pour ne pas mêler les visites de staging.
  const gaId = isIndexable ? GA_MEASUREMENT_ID : undefined;

  if (process.env.NODE_ENV !== "production" || (!gtmId && !adsId && !gaId)) {
    return null;
  }

  return (
    <Script
      src="https://cdn.jsdelivr.net/npm/tarteaucitronjs@1.17.0/tarteaucitron.min.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window !== "undefined" && window.tarteaucitron) {
          // Choix conserve 6 mois. tarteaucitron lit cette variable globale a
          // chaque enregistrement du choix, il suffit qu'elle existe avant.
          window.tarteaucitronForceExpire = CONSENT_DUREE_JOURS;

          // Consent Mode basique : aucune balise Google avant accord ni apres
          // refus. En mode avance, tarteaucitron appelle le "fallback" des
          // services gtag et googleads tant que le visiteur n'a pas repondu ou
          // s'il refuse, et ce fallback charge le tag Google. On le vide des que
          // les services sont declares ("tac.root_available" part juste avant
          // le traitement des jobs). Les signaux de consentement (refus par
          // defaut, accord apres clic) restent envoyes a Google par
          // googleConsentMode, mais seulement une fois le tag charge, donc
          // apres accord.
          window.addEventListener(
            "tac.root_available",
            () => {
              const services = window.tarteaucitron?.services;
              for (const key of ["gtag", "googleads"]) {
                if (services?.[key]) services[key].fallback = () => {};
              }
            },
            { once: true },
          );

          window.tarteaucitron.init({
            "privacyUrl": "/confidentialite",
            "bodyPosition": "bottom",
            "hashtag": "#tarteaucitron",
            "cookieName": CONSENT_COOKIE,
            "orientation": "middle",
            "groupServices": false,
            "showDetailsOnClick": true,
            "serviceDefaultState": "wait",
            // Signaux Consent Mode v2 (refus par defaut, mise a jour sur accord).
            // Fallbacks Google neutralises plus haut : mode basique.
            "googleConsentMode": true,
            "showAlertSmall": false,
            "cookieslist": true,
            "closePopup": false,
            "showIcon": true,
            "iconPosition": "BottomLeft",
            "adblocker": false,
            "DenyAllCta": true,
            "AcceptAllCta": true,
            "highPrivacy": true,
            "handleBrowserDNTRequest": false,
            "removeCredit": true,
            "moreInfoLink": true,
            "useExternalCss": false,
          });

          window.tarteaucitron.job = window.tarteaucitron.job || [];

          if (gtmId) {
            window.tarteaucitron.user.googletagmanagerId = gtmId;
            window.tarteaucitron.job.push('googletagmanager');
          }

          if (gaId) {
            // Service "gtag" de tarteaucitron = Google Analytics (type "analytic") :
            // chargé seulement après accord, cookies limités à 13 mois, sans signaux
            // Google ni personnalisation publicitaire.
            window.tarteaucitron.user.gtagUa = gaId;
            window.tarteaucitron.user.gtagMore = () => {
              window.gtag?.("config", gaId, {
                cookie_expires: GA_COOKIE_EXPIRES,
                allow_google_signals: false,
                allow_ad_personalization_signals: false,
              });
            };
            window.tarteaucitron.job.push("gtag");
          }

          if (adsId) {
            // Service "googleads" et non "gtag" : dans tarteaucitron, "gtag" est
            // le service Google Analytics (type "analytic") et n'accorde que
            // analytics_storage. Seul "googleads" (type "ads") accorde
            // ad_storage sur l'evenement googleads_allowed, sans lequel aucune
            // conversion ne serait attribuee sous Consent Mode.
            window.tarteaucitron.user.googleadsId = adsId;

            if (enhancedConversions) {
              window.tarteaucitron.user.googleadsMore = () => {
                window.gtag?.('config', adsId, {
                  allow_enhanced_conversions: true,
                });
              };
            }

            window.tarteaucitron.job.push('googleads');
          }

          // next/script charge tarteaucitron apres l'evenement window "load".
          // init() attache alors son listener "load" a une cible qui ne se
          // declenchera plus : sans ce rappel, aucun bandeau ni icone n'est
          // construit et les jobs Google ne sont jamais executes.
          if (document.readyState === "complete") {
            window.dispatchEvent(new Event("load"));
          }
        }
      }}
    />
  );
}
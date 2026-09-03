"use client";

import Script from "next/script";

export function CookieBanner() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const enhancedConversions =
    process.env.NEXT_PUBLIC_ADS_ENHANCED_CONVERSIONS === "true";

  if (process.env.NODE_ENV !== "production" || (!gtmId && !adsId)) {
    return null;
  }

  return (
    <Script
      src="https://cdn.jsdelivr.net/npm/tarteaucitronjs@1.17.0/tarteaucitron.min.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window !== "undefined" && window.tarteaucitron) {
          window.tarteaucitron.init({
            "privacyUrl": "/confidentialite",
            "bodyPosition": "bottom",
            "hashtag": "#tarteaucitron",
            "cookieName": "trinexta_cookie_consent",
            "orientation": "middle",
            "groupServices": false,
            "showDetailsOnClick": true,
            "serviceDefaultState": "wait",
            // Consent Mode avance : les 4 signaux Google partent a "denied" des
            // le chargement, et chaque service Google recoit un fallback qui
            // charge le tag malgre le refus. Sans cookie, en pings anonymes :
            // Google peut alors modeliser les conversions des visiteurs qui ont
            // refuse, invisibles autrement.
            "googleConsentMode": true,
            "showAlertSmall": false,
            "cookieslist": false,
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
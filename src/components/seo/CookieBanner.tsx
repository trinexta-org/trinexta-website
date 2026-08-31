"use client";

import Script from "next/script";

export function CookieBanner() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

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
            window.tarteaucitron.user.gtagUa = adsId;
            window.tarteaucitron.job.push('gtag');
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
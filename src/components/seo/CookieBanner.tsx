"use client";

import Script from "next/script";

export function CookieBanner() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  if (process.env.NODE_ENV !== "production" || !gtmId) {
    return null;
  }

  return (
    <Script
      src="https://cdn.jsdelivr.net/npm/tarteaucitronjs@1.17.0/tarteaucitron.min.js"
      strategy="lazyOnload"
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

          window.tarteaucitron.user.googletagmanagerId = gtmId;
          window.tarteaucitron.job = window.tarteaucitron.job || [];
          window.tarteaucitron.job.push('googletagmanager');
        }
      }}
    />
  );
}
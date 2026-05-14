"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const STORAGE_KEY = "starnawska_cookies_v1";

type Preferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  decidedAt: string;
};

function readConsent(): Preferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Preferences;
  } catch {
    return null;
  }
}

/**
 * Ładuje GA4 i Meta Pixel TYLKO po zgodzie użytkownika (RODO).
 * Reaguje na event "starnawska:consent" wystawiany przez banner po decyzji.
 */
export function Analytics() {
  const [consent, setConsent] = useState<Preferences | null>(null);

  useEffect(() => {
    setConsent(readConsent());

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<Preferences>).detail;
      setConsent(detail);
    };
    window.addEventListener("starnawska:consent", handler);
    return () => window.removeEventListener("starnawska:consent", handler);
  }, []);

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <>
      {/* GA4 — analytics consent */}
      {consent?.analytics && gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {/* Meta Pixel — marketing consent */}
      {consent?.marketing && pixelId && (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}

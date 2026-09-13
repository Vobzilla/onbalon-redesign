import CookieBanner from "@/components/CookieBanner";
import Script from "next/script";

// ─── Google Ads ───────────────────────────────────────────────────────────────
// Після КРОКУ 1: замінити REPLACE_AW на реальний ID, напр. AW-123456789
const GOOGLE_ADS_ID = "AW-16531023419";

// Scoped to the public site only — /admin/* uses the root layout directly and
// never renders this, so owners' own actions never hit GA/Ads/Meta Pixel.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Meta Pixel — noscript fallback */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=4259424894316217&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

      {children}
      <CookieBanner />

      {/* Google Analytics GA4 + Google Ads — one gtag.js load shared by both.
          The library itself doesn't care which id is in its query string; it
          only bootstraps window.gtag/dataLayer, so a single load followed by
          two separate `gtag('config', ...)` calls configures both properties.
          lazyOnload: not needed for the initial render, and gtag.js/
          fbevents.js are the bulk of "unused JavaScript"/TBT on PageSpeed.
          Loading during idle time instead of right after hydration still
          fires PageView/config, just a beat later. */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-JY42M73V2Z"
        strategy="lazyOnload"
      />
      <Script id="google-tags" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-JY42M73V2Z');
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>

      {/* Meta Pixel */}
      <Script id="meta-pixel" strategy="lazyOnload">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '4259424894316217');
          fbq('track', 'PageView');
        `}
      </Script>
    </>
  );
}

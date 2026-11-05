import CookieBanner from "@/components/CookieBanner";
import ContactClickTracker from "@/components/ContactClickTracker";
import Script from "next/script";

// ─── Google Ads ───────────────────────────────────────────────────────────────
// Після КРОКУ 1: замінити REPLACE_AW на реальний ID, напр. AW-123456789
const GOOGLE_ADS_ID = "AW-16531023419";

// Scoped to the public site only — /admin/* uses the root layout directly and
// never renders this, so owners' own actions never hit GA/Ads/Meta Pixel.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* No <noscript> Pixel image: React turns an <img> into a
          <link rel="preload"> in <head>, so every visitor (with JS too, and
          without consent) sent an extra PageView to Meta. */}
      {children}
      <CookieBanner />
      <ContactClickTracker />

      {/* Google Analytics GA4 + Google Ads — one gtag.js load shared by both.
          The library itself doesn't care which id is in its query string; it
          only bootstraps window.gtag/dataLayer, so a single load followed by
          two separate `gtag('config', ...)` calls configures both properties.
          afterInteractive, not lazyOnload: config is what stores the gclid
          from an ad click (_gcl_aw), and with lazyOnload a visitor who taps
          a product within the first second leaves the landing URL before it
          runs, so the click is lost. The Cloudflare tag gateway doesn't store
          it on its own — it waits for this config. */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-JY42M73V2Z"
        strategy="afterInteractive"
      />
      <Script id="google-tags" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-JY42M73V2Z');
          gtag('config', '${GOOGLE_ADS_ID}');
          window.__obGtagReady = true;
        `}
      </Script>

      {/* Meta Pixel — consent revoked until the visitor accepts cookies
          (CookieBanner grants it on «Akceptuję»). Kept as is for a visitor
          who already accepted. */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          var obConsent = null;
          try { obConsent = localStorage.getItem('cookie_consent'); } catch (e) {}
          // Only revoke: consent is the Pixel's default, and a 'grant' before
          // init stops the PageView below from being sent at all.
          if (obConsent !== 'accepted') fbq('consent', 'revoke');
          fbq('init', '4259424894316217');
          fbq('track', 'PageView');
        `}
      </Script>
    </>
  );
}

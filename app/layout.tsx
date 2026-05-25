/** @format */

import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import CookieBanner from "@/components/CookieBanner";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://onbalon.pl'),
  title: "On.balon — dekoracje balonowe Szczecin. Dostawa i odbiór osobisty.",
  description:
    "Bukiety balonowe, dekoracje na roczek, urodziny, pierwsza komunia święta, wesela i eventy firmowe. Zamawiasz online — potwierdzamy w 15 minut. Szczecin i okolice.",
  openGraph: {
    title: "On.balon — dekoracje balonowe Szczecin",
    description:
      "Bukiety z helem, dekoracje na urodziny, roczek i eventy. Potwierdzamy w 15 minut · Dostawa pod drzwi.",
    url: "https://onbalon.pl",
    siteName: "On.balon",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/logo.png", width: 160, height: 52, alt: "On.balon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "On.balon — dekoracje balonowe Szczecin",
    description:
      "Bukiety z helem, dekoracje na urodziny, roczek i eventy. Potwierdzamy w 15 minut · Dostawa pod drzwi.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Preload font CSS — non-render-blocking */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Sansita:ital,wght@0,400;0,800;0,900;1,400;1,800&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400;1,6..72,600&display=swap"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sansita:ital,wght@0,400;0,800;0,900;1,400;1,800&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400;1,6..72,600&display=swap"
          rel="stylesheet"
          media="print"
        />
      </head>
      <body>
        <CartProvider>{children}</CartProvider>
        <CookieBanner />
        {/* Switch font stylesheet from print→all after page load */}
        <Script id="font-swap" strategy="afterInteractive">
          {`document.querySelector('link[media="print"][href*="fonts.googleapis"]').media='all'`}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JY42M73V2Z"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JY42M73V2Z');
          `}
        </Script>
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
            fbq('init', '4259424894316217');
            fbq('track', 'PageView');
          `}
        </Script>
      </body>
    </html>
  );
}

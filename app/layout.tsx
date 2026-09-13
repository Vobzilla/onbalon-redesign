/** @format */

import type { Metadata } from "next";
import { Sansita, Newsreader } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

// Self-hosted by next/font (built at compile time, served from our own
// domain) — replaces the old <link media="print"> + JS-swap trick. The
// `variable` names match the CSS custom properties globals.css already
// reads (--font-serif / --font-sans), so no other CSS needs to change.
// adjustFontFallback (on by default) computes a size-adjusted fallback
// face from the metrics below, so the fallback→webfont swap doesn't
// change text width/height and doesn't shift layout.
const sansita = Sansita({
  weight: ["400", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  fallback: ["Arial Black", "sans-serif"],
  display: "swap",
  variable: "--font-serif",
});

const newsreader = Newsreader({
  weight: "variable",
  axes: ["opsz"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  fallback: ["Georgia", "serif"],
  display: "swap",
  variable: "--font-sans",
  // next/font's automatic fallback-metric adjustment (which is what actually
  // prevents a reflow on swap) looks up this font's metrics under the exact
  // key "newsreader" in its bundled Capsize database — but that database
  // only has an entry for "newsreader16pt" (the optical-size static
  // instance Google publishes metrics for), so the lookup fails and
  // adjustFontFallback silently does nothing for this font (logs "Failed to
  // find font override values" on every build). Sansita isn't affected —
  // its plain family name matches. Set explicitly to false to stop next/font
  // from retrying (and logging the error) every build; this doesn't change
  // behavior, since it already wasn't adjusting anything.
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://onbalon.pl'),
  title: "On.balon — dekoracje balonowe Szczecin. Dostawa i odbiór osobisty.",
  description:
    "Zestawy balonów, dekoracje na roczek, urodziny, pierwsza komunia święta, wesela i eventy firmowe. Zamawiasz online — potwierdzamy w 15 minut. Szczecin i okolice.",
  openGraph: {
    title: "On.balon — dekoracje balonowe Szczecin",
    description:
      "Zestawy balonów z helem, dekoracje na urodziny, roczek i eventy. Potwierdzamy w 15 minut · Dostawa pod drzwi.",
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
      "Zestawy balonów z helem, dekoracje na urodziny, roczek i eventy. Potwierdzamy w 15 minut · Dostawa pod drzwi.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={`${sansita.variable} ${newsreader.variable}`}>
      <body>
        {/* CartProvider stays here (not in (site)) — Header/Footer use useCart()
            on the global not-found page too. Tracking scripts and the cookie
            banner live in app/(site)/layout.tsx so /admin/* never loads them. */}
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}

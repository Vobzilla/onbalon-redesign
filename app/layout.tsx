/** @format */

import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

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
        {/* CartProvider stays here (not in (site)) — Header/Footer use useCart()
            on the global not-found page too. Tracking scripts and the cookie
            banner live in app/(site)/layout.tsx so /admin/* never loads them. */}
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}

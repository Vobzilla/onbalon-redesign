/** @format */

import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "On.balon — dekoracje balonowe Szczecin. Dostawa i odbiór osobisty.",
  description:
    "Bukiety balonowe, dekoracje na roczek, urodziny, wesela i eventy firmowe. Zamawiasz online — potwierdzamy w 15 minut. Szczecin i okolice.",
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
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}

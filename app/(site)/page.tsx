/** @format */

import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductsSection from "@/components/ProductsSection";
import AnnounceBanner from "@/components/AnnounceBanner";
import ScrollToTop from "@/components/ScrollToTop";
import CheckoutFlow from "@/components/CheckoutFlow";
// Server-rendered (not ssr: false) so the FAQ text is in the HTML crawlers see.
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Reviews from "@/components/Reviews";
import HowItWorks from "@/components/HowItWorks";
import { getActiveProducts } from "@/lib/products";

const TITLE = "Balony z helem Szczecin — dostawa i dekoracje | On.balon";
const DESCRIPTION =
  "Balony z helem i dekoracje balonowe w Szczecinie. Zestawy na urodziny, roczek, komunię i wesele z dostawą. Zamów online — potwierdzimy w 15 minut.";

// Home-only title/description; app/layout.tsx stays the default for other
// pages. Next replaces openGraph/twitter as whole objects rather than
// merging them with the root's, so the root's remaining fields are repeated.
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://onbalon.pl",
    siteName: "On.balon",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/logo.png", width: 160, height: 52, alt: "On.balon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/logo.png"],
  },
};

// No ISR/Full Route Cache for this route — that layer made Netlify's
// Edge/Durable cache serve an empty 304 (no body) to clients without
// If-None-Match, so the home page wouldn't open. Same fix as
// product/[id]/page.tsx. Product data is still cached via unstable_cache
// (tag 'products-list', see lib/products.ts), so admin edits keep working.
export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await getActiveProducts();

  return (
    <>
      <AnnounceBanner />
      <Header />

      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero products={products} />
        <ProductsSection products={products} />
        <HowItWorks />
        <Reviews />
        <FAQ />
      </main>

      <Footer />
      <CheckoutFlow />
      <ScrollToTop />
    </>
  );
}

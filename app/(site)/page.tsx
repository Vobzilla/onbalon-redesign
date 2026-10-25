/** @format */

import nextDynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductsSection from "@/components/ProductsSection";
import AnnounceBanner from "@/components/AnnounceBanner";
import ScrollToTop from "@/components/ScrollToTop";
import CheckoutFlow from "@/components/CheckoutFlow";
// Server-rendered (not ssr: false) so the FAQ text is in the HTML crawlers see.
import FAQ from "@/components/FAQ";
import { getActiveProducts } from "@/lib/products";

// Lazy load below-the-fold sections
const HowItWorks = nextDynamic(() => import("@/components/HowItWorks"), { ssr: false })
const Reviews    = nextDynamic(() => import("@/components/Reviews"),    { ssr: false })
const Footer     = nextDynamic(() => import("@/components/Footer"),     { ssr: false })

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

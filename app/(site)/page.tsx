/** @format */

import nextDynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductsSection from "@/components/ProductsSection";
import AnnounceBanner from "@/components/AnnounceBanner";
import ScrollToTop from "@/components/ScrollToTop";
import CheckoutFlow from "@/components/CheckoutFlow";
import { getActiveProducts } from "@/lib/products";

// Lazy load below-the-fold sections
const HowItWorks = nextDynamic(() => import("@/components/HowItWorks"), { ssr: false })
const Reviews    = nextDynamic(() => import("@/components/Reviews"),    { ssr: false })
const FAQ        = nextDynamic(() => import("@/components/FAQ"),        { ssr: false })
const Footer     = nextDynamic(() => import("@/components/Footer"),     { ssr: false })

// Always read the current DB state (products can change in Postgres without a redeploy).
export const dynamic = "force-dynamic";

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

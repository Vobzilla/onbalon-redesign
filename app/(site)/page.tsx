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

// Statically generated and cached; the admin API triggers an on-demand
// revalidation via revalidateTag('products-list') right after a product is
// saved/deleted, so this is a fallback for anything that misses that (e.g. a
// direct DB edit).
export const revalidate = 3600;

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

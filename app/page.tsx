/** @format */

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductsSection from "@/components/ProductsSection";
import AnnounceBanner from "@/components/AnnounceBanner";
import ScrollToTop from "@/components/ScrollToTop";
import CheckoutFlow from "@/components/CheckoutFlow";

// Lazy load below-the-fold sections
const HowItWorks = dynamic(() => import("@/components/HowItWorks"), { ssr: false })
const Reviews    = dynamic(() => import("@/components/Reviews"),    { ssr: false })
const FAQ        = dynamic(() => import("@/components/FAQ"),        { ssr: false })
const Footer     = dynamic(() => import("@/components/Footer"),     { ssr: false })

export default function Home() {
  return (
    <>
      <AnnounceBanner />
      <Header />

      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <ProductsSection />
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

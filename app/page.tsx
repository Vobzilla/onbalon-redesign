/** @format */

"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductsSection from "@/components/ProductsSection";
import HowItWorks from "@/components/HowItWorks";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import OrderModal from "@/components/OrderModal";
import { Category } from "@/data/products";

// Balloon decorations scattered around the page

export default function Home() {
  const [filterCategory, setFilterCategory] = useState<Category | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Floating balloon decorations */}
      {/* Announce bar */}
      <div className="announce">
        <span className="announce-dot" />
        Dostawa <strong>dopasowana</strong> do Twojego terminu na terenie Szczecina
        <span className="announce-sep">·</span>
        Potwierdzamy w <strong>15 minut</strong>
      </div>

      <Header />

      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <ProductsSection initialCategory={filterCategory} />
        <HowItWorks />
        <Reviews />
        <FAQ />
      </main>

      <Footer />

      <Cart onCheckout={() => setModalOpen(true)} />
      <OrderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

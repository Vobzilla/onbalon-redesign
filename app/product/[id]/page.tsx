'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { products } from '@/data/products'
import { getProductDetails } from '@/data/productDefaults'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Cart from '@/components/Cart'
import OrderModal from '@/components/OrderModal'
import AnnounceBanner from '@/components/AnnounceBanner'
import ScrollToTop from '@/components/ScrollToTop'

export default function ProductPage({ params }: { params: { id: string } }) {
  const [added, setAdded]         = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [lightbox, setLightbox]   = useState(false)
  const { addItem, items } = useCart()

  const product = products.find(p => p.id === Number(params.id))

  if (!product) {
    return (
      <div style={{ padding: '140px 24px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: 16 }}>Produkt nie znaleziony</h2>
        <Link href="/" style={{ color: 'var(--accent)', fontWeight: 600 }}>
          ← Wróć do strony głównej
        </Link>
      </div>
    )
  }

  const details = getProductDetails(product)
  const isDekoracja =
    product.category === 'Dekoracje balonowe' ||
    /^(Girlanda|Dekoracja|Brama|Kolumna|Ściana|Łuk|Arch)/.test(product.name)

  function handleAdd() {
    addItem(product!)
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  function handleOrder() {
    if (!items.find(i => i.product.id === product!.id)) {
      addItem(product!)
    }
    setModalOpen(true)
  }

  return (
    <>
      <AnnounceBanner />

      <Header />

      <main className="prod-page">
        <div className="section-inner">

          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link href="/">Strona główna</Link>
            <span className="breadcrumb-sep">›</span>
            <Link href="/#products">Katalog</Link>
            <span className="breadcrumb-sep">›</span>
            <span>{product.name}</span>
          </nav>

          <div className="prod-page-layout">

            {/* ── Left: image ── */}
            <div className="prod-page-img-col">
              <div
                className="prod-page-img-frame prod-page-img-clickable"
                onClick={() => setLightbox(true)}
                title="Kliknij, aby powiększyć"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 560px"
                  style={{ objectFit: 'contain' }}
                />
                <span className="prod-page-zoom-hint">🔍</span>
              </div>
            </div>

            {/* ── Lightbox ── */}
            {lightbox && (
              <div className="lightbox-overlay" onClick={() => setLightbox(false)}>
                <button className="lightbox-close" onClick={() => setLightbox(false)}>✕</button>
                <div className="lightbox-img-wrap" onClick={e => e.stopPropagation()}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="100vw"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
            )}

            {/* ── Right: details ── */}
            <div className="prod-page-info">
              <p className="prod-page-cat-label">{product.category}</p>
              <h1 className="prod-page-name">{product.name}</h1>
              <p className="prod-page-desc">{details.description}</p>

              <div className="prod-page-price">
                {product.price}<span className="prod-page-currency">zł</span>
              </div>

              {/* Composition — only for bouquets */}
              {!isDekoracja && (
                <>
                  <p className="prod-page-section-label">Skład zestawu</p>
                  <div className="prod-page-contents">
                    {details.contents.map((item, i) => (
                      <div key={i} className="prod-content-item">
                        <div className="prod-content-item-info">
                          <span className="prod-content-item-name">{item.name}</span>
                          <span className="prod-content-item-detail">{item.detail}</span>
                        </div>
                        <span className="prod-content-item-qty">× {item.qty}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Includes */}
              <p className="prod-page-section-label">W zestawie</p>
              <ul className="prod-page-includes">
                {details.includes.map((item, i) => (
                  <li key={i} className="prod-page-include-item">
                    <span className="prod-page-check">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Buttons */}
              <div className="prod-page-btns">
                <button
                  className="btn-primary"
                  onClick={handleAdd}
                  style={added ? { background: '#2d7a3a', flex: 1 } : { flex: 1 }}
                >
                  {added ? '✓ Dodano do koszyka!' : '🛒 Dodaj do koszyka'}
                </button>
                <button
                  className="btn-secondary"
                  style={{ flex: 1 }}
                  onClick={handleOrder}
                >
                  📋 Złóż zamówienie
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
      <Cart onCheckout={() => setModalOpen(true)} />
      <OrderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <ScrollToTop />
    </>
  )
}

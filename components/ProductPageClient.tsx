'use client'

import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import type { ProductWithDetails } from '@/lib/products'
import type { Addon } from '@/lib/addons'
import Header from '@/components/Header'
import AnnounceBanner from '@/components/AnnounceBanner'
import ScrollToTop from '@/components/ScrollToTop'

const Footer     = dynamic(() => import('@/components/Footer'),     { ssr: false })
const Cart       = dynamic(() => import('@/components/Cart'),       { ssr: false })
const OrderModal = dynamic(() => import('@/components/OrderModal'), { ssr: false })

type Props = { product: ProductWithDetails; addons?: Addon[] }

export default function ProductPageClient({ product, addons = [] }: Props) {
  const [added, setAdded]         = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [lightbox, setLightbox]   = useState(false)
  const { addItem, items } = useCart()

  const hasColors = product.hasColorVariants && product.colorVariants.length > 0
  const galleryImages = hasColors ? product.colorVariants.map(v => v.imageUrl) : [product.image]
  const [imgIndex, setImgIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState(hasColors ? product.colorVariants[0].colorName : '')
  const touchStartX = useRef<number | null>(null)

  function showPrev() {
    setImgIndex(i => (i - 1 + galleryImages.length) % galleryImages.length)
  }
  function showNext() {
    setImgIndex(i => (i + 1) % galleryImages.length)
  }
  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(dx) < 40) return
    if (dx < 0) showNext(); else showPrev()
  }
  function selectColor(index: number) {
    setSelectedColor(product.colorVariants[index].colorName)
    setImgIndex(index)
  }

  const [addonQty, setAddonQty] = useState<Record<number, number>>({})
  function toggleAddon(id: number) {
    setAddonQty(q => {
      const next = { ...q }
      if (next[id]) delete next[id]; else next[id] = 1
      return next
    })
  }
  function changeAddonQty(id: number, delta: number) {
    setAddonQty(q => {
      const current = q[id] ?? 0
      const value = Math.max(0, current + delta)
      const next = { ...q }
      if (value === 0) delete next[id]; else next[id] = value
      return next
    })
  }
  const addonsTotal = addons.reduce((sum, a) => sum + (addonQty[a.id] ?? 0) * a.price, 0)

  const details = { description: product.description, contents: product.contents, includes: product.includes }
  const isDekoracja =
    product.category === 'Dekoracje balonowe' ||
    /^(Girlanda|Dekoracja|Brama|Kolumna|Ściana|Łuk|Arch)/.test(product.name)

  function selectedAddonsForCart() {
    return addons
      .filter(a => addonQty[a.id] > 0)
      .map(a => ({ name: a.name, price: a.price, qty: addonQty[a.id] }))
  }

  function selectedColorImageForCart() {
    if (!hasColors) return undefined
    return product.colorVariants.find(v => v.colorName === selectedColor)?.imageUrl
  }

  function handleAdd() {
    addItem(product, {
      selectedColor: hasColors ? selectedColor : undefined,
      selectedColorImage: selectedColorImageForCart(),
      selectedAddons: selectedAddonsForCart(),
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  function handleOrder() {
    if (!items.find(i => i.product.id === product.id)) {
      addItem(product, {
        selectedColor: hasColors ? selectedColor : undefined,
        selectedColorImage: selectedColorImageForCart(),
        selectedAddons: selectedAddonsForCart(),
      })
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
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                title="Kliknij, aby powiększyć"
              >
                <Image
                  src={galleryImages[imgIndex]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 560px"
                  priority
                  style={{ objectFit: 'contain' }}
                />
                <span className="prod-page-zoom-hint">🔍</span>

                {galleryImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="prod-carousel-arrow prod-carousel-arrow-prev"
                      onClick={e => { e.stopPropagation(); showPrev() }}
                      aria-label="Poprzednie zdjęcie"
                    >‹</button>
                    <button
                      type="button"
                      className="prod-carousel-arrow prod-carousel-arrow-next"
                      onClick={e => { e.stopPropagation(); showNext() }}
                      aria-label="Następne zdjęcie"
                    >›</button>
                    <div className="prod-carousel-dots" onClick={e => e.stopPropagation()}>
                      {galleryImages.map((_, i) => (
                        <button
                          type="button"
                          key={i}
                          className={`prod-carousel-dot${i === imgIndex ? ' prod-carousel-dot-active' : ''}`}
                          onClick={() => setImgIndex(i)}
                          aria-label={`Zdjęcie ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* ── Lightbox ── */}
            {lightbox && (
              <div className="lightbox-overlay" onClick={() => setLightbox(false)}>
                <button className="lightbox-close" onClick={() => setLightbox(false)}>✕</button>
                <div className="lightbox-img-wrap" onClick={e => e.stopPropagation()}>
                  <Image
                    src={galleryImages[imgIndex]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 900px, 1920px"
                    priority
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
            )}

            {/* ── Right: details ── */}
            <div className="prod-page-info">
              <p className="prod-page-cat-label">{product.category}</p>
              <h1 className="prod-page-name">{product.name}</h1>
              {details.description && (
                <p className="prod-page-desc">{details.description}</p>
              )}

              <div className="prod-page-price">
                {isDekoracja && <span className="prod-page-price-from">od </span>}
                {product.price}<span className="prod-page-currency">zł</span>
              </div>

              {hasColors && (
                <div className="prod-color-toggle">
                  {product.colorVariants.map((v, i) => (
                    <button
                      type="button"
                      key={v.colorName}
                      className={`prod-color-pill${v.colorName === selectedColor ? ' prod-color-pill-active' : ''}`}
                      onClick={() => selectColor(i)}
                    >
                      {v.colorName}
                    </button>
                  ))}
                </div>
              )}

              {/* Composition — only when contents defined */}
              {details.contents.length > 0 && (
                <>
                  <p className="prod-page-section-label">Zestaw</p>
                  <div className="prod-page-contents-wrap">
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
                  </div>
                  {details.contents.some(item => /cyfra/i.test(item.name)) && (
                    <p className="prod-content-cyfra-hint">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      Cyfrę możesz zmienić na dowolną — wpisz w uwagach przy składaniu zamówienia.
                    </p>
                  )}
                </>
              )}

              {/* Includes */}
              <p className="prod-page-section-label">Cena zawiera</p>
              <ul className="prod-page-includes">
                {details.includes.map((item, i) => (
                  <li key={i} className="prod-page-include-item">
                    <span className="prod-page-check">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Add-ons */}
              {addons.length > 0 && (
                <>
                  <p className="prod-page-section-label">Dodaj do zamówienia</p>
                  <div className="prod-addons">
                    {addons.map(addon => {
                      const qty = addonQty[addon.id] ?? 0
                      return (
                        <div className="prod-addon-row" key={addon.id}>
                          <label className="prod-addon-check">
                            <input
                              type="checkbox"
                              checked={qty > 0}
                              onChange={() => toggleAddon(addon.id)}
                            />
                            <span className="prod-addon-name">{addon.name}</span>
                          </label>
                          <span className="prod-addon-price">{addon.price} zł</span>
                          {qty > 0 && (
                            <div className="prod-addon-qty">
                              <button type="button" onClick={() => changeAddonQty(addon.id, -1)} aria-label="Mniej">−</button>
                              <span>{qty}</span>
                              <button type="button" onClick={() => changeAddonQty(addon.id, 1)} aria-label="Więcej">+</button>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  {addonsTotal > 0 && (
                    <p className="prod-addons-total">Dodatki: <strong>{addonsTotal} zł</strong></p>
                  )}
                </>
              )}

              {/* Buttons */}
              <div className="prod-page-btns">
                <button
                  className="btn-primary"
                  onClick={handleAdd}
                  style={added ? { background: '#2d7a3a', flex: 1 } : { flex: 1 }}
                >
                  {added ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      Dodano do koszyka!
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                      Dodaj do koszyka
                    </>
                  )}
                </button>
                <button
                  className="btn-secondary"
                  style={{ flex: 1 }}
                  onClick={handleOrder}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                  Złóż zamówienie
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

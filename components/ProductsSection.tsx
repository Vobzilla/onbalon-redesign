'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { products, CATEGORIES, type Product, type Category } from '@/data/products'
import { useCart } from '@/context/CartContext'

const PILL_CLASS: Record<Category, string> = {
  'Roczek':               'pill-roczek',
  '18-tka':               'pill-18-ka',
  'Dla niej':             'pill-dla-niej',
  'Dla niego':            'pill-dla-niego',
  'Dla dziecka':          'pill-dziecka',
  'Dekoracje balonowe':   'pill-dekoracje',
  'Hello Baby':           'pill-hello-baby',
  'Małe Zestawy':         'pill-male-zestawy',
}

const PAGE_SIZE = 6

export default function ProductsSection() {
  const [activeFilter, setActiveFilter] = useState<Category | null>(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [added, setAdded]               = useState<number | null>(null)
  const { addItem } = useCart()

  useEffect(() => {
    const savedScroll = sessionStorage.getItem('shop_scroll')
    const savedFilter = sessionStorage.getItem('shop_filter')
    const savedCount  = sessionStorage.getItem('shop_count')

    if (savedScroll !== null) {
      setActiveFilter((savedFilter as Category) || null)
      setVisibleCount(Number(savedCount) || PAGE_SIZE)
      sessionStorage.removeItem('shop_scroll')
      sessionStorage.removeItem('shop_filter')
      sessionStorage.removeItem('shop_count')
      const y = Number(savedScroll)
      setTimeout(() => window.scrollTo({ top: y, behavior: 'instant' }), 100)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function saveScrollState() {
    sessionStorage.setItem('shop_scroll', String(window.scrollY))
    sessionStorage.setItem('shop_filter', activeFilter ?? '')
    sessionStorage.setItem('shop_count', String(visibleCount))
  }

  const filtered = activeFilter ? products.filter(p => p.category === activeFilter) : products
  const visible  = filtered.slice(0, visibleCount)

  function handleAdd(e: React.MouseEvent, product: Product) {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    setAdded(product.id)
    setTimeout(() => setAdded(null), 1400)
  }

  function handleFilter(cat: Category | null) {
    setActiveFilter(cat)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <section className="products-section" id="products">
      <div className="section-inner">
        <div className="products-header">
          <div className="prod-title-block">
            <p className="eyebrow">Katalog</p>
            <h2 className="section-title">
              {activeFilter ? activeFilter : 'Najpopularniejsze'}
              <em>w naszej ofercie</em>
            </h2>
          </div>
          <div className="filters">
            <button
              className={`filter-btn${activeFilter === null ? ' active' : ''}`}
              onClick={() => handleFilter(null)}
            >
              Wszystkie
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`filter-btn${activeFilter === cat ? ' active' : ''}`}
                onClick={() => handleFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="prod-grid">
          {visible.map(product => (
            <Link key={product.id} href={`/product/${product.id}`} className="prod-card-link" onClick={saveScrollState}>
              <article className="prod-card">
                <div className="prod-img-wrap">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 44vw, 320px"
                    className="prod-img"
                  />
                  <span className={`prod-category-pill ${PILL_CLASS[product.category]}`}>
                    {product.category}
                  </span>
                </div>
                <div className="prod-body">
                  <p className="prod-cat-label">{product.category}</p>
                  <h3 className="prod-name">{product.name}</h3>
                  <div className="prod-foot">
                    <span className="prod-price">
                      {product.category === 'Dekoracje balonowe' && <small>od </small>}
                      {product.price} <small>zł</small>
                    </span>
                    <div className="prod-btns">
                      <span className="detail-btn">Szczegóły →</span>
                      <button
                        className={`add-cart-btn${added === product.id ? ' added' : ''}`}
                        onClick={e => handleAdd(e, product)}
                        title="Dodaj do koszyka"
                        aria-label="Dodaj do koszyka"
                      >
                        {added === product.id
                          ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                        }
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="no-results">Brak produktów w tej kategorii.</p>
        )}

        {visibleCount < filtered.length && (
          <div className="show-more-wrap">
            <button
              className="show-more-btn"
              onClick={() => setVisibleCount(v => Math.min(v + PAGE_SIZE, filtered.length))}
            >
              {`Pokaż więcej ↓ (${Math.min(PAGE_SIZE, filtered.length - visibleCount)} z ${filtered.length - visibleCount} pozostałych)`}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

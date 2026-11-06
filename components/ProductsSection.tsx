'use client'

import { useState, useEffect, useMemo } from 'react'
import { CATEGORIES, type Category } from '@/data/products'
import type { ProductWithDetails } from '@/lib/products'
import Link from 'next/link'
import ProductCard, { useAddToCart } from '@/components/ProductCard'
import { categoryPagePath } from '@/lib/categories'

const PAGE_SIZE = 6

// «Wszystkie»: one product from each category in turn, in tab order (CATEGORIES),
// round and round; within a category the products keep their sortOrder, and a
// category that has run out is skipped. Deterministic (no randomness), so the
// server render and the browser agree. Category tabs keep the plain order.
function mixByCategory(products: ProductWithDetails[]): ProductWithDetails[] {
  const queues = CATEGORIES.map(cat => products.filter(p => p.category === cat))
  const known = new Set<string>(CATEGORIES)
  const mixed: ProductWithDetails[] = []
  for (let i = 0; queues.some(q => i < q.length); i++) {
    for (const q of queues) if (i < q.length) mixed.push(q[i])
  }
  // Anything with a category that has no tab stays at the end, in order.
  return mixed.concat(products.filter(p => !known.has(p.category)))
}

type Props = { products: ProductWithDetails[] }

export default function ProductsSection({ products }: Props) {
  const [activeFilter, setActiveFilter] = useState<Category | null>(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const { added, handleAdd } = useAddToCart('catalog')

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

  const mixed    = useMemo(() => mixByCategory(products), [products])
  const filtered = activeFilter ? products.filter(p => p.category === activeFilter) : mixed
  const visible  = filtered.slice(0, visibleCount)

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
            <ProductCard
              key={product.id}
              product={product}
              added={added === product.id}
              onAdd={handleAdd}
              onOpen={saveScrollState}
            />
          ))}
        </div>

        {/* A category tab links to that category's own page; «Wszystkie» doesn't. */}
        {activeFilter && categoryPagePath(activeFilter) && (
          <p className="cat-all-link-wrap">
            <Link href={categoryPagePath(activeFilter)!} className="cat-all-link">
              Zobacz wszystkie zestawy: {activeFilter} →
            </Link>
          </p>
        )}

        {filtered.length === 0 && (
          <p className="no-results">Brak produktów w tej kategorii.</p>
        )}

        {visibleCount < filtered.length && (
          <div className="show-more-wrap">
            <button
              className="show-more-btn"
              data-keep-clear
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

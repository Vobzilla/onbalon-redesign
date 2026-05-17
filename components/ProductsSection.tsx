'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { products, CATEGORIES, Category } from '@/data/products'
import { useCart } from '@/context/CartContext'

const PILL_CLASS: Record<Category, string> = {
  'Roczek':             'pill-roczek',
  '18-ka':              'pill-18-ka',
  'Dla dziecka':        'pill-dziecka',
  'Urodziny':           'pill-urodziny',
  'Dla niej':           'pill-dla-niej',
  'Dla niego':          'pill-dla-niego',
  'Chrzest & Komunia':  'pill-chrzest',
  'Biznes':             'pill-biznes',
}

const PAGE_SIZE = 6

type Props = { initialCategory?: Category | null }

export default function ProductsSection({ initialCategory }: Props) {
  const [activeFilter, setActiveFilter] = useState<Category | null>(initialCategory ?? null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [added, setAdded]               = useState<number | null>(null)
  const { addItem } = useCart()

  useEffect(() => {
    if (initialCategory !== undefined) {
      setActiveFilter(initialCategory)
      setVisibleCount(PAGE_SIZE)
    }
  }, [initialCategory])

  const filtered = activeFilter ? products.filter(p => p.category === activeFilter) : products
  const visible  = filtered.slice(0, visibleCount)

  function handleAdd(e: React.MouseEvent, productId: number) {
    e.preventDefault()
    e.stopPropagation()
    const product = products.find(p => p.id === productId)!
    addItem(product)
    setAdded(productId)
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
            <article key={product.id} className="prod-card">
              <div className="prod-img-wrap">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                  <span className="prod-price">{product.price} <small>zł</small></span>
                  <div className="prod-btns">
                    <Link href={`/product/${product.id}`} className="detail-btn">
                      Szczegóły →
                    </Link>
                    <button
                      className={`add-cart-btn${added === product.id ? ' added' : ''}`}
                      onClick={e => handleAdd(e, product.id)}
                      title="Dodaj do koszyka"
                      aria-label="Dodaj do koszyka"
                    >
                      {added === product.id ? '✓' : '🛒'}
                    </button>
                  </div>
                </div>
              </div>
            </article>
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

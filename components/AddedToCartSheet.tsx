'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useCart, type SelectedAddon } from '@/context/CartContext'

// Confirmation after any «Dodaj do koszyka» (product page and catalog cards):
// a bottom sheet on phones, the same panel centred at the bottom on wider
// screens. Mounted next to <Cart> (CheckoutFlow, ProductPageClient); the add
// buttons open it with showAddedToCart(), so they don't need to share state.

export type AddedToCartInfo = {
  name: string
  image: string
  price: number
  color?: string
  addons?: SelectedAddon[]
}

const EVENT = 'onbalon:added-to-cart'
// Dragging the sheet down this far closes it.
const SWIPE_CLOSE_PX = 80

export function showAddedToCart(info: AddedToCartInfo) {
  window.dispatchEvent(new CustomEvent<AddedToCartInfo>(EVENT, { detail: info }))
}

export default function AddedToCartSheet() {
  const [info, setInfo] = useState<AddedToCartInfo | null>(null)
  const [dragY, setDragY] = useState(0)
  const { openCart } = useCart()
  const panelRef = useRef<HTMLDivElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const dragStart = useRef<number | null>(null)

  useEffect(() => {
    function onAdded(e: Event) {
      returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
      setDragY(0)
      setInfo((e as CustomEvent<AddedToCartInfo>).detail)
    }
    window.addEventListener(EVENT, onAdded)
    return () => window.removeEventListener(EVENT, onAdded)
  }, [])

  const close = useCallback(() => setInfo(null), [])
  const open = info !== null

  // While open: page scroll locked (the scroll position stays), focus inside
  // the panel, Esc closes, Tab cycles through the panel's buttons.
  useEffect(() => {
    if (!open) return
    const html = document.documentElement
    const prevOverflow = html.style.overflow
    const prevPadding = html.style.paddingRight
    const scrollbar = window.innerWidth - html.clientWidth
    html.style.overflow = 'hidden'
    if (scrollbar > 0) html.style.paddingRight = `${scrollbar}px`
    panelRef.current?.focus({ preventScroll: true })

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { e.preventDefault(); close(); return }
      if (e.key !== 'Tab' || !panelRef.current) return
      const buttons = panelRef.current.querySelectorAll<HTMLElement>('button')
      if (buttons.length === 0) return
      const first = buttons[0]
      const last = buttons[buttons.length - 1]
      const active = document.activeElement
      if (e.shiftKey && (active === first || active === panelRef.current)) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      html.style.overflow = prevOverflow
      html.style.paddingRight = prevPadding
      returnFocus.current?.focus({ preventScroll: true })
    }
  }, [open, close])

  if (!info) return null

  const addons = info.addons ?? []
  const total = info.price + addons.reduce((s, a) => s + a.price * a.qty, 0)

  return (
    <div className="atc-overlay" onClick={close}>
      <div
        ref={panelRef}
        className="atc-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="atc-title"
        tabIndex={-1}
        onClick={e => e.stopPropagation()}
        onTouchStart={e => { dragStart.current = e.touches[0].clientY }}
        onTouchMove={e => {
          if (dragStart.current === null) return
          setDragY(Math.max(0, e.touches[0].clientY - dragStart.current))
        }}
        onTouchEnd={() => {
          dragStart.current = null
          if (dragY > SWIPE_CLOSE_PX) close(); else setDragY(0)
        }}
        style={dragY > 0 ? { transform: `translateY(${dragY}px)`, transition: 'none' } : undefined}
      >
        <div className="atc-grip" aria-hidden="true" />
        <button className="modal-close atc-close" onClick={close} aria-label="Zamknij" data-keep-clear>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <h2 className="atc-title" id="atc-title">Dodano do koszyka ✓</h2>

        <div className="atc-item">
          <div className="ci-img-wrap">
            <Image src={info.image} alt="" fill className="ci-img" sizes="64px" />
          </div>
          <div className="atc-info">
            <p className="atc-name">{info.name}</p>
            {info.color && <p className="atc-meta">Kolor: {info.color}</p>}
            {addons.map((a, i) => (
              <p className="atc-meta" key={i}>
                + {a.name}{a.qty > 1 ? ` × ${a.qty}` : ''} — {a.price * a.qty} zł
              </p>
            ))}
          </div>
          <p className="atc-price">{total} zł</p>
        </div>

        <div className="atc-actions">
          <button className="btn-primary btn-full" data-keep-clear onClick={() => { close(); openCart() }}>
            Przejdź do koszyka
          </button>
          <button className="btn-secondary btn-full" data-keep-clear onClick={close}>
            Kontynuuj zakupy
          </button>
        </div>
      </div>
    </div>
  )
}

'use client'

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import { Product } from '@/data/products'

// A product in the cart. Add-ons are not part of it any more: they are their
// own lines (CartAddonLine) with their own quantity.
export type CartProductLine = {
  product: Product
  qty: number
  selectedColor?: string
  selectedColorImage?: string
}
// addonId is null for add-ons moved over from an old cart whose name doesn't
// match an active add-on (renamed or switched off); name and price are kept
// as they were added.
export type CartAddonLine = { addonId: number | null; name: string; price: number; qty: number }
// The active add-ons from the database, as the cart offers them.
export type AddonOption = { id: number; name: string; price: number }

type AddItemOptions = { selectedColor?: string; selectedColorImage?: string }

type CartContextType = {
  items: CartProductLine[]
  addons: CartAddonLine[]
  totalCount: number
  // The only place the cart total is computed: products + add-ons.
  totalPrice: number
  addItem: (product: Product, options?: AddItemOptions) => void
  changeQty: (id: number, delta: number) => void
  // Sets an add-on's quantity; 0 removes the line. Matched by addonId, or by
  // name for a line without one.
  setAddonQty: (addon: { addonId: number | null; name: string; price: number }, qty: number) => void
  // Gives lines without an id the id of the active add-on with the same name,
  // and refreshes name/price of lines that match an active add-on.
  syncAddons: (active: AddonOption[]) => void
  clear: () => void
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  loaded: boolean
}

const CartContext = createContext<CartContextType | null>(null)
const STORAGE_KEY = 'onbalon_cart'

type StoredCart = { v: 2; items: CartProductLine[]; addons: CartAddonLine[] }

const EMPTY: StoredCart = { v: 2, items: [], addons: [] }

function isAddonLine(a: unknown): a is CartAddonLine {
  if (typeof a !== 'object' || a === null) return false
  const l = a as CartAddonLine
  return typeof l.name === 'string' && Number.isFinite(l.price) && Number.isInteger(l.qty) && l.qty > 0
    && (l.addonId === null || typeof l.addonId === 'number')
}

function isProductLine(i: unknown): i is CartProductLine {
  return typeof i === 'object' && i !== null &&
    typeof (i as CartProductLine).product === 'object' && (i as CartProductLine).product !== null
}

// Reads onbalon_cart. A plain array is the old format, where add-ons sat
// inside each product as selectedAddons ({name, price, qty}): they become
// add-on lines, quantities summed by name, addonId left for syncAddons.
export function parseStoredCart(raw: string | null): StoredCart {
  if (!raw) return EMPTY
  let data: unknown
  try { data = JSON.parse(raw) } catch { return EMPTY }

  if (Array.isArray(data)) {
    const addons: CartAddonLine[] = []
    const items = data.filter(isProductLine).map(line => {
      const { selectedAddons, ...rest } = line as CartProductLine & { selectedAddons?: unknown }
      if (Array.isArray(selectedAddons)) {
        for (const a of selectedAddons) {
          if (typeof a !== 'object' || a === null) continue
          const { name, price, qty } = a as { name?: unknown; price?: unknown; qty?: unknown }
          if (typeof name !== 'string' || !Number.isFinite(Number(price)) || !(Number(qty) > 0)) continue
          const same = addons.find(x => x.name === name)
          if (same) same.qty += Number(qty)
          else addons.push({ addonId: null, name, price: Number(price), qty: Number(qty) })
        }
      }
      return rest
    })
    return { v: 2, items, addons }
  }

  if (typeof data === 'object' && data !== null && (data as StoredCart).v === 2) {
    const d = data as Partial<StoredCart>
    return {
      v: 2,
      items: Array.isArray(d.items) ? d.items.filter(isProductLine) : [],
      addons: Array.isArray(d.addons) ? d.addons.filter(isAddonLine) : [],
    }
  }
  return EMPTY
}

export function cartTotal(items: CartProductLine[], addons: CartAddonLine[]): number {
  return items.reduce((s, i) => s + i.product.price * i.qty, 0) +
    addons.reduce((s, a) => s + a.price * a.qty, 0)
}

const sameAddon = (line: CartAddonLine, key: { addonId: number | null; name: string }) =>
  key.addonId !== null && line.addonId !== null ? line.addonId === key.addonId : line.name === key.name

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartProductLine[]>([])
  const [addons, setAddons] = useState<CartAddonLine[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = parseStoredCart(localStorage.getItem(STORAGE_KEY))
      setItems(saved.items)
      setAddons(saved.addons)
    } catch {}
    setLoaded(true)
  }, [])

  // Save to localStorage on every change (only after initial load)
  useEffect(() => {
    if (!loaded) return
    try {
      const stored: StoredCart = { v: 2, items, addons }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
    } catch {}
  }, [items, addons, loaded])

  const addItem = useCallback((product: Product, options?: AddItemOptions) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id)
      if (existing) {
        return prev.map(i => i.product.id === product.id
          ? {
              ...i,
              qty: i.qty + 1,
              selectedColor: options?.selectedColor ?? i.selectedColor,
              selectedColorImage: options?.selectedColorImage ?? i.selectedColorImage,
            }
          : i)
      }
      return [...prev, {
        product,
        qty: 1,
        selectedColor: options?.selectedColor,
        selectedColorImage: options?.selectedColorImage,
      }]
    })
  }, [])

  const changeQty = useCallback((id: number, delta: number) => {
    setItems(prev =>
      prev
        .map(i => i.product.id === id ? { ...i, qty: i.qty + delta } : i)
        .filter(i => i.qty > 0)
    )
  }, [])

  const setAddonQty = useCallback((addon: { addonId: number | null; name: string; price: number }, qty: number) => {
    setAddons(prev => {
      const n = Math.max(0, Math.floor(qty))
      const existing = prev.find(l => sameAddon(l, addon))
      if (!existing) return n > 0 ? [...prev, { addonId: addon.addonId, name: addon.name, price: addon.price, qty: n }] : prev
      return n > 0 ? prev.map(l => (l === existing ? { ...l, qty: n } : l)) : prev.filter(l => l !== existing)
    })
  }, [])

  const syncAddons = useCallback((active: AddonOption[]) => {
    setAddons(prev => {
      let changed = false
      const next = prev.map(l => {
        const match = l.addonId !== null
          ? active.find(a => a.id === l.addonId)
          : active.find(a => a.name === l.name)
        if (!match) return l
        if (l.addonId === match.id && l.name === match.name && l.price === match.price) return l
        changed = true
        return { ...l, addonId: match.id, name: match.name, price: match.price }
      })
      return changed ? next : prev
    })
  }, [])

  const clear = useCallback(() => { setItems([]); setAddons([]) }, [])

  const totalCount = items.reduce((s, i) => s + i.qty, 0)
  const totalPrice = cartTotal(items, addons)

  return (
    <CartContext.Provider value={{
      items, addons, totalCount, totalPrice,
      addItem, changeQty, setAddonQty, syncAddons, clear,
      isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false),
      loaded,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

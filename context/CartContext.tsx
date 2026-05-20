'use client'

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import { Product } from '@/data/products'

type CartItem = { product: Product; qty: number }

type CartContextType = {
  items: CartItem[]
  totalCount: number
  totalPrice: number
  addItem: (product: Product) => void
  changeQty: (id: number, delta: number) => void
  clear: () => void
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  loaded: boolean
}

const CartContext = createContext<CartContextType | null>(null)
const STORAGE_KEY = 'onbalon_cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setItems(JSON.parse(saved))
    } catch {}
    setLoaded(true)
  }, [])

  // Save to localStorage on every change (only after initial load)
  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {}
  }, [items, loaded])

  const addItem = useCallback((product: Product) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id)
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { product, qty: 1 }]
    })
  }, [])

  const changeQty = useCallback((id: number, delta: number) => {
    setItems(prev =>
      prev
        .map(i => i.product.id === id ? { ...i, qty: i.qty + delta } : i)
        .filter(i => i.qty > 0)
    )
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const totalCount = items.reduce((s, i) => s + i.qty, 0)
  const totalPrice = items.reduce((s, i) => s + i.product.price * i.qty, 0)

  return (
    <CartContext.Provider value={{
      items, totalCount, totalPrice,
      addItem, changeQty, clear,
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

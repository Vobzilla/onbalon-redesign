'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Cart from '@/components/Cart'
import AddedToCartSheet from '@/components/AddedToCartSheet'
import type { AddonOption } from '@/context/CartContext'

const OrderModal = dynamic(() => import('@/components/OrderModal'), { ssr: false })

export default function CheckoutFlow({ addons = [] }: { addons?: AddonOption[] }) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Cart addons={addons} onCheckout={() => setModalOpen(true)} />
      <OrderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <AddedToCartSheet />
    </>
  )
}

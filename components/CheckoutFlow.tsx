'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Cart from '@/components/Cart'

const OrderModal = dynamic(() => import('@/components/OrderModal'), { ssr: false })

export default function CheckoutFlow() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Cart onCheckout={() => setModalOpen(true)} />
      <OrderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}

'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ProductsSection from '@/components/ProductsSection'
import HowItWorks from '@/components/HowItWorks'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import Cart from '@/components/Cart'
import OrderModal from '@/components/OrderModal'
import { Category } from '@/data/products'

// Balloon decorations scattered around the page
const BALLOONS = [
  { src: 'hel/woman/balony-kotek-rozowe-biale.webp',      top: '4%',   left: '1%',  w: 110, rot: '-12deg', dur: '8s'  },
  { src: 'hel/one/balony-1-serce-biale.webp',             top: '18%',  left: '2%',  w: 90,  rot: '8deg',   dur: '10s' },
  { src: 'hel/woman/balony-40-rozowe-zloto.webp',         top: '38%',  left: '0%',  w: 100, rot: '-5deg',  dur: '12s' },
  { src: 'hel/18-ka/balony-18-lat-rozowe-zloto.webp',     top: '60%',  left: '1%',  w: 85,  rot: '10deg',  dur: '9s'  },
  { src: 'hel/one/balony-1-mis-zloty.webp',               top: '78%',  left: '0%',  w: 95,  rot: '-8deg',  dur: '11s' },
  { src: 'hel/woman/balony-sister-rozowe-biale.webp',     top: '6%',   right: '1%', w: 100, rot: '10deg',  dur: '9s'  },
  { src: 'hel/one/balony-1-rozowo-biale.webp',            top: '22%',  right: '0%', w: 88,  rot: '-8deg',  dur: '13s' },
  { src: 'hel/children/sky.webp',                         top: '44%',  right: '1%', w: 95,  rot: '6deg',   dur: '10s' },
  { src: 'hel/men/balony-happy-birthday-czarno-biale.webp',top: '64%', right: '0%', w: 90,  rot: '-10deg', dur: '8s'  },
  { src: 'hel/woman/balony-29-zlote-biale.webp',          top: '82%',  right: '1%', w: 100, rot: '7deg',   dur: '11s' },
]

const BASE = 'https://raw.githubusercontent.com/Vobzilla/on.balon/main/img'

export default function Home() {
  const [filterCategory, setFilterCategory] = useState<Category | null>(null)
  const [modalOpen, setModalOpen]           = useState(false)

  return (
    <>
      {/* Floating balloon decorations */}
      <div className="balloons-bg" aria-hidden="true">
        {BALLOONS.map((b, i) => (
          <img
            key={i}
            src={`${BASE}/${b.src}`}
            alt=""
            className="balloon-dec"
            style={{
              top:    b.top,
              left:   'left' in b ? b.left : undefined,
              right:  'right' in b ? b.right : undefined,
              width:  b.w,
              animationDuration: b.dur,
              animationDelay:    `${i * 0.7}s`,
              '--rot': b.rot,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Announce bar */}
      <div className="announce">
        <span className="announce-dot" />
        Dowozimy balony <strong>24/7</strong> na terenie Szczecina
        <span className="announce-sep">·</span>
        Potwierdzamy w <strong>15 minut</strong>
      </div>

      <Header />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <ProductsSection initialCategory={filterCategory} />
        <HowItWorks />
        <FAQ />
      </main>

      <Footer />

      <Cart onCheckout={() => setModalOpen(true)} />
      <OrderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}

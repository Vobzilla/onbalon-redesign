'use client'

import { useState, useEffect, useRef } from 'react'
import { useCart } from '@/context/CartContext'

const CONTACTS = [
  {
    label: 'Telefon',
    value: '+48 732-977-561',
    href: 'tel:+48732977561',
    bg: '#22c55e',
    icon: '📞',
  },
  {
    label: 'E-mail',
    value: 'kontakt@onbalon.pl',
    href: 'mailto:kontakt@onbalon.pl',
    bg: '#f97316',
    icon: '✉️',
  },
  {
    label: 'Telegram',
    value: '@onbalon',
    href: 'https://t.me/vobzilla_bot',
    bg: '#0ea5e9',
    icon: '✈️',
  },
  {
    label: 'Facebook',
    value: 'on.balon',
    href: 'https://facebook.com/onbalon',
    bg: '#3b82f6',
    icon: 'f',
  },
  {
    label: 'Instagram',
    value: '@on.balon',
    href: 'https://instagram.com/on.balon',
    bg: '#ec4899',
    icon: '◎',
  },
]

export default function Header() {
  const { totalCount, openCart } = useCart()
  const [contactOpen, setContactOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setContactOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header className="header">
      <div className="header-inner">
        <a href="/" className="logo">
          <img
            src="https://raw.githubusercontent.com/Vobzilla/on.balon/main/img/logo.png"
            alt="on.balon logo"
            className="logo-img"
          />
        </a>

        <nav className="nav">
          <a href="/#products" className="nav-link">Katalog</a>
          <a href="/#how"      className="nav-link">Jak zamówić</a>
          <a href="/#faq"      className="nav-link">FAQ</a>
          <a href="/#footer"   className="nav-link">O nas</a>
        </nav>

        <div className="header-actions">
          {/* Contact dropdown */}
          <div className="contact-dropdown-wrap" ref={dropdownRef}>
            <button
              className={`contact-dropdown-btn${contactOpen ? ' open' : ''}`}
              onClick={() => setContactOpen(v => !v)}
              aria-haspopup="true"
              aria-expanded={contactOpen}
            >
              <PhoneIcon />
              Kontakt
              <span className="chevron">▾</span>
            </button>

            <div className={`contact-dropdown${contactOpen ? ' open' : ''}`}>
              {CONTACTS.map(c => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="contact-dropdown-item"
                  onClick={() => setContactOpen(false)}
                >
                  <span
                    className="contact-dropdown-icon"
                    style={{ background: c.bg, color: 'white' }}
                  >
                    {c.icon}
                  </span>
                  <span className="contact-dropdown-text">
                    <span className="contact-dropdown-label">{c.label}</span>
                    <span className="contact-dropdown-value">{c.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Cart button */}
          <button className="cart-btn" onClick={openCart} aria-label="Koszyk">
            <CartIcon />
            Koszyk
            <span className="cart-count">{totalCount}</span>
          </button>
        </div>
      </div>
    </header>
  )
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.2 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14v2.92z" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  )
}

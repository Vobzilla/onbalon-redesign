'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

const CONTACTS = [
  {
    label: 'Telefon',
    value: '+48 732-977-561',
    href: 'tel:+48732977561',
    icon: 'phone',
  },
  {
    label: 'E-mail',
    value: 'on.balon2022@gmail.com',
    href: 'mailto:on.balon2022@gmail.com',
    icon: 'mail',
  },
  {
    label: 'Telegram',
    value: '@onbalon',
    href: 'https://t.me/vobzilla_bot',
    icon: 'telegram',
  },
  {
    label: 'Facebook',
    value: 'on.balon',
    href: 'https://facebook.com/onbalon',
    icon: 'facebook',
  },
  {
    label: 'Instagram',
    value: '@on.balon',
    href: 'https://instagram.com/on.balon',
    icon: 'instagram',
  },
]

export default function Header() {
  const { totalCount, openCart, loaded } = useCart()
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
        <Link href="/" className="logo">
          <img
            src="https://raw.githubusercontent.com/Vobzilla/on.balon/main/img/logo.png"
            alt="on.balon logo"
            className="logo-img"
          />
        </Link>

        <nav className="nav">
          <Link href="/#products" className="nav-link">Katalog</Link>
          <Link href="/#how"      className="nav-link">Jak zamówić</Link>
          <Link href="/#faq"      className="nav-link">FAQ</Link>
          <Link href="/o-nas"     className="nav-link">O nas</Link>
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
              <span className="contact-btn-text">Kontakt</span>
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
                  <span className="contact-dropdown-icon">
                    <ContactIcon type={c.icon} />
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
            <span className="cart-btn-text">Koszyk</span>
            {loaded && totalCount > 0 && (
              <span className="cart-count">{totalCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

function ContactIcon({ type }: { type: string }) {
  const props = { width: 17, height: 17, fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (type === 'phone') return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.2 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14v2.92z"/>
    </svg>
  )
  if (type === 'mail') return (
    <svg viewBox="0 0 24 24" {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="M2 7l10 7 10-7"/>
    </svg>
  )
  if (type === 'telegram') return (
    <svg viewBox="0 0 24 24" {...props} stroke="none" fill="currentColor">
      <path d="M11.944 0A12 12 0 1 0 24 12 12 12 0 0 0 11.944 0zm3.882 8.027-1.77 8.444c-.13.58-.47.722-.953.449l-2.625-1.946-1.267 1.227c-.14.14-.258.258-.53.258l.19-2.672 4.867-4.42c.212-.19-.046-.295-.327-.106L7.48 14.52l-2.58-.81c-.561-.175-.571-.561.117-.83l10.082-3.896c.468-.169.878.113.727.843z"/>
    </svg>
  )
  if (type === 'facebook') return (
    <svg viewBox="0 0 24 24" {...props} stroke="none" fill="currentColor">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.885v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  )
  if (type === 'instagram') return (
    <svg viewBox="0 0 24 24" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4.5"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
  return null
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

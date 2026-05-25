'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
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
    href: 'https://t.me/onbalon',
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

  useEffect(() => {
    function handleOpenContact() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => setContactOpen(true), 400)
    }
    window.addEventListener('open-contact-dropdown', handleOpenContact)
    return () => window.removeEventListener('open-contact-dropdown', handleOpenContact)
  }, [])

  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="logo">
          <Image
            src="/logo.png"
            alt="on.balon logo"
            width={160}
            height={48}
            className="logo-img"
            sizes="160px"
            priority
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
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>
    </svg>
  )
  if (type === 'mail') return (
    <svg viewBox="0 0 24 24" {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="M2 7l10 7 10-7"/>
    </svg>
  )
  if (type === 'telegram') return (
    <svg viewBox="0 0 24 24" {...props}>
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  )
  if (type === 'facebook') return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
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
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
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

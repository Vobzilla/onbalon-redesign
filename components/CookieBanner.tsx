'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type ConsentWindow = Window & {
  gtag?: (...args: unknown[]) => void
  dataLayer?: unknown[]
  fbq?: (...args: unknown[]) => void
}

const CONSENT_KEY = 'cookie_consent'

function readChoice(): string | null {
  try {
    return localStorage.getItem(CONSENT_KEY)
  } catch {
    return null
  }
}

// Consent Mode v2: everything starts denied (app/layout.tsx <head>) and a
// saved 'accepted' is applied there on every page load. Here we only apply a
// change the visitor makes now. Wrapped in try/catch: the banner must keep
// working (and never affect an order) when gtag or the Pixel is blocked.
function applyConsent(granted: boolean) {
  try {
    const w = window as ConsentWindow
    const state = granted ? 'granted' : 'denied'
    const update = { ad_storage: state, ad_user_data: state, ad_personalization: state, analytics_storage: state }
    // Normally window.gtag exists (Cloudflare's tag and ours define it); if
    // not, do what gtag() does: dataLayer.push(arguments).
    const gtag = typeof w.gtag === 'function'
      ? w.gtag
      : function () { (w.dataLayer = w.dataLayer || []).push(arguments) } as (...args: unknown[]) => void
    gtag('consent', 'update', update)
  } catch {
    // never let consent handling surface an error
  }
  try {
    const w = window as ConsentWindow
    if (typeof w.fbq === 'function') w.fbq('consent', granted ? 'grant' : 'revoke')
  } catch {
    // ditto
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!readChoice()) {
      setVisible(true)
    }

    // «Ustawienia cookies» in the footer (any element with
    // data-cookie-settings) opens the banner again to change the choice.
    function onClick(e: MouseEvent) {
      try {
        const el = (e.target as Element | null)?.closest?.('[data-cookie-settings]')
        if (!el) return
        e.preventDefault()
        setVisible(true)
      } catch {
        // ignore
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  function accept() {
    try { localStorage.setItem(CONSENT_KEY, 'accepted') } catch { }
    applyConsent(true)
    setVisible(false)
  }

  function decline() {
    // Denied is already the default; only an earlier «Akceptuję» has to be
    // taken back.
    const wasAccepted = readChoice() === 'accepted'
    try { localStorage.setItem(CONSENT_KEY, 'declined') } catch { }
    if (wasAccepted) applyConsent(false)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-banner">
      <p className="cookie-text">
        Używamy plików cookie, aby poprawić jakość korzystania z serwisu. Więcej informacji w{' '}
        <Link href="/polityka-prywatnosci">Polityce prywatności</Link>.
      </p>
      <div className="cookie-actions">
        <button className="cookie-btn-decline" onClick={decline}>Odrzuć</button>
        <button className="cookie-btn-accept" onClick={accept}>Akceptuję</button>
      </div>
    </div>
  )
}

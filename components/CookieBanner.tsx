'use client'

import { useState, useEffect, useRef } from 'react'
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

// The banner steps aside (fades out) while any [data-keep-clear] button is in
// the strip of the screen it covers, so it can never sit on top of «Dodaj do
// koszyka» and the like. It comes back only after that strip has been clear
// for a moment, so slow scrolling past a button doesn't make it flicker.
const SHOW_AGAIN_DELAY_MS = 400
const ZONE_EXTRA_PX = 8

function useKeepClear(banner: React.RefObject<HTMLDivElement>, active: boolean) {
  const [clearing, setClearing] = useState(false)

  useEffect(() => {
    if (!active) {
      setClearing(false)
      return
    }
    if (typeof IntersectionObserver === 'undefined' || typeof MutationObserver === 'undefined') return

    const behind = new Set<Element>()
    const observed = new WeakSet<Element>()
    let io: IntersectionObserver | null = null
    let mo: MutationObserver | null = null
    let showTimer: ReturnType<typeof setTimeout> | null = null
    let resizeTimer: ReturnType<typeof setTimeout> | null = null

    const update = () => {
      if (behind.size > 0) {
        if (showTimer) { clearTimeout(showTimer); showTimer = null }
        setClearing(true)
      } else if (!showTimer) {
        showTimer = setTimeout(() => { showTimer = null; setClearing(false) }, SHOW_AGAIN_DELAY_MS)
      }
    }

    const observeNew = () => {
      document.querySelectorAll('[data-keep-clear]').forEach(el => {
        if (!observed.has(el)) { observed.add(el); io?.observe(el) }
      })
      // Buttons removed from the page (navigation, re-render) can't hold
      // the banner hidden.
      let changed = false
      behind.forEach(el => { if (!el.isConnected) { behind.delete(el); io?.unobserve(el); changed = true } })
      if (changed) update()
    }

    // The observer's root is the viewport cut down to the banner's strip at
    // the bottom: banner height + its bottom offset + a small margin.
    const build = () => {
      io?.disconnect()
      behind.clear()
      const b = banner.current
      if (!b) return
      const zone = b.offsetHeight + (parseFloat(getComputedStyle(b).bottom) || 0) + ZONE_EXTRA_PX
      const top = Math.max(0, window.innerHeight - zone)
      io = new IntersectionObserver(entries => {
        for (const e of entries) {
          if (e.isIntersecting) behind.add(e.target)
          else behind.delete(e.target)
        }
        update()
      }, { rootMargin: `-${top}px 0px 0px 0px` })
      document.querySelectorAll('[data-keep-clear]').forEach(el => { observed.add(el); io!.observe(el) })
    }

    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        try { build() } catch { }
      }, 150)
    }

    try {
      build()
      mo = new MutationObserver(() => { try { observeNew() } catch { } })
      mo.observe(document.body, { childList: true, subtree: true })
      window.addEventListener('resize', onResize)
    } catch {
      // without the observers the banner simply stays put
    }

    return () => {
      io?.disconnect()
      mo?.disconnect()
      window.removeEventListener('resize', onResize)
      if (showTimer) clearTimeout(showTimer)
      if (resizeTimer) clearTimeout(resizeTimer)
    }
  }, [active, banner])

  return clearing
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const bannerRef = useRef<HTMLDivElement>(null)
  const clearing = useKeepClear(bannerRef, visible)

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
    <div
      ref={bannerRef}
      className={`cookie-banner${clearing ? ' is-clearing' : ''}`}
      aria-hidden={clearing || undefined}
    >
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

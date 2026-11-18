'use client'

import { useEffect } from 'react'
import { track, debugMode } from '@/lib/track'

// Google Ads conversion action «Kontakt - onbalon.pl».
const ADS_CONTACT_CONVERSION = 'AW-16531023419/RxYnCJerg7sdELvMzco9'

// One delegated listener instead of an onClick on every contact link (header
// dropdown, footer, About page, policy pages). Customers who call or message
// instead of using the form show up as contact_click in GA4.
function contactMethod(href: string): string | null {
  if (href.startsWith('tel:')) return 'phone'
  if (href.startsWith('mailto:')) return 'email'
  if (/^https?:\/\/(www\.)?t\.me\//.test(href)) return 'telegram'
  if (/^https?:\/\/(www\.)?(m\.me|messenger\.com)\//.test(href)) return 'messenger'
  if (/^https?:\/\/(www\.)?(wa\.me|api\.whatsapp\.com)\//.test(href)) return 'whatsapp'
  if (/^https?:\/\/(www\.)?facebook\.com\//.test(href)) return 'facebook'
  if (/^https?:\/\/(www\.)?instagram\.com\//.test(href)) return 'instagram'
  return null
}

export default function ContactClickTracker() {
  useEffect(() => {
    debugMode() // remember ?ga_debug=1 from the landing URL for this tab

    function onClick(e: MouseEvent) {
      try {
        const link = (e.target as Element | null)?.closest?.('a[href]')
        const method = link ? contactMethod(link.getAttribute('href') ?? '') : null
        if (!method) return
        const where = link?.closest('header') ? 'header' : link?.closest('footer') ? 'footer' : 'page'
        track('contact_click', { method, location: where, page_path: window.location.pathname })
      } catch {
        // tracking must not affect the click
      }
      try {
        // Google Ads «Kontakt - onbalon.pl» conversion, fired with every
        // contact_click. No value/currency: the conversion action has its own.
        // Beacon, because tel:/messenger links take the visitor off the page.
        const link = (e.target as Element | null)?.closest?.('a[href]')
        if (!link || !contactMethod(link.getAttribute('href') ?? '')) return
        const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
        if (typeof gtag !== 'function') return
        gtag('event', 'conversion', { send_to: ADS_CONTACT_CONVERSION, transport_type: 'beacon' })
      } catch {
        // tracking must not affect the click
      }
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  return null
}

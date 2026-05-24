'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookie_consent')) {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem('cookie_consent', 'declined')
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

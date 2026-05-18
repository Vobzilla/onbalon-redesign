export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <a href="/" className="footer-logo-img-wrap">
            <img
              src="https://raw.githubusercontent.com/Vobzilla/on.balon/main/img/logo.png"
              alt="on.balon logo"
              className="footer-logo-img"
            />
          </a>
          <p className="footer-tagline">i jesteś gotowy na każdą uroczystość.<br />Dostawa dopasowana do Twojego terminu w Szczecinie.</p>
          <div className="footer-socials">
            <a href="https://t.me/vobzilla_bot" target="_blank" aria-label="Telegram">
              <TgIcon />
            </a>
            <a href="https://facebook.com/onbalon" target="_blank" aria-label="Facebook">
              <FbIcon />
            </a>
            <a href="https://instagram.com/onbalon" target="_blank" aria-label="Instagram">
              <IgIcon />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">Okazje</p>
          <ul>
            <li><a href="#products">Roczek</a></li>
            <li><a href="#products">18-ka</a></li>
            <li><a href="#products">Urodziny</a></li>
            <li><a href="#products">Dla niej</a></li>
            <li><a href="#products">Dla niego</a></li>
            <li><a href="#products">Chrzest &amp; Komunia</a></li>
            <li><a href="#products">Biznes</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">Informacje</p>
          <ul>
            <li><a href="#how">Jak zamawiać</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="/polityka-prywatnosci">Polityka prywatności</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">Kontakt</p>
          <ul>
            <li><a href="https://t.me/vobzilla_bot" target="_blank">Telegram</a></li>
            <li><a href="https://instagram.com/onbalon" target="_blank">Instagram</a></li>
            <li><a href="https://facebook.com/onbalon" target="_blank">Facebook</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} On.balon · Szczecin</span>
        <span>Dostawa dopasowana do Twojego terminu 🎈</span>
      </div>
    </footer>
  )
}

function TgIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.269c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.22 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.836.969z"/>
    </svg>
  )
}

function FbIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  )
}

function IgIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}

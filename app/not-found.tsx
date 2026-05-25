import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Strona nie znaleziona — On.balon',
}

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="not-found-page">
        <div className="not-found-inner">
          <div className="not-found-balloon">🎈</div>
          <h1 className="not-found-title">404</h1>
          <p className="not-found-sub">Ups… ta strona odleciała</p>
          <p className="not-found-desc">
            Nie możemy znaleźć strony, której szukasz.
            Może wróć do katalogu i znajdź coś pięknego?
          </p>
          <div className="not-found-btns">
            <Link href="/" className="btn-primary">
              Strona główna
            </Link>
            <Link href="/#products" className="btn-secondary">
              Zobacz katalog
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

/** @format */

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnounceBanner from "@/components/AnnounceBanner";
import ScrollToTop from "@/components/ScrollToTop";

const CDN = "https://res.cloudinary.com/dnyevlhh7/image/upload/onbalon";

const STATS = [
  { num: "5+", label: "lat doświadczenia" },
  { num: "3000+", label: "zadowolonych klientów" },
  { num: "", label: "Dostawa dopasowana do Twojego terminu" },
  { num: "100%", label: "pasji do balonów" },
];

const VALUES: { icon: ReactNode; title: string; desc: string }[] = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: "Pasja",
    desc: "Każdy zestaw składamy ręcznie i z uwagą — bo wiemy, że ta dekoracja będzie w tle Twoich zdjęć przez lata.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: "Szybkość",
    desc: "Potwierdzamy zamówienie w 15 minut i dowozimy na czas. Wiemy, że święta nie czekają.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    title: "Jakość",
    desc: "Używamy wyłącznie balonów najwyższej jakości — lateksowych i foliowych, które długo zachowują swój wygląd.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Serce",
    desc: "Za każdym zamówieniem stoi prawdziwa historia — roczek, osiemnastka, ślub, event firmowy. Każdą z nich traktujemy tak samo poważnie.",
  },
];

export default function AboutPage() {
  return (
    <>
      <AnnounceBanner />

      <Header />

      <main>
        {/* ── Hero ── */}
        <section className="about-hero">
          <div className="section-inner">
            <nav className="breadcrumb">
              <Link href="/">Strona główna</Link>
              <span className="breadcrumb-sep">›</span>
              <span>O nas</span>
            </nav>
            <p className="eyebrow">O nas</p>
            <h1 className="about-title">
              Ludzie, którzy
              <br />
              <em>kochają balony</em>
            </h1>
          </div>
        </section>

        {/* ── Story ── */}
        <section className="about-story">
          <div className="section-inner">
            <div className="about-story-grid">
              <div className="about-text-col">
                <p className="about-lead">
                  On.balon to więcej niż tylko sklep z balonami — to miejsce,
                  gdzie pasja spotyka się z profesjonalizmem.
                </p>
                <p className="about-body">
                  Od momentu otwarcia naszego sklepu stacjonarnego w Szczecinie,
                  zawsze kierujemy się jedną filozofią: tworzyć atmosferę
                  święta, która wnosi radość w życie naszych klientów.
                </p>
                <p className="about-body">
                  Specjalizujemy się w tworzeniu zestawów z balonów napełnianych
                  helem, dekoracji balonowych na każdą okazję oraz dekoracji na
                  otwarcia biznesów. Dzięki naszej szerokiej ofercie, każdy
                  znajdzie coś dla siebie — zarówno dorośli, jak i najmłodsi.
                </p>
              </div>
              <div className="about-img-col">
                <div className="about-img-frame">
                  <Image
                    src={`${CDN}/team/team-1.webp`}
                    alt="Zespół On.balon"
                    fill
                    sizes="(max-width: 768px) 100vw, 560px"
                    style={{ objectFit: "cover", objectPosition: "top" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="about-stats-section">
          <div className="section-inner">
            <div className="about-stats">
              {STATS.map((s) => (
                <div key={s.label} className={`about-stat${!s.num ? " about-stat--text" : ""}`}>
                  {s.num && <span className="about-stat-num">{s.num}</span>}
                  <span className="about-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why us ── */}
        <section className="about-why">
          <div className="section-inner">
            <div className="about-why-grid">
              <div className="about-img-col">
                <div className="about-img-frame">
                  <Image
                    src={`${CDN}/team/team-2.webp`}
                    alt="On.balon sklep"
                    fill
                    sizes="(max-width: 768px) 100vw, 560px"
                    style={{ objectFit: "cover", objectPosition: "top" }}
                  />
                </div>
              </div>
              <div className="about-text-col">
                <p className="eyebrow">Dlaczego my?</p>
                <h2 className="about-subtitle">
                  Ponad 5 lat
                  <br />
                  doświadczenia
                </h2>
                <p className="about-body">
                  Przez lata naszej działalności zdobyliśmy grono stałych
                  klientów i mnóstwo pozytywnych opinii. Od ponad 5 lat tworzymy
                  dekoracje balonowe, które zamieniają zwykłe chwile w
                  niezapomniane wspomnienia.
                </p>
                <p className="about-body">
                  Zapraszamy do świata On.balon — gdzie każde święto staje się
                  niezapomniane dzięki magicznemu dotykowi naszych balonów!
                </p>
                <Link
                  href="/#products"
                  className="btn-primary"
                  style={{ display: "inline-flex", marginTop: 24 }}>
                  Zobacz nasze zestawy →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="about-values">
          <div className="section-inner">
            <div className="section-header">
              <p className="eyebrow">Nasze wartości</p>
              <h2 className="section-title">Co nas wyróżnia</h2>
            </div>
            <div className="about-values-grid">
              {VALUES.map((v) => (
                <div key={v.title} className="about-value-card">
                  <div className="about-value-icon">{v.icon}</div>
                  <h3 className="about-value-title">{v.title}</h3>
                  <p className="about-value-desc">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="about-cta">
          <div className="section-inner">
            <div className="about-cta-box">
              <h2 className="about-cta-title">
                Gotowi na wspólne świętowanie?
              </h2>
              <p className="about-cta-sub">
                Zamów balony z dostawą do domu lub odbierz osobiście w naszym
                sklepie w Szczecinie.
              </p>
              <div className="about-cta-btns">
                <Link href="/#products" className="btn-primary">
                  Przeglądaj ofertę
                </Link>
                <a
                  href="tel:+48732977561"
                  className="btn-secondary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>
                  </svg>
                  Skontaktuj się z nami
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}

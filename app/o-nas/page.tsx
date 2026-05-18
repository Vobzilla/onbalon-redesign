/** @format */

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CDN = "https://res.cloudinary.com/dnyevlhh7/image/upload/onbalon";

const STATS = [
  { num: "5+", label: "lat doświadczenia" },
  { num: "3000+", label: "zadowolonych klientów" },
  { num: "", label: "Dostawa dopasowana do Twojego terminu" },
  { num: "100%", label: "pasji do balonów" },
];

const VALUES = [
  {
    icon: "🎈",
    title: "Pasja",
    desc: "Każdy zestaw składamy ręcznie i z uwagą — bo wiemy, że ta dekoracja będzie w tle Twoich zdjęć przez lata.",
  },
  {
    icon: "⚡",
    title: "Szybkość",
    desc: "Potwierdzamy zamówienie w 15 minut i dowozimy na czas. Wiemy, że święta nie czekają.",
  },
  {
    icon: "✨",
    title: "Jakość",
    desc: "Używamy wyłącznie balonów najwyższej jakości — lateksowych i foliowych, które długo zachowują swój wygląd.",
  },
  {
    icon: "💜",
    title: "Serce",
    desc: "Za każdym zamówieniem stoi prawdziwa historia — roczek, osiemnastka, ślub, event firmowy. Każdą z nich traktujemy tak samo poważnie.",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="announce">
        <span className="announce-dot" />
        Dostawa <strong>dopasowana</strong> do Twojego terminu na terenie Szczecina
        <span className="announce-sep">·</span>
        Potwierdzamy w <strong>15 minut</strong>
      </div>

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
                  <span className="about-value-icon">{v.icon}</span>
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
                  href="https://t.me/vobzilla_bot"
                  target="_blank"
                  className="btn-secondary">
                  Napisz do nas
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

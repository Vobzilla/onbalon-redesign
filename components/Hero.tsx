/** @format */

"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

// Featured products shown in the hero card
const FEATURED_ID = 96; // Dekoracja Granatowo-Różowa (Biznes)
const MINI_IDS = [30, 82]; // Dekoracja 18-tka, Komunia

export default function Hero() {
  const { addItem } = useCart();
  const featured = products.find((p) => p.id === FEATURED_ID)!;
  const minis = MINI_IDS.map((id) => products.find((p) => p.id === id)!);

  return (
    <section className="hero">
      <div className="hero-inner">
        {/* ── Left ── */}
        <div className="hero-left">
          <div className="hero-eyebrow-pill">
            <span className="pill-dot" />
            Szczecin · dostawa całą dobę
          </div>
          <h1 className="hero-title">Balony, które</h1>
          <span className="hero-title-italic">tworzą magię.</span>
          <p className="hero-desc">
            Piękne dekoracje balonowe na każdą uroczystość. Zamawiasz przez
            stronę — potwierdzamy w 15 minut i dowozimy bezpośrednio do Ciebie.
          </p>
          <div className="hero-btns">
            <a href="#products" className="btn-primary">
              🎈 Zobacz katalog
            </a>
            <a
              href="https://t.me/vobzilla_bot"
              target="_blank"
              className="btn-secondary">
              📞 Skontaktuj się
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">3000+</span>
              <span className="stat-label">klientów</span>
            </div>
            <div className="stat-sep" />
            <div className="stat">
              <span className="stat-num">24/7</span>
              <span className="stat-label">dostawa</span>
            </div>
            <div className="stat-sep" />
            <div className="stat">
              <span className="stat-num">15 min</span>
              <span className="stat-label">potwierdzenie</span>
            </div>
            <div className="stat-sep" />
            <div className="stat">
              <span className="stat-num">250+</span>
              <span className="stat-label">wzorów</span>
            </div>
          </div>
        </div>

        {/* ── Right ── */}
        <div className="hero-right">
          {/* Main card */}
          <div className="hero-main-card">
            <div className="hero-card-img">
              <Image
                src={featured.image}
                alt={featured.name}
                fill
                sizes="600px"
                style={{ objectFit: "cover" }}
              />
              <div className="hero-bestseller">⭐ Bestseller sezonu</div>
            </div>
            <div className="hero-card-body">
              <div>
                <div className="hero-card-name">{featured.name}</div>
                <div className="hero-card-sub">
                  na {featured.category} &amp; wyjątkowe okazje
                </div>
              </div>
              <div className="hero-card-price">od {featured.price} zł</div>
            </div>
          </div>

          {/* Mini cards */}
          <div className="hero-mini-row">
            {minis.map((p) => (
              <div
                key={p.id}
                className="hero-mini-card"
                onClick={() => addItem(p)}>
                <div className="hero-mini-thumb">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="52px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <div className="hero-mini-name">
                    {p.name.replace(/^(Balony|Dekoracja)\s/, "")}
                  </div>
                  <div className="hero-mini-price">od {p.price} zł</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

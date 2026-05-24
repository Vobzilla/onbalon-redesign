/** @format */

import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

// Featured products shown in the hero card
const FEATURED_ID = 26;
const MINI_IDS = [30, 82];

export default function Hero() {
  const featured = products.find((p) => p.id === FEATURED_ID)!;
  const minis = MINI_IDS.map((id) => products.find((p) => p.id === id)!);

  return (
    <section className="hero">
      <div className="hero-inner">
        {/* ── Left ── */}
        <div className="hero-left">
          <div className="hero-eyebrow-pill">
            <span className="pill-dot" />
            Szczecin · dostawa o każdej porze
          </div>
          <h1 className="hero-title">Balony, które</h1>
          <span className="hero-title-italic">tworzą magię.</span>
          <p className="hero-desc">
            Piękne dekoracje balonowe z dostawą w Szczecinie. Zamawiasz online —
            potwierdzamy w 15 minut i dowozimy prosto do Ciebie.
          </p>
          <div className="hero-btns">
            <a href="#products" className="btn-primary">
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}>
                <ellipse cx="12" cy="9" rx="6" ry="7" />
                <path d="M10.5 16 L12 18.5 L13.5 16" />
                <path d="M12 18.5 Q10.5 21 12 23" />
              </svg>
              Zobacz katalog
            </a>
            <a href="tel:+48732977561" className="btn-secondary">
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}>
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
              </svg>
              Skontaktuj się
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">3000+</span>
              <span className="stat-label">klientów</span>
            </div>
            <div className="stat-sep" />
            <div className="stat stat--text">
              <span className="stat-num">Dostawa</span>
              <span className="stat-label">dopasowana do Twojego terminu</span>
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
          <Link href={`/product/${featured.id}`} className="hero-main-card">
            <div className="hero-card-img">
              <Image
                src={featured.image}
                alt={featured.name}
                fill
                priority
                sizes="600px"
                style={{ objectFit: "cover", objectPosition: "center top" }}
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
              <div className="hero-card-price">
                {featured.category === "Dekoracje balonowe" && "od "}
                {featured.price} zł
              </div>
            </div>
          </Link>

          {/* Mini cards */}
          <div className="hero-mini-row">
            {minis.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.id}`}
                className="hero-mini-card">
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
                  <div className="hero-mini-price">
                    {p.category === "Dekoracje balonowe" && "od "}
                    {p.price} zł
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

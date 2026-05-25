/** @format */

"use client";

import { useState, useEffect, useRef } from "react";

const REVIEWS = [
  {
    id: 1,
    name: "Ania Chwalichwost",
    stars: 5,
    text: "Jestem pod wrażeniem, za każdym razem balony miesiąc latają w powietrzu 🤩 Miła obsługa, zawsze wszystko robione na czas. Polecam 🥰",
  },
  {
    id: 2,
    name: "Karolina Wiśniewska",
    stars: 5,
    text: "Zamawiałam na roczek córeczki — dekoracja była przepiękna! Dostawa punktualna, obsługa bardzo miła i pomocna. Zdecydowanie polecam i na pewno wrócę! 🎈",
  },
  {
    id: 3,
    name: "Marta Kowalska",
    stars: 5,
    text: "Super jakość balonów i szybka realizacja. Zamówiłam w ostatniej chwili na osiemnastkę i wszystko dojechało na czas. Dziękuję! ❤️",
  },
  {
    id: 4,
    name: "Tomasz Nowak",
    stars: 5,
    text: "Korzystam już trzeci raz i za każdym razem jestem zadowolony. Balony helem trzymają się długo, a obsługa zawsze pomocna i profesjonalna.",
  },
  {
    id: 5,
    name: "Agnieszka Dąbrowska",
    stars: 5,
    text: "Najlepsze balony w Szczecinie! Zamówiłam na baby shower i wyglądało bajkowo. Szybkie potwierdzenie, terminowa dostawa. Polecam z całego serca 💜",
  },
  {
    id: 6,
    name: "Patrycja Zając",
    stars: 5,
    text: "Bardzo profesjonalna obsługa. Dekoracja na urodziny syna wyglądała lepiej niż się spodziewałam. Na pewno zamówię ponownie!",
  },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="rev-stars" aria-label={`${count} gwiazdek`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < count ? "rev-star rev-star--on" : "rev-star"}>
          ★
        </span>
      ))}
    </div>
  );
}

function GoogleLogo() {
  return (
    <div className="rev-google">
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <path
          d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
          fill="#4285F4"
        />
        <path
          d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
          fill="#34A853"
        />
        <path
          d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
          fill="#FBBC05"
        />
        <path
          d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
          fill="#EA4335"
        />
      </svg>
      <span>Google</span>
    </div>
  );
}

export default function Reviews() {
  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = REVIEWS.length;

  function go(index: number) {
    if (isAnimating) return;
    setIsAnimating(true);
    setActive((index + total) % total);
    setTimeout(() => setIsAnimating(false), 350);
  }

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 10000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [total]);

  function resetTimer() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 10000);
  }

  function handlePrev() {
    go(active - 1);
    resetTimer();
  }
  function handleNext() {
    go(active + 1);
    resetTimer();
  }
  function handleDot(i: number) {
    go(i);
    resetTimer();
  }

  const review = REVIEWS[active];

  return (
    <section className="reviews-section">
      <div className="section-inner">
        <div className="section-header">
          <p className="eyebrow">Opinie</p>
          <h2 className="section-title">Co mówią nasi klienci</h2>
        </div>

        <div className="reviews-carousel">
          {/* Prev */}
          <button
            className="rev-arrow rev-arrow--prev"
            onClick={handlePrev}
            aria-label="Poprzednia opinia">
            ‹
          </button>

          {/* Card */}
          <div
            className={`rev-card${isAnimating ? " rev-card--fade" : ""}`}
            key={review.id}>
            <StarRow count={review.stars} />
            <p className="rev-text">„{review.text}"</p>
            <div className="rev-foot">
              <span className="rev-name">{review.name}</span>
              <GoogleLogo />
            </div>
          </div>

          {/* Next */}
          <button
            className="rev-arrow rev-arrow--next"
            onClick={handleNext}
            aria-label="Następna opinia">
            ›
          </button>
        </div>

        {/* Dots */}
        <div className="rev-dots" role="tablist">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              className={`rev-dot${i === active ? " rev-dot--active" : ""}`}
              onClick={() => handleDot(i)}
              aria-label={`Opinia ${i + 1}`}
              role="tab"
              aria-selected={i === active}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="rev-cta-wrap">
          <a
            href="https://www.google.com/maps/search/on.balon+szczecin"
            target="_blank"
            rel="noopener noreferrer"
            className="rev-cta-btn">
            <span>Zobacz wszystkie opinie</span>
          </a>
        </div>
      </div>
    </section>
  );
}

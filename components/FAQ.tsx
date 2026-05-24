/** @format */

"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Jak szybko dostarczacie balony?",
    a: "Dowozimy o każdej porze — również wieczorami i w weekendy. Standardowy czas realizacji to 5–6 godzin. Na późne godziny i dni wolne prosimy o zamówienie z wyprzedzeniem 2–3 dni — napisz do nas, a ustalimy szczegóły.",
  },
  {
    q: "Czy balony z helem długo wytrzymują?",
    a: "Balony lateksowe z helem wytrzymują minimum 1–2 dni, foliowe od 3 do 7 dni. Na każdą imprezę wystarczy z zapasem!",
  },
  {
    q: "Jaki jest obszar dostawy?",
    a: "Dostarczamy na terenie Szczecina i okolic (do 15 km od centrum). Przy większej odległości skontaktuj się z nami — ustalimy szczegóły.",
  },
  {
    q: "Jak przebiega potwierdzenie zamówienia?",
    a: "Po złożeniu zamówienia odezwiemy się do Ciebie w ciągu 15 minut — telefonicznie lub przez WhatsApp/Messenger. Potwierdzimy szczegóły i ustalimy dokładną godzinę dostawy.",
  },
  {
    q: "Czy mogę zamówić niestandardowe dekoracje?",
    a: "Tak! Opisz swoje potrzeby i skontaktuj się z nami — przygotujemy indywidualną wycenę i projekt dopasowany do Twojej okazji.",
  },
  {
    q: "Jak dokonać płatności?",
    a: "Przyjmujemy gotówkę przy dostawie, przelew oraz BLIK. Szczegóły ustalamy podczas potwierdzenia zamówienia.",
  },
  {
    q: "Czy wystawiacie fakturę VAT?",
    a: "Tak, wystawiamy faktury VAT. Podaj dane firmy podczas składania zamówienia lub napisz do nas bezpośrednio.",
  },
  {
    q: "Czy można odebrać balony osobiście?",
    a: "Tak! Zapraszamy do naszego sklepu w Szczecinie. Aktualne godziny otwarcia znajdziesz na naszym profilu Google Maps.",
  },
  {
    q: "Jak wcześnie należy złożyć zamówienie?",
    a: "W pilnych przypadkach przyjmujemy zamówienia nawet w dniu imprezy — napisz do nas, sprawdzimy dostępność. Na wieczorne godziny, weekendy lub większe eventy prosimy o kontakt z wyprzedzeniem 2–3 dni.",
  },
  {
    q: "Czy mogę zamówić tylko kilka balonów?",
    a: "Oczywiście! W przypadku zamówień na kilka sztuk zapraszamy do bezpośredniego kontaktu z nami — balony można wybrać i odebrać osobiście w naszym sklepie w Szczecinie.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="faq" id="faq">
      <div className="faq-inner">
        <div className="faq-left">
          <p className="eyebrow">FAQ</p>
          <h2 className="section-title">
            Masz <em>pytania?</em>
            <br />
            Mamy odpowiedzi.
          </h2>
          <p className="faq-sub">
            Nie znalazłeś odpowiedzi? Skontaktuj się z nami — chętnie pomożemy
            dobrać idealny zestaw na Twoją uroczystość.
          </p>
          <a href="tel:+48732977561" className="btn-primary">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.2 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14v2.92z"/>
            </svg>
            Skontaktuj się z nami
          </a>
        </div>

        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div key={i} className={`faq-item${open === i ? " open" : ""}`}>
              <button
                className="faq-q"
                onClick={() => setOpen(open === i ? null : i)}>
                <span>{f.q}</span>
                <span className="faq-icon">{open === i ? "×" : "+"}</span>
              </button>
              <div className="faq-a">
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

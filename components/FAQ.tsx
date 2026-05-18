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
    a: "Balony lateksowe z helem wytrzymują minimum 1–2 dni, foliowe od 3 do 7 dni. Na każdą imprezę wystarczą z zapasem!",
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
          <a
            href="https://t.me/vobzilla_bot"
            target="_blank"
            className="btn-primary">
            📞 Skontaktuj się z nami
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

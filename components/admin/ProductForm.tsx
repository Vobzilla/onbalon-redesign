"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CATEGORIES, type Category } from "@/data/products";
import type { AdminProduct } from "@/lib/adminProducts";
import type { CommonContentItem } from "@/lib/commonContentItems";
import CloudinaryUploadButton from "./CloudinaryUploadButton";
import { thumbUrl } from "@/lib/cloudinaryThumb";
import { requiresContents } from "@/lib/productRules";

type ContentRow = { name: string; detail: string; qty: number };
type ColorVariantRow = { colorName: string; imageUrl: string };

type Props = { product?: AdminProduct; commonItems?: CommonContentItem[] };

export default function ProductForm({ product, commonItems = [] }: Props) {
  const router = useRouter();
  const isEdit = Boolean(product);

  const [name, setName] = useState(product?.name ?? "");
  const [category, setCategory] = useState<Category>(product?.category ?? CATEGORIES[0]);
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [image, setImage] = useState(product?.image ?? "");
  const [isActive, setIsActive] = useState(product?.isActive ?? true);
  const [contents, setContents] = useState<ContentRow[]>(
    product?.contents ?? [{ name: "", detail: "", qty: 1 }]
  );
  const [quickPick, setQuickPick] = useState("");
  const [includes, setIncludes] = useState<string[]>(product?.includes ?? []);
  const [hasColorVariants, setHasColorVariants] = useState(product?.hasColorVariants ?? false);
  const [colorVariants, setColorVariants] = useState<ColorVariantRow[]>(
    product?.colorVariants ?? []
  );

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const needsContents = requiresContents(category);

  function updateContent(index: number, patch: Partial<ContentRow>) {
    setContents((rows) => rows.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  }

  function updateColorVariant(index: number, patch: Partial<ColorVariantRow>) {
    setColorVariants((rows) => rows.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  }

  function handleQuickPick(e: React.ChangeEvent<HTMLSelectElement>) {
    const picked = commonItems.find((item) => item.id === Number(e.target.value));
    if (picked) {
      setContents((rows) => [...rows, { name: picked.name, detail: picked.detail, qty: 1 }]);
    }
    setQuickPick(""); // reset — this is an action, not a persistent selection
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!image) {
      setError("Dodaj zdjęcie produktu");
      return;
    }

    // No category default exists for the set composition, so it can't be empty
    // — except for decorations, which don't have one.
    if (needsContents && contents.every((row) => !row.name.trim())) {
      setError("Uzupełnij „Zestaw zawiera” — przynajmniej jedna pozycja jest wymagana");
      return;
    }

    if (hasColorVariants && colorVariants.every((row) => !row.colorName.trim() || !row.imageUrl)) {
      setError("Dodaj przynajmniej jeden wariant koloru (nazwa + zdjęcie)");
      return;
    }

    setSaving(true);
    const payload = {
      name,
      category,
      price: Number(price),
      description,
      image,
      isActive,
      contents,
      includes,
      hasColorVariants,
      colorVariants: hasColorVariants
        ? colorVariants.filter((row) => row.colorName.trim() && row.imageUrl)
        : [],
    };

    const res = await fetch(
      isEdit ? `/api/admin/products/${product!.id}` : "/api/admin/products",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || "Nie udało się zapisać produktu");
      setSaving(false);
      return;
    }

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form className="adm-form" onSubmit={handleSubmit}>
      {error && <div className="adm-error">{error}</div>}

      <div className="adm-fieldset">
        <p className="adm-legend">Podstawowe dane</p>

        <div className="adm-field" style={{ marginBottom: 14 }}>
          <label className="adm-label" htmlFor="name">Nazwa</label>
          <input
            id="name"
            className="adm-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="adm-grid-2" style={{ marginBottom: 14 }}>
          <div className="adm-field">
            <label className="adm-label" htmlFor="category">Kategoria</label>
            <select
              id="category"
              className="adm-select"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="adm-field">
            <label className="adm-label" htmlFor="price">Cena (zł)</label>
            <input
              id="price"
              className="adm-input"
              type="number"
              min={0}
              step={1}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="adm-field" style={{ marginBottom: 14 }}>
          <label className="adm-label" htmlFor="description">Opis</label>
          <textarea
            id="description"
            className="adm-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p className="adm-hint">
            Zostaw puste, a wstawimy standardowy opis kategorii „{category}".
          </p>
        </div>

        <label className="adm-toggle">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          <span>Aktywny — widoczny w katalogu</span>
        </label>
      </div>

      <div className="adm-fieldset">
        <p className="adm-legend">Zdjęcie</p>
        <div className="adm-image-row">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="adm-image-preview" src={thumbUrl(image, 264)} alt="" />
          ) : (
            <div className="adm-image-empty">Brak zdjęcia</div>
          )}
          <div className="adm-image-side">
            <CloudinaryUploadButton onUploaded={setImage} />
            <input
              className="adm-input"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://res.cloudinary.com/…"
            />
            <p className="adm-hint">
              Wgraj plik albo wklej gotowy adres zdjęcia z Cloudinary.
            </p>
          </div>
        </div>
      </div>

      <div className="adm-fieldset">
        <p className="adm-legend">Warianty kolorystyczne</p>
        <label className="adm-toggle" style={{ marginBottom: hasColorVariants ? 14 : 0 }}>
          <input
            type="checkbox"
            checked={hasColorVariants}
            onChange={(e) => setHasColorVariants(e.target.checked)}
          />
          <span>Jest wybór koloru</span>
        </label>

        {hasColorVariants && (
          <>
            <p className="adm-hint" style={{ marginBottom: 12 }}>
              Każdy kolor ma własne zdjęcie. Nazwa i cena produktu są wspólne dla wszystkich kolorów.
            </p>

            {colorVariants.map((row, index) => (
              <div className="adm-row adm-row-color" key={index}>
                {row.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="adm-thumb"
                    src={thumbUrl(row.imageUrl)}
                    alt=""
                    style={{ flexShrink: 0 }}
                  />
                ) : (
                  <div className="adm-image-empty" style={{ width: 40, height: 40, flexShrink: 0 }} />
                )}
                <input
                  className="adm-input"
                  value={row.colorName}
                  onChange={(e) => updateColorVariant(index, { colorName: e.target.value })}
                  placeholder="Różowy"
                />
                <div className="adm-row-color-actions">
                  <CloudinaryUploadButton onUploaded={(url) => updateColorVariant(index, { imageUrl: url })} />
                  <button
                    type="button"
                    className="adm-icon-btn"
                    onClick={() => setColorVariants((rows) => rows.filter((_, i) => i !== index))}
                    aria-label="Usuń wariant"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="adm-btn adm-btn-sm"
              onClick={() => setColorVariants((rows) => [...rows, { colorName: "", imageUrl: "" }])}
            >
              + Dodaj kolor
            </button>
          </>
        )}
      </div>

      <div className="adm-fieldset">
        <p className="adm-legend">Zestaw zawiera</p>
        <p className="adm-hint" style={{ marginBottom: 12 }}>
          {needsContents
            ? "Wymagane — dla składu zestawu nie ma wartości domyślnych."
            : `Opcjonalne dla kategorii „${category}" — wycena jest indywidualna. Zostaw puste, a sekcja „Zestaw" nie pojawi się na stronie produktu.`}
        </p>

        {commonItems.length > 0 && (
          <div className="adm-field" style={{ marginBottom: 12, maxWidth: 360 }}>
            <select className="adm-select" value={quickPick} onChange={handleQuickPick}>
              <option value="">+ Szybkie dodawanie z listy…</option>
              {commonItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                  {item.detail ? ` — ${item.detail}` : ""}
                </option>
              ))}
            </select>
            <p className="adm-hint">Wybierz pozycję, a dodamy ją poniżej — będzie można od razu poprawić nazwę, detal lub ilość.</p>
          </div>
        )}

        {contents.map((row, index) => (
          <div className="adm-row" key={index}>
            <input
              className="adm-input"
              value={row.name}
              onChange={(e) => updateContent(index, { name: e.target.value })}
              placeholder="Balon lateksowy"
            />
            <input
              className="adm-input"
              value={row.detail}
              onChange={(e) => updateContent(index, { detail: e.target.value })}
              placeholder="Ø 30 cm"
            />
            <input
              className="adm-input"
              type="number"
              min={1}
              value={row.qty}
              onChange={(e) => updateContent(index, { qty: Number(e.target.value) })}
              placeholder="szt."
            />
            <button
              type="button"
              className="adm-icon-btn"
              onClick={() => setContents((rows) => rows.filter((_, i) => i !== index))}
              aria-label="Usuń pozycję"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          type="button"
          className="adm-btn adm-btn-sm"
          onClick={() => setContents((rows) => [...rows, { name: "", detail: "", qty: 1 }])}
        >
          + Dodaj pozycję
        </button>
      </div>

      <div className="adm-fieldset">
        <p className="adm-legend">Cena zawiera</p>
        <p className="adm-hint" style={{ marginBottom: 12 }}>
          Zostaw puste, a wstawimy standardową listę dla kategorii „{category}".
        </p>
        {includes.map((text, index) => (
          <div className="adm-row adm-row-includes" key={index}>
            <input
              className="adm-input"
              value={text}
              onChange={(e) =>
                setIncludes((rows) => rows.map((row, i) => (i === index ? e.target.value : row)))
              }
              placeholder="Balony napełnione helem"
            />
            <button
              type="button"
              className="adm-icon-btn"
              onClick={() => setIncludes((rows) => rows.filter((_, i) => i !== index))}
              aria-label="Usuń pozycję"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          type="button"
          className="adm-btn adm-btn-sm"
          onClick={() => setIncludes((rows) => [...rows, ""])}
        >
          + Dodaj pozycję
        </button>
      </div>

      <div className="adm-form-actions">
        <Link href="/admin/products" className="adm-btn">Anuluj</Link>
        <button type="submit" className="adm-btn adm-btn-primary" disabled={saving}>
          {saving ? "Zapisywanie…" : isEdit ? "Zapisz zmiany" : "Dodaj produkt"}
        </button>
      </div>
    </form>
  );
}

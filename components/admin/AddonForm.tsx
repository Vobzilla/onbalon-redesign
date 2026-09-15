"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Addon } from "@/lib/addons";
import CloudinaryUploadButton from "./CloudinaryUploadButton";
import { thumbUrl } from "@/lib/cloudinaryThumb";

type Props = { addon?: Addon };

export default function AddonForm({ addon }: Props) {
  const router = useRouter();
  const isEdit = Boolean(addon);

  const [name, setName] = useState(addon?.name ?? "");
  const [price, setPrice] = useState(addon ? String(addon.price) : "");
  const [image, setImage] = useState(addon?.imageUrl ?? "");
  const [isActive, setIsActive] = useState(addon?.isActive ?? true);

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = { name, price: Number(price), imageUrl: image || null, isActive };

    const res = await fetch(isEdit ? `/api/admin/addons/${addon!.id}` : "/api/admin/addons", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || "Nie udało się zapisać dodatku");
      setSaving(false);
      return;
    }

    router.push("/admin/addons");
    router.refresh();
  }

  return (
    <form className="adm-form" onSubmit={handleSubmit}>
      {error && <div className="adm-error">{error}</div>}

      <div className="adm-fieldset">
        <div className="adm-grid-2" style={{ marginBottom: 14 }}>
          <div className="adm-field">
            <label className="adm-label" htmlFor="name">Nazwa</label>
            <input
              id="name"
              className="adm-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Kartka okolicznościowa"
              required
            />
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

        <label className="adm-toggle" style={{ marginBottom: 14 }}>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          <span>Aktywny — widoczny na stronie produktu</span>
        </label>
      </div>

      <div className="adm-fieldset">
        <p className="adm-legend">Zdjęcie (opcjonalne)</p>
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
          </div>
        </div>
      </div>

      <div className="adm-form-actions">
        <Link href="/admin/addons" className="adm-btn">Anuluj</Link>
        <button type="submit" className="adm-btn adm-btn-primary" disabled={saving}>
          {saving ? "Zapisywanie…" : isEdit ? "Zapisz zmiany" : "Dodaj dodatek"}
        </button>
      </div>
    </form>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { CommonContentItem } from "@/lib/commonContentItems";

type Props = { item?: CommonContentItem };

export default function ContentItemForm({ item }: Props) {
  const router = useRouter();
  const isEdit = Boolean(item);

  const [name, setName] = useState(item?.name ?? "");
  const [detail, setDetail] = useState(item?.detail ?? "");
  const [isActive, setIsActive] = useState(item?.isActive ?? true);

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = { name, detail, isActive };

    const res = await fetch(
      isEdit ? `/api/admin/content-items/${item!.id}` : "/api/admin/content-items",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || "Nie udało się zapisać pozycji");
      setSaving(false);
      return;
    }

    router.push("/admin/content-items");
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
              placeholder="Balon lateksowy"
              required
            />
          </div>

          <div className="adm-field">
            <label className="adm-label" htmlFor="detail">Detal</label>
            <input
              id="detail"
              className="adm-input"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="Ø 30 cm"
            />
          </div>
        </div>

        <label className="adm-toggle">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          <span>Aktywna — widoczna na liście szybkiego wyboru</span>
        </label>
      </div>

      <div className="adm-form-actions">
        <Link href="/admin/content-items" className="adm-btn">Anuluj</Link>
        <button type="submit" className="adm-btn adm-btn-primary" disabled={saving}>
          {saving ? "Zapisywanie…" : isEdit ? "Zapisz zmiany" : "Dodaj pozycję"}
        </button>
      </div>
    </form>
  );
}

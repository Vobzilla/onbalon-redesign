"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = { id: number; name: string };

export default function DeleteProductButton({ id, name }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setLoading(true);
    setError("");

    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Nie udało się usunąć produktu");
      setLoading(false);
      return;
    }

    setOpen(false);
    setLoading(false);
    router.refresh();
  }

  return (
    <>
      <button className="adm-btn adm-btn-sm adm-btn-danger" onClick={() => setOpen(true)}>
        Usuń
      </button>

      {open && (
        <div className="adm-modal-overlay" onClick={() => !loading && setOpen(false)}>
          <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="adm-modal-title">Usunąć produkt?</h2>
            <p className="adm-modal-text">
              „{name}" zostanie trwale usunięty z katalogu razem ze składem zestawu.
              Tej operacji nie można cofnąć.
            </p>
            {error && <div className="adm-error" style={{ marginBottom: 14 }}>{error}</div>}
            <div className="adm-modal-actions">
              <button className="adm-btn" onClick={() => setOpen(false)} disabled={loading}>
                Anuluj
              </button>
              <button className="adm-btn adm-btn-danger" onClick={handleDelete} disabled={loading}>
                {loading ? "Usuwanie…" : "Usuń"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

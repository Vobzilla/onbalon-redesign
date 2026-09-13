import Link from "next/link";
import { listAllCommonContentItems } from "@/lib/commonContentItems";

export const dynamic = "force-dynamic";

export default async function ContentItemsPage() {
  const items = await listAllCommonContentItems();
  const activeCount = items.filter((i) => i.isActive).length;

  return (
    <>
      <div className="adm-head">
        <div>
          <h1 className="adm-title">Pozycje do zestawów</h1>
          <p className="adm-subtitle">
            {items.length} w bazie · {activeCount} widocznych przy szybkim dodawaniu
          </p>
        </div>
        <Link href="/admin/content-items/new" className="adm-btn adm-btn-primary">
          + Dodaj pozycję
        </Link>
      </div>

      <div className="adm-card">
        {items.length === 0 ? (
          <p className="adm-empty">Brak pozycji. Dodaj pierwszą.</p>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Detal</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="adm-cell-name">{item.name}</td>
                  <td>{item.detail || <span className="adm-hint">—</span>}</td>
                  <td>
                    <span className={`adm-badge ${item.isActive ? "adm-badge-on" : "adm-badge-off"}`}>
                      {item.isActive ? "Aktywna" : "Ukryta"}
                    </span>
                  </td>
                  <td>
                    <div className="adm-actions">
                      <Link href={`/admin/content-items/${item.id}/edit`} className="adm-btn adm-btn-sm">
                        Edytuj
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

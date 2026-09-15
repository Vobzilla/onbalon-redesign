import Link from "next/link";
import { listAllAddons } from "@/lib/addons";
import { thumbUrl } from "@/lib/cloudinaryThumb";

export const dynamic = "force-dynamic";

export default async function AdminAddonsPage() {
  const addons = await listAllAddons();
  const activeCount = addons.filter((a) => a.isActive).length;

  return (
    <>
      <div className="adm-head">
        <div>
          <h1 className="adm-title">Dodatki</h1>
          <p className="adm-subtitle">
            {addons.length} w bazie · {activeCount} widocznych na stronie produktu
          </p>
        </div>
        <Link href="/admin/addons/new" className="adm-btn adm-btn-primary">
          + Dodaj dodatek
        </Link>
      </div>

      <div className="adm-card">
        {addons.length === 0 ? (
          <p className="adm-empty">Brak dodatków. Dodaj pierwszy.</p>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>Zdjęcie</th>
                <th>Nazwa</th>
                <th className="adm-nowrap">Cena</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {addons.map((addon) => (
                <tr key={addon.id}>
                  <td>
                    {addon.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="adm-thumb" src={thumbUrl(addon.imageUrl)} alt="" />
                    ) : (
                      <span className="adm-hint">—</span>
                    )}
                  </td>
                  <td className="adm-cell-name">{addon.name}</td>
                  <td className="adm-nowrap">{addon.price} zł</td>
                  <td>
                    <span className={`adm-badge ${addon.isActive ? "adm-badge-on" : "adm-badge-off"}`}>
                      {addon.isActive ? "Aktywny" : "Ukryty"}
                    </span>
                  </td>
                  <td>
                    <div className="adm-actions">
                      <Link href={`/admin/addons/${addon.id}/edit`} className="adm-btn adm-btn-sm">
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

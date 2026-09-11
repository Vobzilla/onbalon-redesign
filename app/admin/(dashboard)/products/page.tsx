import Link from "next/link";
import { listAllProducts } from "@/lib/adminProducts";
import DeleteProductButton from "@/components/admin/DeleteProductButton";
import { thumbUrl } from "@/lib/cloudinaryThumb";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await listAllProducts();
  const activeCount = products.filter((p) => p.isActive).length;

  return (
    <>
      <div className="adm-head">
        <div>
          <h1 className="adm-title">Produkty</h1>
          <p className="adm-subtitle">
            {products.length} w bazie · {activeCount} widocznych w katalogu
          </p>
        </div>
        <Link href="/admin/products/new" className="adm-btn adm-btn-primary">
          + Dodaj produkt
        </Link>
      </div>

      <div className="adm-card">
        {products.length === 0 ? (
          <p className="adm-empty">Brak produktów. Dodaj pierwszy.</p>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>Zdjęcie</th>
                <th>Nazwa</th>
                <th>Kategoria</th>
                <th className="adm-nowrap">Cena</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="adm-thumb" src={thumbUrl(product.image)} alt="" />
                  </td>
                  <td>
                    <div className="adm-cell-name">{product.name}</div>
                    <div className="adm-cell-id">ID {product.id}</div>
                  </td>
                  <td><span className="adm-pill">{product.category}</span></td>
                  <td className="adm-nowrap">{product.price} zł</td>
                  <td>
                    <span className={`adm-badge ${product.isActive ? "adm-badge-on" : "adm-badge-off"}`}>
                      {product.isActive ? "Aktywny" : "Ukryty"}
                    </span>
                  </td>
                  <td>
                    <div className="adm-actions">
                      <Link href={`/admin/products/${product.id}/edit`} className="adm-btn adm-btn-sm">
                        Edytuj
                      </Link>
                      <DeleteProductButton id={product.id} name={product.name} />
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

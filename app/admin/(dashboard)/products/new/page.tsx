import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default function NewProductPage() {
  return (
    <>
      <div className="adm-head">
        <div>
          <h1 className="adm-title">Nowy produkt</h1>
          <p className="adm-subtitle">
            <Link href="/admin/products" style={{ color: "inherit" }}>← Wróć do listy</Link>
          </p>
        </div>
      </div>

      <ProductForm />
    </>
  );
}

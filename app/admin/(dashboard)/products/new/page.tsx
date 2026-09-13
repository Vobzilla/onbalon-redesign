import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";
import { listActiveCommonContentItems } from "@/lib/commonContentItems";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const commonItems = await listActiveCommonContentItems();

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

      <ProductForm commonItems={commonItems} />
    </>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { getProductForAdmin } from "@/lib/adminProducts";
import { listActiveCommonContentItems } from "@/lib/commonContentItems";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const [product, commonItems] = await Promise.all([
    getProductForAdmin(Number(params.id)),
    listActiveCommonContentItems(),
  ]);
  if (!product) notFound();

  return (
    <>
      <div className="adm-head">
        <div>
          <h1 className="adm-title">{product.name}</h1>
          <p className="adm-subtitle">
            <Link href="/admin/products" style={{ color: "inherit" }}>← Wróć do listy</Link>
            {" · "}
            <Link href={`/product/${product.id}`} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>
              Zobacz na stronie ↗
            </Link>
          </p>
        </div>
      </div>

      <ProductForm product={product} commonItems={commonItems} />
    </>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import ContentItemForm from "@/components/admin/ContentItemForm";
import { getCommonContentItem } from "@/lib/commonContentItems";

export const dynamic = "force-dynamic";

export default async function EditContentItemPage({ params }: { params: { id: string } }) {
  const item = await getCommonContentItem(Number(params.id));
  if (!item) notFound();

  return (
    <>
      <div className="adm-head">
        <div>
          <h1 className="adm-title">{item.name}</h1>
          <p className="adm-subtitle">
            <Link href="/admin/content-items" style={{ color: "inherit" }}>← Wróć do listy</Link>
          </p>
        </div>
      </div>

      <ContentItemForm item={item} />
    </>
  );
}

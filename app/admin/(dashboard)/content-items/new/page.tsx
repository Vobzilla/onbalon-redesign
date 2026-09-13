import Link from "next/link";
import ContentItemForm from "@/components/admin/ContentItemForm";

export const dynamic = "force-dynamic";

export default function NewContentItemPage() {
  return (
    <>
      <div className="adm-head">
        <div>
          <h1 className="adm-title">Nowa pozycja</h1>
          <p className="adm-subtitle">
            <Link href="/admin/content-items" style={{ color: "inherit" }}>← Wróć do listy</Link>
          </p>
        </div>
      </div>

      <ContentItemForm />
    </>
  );
}

import Link from "next/link";
import AddonForm from "@/components/admin/AddonForm";

export const dynamic = "force-dynamic";

export default function NewAddonPage() {
  return (
    <>
      <div className="adm-head">
        <div>
          <h1 className="adm-title">Nowy dodatek</h1>
          <p className="adm-subtitle">
            <Link href="/admin/addons" style={{ color: "inherit" }}>← Wróć do listy</Link>
          </p>
        </div>
      </div>

      <AddonForm />
    </>
  );
}

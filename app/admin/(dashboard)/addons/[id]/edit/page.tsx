import Link from "next/link";
import { notFound } from "next/navigation";
import AddonForm from "@/components/admin/AddonForm";
import { getAddon } from "@/lib/addons";

export const dynamic = "force-dynamic";

export default async function EditAddonPage({ params }: { params: { id: string } }) {
  const addon = await getAddon(Number(params.id));
  if (!addon) notFound();

  return (
    <>
      <div className="adm-head">
        <div>
          <h1 className="adm-title">{addon.name}</h1>
          <p className="adm-subtitle">
            <Link href="/admin/addons" style={{ color: "inherit" }}>← Wróć do listy</Link>
          </p>
        </div>
      </div>

      <AddonForm addon={addon} />
    </>
  );
}

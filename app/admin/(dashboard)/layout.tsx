import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/adminSession";
import LogoutButton from "@/components/admin/LogoutButton";
import "../admin.css";

export const metadata: Metadata = {
  title: "Panel — On.balon",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  // The middleware already gates these routes; this is defence in depth and
  // gives us the signed-in e-mail for the header.
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="adm-root">
      <header className="adm-topbar">
        <Link href="/admin/products" className="adm-brand" style={{ textDecoration: "none", color: "inherit" }}>
          On.balon <span>/ panel</span>
        </Link>
        <div className="adm-topbar-right">
          <span className="adm-user">{session.email}</span>
          <Link href="/" className="adm-btn adm-btn-sm" target="_blank" rel="noopener noreferrer">
            Zobacz sklep ↗
          </Link>
          <LogoutButton />
        </div>
      </header>
      <main className="adm-main">{children}</main>
    </div>
  );
}

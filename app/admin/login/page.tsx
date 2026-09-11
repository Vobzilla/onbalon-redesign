import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";
import "../admin.css";

export const metadata: Metadata = {
  title: "Panel — logowanie",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  return (
    <div className="adm-root">
      <div className="adm-login-wrap">
        <div className="adm-login-card">
          <h1 className="adm-login-title">On.balon — panel</h1>
          <p className="adm-login-sub">Zaloguj się, aby zarządzać katalogiem.</p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

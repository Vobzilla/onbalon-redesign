"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(fd.get("email") || ""),
          password: String(fd.get("password") || ""),
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Logowanie nie powiodło się");
        setLoading(false);
        return;
      }

      const from = searchParams.get("from");
      router.replace(from && from.startsWith("/admin") ? from : "/admin/products");
      router.refresh();
    } catch {
      setError("Błąd połączenia. Spróbuj ponownie.");
      setLoading(false);
    }
  }

  return (
    <form className="adm-login-form" onSubmit={handleSubmit}>
      {error && <div className="adm-error">{error}</div>}

      <div className="adm-field">
        <label className="adm-label" htmlFor="email">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          className="adm-input"
          autoComplete="username"
          required
          autoFocus
        />
      </div>

      <div className="adm-field">
        <label className="adm-label" htmlFor="password">Hasło</label>
        <input
          id="password"
          name="password"
          type="password"
          className="adm-input"
          autoComplete="current-password"
          required
        />
      </div>

      <button type="submit" className="adm-btn adm-btn-primary" disabled={loading}>
        {loading ? "Logowanie…" : "Zaloguj się"}
      </button>
    </form>
  );
}

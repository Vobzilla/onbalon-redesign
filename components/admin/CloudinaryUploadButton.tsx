"use client";

import { useEffect, useRef, useState } from "react";
import { buildEagerParam } from "@/lib/cloudinaryEager";

const WIDGET_SRC = "https://upload-widget.cloudinary.com/global/all.js";

type CloudinaryWidget = { open: () => void; destroy: () => void };
type CloudinaryGlobal = {
  createUploadWidget: (
    options: Record<string, unknown>,
    callback: (error: unknown, result: { event?: string; info?: { secure_url?: string } }) => void
  ) => CloudinaryWidget;
};

declare global {
  interface Window {
    cloudinary?: CloudinaryGlobal;
  }
}

function loadWidgetScript(): Promise<void> {
  if (window.cloudinary) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${WIDGET_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("script error")));
      return;
    }
    const script = document.createElement("script");
    script.src = WIDGET_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("script error"));
    document.body.appendChild(script);
  });
}

type Props = { onUploaded: (url: string) => void };

export default function CloudinaryUploadButton({ onUploaded }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const widgetRef = useRef<CloudinaryWidget | null>(null);

  useEffect(() => {
    return () => widgetRef.current?.destroy();
  }, []);

  async function openWidget() {
    setError("");
    setLoading(true);

    try {
      const [, configRes] = await Promise.all([
        loadWidgetScript(),
        fetch("/api/admin/cloudinary-signature"),
      ]);
      const config = await configRes.json();
      if (!configRes.ok) throw new Error(config.error || "Brak konfiguracji Cloudinary");
      if (!window.cloudinary) throw new Error("Widget Cloudinary nie wczytał się");

      widgetRef.current?.destroy();
      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName: config.cloudName,
          apiKey: config.apiKey,
          folder: "onbalon/panel",
          sources: ["local", "url", "camera"],
          multiple: false,
          maxFiles: 1,
          language: "pl",
          // Pre-generate every size the site actually requests (see
          // lib/cloudinaryEager.ts), so a product's very first real visitor
          // never triggers the slow cold-cache transform we diagnosed —
          // originals here run 2-7.5MB, so that first transform is ~1s.
          // Async so the widget's upload doesn't sit and wait for it.
          eager: buildEagerParam(),
          eager_async: true,
          // Uploads are signed server-side so no unsigned preset is needed.
          uploadSignature: (
            callback: (signature: string) => void,
            paramsToSign: Record<string, unknown>
          ) => {
            fetch("/api/admin/cloudinary-signature", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paramsToSign }),
            })
              .then((r) => r.json())
              .then((data) => callback(data.signature))
              .catch(() => setError("Nie udało się podpisać uploadu"));
          },
        },
        (uploadError, result) => {
          if (uploadError) {
            setError("Upload nie powiódł się");
            return;
          }
          if (result?.event === "success" && result.info?.secure_url) {
            onUploaded(result.info.secure_url);
          }
        }
      );

      widgetRef.current.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nie udało się otworzyć uploadu");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button type="button" className="adm-btn" onClick={openWidget} disabled={loading}>
        {loading ? "Otwieranie…" : "Wgraj zdjęcie"}
      </button>
      {error && <p className="adm-error">{error}</p>}
    </>
  );
}

// src/app/(admin)/components/LogoutButton.tsx
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

  const getCsrf = async () => {
    try {
      const r = await fetch(`${API}/csrf`, { credentials: "include", cache: "no-store" });
      const d = await r.json().catch(() => ({}));
      return d?.token as string | undefined;
    } catch { return undefined; }
  };

  const onLogout = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const token = await getCsrf();
      await fetch(`${API}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: token ? { "x-csrf-token": token } : {},
        cache: "no-store",
      }).catch(() => null);
    } finally {
      setBusy(false);
      router.replace("/login");
      router.refresh();
    }
  };

  return (
    <button type="button" onClick={onLogout} disabled={busy} className={className}>
      {busy ? "Wylogowywanie…" : "Wyloguj"}
    </button>
  );
}

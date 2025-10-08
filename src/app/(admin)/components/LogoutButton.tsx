"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

  const onLogout = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await fetch(`${API}/auth/logout`, {
        method: "POST",
        credentials: "include", // ważne: przekaże cookies do API
        cache: "no-store",
      });
    } catch {}
    setBusy(false);
    router.replace("/login");
    router.refresh();
  };

  return (
    <button type="button" onClick={onLogout} disabled={busy} className={className}>
      {busy ? "Wylogowywanie…" : "Wyloguj"}
    </button>
  );
}

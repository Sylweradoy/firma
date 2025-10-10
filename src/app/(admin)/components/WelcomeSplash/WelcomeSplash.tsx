// src/app/(admin)/admin/welcome/WelcomeSplash.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./WelcomeSplash.module.scss";

export default function WelcomeSplash({ show }: { show: boolean }) {
  const [visible, setVisible] = useState(show);
  const router = useRouter();
  const search = useSearchParams();

  useEffect(() => {
    // Jeśli nie ma parametru, ale jest flaga z sessionStorage – też pokaż
    if (!show && typeof window !== "undefined") {
      if (sessionStorage.getItem("justLoggedIn") === "1") {
        setVisible(true);
      }
    }
  }, [show]);

  useEffect(() => {
    if (!visible) return;

    const t = setTimeout(() => {
      // posprzątaj
      try { sessionStorage.removeItem("justLoggedIn"); } catch {}
      // usuń ?welcome=1 z URL-a bez przeładowania
      if (search.get("welcome") === "1") router.replace("/admin");
      // schowaj overlay
      setVisible(false);
    }, 900); // ~0.9s

    return () => clearTimeout(t);
  }, [visible, router, search]);

  if (!visible) return null;

  return (
    <div className={styles.overlay} aria-live="polite" aria-busy="true">
      <div className={styles.box}>
        <div className={styles.spinner} />
        <p className={styles.label}>Wczytywanie panelu…</p>
      </div>
    </div>
  );
}

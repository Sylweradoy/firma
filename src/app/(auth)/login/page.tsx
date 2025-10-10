// src/app/(auth)/login/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./Login.module.scss";

export default function LoginPage() {
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
  const AFTER = process.env.NEXT_PUBLIC_AFTER_LOGIN ?? "/admin";

  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [csrf, setCsrf] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement | null>(null);

  // Prefetch CSRF na wejściu (ustawia cookie + zwraca token)
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${API}/csrf`, {
          credentials: "include",
          cache: "no-store",
        });
        if (!r.ok) return; // jeśli nie masz CSRF włączonego - po prostu pomiń
        const { token } = await r.json();
        if (token) setCsrf(token);
      } catch {}
    })();
    const id = setTimeout(() => emailRef.current?.focus(), 0);
    return () => clearTimeout(id);
  }, [API]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setErr(null);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    if (!email || !password) {
      setErr("Podaj e-mail i hasło.");
      setSubmitting(false);
      return;
    }

    try {
      // jeśli nie mamy jeszcze tokenu CSRF, spróbuj pobrać teraz
      let token = csrf;
      if (!token) {
        try {
          const r = await fetch(`${API}/csrf`, {
            credentials: "include",
            cache: "no-store",
          });
          const data = await r.json().catch(() => ({}));
          if (data?.token) token = data.token;
          setCsrf(token ?? null);
        } catch {}
      }

      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "x-csrf-token": token } : {}),
        },
        credentials: "include", // konieczne dla cookies
        cache: "no-store",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        let message =
          "Nie udało się zalogować. Sprawdź dane i spróbuj ponownie.";
        try {
          const data = await res.json();
          if (data?.message) message = data.message;
        } catch {}
        throw new Error(message);
      }
      sessionStorage.setItem("justLoggedIn", "1");
      // Sukces → do panelu
     router.replace(`${AFTER}?welcome=1`);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Błąd logowania.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.login} aria-labelledby="login-title">
      <div className={styles.bgDots} aria-hidden="true" />
      <div className={styles.wrap}>
        <div className={styles.card}>
          <div className={styles.logo}>
            <Image
              src="/logo.svg"
              alt="Jel-Tomix — logo"
              width={120}
              height={28}
              priority
              className={styles.image}
            />
          </div>

          <h1 id="login-title" className={styles.title}>
            Zaloguj się: <span>Panel Admina</span>
          </h1>
          <p className={styles.lead}>
            Dostęp tylko dla uprawnionych użytkowników.
          </p>

          {err && (
            <p className={styles.error} role="alert" aria-live="assertive">
              {err}
            </p>
          )}

          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <div className={styles.field}>
              <label htmlFor="email">E-mail</label>
              <input
                ref={emailRef}
                id="email"
                name="email"
                type="email"
                placeholder="np. admin@firma.pl"
                autoComplete="username"
                required
                disabled={submitting}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="password">Hasło</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                required
                disabled={submitting}
              />
            </div>

            <div className={styles.actions}>
              <button
                type="submit"
                className={`${styles.btn} ${styles.primary}`}
                disabled={submitting}
              >
                {submitting ? "Logowanie…" : "Zaloguj"}
              </button>

              <Link
                href="/"
                className={`${styles.btn} ${styles.secondary}`}
                aria-disabled={submitting}
              >
                Wróć
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

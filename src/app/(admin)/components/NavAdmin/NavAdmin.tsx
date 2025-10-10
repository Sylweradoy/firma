"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavAdmin.module.scss"
import LogoutButton from "@/app/(admin)/components/LogoutButton"

/* Ikony (bez typowania zwrotki na JSX.Element – nie jest potrzebne) */
const IHome = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M12 3 2 12h3v8h6v-5h2v5h6v-8h3L12 3Z" />
  </svg>
);
const IGallery = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M4 5h16a2 2 0 0 1 2 2v7H2V7a2 2 0 0 1 2-2Zm18 11v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1h20ZM9 13l3-4 4 5H6l2-2 1 1Z"/>
  </svg>
);
const IReviews = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M4 4h16v10H7l-3 3V4Zm3 3h10v2H7V7Zm0 4h7v2H7v-2Z"/>
  </svg>
);
const ISettings = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm8.9 3.3-1.7-1.3.3-2.1-2.1-2.1-2.1.3-1.3-1.7h-3l-1.3 1.7-2.1-.3-2.1 2.1.3 2.1-1.7 1.3v3.4l1.7 1.3-.3 2.1 2.1 2.1 2.1-.3 1.3 1.7h3l1.3-1.7 2.1.3 2.1-2.1-.3-2.1 1.7-1.3v-3.4Z"/>
  </svg>
);
const IMessages = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8l-4 3V6a2 2 0 0 1 2-2Zm2 4h12v2H6V8Zm0 4h8v2H6v-2Z"/>
  </svg>
);

/* UŻYWAMY ReactNode zamiast JSX.Element */
type NavItem = { href: string; label: string; icon: ReactNode; exact?: boolean };

const NAV: NavItem[] = [
  { href: "/admin",          label: "KOKPIT",  icon: <IHome />,     exact: true },
  { href: "/admin/messages", label: "WiIADOMOSCI", icon: <IMessages /> },
  { href: "/admin/gallery",  label: "GALERIA",    icon: <IGallery /> },
  { href: "/admin/reviews",  label: "OPINIE",     icon: <IReviews /> },
  { href: "/admin/settings", label: "USTAWIENIA", icon: <ISettings /> },
];

export default function AdminNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (item: NavItem) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <>
      <button
        className={styles.burger}
        aria-label="Otwórz menu"
        aria-controls="admin-sidebar"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      <div
        className={`${styles.overlay} ${open ? styles.show : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      <aside
        id="admin-sidebar"
        className={`${styles.sidebar} ${open ? styles.open : ""}`}
        aria-label="Nawigacja panelu"
      >
        <div className={styles.head}>
          <Link href="/admin" className={styles.brand} aria-label="Panel główny">
            <img src="/logo.svg" alt="" width={120} height={28} />
          </Link>
          <button className={styles.close} onClick={() => setOpen(false)} aria-label="Zamknij menu">✕</button>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.list}>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.link} ${isActive(item) ? styles.active : ""}`}
                >
                  <span className={styles.icon}>{item.icon}</span>
                  <span className={styles.label}>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.footer}>
          <LogoutButton className={styles.logout} />
        </div>
      </aside>
    </>
  );
}

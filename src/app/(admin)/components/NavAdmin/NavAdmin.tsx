"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavAdmin.module.scss";
import LogoutButton from "@/app/(admin)/components/LogoutButton";

/* Ikony */
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

/* Ikony toggle */
const IMenu = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z"/>
  </svg>
);
const IClose = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="m6 6 12 12M6 18 18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

type NavItem = { href: string; label: string; icon: ReactNode; exact?: boolean };

const NAV: NavItem[] = [
  { href: "/admin",           label: "KOKPIT",      icon: <IHome />,     exact: true },
  { href: "/admin/messages",  label: "WIADOMOŚCI",  icon: <IMessages /> },
  { href: "/admin/gallery",   label: "GALERIA",     icon: <IGallery /> },
  { href: "/admin/reviews",   label: "OPINIE",      icon: <IReviews /> },
  { href: "/admin/settings",  label: "USTAWIENIA",  icon: <ISettings /> },
];

export default function NavAdmin() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // zamknij menu po zmianie trasy
  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (item: NavItem) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <>
      {/* Toggle: jeden przycisk → hamburger/krzyżyk */}
      <button
        type="button"
        className={styles.toggle}
        aria-label={open ? "Zamknij nawigację" : "Otwórz nawigację"}
        aria-controls="adminSidebar"
        aria-expanded={open}
        data-open={open ? "true" : "false"}
        onClick={() => setOpen(v => !v)}
      >
        <span className={styles.iconOpen} aria-hidden={open}>
          <IMenu />
        </span>
        <span className={styles.iconClose} aria-hidden={!open}>
          <IClose />
        </span>
      </button>

      {/* Backdrop (tylko mobile) */}
      {open && (
        <button
          className={styles.backdrop}
          onClick={() => setOpen(false)}
          aria-label="Zamknij nawigację"
        />
      )}

      <aside
        id="adminSidebar"
        className={`${styles.sidebar} ${open ? styles.isOpen : ""}`}
        aria-label="Nawigacja panelu"
      >
        <div className={styles.head}>
          <Link href="/admin" className={styles.brand} aria-label="Panel główny">
            <img src="/logo.svg" alt="" width={120} height={28} />
          </Link>

          {/* Krzyżyk tylko na mobile */}
          <button
            type="button"
            className={styles.close}
            onClick={() => setOpen(false)}
            aria-label="Zamknij nawigację"
          >
            ✕
          </button>
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

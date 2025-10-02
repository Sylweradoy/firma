// src/app/(site)/_components/Navbar/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "./Navbar.module.scss";

const items = [
  { href: "#services", label: "USŁUGI" },
  { href: "#o-nas", label: "O NAS" },
  { href: "#proces", label: "PROCES" },
  { href: "#galeria", label: "GALERIA" },
  { href: "#opinion", label: "OPINIE" },
  { href: "#contact", label: "KONTAKT" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.navWrap}>
      <nav className={styles.nav} aria-label="Główna nawigacja">
        <div className={styles.inner}>
          <Link
            href="/"
            className={styles.brand}
            aria-label="Jel-Tomix — strona główna"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/logo.svg"
              alt="Jel-Tomix — logo"
              width={120}
              height={28}
              priority
              className={styles.brandLogo}
            />
           
          </Link>

          <button
            className={styles.menuButton}
            aria-label="Menu"
            aria-expanded={open}
            data-open={open ? "true" : "false"}        // ⬅️ DODANE
            onClick={() => setOpen((v) => !v)}
          >
            <span className={styles.menuIcon} />
          </button>

          <ul className={styles.menu} data-open={open ? "true" : "false"}>
            {items.map((it) => (
              <li key={it.href} className={styles.item}>
                <a
                  href={it.href}
                  className={styles.link}
                  onClick={() => setOpen(false)}
                >
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}

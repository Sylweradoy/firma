"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./LoginGurad.module.scss"

type AllowedResp = { allowed: boolean; ip: string };

export default function LoginGuard() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let mounted = true;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/ui/allowed`;
    fetch(url, { credentials: "include" })
      .then(r => r.json())
      .then((d: AllowedResp) => { if (mounted) setVisible(!!d.allowed); })
      .catch(() => { if (mounted) setVisible(false); });
    return () => { mounted = false; };
  }, []);

  if (!visible) return null;

  return (
    <Link href="/login" className={styles.loginBtn}>
      Zaloguj
    </Link>
  );
}

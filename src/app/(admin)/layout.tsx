import "server-only";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import styles from "./AdminLayout.module.scss";
import "./styles/_admin.reset.scss";
import NavAdmin from "@/app/(admin)/components/NavAdmin/NavAdmin";


export const dynamic = "force-dynamic";

const Icon = ({ path }: { path: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d={path} />
  </svg>
);

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // auth-gate
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll().map(({ name, value }) => `${name}=${value}`).join("; ");
  const apiBase =
    process.env.AUTH_API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:4000/api";

  const res = await fetch(`${apiBase}/auth/me`, {
    headers: cookieHeader ? { cookie: cookieHeader } : {},
    cache: "no-store",
  }).catch(() => null);

  const data = await res?.json().catch(() => null);
  if (!data?.user) redirect("/login");

  ;

  return (
     <div className={styles.shell}>
      <NavAdmin />
      <main className={styles.content}>{children}</main>
    </div>
  );
}

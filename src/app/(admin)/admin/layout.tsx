// src/app/admin/layout.tsx
import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "@/app/(admin)/components/LogoutButton";

export const dynamic = "force-dynamic"; // zawsze live, bez cache

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // w Next 15+ cookies() jest async:
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

  if (!data?.user) {
    redirect("/login");
  }

  // to NIE jest root layout, więc nie musisz dawać <html>/<body>
  return <main>{children}
 <LogoutButton />
  </main>;
}

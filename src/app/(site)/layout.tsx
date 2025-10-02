// src/app/(site)/layout.tsx
import type { Metadata, Viewport } from "next";
import "./styles/site.scss";
import Navbar from "./components/Navbar/Navbar";
import ScrollTop from "./components/ScrollTop/ScrollTop";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : undefined;

import { Gruppo } from "next/font/google";
const gruppo = Gruppo({
  weight: "400", // Gruppo ma jeden krój
  subsets: ["latin"],
  variable: "--font-gruppo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    default: "Jel-Tomix",
    template: "%s | Jel-Tomix",
  },
  description: "firma Remontowo-budowlana i Montaż mebli",
  applicationName: "Jel-Tomix",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Jel-Tomix",
    description: "firma Remontowo-budowlana i Montaż mebli",
    url: "/",
    siteName: "Jel-Tomix",
    type: "website",
    locale: "pl_PL",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jel-Tomix",
    description: "firma Remontowo-budowlana i Montaż mebli",
  },
  icons: { icon: "/favicon.ico" },

  robots: { index: true, follow: true },
};
export function generateViewport(): Viewport {
  return { themeColor: "#2c2c2c" };
}

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={gruppo.variable}>
        <Navbar />
        <main className="siteMain">{children}</main>
        <ScrollTop />
      </body>
    </html>
  );
}

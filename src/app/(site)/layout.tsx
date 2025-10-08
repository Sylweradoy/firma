import Navbar from "@/app/(site)/components/Navbar/Navbar";
import ScrollTop from "@/app/(site)/components/ScrollTop/ScrollTop";
import SmoothScroll from "@/app/(site)/components/Scroll/SmoothScroll";
import ScrollProgress from "@/app/(site)/components/Scroll/ScrollProgress";
import "@/app/(site)/styles/site.scss";
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <SmoothScroll />
      <ScrollProgress />
      <main className="siteMain">{children}</main>
      <ScrollTop />
    </>
  );
}

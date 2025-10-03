"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants, type Transition } from "framer-motion";
import styles from "./Gallery.module.scss";
import ButtonPrimary from "@/app/(site)/components/ui/ButtonPrimary";

/* ===== Typy ===== */
export type Tag =
  | "Kuchnie"
  | "Łazienki"
  | "Zabudowy"
  | "Podłogi"
  | "Malowanie"
  | "Inne";

export type GalleryItem = {
  id: string;       // np. _id z Mongo (string)
  url?: string;     // URL obrazka (Cloudinary/S3). Na dev może być puste -> placeholder
  alt: string;
  tags: Tag[];
  title?: string;
  desc?: string;
};

type ApiListResponse = {
  items: GalleryItem[];
  total: number;
  limit: number;
  offset: number;
};

/* ===== Konfiguracja: dev vs API =====
   Ustaw w Vercel/ENV: NEXT_PUBLIC_GALLERY_USE_API=1, aby włączyć fetch z /api/gallery */
const USE_API = process.env.NEXT_PUBLIC_GALLERY_USE_API === "1";

/* ===== Animacje ===== */
const easeOut: Transition["ease"] = [0.2, 0.8, 0.2, 1];
const headerV: Variants = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: .5, ease: easeOut } } };
const gridV: Variants   = { hidden: {}, show: { transition: { staggerChildren: .04, when: "beforeChildren" } } };
const cardV: Variants   = { hidden: { opacity: 0, y: 16, scale: .98 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: .38, ease: easeOut } } };

/* ===== DEV dane (działają od razu) ===== */
const DEV_ITEMS: GalleryItem[] = [
  { id: "1",  alt: "Zabudowa GK, salon",      tags: ["Zabudowy"] },
  { id: "2",  alt: "Kuchnia na wymiar",       tags: ["Kuchnie"] },
  { id: "3",  alt: "Łazienka walk-in",        tags: ["Łazienki"] },
  { id: "4",  alt: "Montaż szafy wnękowej",   tags: ["Zabudowy","Kuchnie"] },
  { id: "5",  alt: "Gładzie i malowanie",     tags: ["Malowanie"] },
  { id: "6",  alt: "Podłogi – panele",        tags: ["Podłogi"] },
  { id: "7",  alt: "Kuchnia biało-drewno",    tags: ["Kuchnie"] },
  { id: "8",  alt: "Łazienka – płytki 60×60", tags: ["Łazienki"] },
  { id: "9",  alt: "Zabudowa RTV",            tags: ["Zabudowy"] },
  { id: "10", alt: "Listwy przypodłogowe",    tags: ["Podłogi"] },
  { id: "11", alt: "Malowanie sufitów",       tags: ["Malowanie"] },
  { id: "12", alt: "Garderoba",               tags: ["Zabudowy"] },
];

/* ===== Komponent ===== */
export default function Gallery() {
  const [tag, setTag] = useState<Tag | "Wszystkie">("Wszystkie");
  const [items, setItems] = useState<GalleryItem[]>(DEV_ITEMS); // start: dev
  const [total, setTotal] = useState<number>(DEV_ITEMS.length);
  const [showCount, setShowCount] = useState(9);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const tags: (Tag | "Wszystkie")[] = ["Wszystkie", "Kuchnie", "Łazienki", "Zabudowy", "Podłogi", "Malowanie", "Inne"];

  // ↪️ Po włączeniu API — pobieraj z backendu
  useEffect(() => {
    if (!USE_API) {
      // DEV: bazujemy na stałej tablicy
      setItems(DEV_ITEMS);
      setTotal(DEV_ITEMS.length);
      return;
    }

    const controller = new AbortController();
    const run = async () => {
      const r = await fetch(`/api/gallery?tag=${encodeURIComponent(tag)}&limit=60&offset=0`, {
        signal: controller.signal,
        cache: "no-store",
      });
      if (!r.ok) throw new Error("Nie udało się pobrać galerii");
      const data: ApiListResponse = await r.json();
      setItems(data.items);
      setTotal(data.total);
      setShowCount(12);      // startowy „page size” przy API
      setLightboxIdx(null);  // zamknij ewentualny podgląd po zmianie filtra
    };
    run().catch(() => {
      // fallback (np. lokalnie bez biegającego API)
      setItems(DEV_ITEMS);
      setTotal(DEV_ITEMS.length);
      setShowCount(9);
      setLightboxIdx(null);
    });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag]);

  // Widok (filtr po stronie frontu, działa zarówno na DEV jak i API)
  const filtered =
    tag === "Wszystkie" ? items : items.filter((i) => i.tags.includes(tag as Tag));

  const visible = filtered.slice(0, showCount);

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const next = () => setLightboxIdx((i) => (i === null ? null : Math.min(i + 1, visible.length - 1)));
  const prev = () => setLightboxIdx((i) => (i === null ? null : Math.max(i - 1, 0)));

  // Klawiatura w lightboxie
  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIdx, visible.length]);

  return (
    <section id="galeria" className={styles.gallery} aria-labelledby="gallery-heading">
      <motion.header
        className={styles.header}
        variants={headerV}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        <p className={styles.overline}>Nasze realizacje</p>
        <h2 id="gallery-heading" className={styles.title}>Galeria prac Jel-Tomix</h2>
        <p className={styles.lead}>
          Kuchnie, łazienki, zabudowy GK, podłogi i malowanie — przykładamy wagę do detali.
          (Teraz tryb dev, później zdjęcia z API bez zmian w tym komponencie.)
        </p>

        {/* FILTRY */}
        <div className={styles.filters} role="tablist" aria-label="Filtruj po kategorii">
          {tags.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={t === tag}
              className={t === tag ? styles.filterActive : styles.filter}
              onClick={() => {
                setTag(t);
                setShowCount(USE_API ? 12 : 9); // reset paginacji zależnie od trybu
                setLightboxIdx(null);
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </motion.header>

      {/* GRID – klucz na tag, żeby zawsze przebudowało siatkę przy zmianie filtra */}
      <motion.ul
        key={tag}
        className={styles.grid}
        variants={gridV}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {visible.map((item, i) => (
          <motion.li key={item.id} className={styles.card} variants={cardV}>
            <button
              className={styles.media}
              onClick={() => openLightbox(i)}
              aria-label={`Powiększ: ${item.alt}`}
            >
              {item.url ? (
                <img src={item.url} alt={item.alt} loading="lazy" />
              ) : (
                <div className={styles.devPlaceholder} aria-hidden="true">dev</div>
              )}
            </button>

            <div className={styles.meta}>
              <span className={styles.tags}>{item.tags.join(" • ")}</span>
              {item.title && <h3 className={styles.cardTitle}>{item.title}</h3>}
              {item.desc && <p className={styles.cardDesc}>{item.desc}</p>}
            </div>
          </motion.li>
        ))}
      </motion.ul>

      {/* POKAŻ WIĘCEJ */}
      {showCount < filtered.length && (
        <div className={styles.moreWrap}>
          <ButtonPrimary onClick={() => setShowCount((n) => Math.min(n + (USE_API ? 12 : 6), filtered.length))}>
            Pokaż więcej
          </ButtonPrimary>
        </div>
      )}

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2, ease: easeOut } }}
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
            aria-modal="true"
            role="dialog"
          >
            <button className={styles.lbBackdrop} aria-label="Zamknij" onClick={closeLightbox} />

            <div className={styles.lbInner}>
              <button className={styles.lbClose} aria-label="Zamknij podgląd" onClick={closeLightbox}>×</button>

              <button
                className={styles.lbPrev}
                onClick={prev}
                aria-label="Poprzednie zdjęcie"
                disabled={lightboxIdx === 0}
              >‹</button>

              <figure className={styles.lbFigure}>
                {visible[lightboxIdx].url ? (
                  <img src={visible[lightboxIdx].url!} alt={visible[lightboxIdx].alt} />
                ) : (
                  <div className={styles.lbDev} aria-hidden="true">dev</div>
                )}
                <figcaption className={styles.lbCaption}>
                  {visible[lightboxIdx].alt}
                </figcaption>
              </figure>

              <button
                className={styles.lbNext}
                onClick={next}
                aria-label="Następne zdjęcie"
                disabled={lightboxIdx === visible.length - 1}
              >›</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

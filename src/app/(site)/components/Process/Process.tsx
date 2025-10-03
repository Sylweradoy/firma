"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, type Variants, type Transition } from "framer-motion";
import styles from "./Process.module.scss";
import ButtonPrimary from "@/app/(site)/components/ui/ButtonPrimary";

type Step = {
  title: string;
  short: string;
  points: string[];
  icon: ReactNode;
};

const easeOut: Transition["ease"] = [0.2, 0.8, 0.2, 1];

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: easeOut } },
};

// Ikony (bez zmian) …
const IPhone = () => (<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm0 2v16h10V4H7Zm5 15.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"/></svg>);
const IRuler = () => (<svg width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M3 7v10a2 2 0 0 0 2 2h10l6-6V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2Zm2 0h14v4h-5v2h-2v-2H7V9H5V7Z"/></svg>);
const ICalc  = () => (<svg width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M5 2h14a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm0 4v4h14V6H5Zm0 6v8h14v-8H5Zm2 2h2v2H7v-2Zm4 0h2v2h-2v-2Zm4 0h2v2h-2v-2Zm-8 4h2v2H7v-2Zm4 0h6v2h-6v-2Z"/></svg>);
const IPen   = () => (<svg width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="m14.1 3.9 6 6L8 22H2v-6l12.1-12.1Zm2.8-2.8a2 2 0 0 1 2.8 0l2.1 2.1a2 2 0 0 1 0 2.8l-2 2-4.9-4.9 2-2Z"/></svg>);
const ITruck = () => (<svg width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M3 5h11v8h2l3 3v3h-2a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H3V5Zm11 10V7H5v10h.2a2 2 0 0 1 3.6 0h6.4a2 2 0 0 1 3.6 0H20v-1.2L18.2 15H14Z"/></svg>);
const ITools = () => (<svg width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="m21.7 13.35-2.05 2.05-4.1-4.1 2.05-2.05A5 5 0 0 0 8.1 4.1L10 6 6 10 4.1 8.1A5 5 0 0 0 8.8 17l2.05-2.05 4.1 4.1L13.9 21.1l1.4 1.4 2.05-2.05 2.05 2.05 1.4-1.4-2.05-2.05 2.05-2.05-1.4-1.4Z"/></svg>);
const ICabinet = () => (<svg width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M4 3h16v7H4V3Zm0 9h16v9H4v-9Zm4 2H6v2h2v-2Zm8 0h-2v2h2v-2Z"/></svg>);
const ICheck = () => (<svg width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M9.5 16.2 5.8 12.5l-1.3 1.3 5 5 10-10-1.3-1.3z"/></svg>);
const IBroom = () => (<svg width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M15 3h2v6h-2V3Zm-2 6H5L3 21h14l-2-12Zm6.9 2.9-1.4 1.4-2-2 1.4-1.4 2 2Z"/></svg>);
const IShield = () => (<svg width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2 4 6v6c0 5 3.4 9.7 8 10 4.6-.3 8-5 8-10V6l-8-4Zm0 2.2 6 3v4.8c0 4-2.6 8-6 8s-6-4-6-8V7.2l6-3.0Z"/></svg>);

const STEPS: Step[] = [
  { title: "Konsultacja",    short: "Kontakt",    icon: <IPhone/>,   points: ["Krótki telefon lub formularz", "Poznanie zakresu i terminu"] },
  { title: "Wizja lokalna",  short: "Pomiary",    icon: <IRuler/>,   points: ["Oględziny na miejscu", "Pomiary + zdjęcia"] },
  { title: "Kosztorys",      short: "Wycena",     icon: <ICalc/>,    points: ["Pozycje robocizny i materiałów", "Szacowany czas realizacji"] },
  { title: "Umowa",          short: "Formalności",icon: <IPen/>,     points: ["Zakres prac, harmonogram", "Zadatek i termin startu"] },
  { title: "Logistyka",      short: "Dostawy",    icon: <ITruck/>,   points: ["Materiały i dostęp do lokalu", "Ochrona podłóg, wind, części wspólnych"] },
  { title: "Realizacja",     short: "Prace",      icon: <ITools/>,   points: ["Zabezpieczenia, demontaż, instalacje", "Gładzie, malowanie, płytki"] },
  { title: "Montaż mebli",   short: "Meble",      icon: <ICabinet/>, points: ["Kuchnie, szafy, zabudowy", "Dopasowania i regulacje"] },
  { title: "Odbiór jakości", short: "Checklista", icon: <ICheck/>,   points: ["Lista odbiorowa punkt po punkcie", "Poprawki od ręki"] },
  { title: "Sprzątanie",     short: "Finał",      icon: <IBroom/>,   points: ["Sprzątanie poremontowe", "Oddanie kluczy"] },
  { title: "Gwarancja",      short: "Wsparcie",   icon: <IShield/>,  points: ["Opieka posprzedażowa", "Szybka reakcja na zgłoszenia"] },
];

function getActiveIndex(el: HTMLUListElement): number {
  const elRectCenter = el.getBoundingClientRect().left + el.clientWidth / 2;
  let idx = 0, best = Number.POSITIVE_INFINITY;
  Array.from(el.children).forEach((node, i) => {
    const r = (node as HTMLElement).getBoundingClientRect();
    const center = r.left + r.width / 2;
    const d = Math.abs(center - elRectCenter);
    if (d < best) { best = d; idx = i; }
  });
  return idx;
}


export default function Process() {
  const trackRef = useRef<HTMLUListElement | null>(null);
  const [active, setActive] = useState(0);
  const [animatingTo, setAnimatingTo] = useState<number | null>(null); // ✅ blokada w trakcie animacji

  /** przewiń do indexu i wycentruj */
const scrollToIndex = (index: number) => {
  const el = trackRef.current;
  if (!el) return;
  const child = el.children[index] as HTMLElement | undefined;
  if (!child) return;

  // używamy natywnego centrowania + scroll-margin-inline na .card
  setAnimatingTo(index);
  setActive(index);
  child.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
};


  // Aktualizuj active podczas naturalnego scrolla – ale respektuj „animatingTo”
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const centered = getActiveIndex(el);
        if (animatingTo !== null) {
          if (centered === animatingTo) {
            setAnimatingTo(null);     // dojechaliśmy – odblokuj
            setActive(centered);
          }
          // jeśli jeszcze nie dojechało, nie nadpisuj active
        } else {
          setActive(centered);
        }
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
    };
  }, [animatingTo]);

  // Kółko/gesty → krok o 1
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 8) return;
      e.preventDefault();
      const dir = delta > 0 ? 1 : -1;
      const next = Math.min(Math.max((animatingTo ?? active) + dir, 0), el.children.length - 1);
      scrollToIndex(next);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [active, animatingTo]);

  // Klawiatura ← / →
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const el = trackRef.current;
      if (!el) return;
      const next = Math.min(Math.max((animatingTo ?? active) + dir, 0), el.children.length - 1);
      scrollToIndex(next);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, animatingTo]);

  const currentIndex = animatingTo ?? active; // ✅ „źródło prawdy” dla UI w trakcie animacji

  return (
    <section id="proces" className={styles.process} aria-labelledby="process-heading">
      <motion.header
        className={styles.header}
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        <p className={styles.overline}>Jak pracujemy</p>
        <h2 id="process-heading" className={styles.title}>Nasz proces — od wyceny po gwarancję</h2>
        <p className={styles.lead}>
          Przejrzyście i profesjonalnie: zaczynamy od konsultacji i wizji lokalnej, kończymy
          <strong> sprzątaniem i odbiorem</strong> – z jasną umową i harmonogramem po drodze.
        </p>
      </motion.header>

      <div className={styles.slider}>
        <button
          className={styles.arrow}
          aria-label="Poprzedni krok"
          onClick={() => scrollToIndex(Math.max(currentIndex - 1, 0))}
          disabled={currentIndex === 0}
        >
          ‹
        </button>

        <motion.ul
          ref={trackRef}
          className={styles.track}
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {STEPS.map((s, i) => (
            <motion.li key={s.title} className={styles.card} variants={cardVariants}>
              <div className={styles.stepHead}>
                <span className={styles.stepNo}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.stepIcon}>{s.icon}</span>
                <span className={styles.stepShort}>{s.short}</span>
              </div>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <ul className={styles.points}>
                {s.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </motion.li>
          ))}
        </motion.ul>

        <button
          className={styles.arrow}
          aria-label="Następny krok"
          onClick={() => scrollToIndex(Math.min(currentIndex + 1, STEPS.length - 1))}
          disabled={currentIndex === STEPS.length - 1}
        >
          ›
        </button>
      </div>

      <div className={styles.progressWrap} role="presentation">
        <div
          className={styles.progressBar}
          style={{ width: `${((currentIndex + 1) / STEPS.length) * 100}%` }}
        />
        <div className={styles.dots} aria-hidden="true">
          {STEPS.map((_, i) => (
            <button
              key={i}
              className={i === currentIndex ? styles.dotActive : styles.dot}
              aria-label={`Krok ${i + 1}`}
              onClick={() => scrollToIndex(i)}
            />
          ))}
        </div>
      </div>

      <motion.div
        className={styles.cta}
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        <ButtonPrimary href="#kontakt">Zamów bezpłatną wycenę</ButtonPrimary>
      </motion.div>
    </section>
  );
}

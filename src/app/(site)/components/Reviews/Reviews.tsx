"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants, type Transition } from "framer-motion";
import styles from "./Reviews.module.scss";
import ButtonPrimary from "@/app/(site)/components/ui/ButtonPrimary";
import ButtonSecondary from "@/app/(site)/components/ui/ButtonSecondary";
import Portal from "@/app/(site)/components/_utils/Portal";

type Review = {
  id: string;
  author: string;
  rating: number; // 1..5
  text: string;
  date?: string;
};

const DEV_REVIEWS: Review[] = [
  { id: "r1", author: "Katarzyna", rating: 5, text: "Kuchnia i łazienka – terminowo, czysto, dokładnie.", date: "2025-06-12" },
  { id: "r2", author: "Marek",     rating: 5, text: "Zabudowy GK i malowanie – wszystko zgodnie z planem.", date: "2025-04-28" },
  { id: "r3", author: "Aneta",     rating: 4, text: "Meble na wymiar – super dopasowane, porządna robota.", date: "2025-05-10" },
  { id: "r4", author: "Tomasz",    rating: 5, text: "Szybko i profesjonalnie, świetny kontakt.", date: "2025-03-19" },
  { id: "r5", author: "Joanna",    rating: 5, text: "Płytki i biały montaż – równo, estetycznie, bez poprawek.", date: "2025-02-07" },
  { id: "r6", author: "Piotr",     rating: 5, text: "Wykończenie mieszkania pod klucz – polecam!", date: "2025-01-15" },
];

const easeOut: Transition["ease"] = [0.2, 0.8, 0.2, 1];
const sectionV: Variants = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } } };
const cardV: Variants    = { hidden: { opacity: 0, y: 16, scale: 0.98 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: easeOut } } };

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className={filled ? styles.star : styles.starEmpty}>
    <path fill="currentColor" d="M12 2.5 15 9l7 .6-5.3 4.5 1.7 6.9L12 17.8 5.6 21l1.7-6.9L2 9.6 9 9l3-6.5Z" />
  </svg>
);

export default function Reviews() {
  const [items, setItems] = useState<Review[]>(DEV_REVIEWS);
  const [open, setOpen]   = useState(false);

  const listRef = useRef<HTMLUListElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const avg = items.length ? Math.round((items.reduce((s, r) => s + (r.rating || 0), 0) / items.length) * 10) / 10 : 0;

  // blokada body scroll + autofocus
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => nameInputRef.current?.focus(), 0);
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
      window.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  // formularz (rating + prosty anty-bot)
  const [nameVal, setNameVal] = useState("");
  const [textVal, setTextVal] = useState("");
  const [rating, setRating]   = useState(0);
  const [hoverRating, setHover] = useState(0);
  const shown = hoverRating || rating;

  const [hp, setHp]         = useState("");      // honeypot
  const [startedAt, setStartedAt] = useState(0); // czas startu
  const [changes, setChanges]     = useState(0); // liczba interakcji

  const onFocusOnce = () => { if (!startedAt) setStartedAt(Date.now()); };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();

    // anty-bot (lekki)
    if (hp) return; // wypełniony honeypot
    if (!startedAt || Date.now() - startedAt < 1200) { // dajemy krótki limit, żeby nie wkurzało
      alert("Daj nam sekundę… spróbuj ponownie 🙂");
      return;
    }
    if (changes < 1) {
      alert("Uzupełnij formularz.");
      return;
    }

    if (!nameVal.trim() || !textVal.trim() || rating < 1) {
      alert("Uzupełnij imię/nick, treść i wybierz ocenę.");
      return;
    }

    const iso = new Date().toISOString().slice(0, 10);
    setItems(prev => [{ id: `r${Date.now()}`, author: nameVal.trim(), text: textVal.trim(), rating, date: iso }, ...prev]);

    requestAnimationFrame(() => listRef.current?.scrollTo({ top: 0, behavior: "smooth" }));

    // reset + zamknięcie
    setNameVal(""); setTextVal("");
    setRating(0); setHover(0);
    setHp(""); setStartedAt(0); setChanges(0);
    setOpen(false);
  };

  return (
    <section id="opinie" className={styles.reviews} aria-labelledby="reviews-heading">
      <motion.header className={styles.header} variants={sectionV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}>
        <p className={styles.overline}>Opinie klientów</p>
        <h2 id="reviews-heading" className={styles.title}>Polecają <span>Jel-Tomix</span></h2>
        <p className={styles.lead}>Rzetelność, terminowość i czysta robota. Tak najczęściej opisują nas klienci.</p>

        <div className={styles.stats}>
          <div className={styles.starsRow} aria-label={`Średnia ${avg}/5`}>
            {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} filled={i < Math.round(avg)} />)}
          </div>
          <span className={styles.avg}>{avg}/5 <em>na podstawie {items.length} opinii</em></span>
        </div>
      </motion.header>

      <motion.ul ref={listRef} className={styles.list} variants={sectionV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
        {items.map(r => (
          <motion.li key={r.id} className={styles.card} variants={cardV} initial={false}>
            <div className={styles.rowTop}>
              <div className={styles.cardStars} aria-label={`${r.rating} na 5`}>
                {Array.from({ length: 5 }).map((_, s) => <StarIcon key={s} filled={s < r.rating} />)}
              </div>
              {r.date && <time className={styles.date}>{r.date}</time>}
            </div>

            <blockquote className={styles.text}>“{r.text}”</blockquote>
            <div className={styles.meta}><span className={styles.author}>{r.author}</span></div>
          </motion.li>
        ))}
      </motion.ul>

      <motion.div className={styles.actions} variants={sectionV} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
        <ButtonPrimary onClick={() => setOpen(true)}>Zostaw opinię</ButtonPrimary>
      </motion.div>

      {open && (
        <Portal>
          <div className={styles.modal} aria-hidden={!open}>
            <div className={styles.backdrop} onClick={() => setOpen(false)} aria-hidden="true" />
            <div className={styles.modalInner} role="dialog" aria-modal="true" aria-labelledby="review-title">
              <h3 id="review-title">Dodaj opinię</h3>

              {/* RATING */}
              <div className={styles.rateRow}>
                <span className={styles.rateLabel}>Twoja ocena:</span>
                <div className={styles.rateStars}>
                  {Array.from({ length: 5 }).map((_, i) => {
                    const idx = i + 1;
                    const filled = idx <= (hoverRating || rating);
                    return (
                      <button
                        key={i}
                        type="button"
                        className={filled ? styles.starBtnOn : styles.starBtnOff}
                        onMouseEnter={() => setHover(idx)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => { setRating(idx); setChanges(n => n + 1); }}
                        aria-label={`${idx} gwiazdki`}
                      >
                        <StarIcon filled={filled} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <form className={styles.form} onSubmit={submitReview} onFocusCapture={onFocusOnce}>
                {/* Honeypot (niewidoczny) */}
                <input
                  type="text" name="website" value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  className={styles.hp} autoComplete="off" tabIndex={-1} aria-hidden="true"
                />

                <div className={styles.field}>
                  <label htmlFor="r-name">Imię / pseudonim</label>
                  <input
                    ref={nameInputRef}
                    id="r-name" type="text" value={nameVal}
                    onChange={(e) => { setNameVal(e.target.value); setChanges(n => n + 1); }}
                    placeholder="np. Anna" required
                  />
                </div>

                <div className={styles.fieldFull}>
                  <label htmlFor="r-text">Opinia</label>
                  <textarea
                    id="r-text" rows={4} value={textVal}
                    onChange={(e) => { setTextVal(e.target.value); setChanges(n => n + 1); }}
                    placeholder="Napisz kilka słów o współpracy…" required
                  />
                </div>

                <div className={styles.modalActions}>
                  <ButtonPrimary type="submit">Wyślij opinię</ButtonPrimary>
                  <ButtonSecondary onClick={() => setOpen(false)}>Zamknij</ButtonSecondary>
                </div>
              </form>
            </div>
          </div>
        </Portal>
      )}
    </section>
  );
}

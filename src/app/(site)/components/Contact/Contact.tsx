"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants, type Transition } from "framer-motion";
import styles from "./Contact.module.scss";

import ButtonPrimary from "@/app/(site)/components/ui/ButtonPrimary";
import ButtonSecondary from "@/app/(site)/components/ui/ButtonSecondary";

const easeOut: Transition["ease"] = [0.2, 0.8, 0.2, 1];
const sectionV: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};
const cardV: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: easeOut } },
};

// Ikony
const IPhone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm0 2v16h10V4H7Zm5 15.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"/>
  </svg>
);
const IEmail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v1.2l10 6.25L22 7.2V6a2 2 0 0 0-2-2Zm0 6.4-8 5-8-5V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.6Z"/>
  </svg>
);
const IFb = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M13 22v-9h3l1-4h-4V7a1 1 0 0 1 1-1h3V2h-3a5 5 0 0 0-5 5v2H6v4h3v9h4Z"/>
  </svg>
);
const IInsta = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 7Zm0 2.5a2.5 2.5 0 1 1-.001 5.001A2.5 2.5 0 0 1 12 9.5Zm6.5-.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"/>
  </svg>
);
// TikTok – uproszczona ikonka
const ITikTok = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M14 3h2c.4 2.9 2.2 4.7 5 5v2c-2.2-.1-3.9-.9-5-2v6a6 6 0 1 1-6-6c.3 0 .7 0 1 .1V10a4 4 0 1 0 4 4V3Z"/>
  </svg>
);

export default function Contact() {
  // modal „Zasady wyceny”
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // blokada scrolla tła przy otwartym modalu
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  // formularz — dev (console.log); API później
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const msg = String(form.get("message") || "").trim();
    if (!name || !phone) { alert("Uzupełnij imię i numer telefonu."); return; }
    setSubmitting(true);
    try {
      console.log("CONTACT_FORM", { name, phone, msg });
      setSent(true);
      (e.currentTarget as HTMLFormElement).reset();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="kontakt" className={styles.contact} aria-labelledby="contact-heading">
      <motion.header
        className={styles.header}
        variants={sectionV}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        <p className={styles.overline}>Skontaktuj się</p>
        <h2 id="contact-heading" className={styles.title}>
          Umów się na <span>wycenę</span>
        </h2>
        <p className={styles.lead}>
          Najszybciej przez telefon lub formularz. Działamy w okolicach Jeleniej Góry i okolic.
        </p>
      </motion.header>

      {/* Kafelki kontaktowe */}
      <motion.ul
        className={styles.cards}
        variants={sectionV}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        {/* Telefon #1 */}
        <motion.li className={styles.card} variants={cardV}>
          <a href="tel:+48695604934" className={styles.cardLink}>
            <span className={styles.icon}><IPhone /></span>
            <span className={styles.cardTitle}>Tomek</span>
            <span className={styles.cardValue}>+48&nbsp;695&nbsp;604&nbsp;934</span>
          </a>
        </motion.li>

        {/* Telefon #2 — podmień na właściwy numer */}
        <motion.li className={styles.card} variants={cardV}>
          <a href="tel:+48699827510" className={styles.cardLink}>
            <span className={styles.icon}><IPhone /></span>
            <span className={styles.cardTitle}>Sylwek</span>
            <span className={styles.cardValue}>+48&nbsp;699&nbsp;827&nbsp;510</span>
          </a>
        </motion.li>

        {/* E-mail */}
        <motion.li className={styles.card} variants={cardV}>
          <a href="mailto:kontakt@jel-tomix.pl" className={styles.cardLink}>
            <span className={styles.icon}><IEmail /></span>
            <span className={styles.cardTitle}>E-mail</span>
            <span className={styles.cardValue}>kontakt@jel-tomix.pl</span>
          </a>
        </motion.li>

        {/* Facebook */}
        <motion.li className={styles.card} variants={cardV}>
          <a href="#" target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
            <span className={styles.icon}><IFb /></span>
            <span className={styles.cardTitle}>Facebook</span>
            <span className={styles.cardValue}>/jel.tomix</span>
          </a>
        </motion.li>

        {/* Instagram */}
        <motion.li className={styles.card} variants={cardV}>
          <a href="#" target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
            <span className={styles.icon}><IInsta /></span>
            <span className={styles.cardTitle}>Instagram</span>
            <span className={styles.cardValue}>@jel.tomix</span>
          </a>
        </motion.li>

        {/* TikTok */}
        <motion.li className={styles.card} variants={cardV}>
          <a href="#" target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
            <span className={styles.icon}><ITikTok /></span>
            <span className={styles.cardTitle}>TikTok</span>
            <span className={styles.cardValue}>@jel.tomix</span>
          </a>
        </motion.li>
      </motion.ul>

      {/* Info + zasady wyceny */}
      <motion.div
        className={styles.info}
        variants={sectionV}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <p>
          Wycena jest <strong>darmowa</strong> przy zleceniu realizacji — odliczamy ją od końcowego rozliczenia.
          Jeśli nie dojdzie do realizacji: koszt dojazdu i wyceny to <strong>100&nbsp;zł</strong>. Projekty (np. kuchni) rozliczamy osobno.
        </p>
        <ButtonSecondary onClick={() => setOpen(true)}>Zasady wyceny / szczegóły</ButtonSecondary>
      </motion.div>

      {/* Formularz */}
      <motion.form
        className={styles.form}
        onSubmit={onSubmit}
        variants={sectionV}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className={styles.field}>
          <label htmlFor="name">Imię</label>
          <input id="name" name="name" type="text" placeholder="np. Anna" autoComplete="name" required />
        </div>

        <div className={styles.field}>
          <label htmlFor="phone">Telefon</label>
          <input id="phone" name="phone" type="tel" placeholder="np. 600 000 000" autoComplete="tel" required />
        </div>

        <div className={styles.fieldFull}>
          <label htmlFor="message">Krótki opis prac</label>
          <textarea
            id="message"
            name="message"
            placeholder="Np. wykończenie mieszkania 45 m²: gładzie, malowanie, łazienka, montaż kuchni…"
            rows={4}
          />
        </div>

        <div className={styles.actions}>
          <ButtonPrimary type="submit" disabled={submitting}>
            {submitting ? "Wysyłanie…" : "Wyślij zapytanie"}
          </ButtonPrimary>
          {sent && <span className={styles.sentNote}>Dziękujemy! Odezwiemy się wkrótce.</span>}
        </div>
      </motion.form>

      {/* Modal – zasady wyceny */}
      {open && (
        <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="rules-title">
          <button className={styles.backdrop} aria-label="Zamknij" onClick={() => setOpen(false)} />
          <div className={styles.modalInner}>
            <h3 id="rules-title">Zasady wyceny</h3>
            <ul className={styles.rulesList}>
              <li><strong>Darmowa wycena</strong> przy zleceniu – odliczamy od końcowej kwoty.</li>
              <li>Bez realizacji: <strong>100&nbsp;zł</strong> za dojazd i wycenę.</li>
              <li>Projekty (np. kuchnia, zabudowy) – wycena i płatność <strong>osobno</strong>.</li>
              <li>Po akceptacji oferty ustalamy <strong>termin</strong> i podpisujemy <strong>umowę</strong>.</li>
            </ul>

            <div className={styles.modalActions}>
              <ButtonSecondary ref={closeBtnRef} onClick={() => setOpen(false)}>Zamknij</ButtonSecondary>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

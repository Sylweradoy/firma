// src/app/(site)/_components/Hero/Hero.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, type CSSProperties } from "react";
import ButtonPrimary from "@/app/(site)/components/ui/ButtonPrimary";
import ButtonSecondary from "@/app/(site)/components/ui/ButtonSecondary";
import styles from "./_Hero.module.scss";

const WORDS = [
  "Zabudowy GK",
  "Montaż mebli",
  "Malowanie",
  "Płytki",
  "Gładzie",
  "Elewacje",
]; // dodawaj śmiało kolejne

export default function Hero() {
  const { scrollYProgress } = useScroll();
  // parallax/fade całości chmurki z chipami
  const chipsY = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const chipsOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.5]);

  // duże słowo w środku (zostawiamy – cyklicznie zmienia)
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % WORDS.length), 2600);
    return () => clearInterval(id);
  }, []);
  const fromRight = idx % 2 === 1;

  return (
    <section className={styles.hero} aria-label="Sekcja powitalna">
      <motion.div
        className={styles.inner}
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0, y: 22 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          },
        }}
      >
        <motion.p
          className={styles.overline}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45 }}
        >
          Jel-Tomix
        </motion.p>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.55 }}
        >
          Remonty i wykończenia +{" "}
          <span className={styles.accent}>montaż mebli</span>{"\u00A0"}
          <span className={styles.break}>bez kompromisów.</span>
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.5 }}
        >
          Kompleksowo. Terminowo. Z dbałością o detal — od pierwszej gładzi po
          ostatnią śrubkę.
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.5 }}
        >
          <ButtonPrimary href="#kontakt">Bezpłatna wycena</ButtonPrimary>
          <ButtonSecondary href="#uslugi">Poznaj usługi</ButtonSecondary>
        </motion.div>
      </motion.div>

      {/* DUŻE słowo w centrum */}
      <div className={styles.highlight} aria-hidden="true">
        <motion.span
          key={idx}
          className={styles.word}
          initial={{
            x: fromRight ? "42vw" : "-42vw",
            scale: 0.6,
            opacity: 0.16,
            letterSpacing: "0.02em",
            filter: "blur(1px)",
          }}
          animate={{
            x: 0,
            scale: 1.18,
            opacity: 0.16,
            letterSpacing: "0.06em",
            filter: "blur(0px)",
          }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {WORDS[idx]}
        </motion.span>
      </div>

      {/* LATAJĄCE chipy z WORDS – auto rozmieszczenie po bokach, mocniej i szybciej */}
      <motion.div
        className={styles.floating}
        style={{ y: chipsY, opacity: chipsOpacity }}
        aria-hidden="true"
      >
        {WORDS.map((label, i) => {
          const total = WORDS.length;
          const side = i % 2 === 0 ? "left" : "right";
          // równomierne rozłożenie po wysokości (od 15% do 85%)
          const topPct = 15 + ((i + 1) * 70) / (total + 1);
          // mocniejsza amplituda i odrobina różnic w tempie
          const ampY = 50 + (i % 3) * 6; // 36–48px góra/dół
          const ampX =
            side === "left"
              ? ["-1.2vw", "2.8vw", "-1.2vw"]
              : ["1.2vw", "-2.8vw", "1.2vw"];
          const dur = 8 + (i % 4) * 0.25; // 2.6s–3.35s (szybciej niż wcześniej)

          const posSide: CSSProperties =
            side === "left" ? { left: "2%" } : { right: "2%" };

          return (
            <motion.span
              key={label + i}
              className={styles.chip}
              style={{ top: `${topPct}%`, ...posSide }}
              initial={{
                opacity: 0,
                x: side === "left" ? "-8vw" : "8vw",
                y: 0,
                scale: 0.98,
              }}
              animate={{
                opacity: 0.95,
                x: ampX, // wjazd/odjazd poziomy
                y: [-ampY, 0, ampY, 0], // wyżej/niżej — większa amplituda
                scale: [0.98, 1.0, 0.98],
              }}
              transition={{
                duration: dur,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
              }}
            >
              {label}
            </motion.span>
          );
        })}
      </motion.div>

      <a
        href="#services"
        className={styles.scrollHint}
        aria-label="Przewiń do sekcji Usługi"
      >
        <span />
      </a>
    </section>
  );
}

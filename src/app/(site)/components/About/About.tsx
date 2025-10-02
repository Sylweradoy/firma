"use client";

import { motion, type Variants, type Transition } from "framer-motion";
import styles from "./About.module.scss";
import ButtonPrimary from "@/app/(site)/components/ui/ButtonPrimary";
import ButtonSecondary from "@/app/(site)/components/ui/ButtonSecondary";

const easeOut: Transition["ease"] = [0.2, 0.8, 0.2, 1];

const container: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOut,
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
};
const item: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: easeOut },
  },
};

function IconHammer() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M2 21l8-8 3 3-8 8H2v-3Zm12.3-9.9 2.8-2.8-1.4-1.4-2.1 2.1-2.1-2.1 3.5-3.5L20.5 7l-3.5 3.5-2.7-2.7Z"
      />
    </svg>
  );
}
function IconCabinet() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 3h16v7H4V3Zm0 9h16v9H4v-9Zm4 2H6v2h2v-2Zm8 0h-2v2h2v-2Z"
      />
    </svg>
  );
}

export default function About() {
  return (
    <section
      id="o-nas"
      className={styles.about}
      aria-labelledby="about-heading"
    >
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: easeOut }}
      >
        <p className={styles.overline}>O nas</p>
        <h2 id="about-heading" className={styles.title}>
          Poznaj <span>Jel-Tomix</span>
        </h2>
        <p className={styles.lead}>
          <strong className={styles.name}>Tomek</strong> od {"20\u00A0lat"}{" "}
          działa w meblach: projektował kuchnie, prowadził zamówienia i składał
          meble w sklepie meblowym.{" "}
          <strong className={styles.name}>Sylwek</strong> od {"20\u00A0lat"} w
          remontach i wykończeniach; pracował z doświadczonymi fachowcami i od
          nich nauczył się najwyższych standardów wykonania. Od {"3\u00A0lat"}{" "}
          prowadzimy firmę razem — łączymy perfekcję montażu mebli z
          dokładnością wykończeniówki.
        </p>
      </motion.div>

 <motion.div className={styles.grid} variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
  {/* TOMEK – LEWA */}
  <motion.article className={styles.card} variants={item}>
    <div className={styles.icon}><IconCabinet /></div>
    <h3 className={styles.cardTitle}>Tomek — montaż mebli i kuchnie</h3>
    <p className={styles.cardDesc}>
      20 lat w branży meblowej: projekty, zamówienia, montaż. Kuchnie, szafy, zabudowy —
      „od kartonu po finalny front”.
    </p>
    <ul className={styles.badges} aria-label="Atuty">
      <li className={styles.badge}>Precyzja montażu</li>
      <li className={styles.badge}>Praktyka sklepowa</li>
    </ul>
  </motion.article>

  {/* SYLWEK – PRAWA */}
  <motion.article className={styles.card} variants={item}>
    <div className={styles.icon}><IconHammer /></div>
    <h3 className={styles.cardTitle}>Sylwek — remonty i wykończenia</h3>
    <p className={styles.cardDesc}>
      20 lat w budowlance. Gładzie, malowanie, płytki, detale. Praktyka wypracowana z najlepszymi,
      nacisk na precyzję i terminowość.
    </p>
    <ul className={styles.badges} aria-label="Atuty">
      <li className={styles.badge}>20+ lat doświadczenia</li>
      <li className={styles.badge}>Dokładność wykończeń</li>
    </ul>
  </motion.article>
</motion.div>


      <motion.aside
        className={styles.timeline}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45, ease: easeOut }}
        aria-label="Doświadczenie"
      >
        <div className={styles.pill}>
          <strong>20 lat</strong> remonty
        </div>
        <div className={styles.dot} aria-hidden="true" />
        <div className={styles.pill}>
          <strong>20 lat</strong> meble
        </div>
        <div className={styles.dot} aria-hidden="true" />
        <div className={styles.pillAccent}>
          <strong>3 lata</strong> razem jako Jel-Tomix
        </div>
      </motion.aside>

      <motion.div
        className={styles.actions}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45, ease: easeOut }}
      >
        <ButtonPrimary href="#kontakt">Bezpłatna wycena</ButtonPrimary>
        <ButtonSecondary href="#uslugi">Zobacz nasze usługi</ButtonSecondary>
      </motion.div>
    </section>
  );
}

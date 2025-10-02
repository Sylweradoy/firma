"use client";

import { motion } from "framer-motion";
import styles from "./Services.module.scss";
import ButtonPrimary from "@/app/(site)/components/ui/ButtonPrimary";
import ButtonSecondary from "@/app/(site)/components/ui/ButtonSecondary";

type Service = {
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const IconPaint = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M18 2H4a2 2 0 0 0-2 2v6h2V4h14v4h2V4a2 2 0 0 0-2-2Zm-7 10H4v2a3 3 0 0 0 3 3h2v3a1 1 0 0 0 1 1h2v-9Zm9-2h-6v11h4a2 2 0 0 0 2-2V10Z"/>
  </svg>
);
const IconTiles = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M3 3h8v8H3V3Zm10 0h8v8h-8V3ZM3 13h8v8H3v-8Zm10 0h8v8h-8v-8Z"/>
  </svg>
);
const IconCabinet = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M4 3h16v6H4V3Zm0 8h16v10H4V11Zm4 2H6v2h2v-2Zm8 0h-2v2h2v-2Z"/>
  </svg>
);
const IconWall = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M3 5h8v4H3V5Zm10 0h8v4h-8V5ZM3 11h8v4H3v-4Zm10 0h8v4h-8v-4ZM3 17h8v2H3v-2Zm10 0h8v2h-8v-2Z"/>
  </svg>
);
const IconElectric = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="m13 2-8 12h6l-2 8 8-12h-6l2-8Z"/>
  </svg>
);

const SERVICES: Service[] = [
  { title: "Wykończenia wnętrz", desc: "Gładzie, malowanie, listwy, podłogi – od A do Z.", icon: <IconPaint/> },
  { title: "Płytki i łazienki", desc: "Płytki, hydroizolacja, fuga, zabudowy i montaż armatury.", icon: <IconTiles/> },
  { title: "Montaż mebli", desc: "Meble na wymiar: kuchnie, szafy, zabudowy RTV.", icon: <IconCabinet/> },
  { title: "Zabudowy GK", desc: "Sufity podwieszane, ścianki, wnęki, oświetlenie LED.", icon: <IconWall/> },
  { title: "Malowanie i gładzie", desc: "Perfekcyjne wykończenie ścian i sufitów.", icon: <IconPaint/> },
  { title: "Elektryka – drobne prace", desc: "Przesunięcia punktów, osprzęt, oświetlenie.", icon: <IconElectric/> },
];

const container = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.08 }
  }
};
const item = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show:   { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.45, ease: "easeOut" } }
};

export default function Services() {
  return (
    <section id="uslugi" className={styles.services} aria-labelledby="uslugi-heading">
      <motion.div className={styles.header} initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{ once: true, amount: 0.5 }} transition={{duration:.5}}>
        <p className={styles.overline}>Czym się zajmujemy</p>
        <h2 id="uslugi-heading" className={styles.title}>Usługi <span>Jel-Tomix</span></h2>
        <p className={styles.lead}>
          Remonty, wykończenia i montaż mebli. Czytelnie, terminowo i bez kompromisów w jakości.
        </p>
      </motion.div>

      <motion.ul
        className={styles.grid}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        {SERVICES.map((s, i) => (
          <motion.li key={s.title} className={styles.card} variants={item}>
            <div className={styles.icon}>{s.icon}</div>
            <h3 className={styles.cardTitle}>{s.title}</h3>
            <p className={styles.cardDesc}>{s.desc}</p>
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        className={styles.actions}
        initial={{opacity:0,y:12}}
        whileInView={{opacity:1,y:0}}
        viewport={{ once: true, amount: 0.4 }}
        transition={{duration:.45}}
      >
        <ButtonPrimary href="#kontakt">Bezpłatna wycena</ButtonPrimary>
        <ButtonSecondary href="#galeria">Zobacz realizacje</ButtonSecondary>
      </motion.div>
    </section>
  );
}

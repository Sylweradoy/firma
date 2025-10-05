"use client";

import { motion } from "framer-motion";
import styles from "./Footer.module.scss";

const IPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm0 2v16h10V4H7Zm5 15.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"
    />
  </svg>
);
const IEmail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M20 4H4a2 2 0 0 0-2 2v1.2l10 6.25L22 7.2V6a2 2 0 0 0-2-2Zm0 6.4-8 5-8-5V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.6Z"
    />
  </svg>
);
const IFb = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M13 22v-9h3l1-4h-4V7a1 1 0 0 1 1-1h3V2h-3a5 5 0 0 0-5 5v2H6v4h3v9h4Z"
    />
  </svg>
);
const IInsta = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 7Zm0 2.5a2.5 2.5 0 1 1-.001 5.001A2.5 2.5 0 0 1 12 9.5Zm6.5-.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"
    />
  </svg>
);
const ITiktok = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M14 3h3a5 5 0 0 0 5 5v3a8 8 0 0 1-5-2v7a7 7 0 1 1-7-7 7 7 0 0 1 2 .34V12a3.5 3.5 0 1 0 2 3.16V3Z"
    />
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer} aria-labelledby="footer-heading">
      <motion.div
        className={styles.inner}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className={styles.colInfo}>
          <h2 id="footer-heading" className={styles.brand}>
            Jel-Tomix
          </h2>
          <address className={styles.address}>
            <span>ul. Kręta 24a</span>
            <span>58-521 Jeżów Sudecki</span>
            <span>Polska</span>
          </address>

          <ul className={styles.contact}>
            <li>
              <a href="tel:+48695604934" className={styles.link}>
                <IPhone /> <span>+48&nbsp;695&nbsp;604&nbsp;934</span>
              </a>
            </li>
             <li>
              <a href="tel:+48699827510" className={styles.link}>
                <IPhone /> <span>+48&nbsp;699&nbsp;827&nbsp;510</span>
              </a>
            </li>
            <li>
              <a href="mailto:kontakt@jel-tomix.pl" className={styles.link}>
                <IEmail /> <span>kontakt@jel-tomix.pl</span>
              </a>
            </li>
          </ul>
        </div>




       

        <div className={styles.colSocial}>
          <p className={styles.socialLabel}>Sociale</p>
          <ul className={styles.socials}>
            <li>
              <a href="#" aria-label="Facebook" className={styles.iconBtn}>
                <IFb />
              </a>
            </li>
            <li>
              <a href="#" aria-label="Instagram" className={styles.iconBtn}>
                <IInsta />
              </a>
            </li>
            <li>
              <a href="#" aria-label="TikTok" className={styles.iconBtn}>
                <ITiktok />
              </a>
            </li>
          </ul>
        </div>
      </motion.div>

      <div className={styles.bottom}>
        <p className={styles.copy}>
          © {year} Jel-Tomix. Wszelkie prawa zastrzeżone.
          <span className={styles.madeLine}>
            Stronę wykonał <span className={styles.madeBrand}>Jel-Tomix</span>
          </span>
        </p>
      </div>
    </footer>
  );
}

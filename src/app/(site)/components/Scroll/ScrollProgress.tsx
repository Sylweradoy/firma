"use client";

import { motion, useScroll } from "framer-motion";
import styles from "./ScrollProgress.module.scss";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className={styles.progress}
      style={{ scaleX: scrollYProgress }}
      aria-hidden
    />
  );
}

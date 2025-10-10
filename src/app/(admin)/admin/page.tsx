import WelcomeSplash from "@/app/(admin)/components/WelcomeSplash/WelcomeSplash"
import styles from "./AdminHome.module.scss";

export default async function AdminHome({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // SSR: jeśli `?welcome=1` – od razu narysuj nakładkę (brak migotania)
    const sp = await searchParams;           // ⬅️ WAŻNE
  const showWelcome = sp?.welcome === "1";

  return (
    <div className={styles.screen}>
      {/* Splash overlay (wchodzi nad całą stronę) */}
      <WelcomeSplash show={showWelcome} />

      <div className={styles.content}>
      
      
    <div className={styles.cards}>
      <section className={styles.card}>
        <div className={styles.cardTitle}>Nowe zapytania</div>
        <div className={styles.cardValue}>12</div>
      </section>

      <section className={styles.card}>
        <div className={styles.cardTitle}>Opinie do weryfikacji</div>
        <div className={styles.cardValue}>3</div>
      </section>

      <section className={styles.card}>
        <div className={styles.cardTitle}>Użytkownicy</div>
        <div className={styles.cardValue}>5</div>
      </section>

      <section className={`${styles.card} ${styles["card--wide"]}`}>
        <div className={styles.cardTitle}>Szybkie akcje</div>
        <div className={styles.cardValue}>—</div>
      </section>

      <section className={`${styles.card} ${styles["card--full"]}`}>
        <div className={styles.cardTitle}>Aktywność</div>
      </section>
    </div>
      </div>
    </div>
  );
}


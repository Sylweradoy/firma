import styles from './page.module.scss';

export default function Page() {
  return (
    <main className="main">
      <h1 className={styles.title}>Next + SCSS działa 🎉</h1>
      <div className={styles.card}>
        To jest karta wystylizowana przez SCSS Module.
      </div>
    </main>
  );
}

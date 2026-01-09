import styles from "./skeleton.module.css";

export default function Loading() {
  return (
    <main className={styles.container}>
      <div className={styles.title}></div>
      <div className={styles.grid}>
        {Array.from({ length: 72 }).map((_, i) => (
          <div key={i} className={styles.card}></div>
        ))}
      </div>
    </main>
  );
}

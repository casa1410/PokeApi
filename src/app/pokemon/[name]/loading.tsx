import styles from "../skeleton.module.css";

export default function Loading() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "3rem 2rem",
      }}
    >
      <article
        style={{
          width: "min(420px, 90%)",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "20px",
          padding: "2rem",
          textAlign: "center",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
        }}
      >
        <div
          className={styles.card}
          style={{ width: 180, height: 180, margin: "0 auto 1.5rem" }}
        ></div>
        <div
          className={styles.title}
          style={{ width: "60%", margin: "0 auto 1.5rem" }}
        ></div>
        <div
          className={styles.card}
          style={{ width: "80%", height: "0.8rem", margin: "0.5rem auto" }}
        ></div>
        <div
          className={styles.card}
          style={{ width: "75%", height: "0.8rem", margin: "0.5rem auto" }}
        ></div>
      </article>
    </main>
  );
}

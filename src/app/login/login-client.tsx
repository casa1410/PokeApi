"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function LoginClientPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });

    if (!res.ok) {
      setError("Credenciales inválidas");
      setLoading(false);
      return;
    }

    router.push("/pokemon");
    router.refresh();
  }

  return (
    <main className={styles.main}>
      <div className={styles.shell}>
        <div className={styles.brand}>
          <div className={styles.logo}>⚡</div>
          <div>
            <h1 className={styles.title}>PokeDesk</h1>
            <p className={styles.subtitle}>Accede para continuar</p>
          </div>
        </div>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Iniciar sesión</h2>
          <p className={styles.cardSub}>
            Usa las credenciales demo para entrar
          </p>

          <form onSubmit={onSubmit} className={styles.form}>
            <label className={styles.label}>
              Email
              <input name="email" className={styles.input} required />
            </label>

            <label className={styles.label}>
              Password
              <input
                name="password"
                type="password"
                className={styles.input}
                required
              />
            </label>

            {error && <div className={styles.errorBox}>{error}</div>}

            <button className={styles.primaryBtn} disabled={loading}>
              {loading ? "Ingresando..." : "Ingresar"}
            </button>

            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={() => {
                (
                  document.querySelector(
                    'input[name="email"]'
                  ) as HTMLInputElement
                ).value = "admin@poke.com";
                (
                  document.querySelector(
                    'input[name="password"]'
                  ) as HTMLInputElement
                ).value = "123456";
              }}
            >
              Usar demo
            </button>
          </form>
        </section>

        <footer className={styles.footer}>SSR · Token · Roles</footer>
      </div>
    </main>
  );
}

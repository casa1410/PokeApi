"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/auth/service";
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
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    try {
      await loginUser(email, password);
      router.push("/pokemon");
      router.refresh();
    } catch {
      setError("Credenciales inválidas");
      setLoading(false);
    }
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
          </form>
        </section>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });

    if (!res.ok) {
      setError("Login incorrecto");
      return;
    }

    router.push("/pokemon");
  }

  return (
    <main style={{ maxWidth: 400 }}>
      <h1>Login</h1>

      <form onSubmit={onSubmit}>
        <input name="email" placeholder="email" />
        <input name="password" type="password" placeholder="password" />
        <button>Ingresar</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  );
}

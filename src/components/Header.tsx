"use client";

import { logoutUser } from "@/lib/auth/service";

export function Header() {
  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.href = "/login";
    } catch {
      alert("Error al cerrar sesión");
    }
  };

  return (
    <header
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(8px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <h1 style={{ fontSize: "1.3rem", fontWeight: 800 }}>PokeApp</h1>
      <button
        onClick={handleLogout}
        style={{
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: 8,
          padding: "0.4rem 1rem",
          color: "#fff",
          background: "transparent",
          cursor: "pointer",
        }}
      >
        Cerrar sesión
      </button>
    </header>
  );
}

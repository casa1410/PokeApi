"use client";

import { useRouter, useSearchParams } from "next/navigation";

const GENERATIONS = [
  { id: 1, label: "Generación I" },
  { id: 2, label: "Generación II" },
  { id: 3, label: "Generación III" },
  { id: 4, label: "Generación IV" },
  { id: 5, label: "Generación V" },
  { id: 6, label: "Generación VI" },
  { id: 7, label: "Generación VII" },
  { id: 8, label: "Generación VIII" },
  { id: 9, label: "Generación IX" },
];

export default function GenerationSelect() {
  const router = useRouter();
  const params = useSearchParams();
  const gen = Number(params.get("gen") ?? "1");

  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        alignItems: "center",
        margin: "12px 0",
      }}
    >
      <label style={{ fontWeight: 700 }}>Filtrar por generación</label>
      <select
        value={gen}
        onChange={(e) => {
          const next = e.target.value;
          router.push(`/pokemon?gen=${next}`);
        }}
        style={{
          height: 40,
          borderRadius: 10,
          padding: "0 10px",
          border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(0,0,0,0.25)",
          color: "white",
        }}
      >
        {GENERATIONS.map((g) => (
          <option key={g.id} value={g.id}>
            {g.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export const dynamic = "force-dynamic";

import Link from "next/link";
import GenerationSelect from "@/components/GenerationSelect";
import { getGenerationDetail } from "@/lib/poke/service";
import { formatPokemonName } from "@/lib/poke/format";

export default async function PokemonPage({
  searchParams,
}: {
  searchParams: Promise<{ gen?: string }>;
}) {
  const sp = await searchParams;
  const gen = clampGen(Number(sp.gen ?? "1"));
  const data = await getGenerationDetail(gen);

  return (
    <main
      style={{
        padding: "3rem 2rem",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ marginBottom: "1rem" }}>Pokedex</h1>
      <GenerationSelect />
      <h2 style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}>
        Generación {toRoman(gen)} · {data.species.length} Pokémon
      </h2>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "1rem",
        }}
      >
        {data.species.map((p) => (
          <li key={p.id}>
            <Link
              href={`/pokemon/${p.name}`}
              style={{
                display: "block",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 12,
                padding: 12,
                background: "rgba(0,0,0,0.2)",
                textDecoration: "none",
                transition: "transform 120ms ease, box-shadow 120ms ease",
              }}
            >
              <div
                style={{
                  display: "grid",
                  placeItems: "center",
                  minHeight: 120,
                }}
              >
                <img src={p.sprite} alt={p.name} width={120} height={120} />
              </div>

              <div
                style={{
                  textAlign: "center",
                  marginTop: 8,
                  fontWeight: 700,
                }}
              >
                {formatPokemonName(p.name)}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

function clampGen(n: number) {
  if (!Number.isFinite(n)) return 1;
  if (n < 1) return 1;
  if (n > 9) return 9;
  return n;
}

function toRoman(n: number) {
  const map = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
  return map[n - 1] ?? String(n);
}

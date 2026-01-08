import { getPokemonList } from "@/lib/poke/service";
import Link from "next/link";

export const dynamic = "force-static";

export default async function PokemonListPage() {
  const { items } = await getPokemonList(24, 0);
  return (
    <main>
      <h1>Pokémon</h1>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 12,
        }}
      >
        {items.map((p) => (
          <li
            key={p.id}
            style={{ border: "1px solid #eee", borderRadius: 8, padding: 12 }}
          >
            <img src={p.sprite ?? ""} alt={p.name} width={120} height={120} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <strong>{p.name}</strong>
              <Link href={`/pokemon/${p.name}`}>Detalle</Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

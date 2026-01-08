export const dynamic = "force-dynamic";

import Link from "next/link";
import { getPokemonDetail } from "@/lib/poke/service";
import { formatPokemonName } from "@/lib/poke/format";
import { getTypeColor } from "@/lib/poke/colors";
import styles from "./page.module.css";

export default async function PokemonDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  try {
    const data = await getPokemonDetail(name);

    const types: string[] =
      "types" in data
        ? data.types.map((t: { type: { name: string } }) => t.type.name)
        : [];

    const primaryType: string = types[0] ?? "normal";
    const bgColor = getTypeColor(primaryType);

    const height = "height" in data ? data.height / 10 : null;
    const weight = "weight" in data ? data.weight / 10 : null;
    const abilities: string[] =
      "abilities" in data
        ? data.abilities.map(
            (a: { ability: { name: string } }) => a.ability.name
          )
        : [];

    return (
      <main className={styles.main}>
        <article
          className={styles.card}
          style={{
            background: `linear-gradient(180deg, ${bgColor}40 0%, ${bgColor}20 100%)`,
            borderColor: `${bgColor}60`,
            boxShadow: `0 20px 50px ${bgColor}55`,
          }}
        >
          <Link href="/pokemon" className={styles.backLink}>
            ← Volver
          </Link>

          <h1 className={styles.name}>{formatPokemonName(data.name)}</h1>

          {data.sprites?.front_default ? (
            <img
              src={data.sprites?.front_default ?? ""}
              alt={data.name ?? "pokemon"}
              width={180}
              height={180}
              className={styles.sprite}
            />
          ) : (
            <div className={styles.noImage}>No image</div>
          )}

          <div className={styles.info}>
            {types.length > 0 && (
              <p>
                <strong>Tipo:</strong>{" "}
                {types.map((t) => formatPokemonName(t)).join(", ")}
              </p>
            )}

            {height && weight && (
              <p>
                <strong>Altura:</strong> {height} m | <strong>Peso:</strong>{" "}
                {weight} kg
              </p>
            )}

            {abilities.length > 0 && (
              <div>
                <strong>Habilidades:</strong>
                <ul className={styles.abilityList}>
                  {abilities.map((a) => (
                    <li key={a}>{formatPokemonName(a)}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </article>
      </main>
    );
  } catch {
    return (
      <main className={styles.main}>
        <article className={styles.errorCard}>
          <h1>Pokémon no encontrado!</h1>
          <Link href="/pokemon" className={styles.backLink}>
            ← Volver
          </Link>
        </article>
      </main>
    );
  }
}

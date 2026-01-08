import { getPokemonDetail } from "@/lib/poke/service";
import { getUserFromCookies, can } from "@/lib/auth/server-auth";
import Link from "next/link";

export default async function PokemonDetailPage({
  params,
}: {
  params: { name: string };
}) {
  const user = getUserFromCookies();
  if (!can(user, "pokemon:detail:view")) {
    return (
      <main>
        <h1>Acceso denegado</h1>
        <p>No tienes permisos para ver el detalle.</p>
        <Link href="/pokemon">Volver</Link>
      </main>
    );
  }

  const data = await getPokemonDetail(params.name);

  return (
    <main>
      <Link href="/pokemon">← Volver</Link>
      <h1>
        {data.name} (#{data.id})
      </h1>
      {data.sprites.front_default && (
        <img
          src={data.sprites.front_default}
          alt={data.name}
          width={200}
          height={200}
        />
      )}
      <p>
        <strong>Tipos:</strong> {data.types.map((t) => t.type.name).join(", ")}
      </p>
      <p>
        <strong>Altura:</strong> {data.height} | <strong>Peso:</strong>{" "}
        {data.weight}
      </p>
      <section>
        <h2>Habilidades</h2>
        <ul>
          {data.abilities.map((a) => (
            <li key={a.ability.name}>{a.ability.name}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

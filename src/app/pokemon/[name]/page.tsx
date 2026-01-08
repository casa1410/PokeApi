import { getPokemonDetail } from "@/lib/poke/service";
import { getUserFromToken, can } from "@/lib/auth/server-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function PokemonDetailPage({
  params,
}: {
  params: { name: string };
}) {
  const user = await getUserFromToken();

  if (!can(user, "pokemon:detail:view")) {
    redirect("/login");
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

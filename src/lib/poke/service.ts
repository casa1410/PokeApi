import { PokemonDetailSchema, GenerationDetailSchema } from "./schemas";

const API = "https://pokeapi.co/api/v2";

async function safeFetch<T>(input: string): Promise<T> {
  const res = await fetch(input);
  if (!res.ok) throw new Error(`PokeAPI error ${res.status}`);
  return res.json() as Promise<T>;
}

export async function getGenerationDetail(id: number) {
  const data = await safeFetch(`${API}/generation/${id}`);
  const parsed = GenerationDetailSchema.parse(data);

  const species = parsed.pokemon_species
    .map((s) => {
      const sid = Number(s.url.split("/").filter(Boolean).pop());
      return {
        id: sid,
        name: s.name,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${sid}.png`,
      };
    })
    .sort((a, b) => a.id - b.id);

  return { id: parsed.id, name: parsed.name, species };
}

export async function getPokemonDetail(name: string) {
  const res = await fetch(`${API}/pokemon/${name}`);

  if (res.ok) {
    const data = (await res.json()) as unknown;
    return PokemonDetailSchema.parse(data);
  }

  if (res.status === 404) {
    const res2 = await fetch(`${API}/pokemon-species/${name}`);
    if (res2.ok) {
      return res2.json();
    }
  }

  throw new Error(`PokeAPI error ${res.status}`);
}

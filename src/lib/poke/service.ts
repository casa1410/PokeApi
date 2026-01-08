import { PokemonListSchema, PokemonDetailSchema } from "./schemas";

const API = "https://pokeapi.co/api/v2";

async function safeFetch<T>(input: string): Promise<T> {
  const res = await fetch(input);
  if (!res.ok) throw new Error(`PokeAPI error ${res.status}`);
  return res.json() as Promise<T>;
}

export async function getPokemonList(limit = 20, offset = 0) {
  const data = await safeFetch(`${API}/pokemon?limit=${limit}&offset=${offset}`);
  const parsed = PokemonListSchema.parse(data);
  const items = parsed.results.map((r: any) => {
    const id = Number(r.url.split("/").filter(Boolean).pop());
    return {
      id,
      name: r.name,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      types: []
    };
  });
  return { count: parsed.count, items };
}

export async function getPokemonDetail(name: string) {
  const data = await safeFetch(`${API}/pokemon/${name}`);
  return PokemonDetailSchema.parse(data);
}
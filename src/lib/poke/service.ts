import { getGenerationAPI, getPokemonAPI } from "./api";

export async function getGenerationDetail(id: number) {
  const parsed = await getGenerationAPI(id);

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
  return await getPokemonAPI(name);
}

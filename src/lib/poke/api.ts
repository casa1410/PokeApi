import { fetcher } from "@/utils/fetcher";
import { PokemonDetailSchema, GenerationDetailSchema } from "./schemas";

const API_URL = "https://pokeapi.co/api/v2";

export async function getGenerationAPI(id: number) {
  const data = await fetcher(`${API_URL}/generation/${id}`);
  return GenerationDetailSchema.parse(data);
}

export async function getPokemonAPI(name: string) {
  const data = await fetcher(`${API_URL}/pokemon/${name}`);
  return PokemonDetailSchema.parse(data);
}

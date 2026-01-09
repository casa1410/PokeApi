import { z } from "zod";

export const PokemonListItemSchema = z.object({
  name: z.string(),
  url: z.string().url(),
});

export const GenerationDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  pokemon_species: z.array(
    z.object({
      name: z.string(),
      url: z.string().url(),
    })
  ),
});

export const PokemonDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  sprites: z.object({ front_default: z.string().nullable() }),
  types: z.array(
    z.object({
      slot: z.number(),
      type: z.object({ name: z.string(), url: z.string().url() }),
    })
  ),
  height: z.number(),
  weight: z.number(),
  abilities: z.array(
    z.object({
      ability: z.object({ name: z.string(), url: z.string().url() }),
      is_hidden: z.boolean(),
      slot: z.number(),
    })
  ),
});

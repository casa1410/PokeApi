import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://pokeapi.co/api/v2/pokemon", () => {
    return HttpResponse.json({
      count: 1,
      next: null,
      previous: null,
      results: [
        { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
      ],
    });
  }),
  http.get("https://pokeapi.co/api/v2/pokemon/pikachu", () => {
    return HttpResponse.json({
      id: 25,
      name: "pikachu",
      sprites: { front_default: "https://example.com/pika.png" },
      types: [
        {
          slot: 1,
          type: { name: "electric", url: "https://pokeapi.co/api/v2/type/13/" },
        },
      ],
      height: 4,
      weight: 60,
      abilities: [],
    });
  }),
];

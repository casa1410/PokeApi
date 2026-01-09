import { getGenerationDetail } from "../service";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        id: 1,
        name: "generation-i",
        pokemon_species: [
          {
            name: "bulbasaur",
            url: "https://pokeapi.co/api/v2/pokemon-species/1/",
          },
          {
            name: "ivysaur",
            url: "https://pokeapi.co/api/v2/pokemon-species/2/",
          },
        ],
      }),
  })
) as jest.Mock;

describe("getGenerationDetail", () => {
  it("should return a sorted and formatted species list", async () => {
    const data = await getGenerationDetail(1);

    expect(data).toBeDefined();
    expect(data.id).toBe(1);
    expect(Array.isArray(data.species)).toBe(true);

    const { species = [] } = data;

    const [first, second] = species;

    if (first && second) {
      expect(species).toHaveLength(2);
      expect(first).toHaveProperty("sprite");
      expect(first.id).toBeLessThan(second.id);
    } else {
      throw new Error("Species array does not have enough elements for test");
    }
  });
});

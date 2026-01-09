"use client";

import RetryButton from "@/components/RetryButton";

export default function PokemonError({ error }: { error: Error }) {
  return (
    <main>
      <h1>Ups, hubo un error</h1>
      <p>{error.message}</p>
      <RetryButton />
    </main>
  );
}

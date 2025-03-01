"use client";

import Link from "next/link";
import PokemonCard from "./pokemon-card";
import { use } from "react";

type PokemonItem = {
  name: string;
  url: string;
};

type PokemonData = {
  count: number;
  next: string;
  previous: string;
  results: PokemonItem[];
};

export default function CardsWrapper({ data }: { data: Promise<PokemonData> }) {
  const pokemons = use(data);
  return (
    <div className="grid grid-cols-4 gap-3">
      {pokemons.results.map((pokemon) => (
        <PokemonCard key={pokemon.name} data={pokemon} />
      ))}
    </div>
  );
}

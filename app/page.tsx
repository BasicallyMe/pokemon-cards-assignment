import Link from "next/link";
import CardsWrapper from "./(components)/cards-wrapper";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { API_LIMIT } from "@/utils/helpers";
import Image from "next/image";

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

function getPokemons() {
  return fetch(`https://pokeapi.co/api/v2/pokemon?limit=${API_LIMIT}`, {
    cache: "force-cache",
  })
    .then((res) => res.json())
    .catch((err) => notFound());
}

export default async function Home() {
  const pokemons: Promise<PokemonData> = getPokemons();
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="h-lvh flex items-center justify-center overflow-hidden bg-theme-primary w-full relative">
        <Image
          src="/main-hero-image.png"
          width={600}
          height={600}
          alt="Placeholder"
          className="-bottom-10 left-1/2 -translate-x-1/2 absolute z-10"
        />
        <div className="relative -top-20">
          <p className="text-sm text-center text-white">
            The best place to find everything about pokemon
          </p>
          <h2 className="text-7xl font-black text-theme-secondary">
            Poke Cards
          </h2>
        </div>
      </div>
      <section className="max-w-4xl py-5">
        <div className="flex justify-end mb-5 gap-3">
          <input
            placeholder="Search for a pokemon"
            className="text-sm placeholder:text-xs placeholder:text-gray-500 border border-gray-300 rounded-md outline-offset-2 py-1 px-2"
          />
          <Link
            href="/page/2"
            className="text-sm bg-[#FFCB05] px-5 rounded-md flex items-center justify-center"
          >
            Next
          </Link>
        </div>
        <Suspense fallback={<div>Loading pokemon cards...</div>}>
          <CardsWrapper data={pokemons} />
        </Suspense>
      </section>
    </div>
  );
}

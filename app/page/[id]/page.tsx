import Link from "next/link";
import Image from "next/image";
import { API_LIMIT } from "@/utils/helpers";
import CardsWrapper from "@/app/(components)/cards-wrapper";
import SearchComponent from "@/app/(components)/search";
import { Suspense } from "react";

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

function getPokemons(id: number) {
  return fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${API_LIMIT}&offset=${
      (id - 1) * API_LIMIT
    }`
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export default async function CardsPage({
  params,
}: {
  params: { id: string };
}) {
  let { id } = await params;
  let pageId: number = parseInt(id);
  const pokemons: Promise<PokemonData> = getPokemons(pageId);
  const next = (await pokemons).next;
  const prev = (await pokemons).previous;
  return (
    <section className="max-w-4xl py-5">
      <div className="flex justify-end mb-5 gap-3">
        <SearchComponent />
        <Link
          href={pageId > 2 ? `/page/${pageId - 1}` : "/"}
          className="text-sm bg-theme-primary px-5 rounded-md flex items-center justify-center"
        >
          Prev
        </Link>
        {next && (
          <Link
            href={`/page/${pageId + 1}`}
            className="text-sm bg-theme-primary px-5 rounded-md flex items-center justify-center"
          >
            Next
          </Link>
        )}
      </div>
      <Suspense fallback={<div>Loading pokemon cards...</div>}>
        <CardsWrapper data={pokemons} />
      </Suspense>
    </section>
  );
}

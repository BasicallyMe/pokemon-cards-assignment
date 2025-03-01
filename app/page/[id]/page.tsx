import Link from "next/link";
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

// async function getPokemons(id: number) {
//   try {
//     const res = await fetch(
//       `https://pokeapi.co/api/v2/pokemon?limit=${API_LIMIT}&offset=${
//         (id - 1) * API_LIMIT
//       }`
//     );
//     const response = await res.json();
//     return response;
//   } catch (err) {
//     console.log(err);
//     return null;
//   }
// }

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
    <div className="w-full h-full flex flex-col items-center">
      <div className="h-60 flex items-center justify-center">
        <p className="text-xs text-center w-sm">
          Pokémon are mysterious creatures filled with many secrets. Some
          Pokémon live alongside humans and some live in the wild in grassy
          fields, caves, or the sea, but much about their ecology that remains
          unknown. One of their main features is that they can be caught using a
          Poké Ball, which allows them to be carried around.
        </p>
      </div>
      <section className="max-w-4xl">
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
    </div>
  );
}

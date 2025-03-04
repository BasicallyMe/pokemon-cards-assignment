import Link from "next/link";
import { API_LIMIT, API_URL } from "@/utils/helpers";
import CardsWrapper from "@/app/(components)/cards-wrapper";
import SearchComponent from "@/app/(components)/search";
import { PokemonData } from "@/types/Pokemon";
import { Suspense } from "react";

function getPokemons(id: number) {
  return fetch(
    `${API_URL}?limit=${API_LIMIT}&offset=${
      (id - 1) * API_LIMIT
    }`
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export default async function CardsPage(props: { params: Promise<{ id: string }>}) {
  const params = await props.params;
  const id = params.id;
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

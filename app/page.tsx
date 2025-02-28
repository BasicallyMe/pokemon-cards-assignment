import Link from "next/link";
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

async function getPokemons(id = null) {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon");
    const response = await res.json();
    return response;
  } catch (err) {
    console.log(err);
  }
}

export default async function Home() {
  const pokemons: PokemonData = await getPokemons();
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="h-lvh flex items-center justify-center">
        <p className="text-xs text-center w-sm">
          Pokémon are mysterious creatures filled with many secrets. Some
          Pokémon live alongside humans and some live in the wild in grassy
          fields, caves, or the sea, but much about their ecology that remains
          unknown. One of their main features is that they can be caught using a
          Poké Ball, which allows them to be carried around.
        </p>
      </div>
      <section className="w-4xl">
        <div className="flex items-center justify-center flex-wrap gap-4">
          {pokemons.results.map((pokemon) => (
            <div key={pokemon.name} className="capitalize text-sm font-medium bg-amber-400 rounded-md py-1 px-3">
              <Link href={`/pokemon/${pokemon?.name}`}>{pokemon.name}</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

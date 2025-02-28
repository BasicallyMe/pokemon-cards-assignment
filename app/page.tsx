import Link from "next/link";

type PokemonItem = {
  name: string;
  url: string;
}

type PokemonData = {
  count: number;
  next: string;
  previous: string;
  results: PokemonItem[];
}

async function getPokemons(id = null) {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon");
    const response = await res.json();
    return response;
  } catch (err) { 
    console.log(err)
  }
}

export default async function Home() {
  const pokemons: PokemonData = await getPokemons();
  return (
    <div className="w-lg">
      {pokemons.results.map((pokemon) => (
        <div key={pokemon.name}>
          <Link href={`/pokemon/${pokemon?.name}`}>{pokemon.name}</Link>
        </div>
      ))}
    </div>
  );
}

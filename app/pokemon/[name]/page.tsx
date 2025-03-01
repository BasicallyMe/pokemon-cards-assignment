import Image from "next/image";
import AbilityCard from "@/app/(components)/ability-card";
import Badge from "@/app/(components)/badge";
import Moves from "@/app/(components)/moves";
import { notFound } from "next/navigation";

async function getPokemon(name: string) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const response = await res.json();
    if (response) {
      return response;
    }
    return null;
  } catch (error) {
    console.log("Error", error);
    notFound();
  }
}

export default async function Pokemon({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const pokemon: Awaited<ReturnType<typeof getPokemon>> = await getPokemon(
    name
  );

  if (!pokemon) {
    notFound();
  }

  return (
    <div className="w-full min-h-dvh flex justify-center py-4">
      <div className="w-4xl flex">
        <div className="flex-1 flex flex-col items-center justify-center">
          <Image
            alt="Placeholder"
            src={pokemon.sprites.other.dream_world.front_default}
            width={300}
            height={300}
          />
        </div>
        <div className="flex-1 flex flex-col justify-center px-4">
          <div className="mb-5 flex items-center gap-4">
            <Image
              src={pokemon.sprites.other.showdown.front_default}
              width={40}
              height={40}
              alt="Placeholder"
            />
            <div className="flex flex-col">
              <h2 className="capitalize text-xl font-bold mb-1">
                {pokemon.name}
              </h2>
              <div className="flex flex-wrap gap-2">
                {pokemon.types.map(
                  (type: {
                    slot: number;
                    type: { name: string; url: string };
                  }) => (
                    <Badge name={type.type.name} key={type.type.name} />
                  )
                )}
              </div>
            </div>
          </div>
          <div className="flex w-sm py-4 gap-10">
            <div>
              <span className="font-medium text-xs text-gray-500">Height</span>
              <div>
                {pokemon.height * 10}
                <span className="text-xs text-gray-600 ml-1">cms</span>
              </div>
            </div>
            <div>
              <span className="font-medium text-xs text-gray-500">Weight</span>
              <div>
                {pokemon.weight * 100}
                <span className="text-xs text-gray-600 ml-1">gms</span>
              </div>
            </div>
          </div>
          <div className="py-4 w-sm">
            <h4 className="text-sm font-medium mb-2">Stats</h4>
            <div className="flex gap-2 flex-wrap">
              {pokemon.stats.map(
                (item: {
                  base_stat: number;
                  effort: number;
                  stat: { name: string; url: string };
                }) => (
                  <div
                    key={item.stat.name}
                    className="flex gap-1 items-baseline"
                  >
                    <span className="font-medium text-xs text-gray-500 capitalize">
                      {item.stat.name}
                    </span>
                    <div className="text-lg font-semibold">
                      {item.base_stat}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="py-4">
            <h4 className="text-sm font-medium mb-2">Abilities</h4>
            <div className="grid grid-cols-2 gap-3">
              {pokemon.abilities.map(
                (item: {
                  ability: { name: string; url: string };
                  is_hidden: boolean;
                  slot: number;
                }) => (
                  <AbilityCard key={item.ability.name} data={item} />
                )
              )}
            </div>
          </div>
          <Moves data={pokemon.moves} />
        </div>
      </div>
    </div>
  );
}

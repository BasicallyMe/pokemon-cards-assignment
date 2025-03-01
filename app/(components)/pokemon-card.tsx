"use client";

import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from "react";

type PokemonDataType = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    other: {
      showdown: {
        front_default: string;
      };
    };
  };
};

export default function PokemonCard({
  data,
}: {
  data: { name: string; url: string };
}) {
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState<PokemonDataType | null>(null);
  async function getPokemonData() {
    try {
      const res = await fetch(data.url);
      const response = await res.json();
      setPokemonData(response);
      setLoading(false);
    } catch (error) {
      console.log("Got error");
    }
  }

  function handleRouteClick() {
    
  }

  useEffect(function initialize() {
    getPokemonData();
  }, []);

  if (loading || !pokemonData) {
    return (
      <div className="w-48 h-20 bg-gray-200 rounded-md flex items-center px-2">
        <div className="h-16 w-16 bg-gray-300 rounded-md" />
      </div>
    );
  }

  return (
    <Link href={`/pokemon/${pokemonData.name}`} className="w-52 h-20 bg-theme-secondary rounded-md flex items-center px-2 py-2 gap-2">
      <div className="bg-theme-primary h-16 w-16 min-w-16 flex items-center justify-center rounded-md overflow-hidden">
        <Image
          src={pokemonData.sprites.other.showdown.front_default}
          width={40}
          height={40}
          alt="Placeholder"
          objectFit="contain"
        />
      </div>
      <div className="h-full w-full text-white">
        <div className="text-sm text-left font-medium capitalize mb-2">{pokemonData.name.replace("-", " ")}</div>
        <div className="flex flex-wrap">
            <div className="text-xs">Height <span className="text-black font-semibold">{pokemonData.height * 10}</span>cms</div>
            <div className="text-xs">Weight <span className="text-black font-semibold">{pokemonData.weight * 100}</span>gms</div>
        </div>
      </div>
    </Link>
  );
}

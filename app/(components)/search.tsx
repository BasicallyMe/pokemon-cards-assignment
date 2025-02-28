"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, FormEvent } from "react";
import { Search, X } from "lucide-react";

type PokemonData = {
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

export default function SearchComponent() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [data, setData] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const searchQuery = formData.get("search");
    if (!searchQuery) return;
    handleSearch(searchQuery);
  }

  async function handleSearch(query: FormDataEntryValue) {
    setData(null);
    setError(false);
    setLoading(true);
    setShowDropdown(true);
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${query.toString().toLowerCase()}`
      );
      const response = await res.json();
      setLoading(false);
      setData(response);
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  }

  function cancelSearch() {
    setShowDropdown(false);
    setData(null);
  }

  return (
    <div className="relative">
      {showDropdown && (
        <div className="absolute shadow-md w-60 rounded-md top-8 px-2 py-2 right-0 bg-white">
          <div className="w-full mb-3 flex justify-end">
            <button
              className="text-xs text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={cancelSearch}
            >
              Cancel
            </button>
          </div>
          {loading && (
            <div className="text-xs text-gray-500 font-medium text-center">
              Loading
            </div>
          )}
          {error && (
            <div className="text-xs text-red-600 font-medium text-center">
              Couldn't find your pokemon. Please try again
            </div>
          )}
          {data && (
            <div className="flex">
              <div className="flex-1 bg-gray-200 rounded-md flex items-center justify-center py-2">
                <Image
                  src={data.sprites.other.showdown.front_default}
                  alt="Placeholder"
                  width={50}
                  height={50}
                />
              </div>
              <div className="flex-1 px-2">
                <div className="mb-2text-xs capitalize font-semibold">
                  <Link href={`/pokemon/${data.name}`}>{data.name}</Link>
                </div>
                <div className="flex flex-wrap gap-1">
                  <div className="text-xs">
                    <span className="text-gray-500">Height </span>
                    <span>{`${data.height * 10}cms`}</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-gray-500">Weight </span>
                    <span>{`${data.height * 100}gms`}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <input
            type="text"
            name="search"
            className="placeholder:text-xs placeholder:text-gray-500 text-sm outline-none py-1 px-2"
            placeholder="Search for a pokemon"
            required
          />
          <button className="bg-[#FFCB05]/70 px-2 py-2 cursor-pointer">
            <Search size={13} strokeWidth={1.5} />
          </button>
        </div>
      </form>
    </div>
  );
}

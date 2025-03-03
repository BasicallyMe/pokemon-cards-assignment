export type PokemonItem = {
  name: string;
  url: string;
};

export type PokemonData = {
  count: number;
  next: string;
  previous: string;
  results: PokemonItem[];
};

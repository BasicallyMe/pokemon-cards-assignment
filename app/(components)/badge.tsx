import { typeColors } from "@/utils/helpers";
import {
  Swords,
  Wind,
  Skull,
  Mountain,
  Gem,
  Bug,
  Ghost,
  Shield,
  Flame,
  Droplet,
  Leaf,
  Zap,
  Brain,
  Snowflake,
  Eye,
  Moon,
  Star,
  HelpCircle,
  Circle,
} from "lucide-react";

export default function Badge({ name }: { name: string }) {
  return (
    <div
      className={`rounded-sm ${typeColors[name]} text-white font-medium text-xs py-1 px-3 capitalize flex items-center gap-2`}
    >
      <PokemonTypeIcon type={name} />
      {name}
    </div>
  );
}

const PokemonTypeIcon = ({ type }: { type: string }) => {
  return getPokemonTypeIcon(type);
};

const getPokemonTypeIcon = (type: string) => {
  switch (type) {
    case "normal":
      return <Circle size={13} strokeWidth={2} />;
    case "fighting":
      return <Swords size={13} strokeWidth={2} />;
    case "flying":
      return <Wind size={13} strokeWidth={2} />;
    case "poison":
      return <Skull size={13} strokeWidth={2} />;
    case "ground":
      return <Mountain size={13} strokeWidth={2} />;
    case "rock":
      return <Gem size={13} strokeWidth={2} />;
    case "bug":
      return <Bug size={13} strokeWidth={2} />;
    case "ghost":
      return <Ghost size={13} strokeWidth={2} />;
    case "steel":
      return <Shield size={13} strokeWidth={2} />;
    case "fire":
      return <Flame size={13} strokeWidth={2} />;
    case "water":
      return <Droplet size={13} strokeWidth={2} />;
    case "grass":
      return <Leaf size={13} strokeWidth={2} />;
    case "electric":
      return <Zap size={13} strokeWidth={2} />;
    case "psychic":
      return <Brain size={13} strokeWidth={2} />;
    case "ice":
      return <Snowflake size={13} strokeWidth={2} />;
    case "dragon":
      return <Eye size={13} strokeWidth={2} />;
    case "dark":
      return <Moon size={13} strokeWidth={2} />;
    case "fairy":
    case "stellar":
      return <Star size={13} strokeWidth={2} />;
    case "unknown":
      return <HelpCircle size={13} strokeWidth={2} />;
    case "shadow":
      return <Circle size={13} strokeWidth={2} />;
    default:
      return <HelpCircle size={13} strokeWidth={2} />; // Fallback for unknown types
  }
};

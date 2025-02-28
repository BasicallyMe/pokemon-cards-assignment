type AbilityData = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

type Ability = Awaited<ReturnType<typeof getAbilities>>["ability"];

async function getAbilities(url: string) {
  try {
    const res = await fetch(url);
    const response = await res.json();
    return { error: false, ability: response };
  } catch (err) {
    console.log("Error while getting abilities", err);
    return { error: true, ability: [] };
  }
}

export default async function AbilityCard({ data }: { data: AbilityData }) {
  const { error, ability }: { error: boolean; ability: Ability } =
    await getAbilities(data.ability.url);
  return (
    <div>
      <h4 className="text-sm capitalize font-medium">
        {data.ability.name.replace("-", " ")}
      </h4>
      <p className="text-xs text-gray-500">
        {ability.effect_entries.filter(
          (entry: {
            effect: string;
            language: { name: string; url: string };
            short_effect: string;
          }) => entry.language.name === "en"
        )[0].short_effect}
      </p>
    </div>
  );
}

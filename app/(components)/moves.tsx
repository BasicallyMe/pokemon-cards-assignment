"use client";

type Move = {
  move: {
    name: string;
    url: string;
  };
};

export default function Moves({ data }: { data: Move[] }) {
  return (
    <div>
      <h3 className="text-sm font-medium mb-3">Moves</h3>
      <div className="flex gap-3 flex-wrap">
        {data.slice(0, 10).map((item) => (
          <button
            key={item.move.name}
            className="text-xs capitalize bg-theme-primary rounded-md py-1 px-3"
          >
            {item.move.name.replace("-", " ")}
          </button>
        ))}
        {data.length > 10 && (
          <div className="text-xs text-gray-500 flex items-center">
            {Math.abs(data.length - 10)}+ more moves
          </div>
        )}
      </div>
    </div>
  );
}

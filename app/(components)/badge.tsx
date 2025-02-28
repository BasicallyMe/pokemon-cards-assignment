
export default function Badge({ name }: { name: string }) {
    return (
        <div className="rounded-sm bg-amber-600 text-white font-medium text-xs py-1 px-3 capitalize">{name}</div>
    )
}
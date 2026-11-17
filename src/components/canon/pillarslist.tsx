interface PillarsListProps {
  pillars: readonly string[];
}

export function PillarsList({ pillars }: PillarsListProps) {
  return (
    <ul className="space-y-2">
      {pillars.map((pillar) => (
        <li
          key={pillar}
          className="text-sm capitalize text-zinc-300 tracking-wide"
        >
          {pillar.replace(/([A-Z])/g, " $1").trim()}
        </li>
      ))}
    </ul>
  );
}
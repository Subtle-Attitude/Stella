interface CoreTruthProps {
  text: string;
}

export function CoreTruth({ text }: CoreTruthProps) {
  return <p className="text-sm leading-relaxed text-zinc-300">{text}</p>;
}
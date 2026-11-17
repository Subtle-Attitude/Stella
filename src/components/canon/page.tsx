import { getCanon } from "@/lib/canon-service";

export default function CanonPage() {
  const canon = getCanon();

  return (
    <div className="h-screen bg-black text-white p-12">
      <h1 className="text-2xl font-light tracking-tight mb-8">Canon</h1>
      <pre className="text-sm text-zinc-400 whitespace-pre-wrap">
        {JSON.stringify(canon, null, 2)}
      </pre>
    </div>
  );
}
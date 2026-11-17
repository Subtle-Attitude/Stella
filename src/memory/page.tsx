import { loadStore } from "@/memory/memory-store"

export default function MemoryPage() {
  const store = loadStore()

  return (
    <div className="h-screen bg-black text-white p-12">
      <h1 className="text-2xl font-light mb-8">Memory</h1>
      <div className="space-y-4">
        {store.records.map((r) => (
          <div key={r.id} className="border border-zinc-800 p-4 rounded">
            <div className="text-xs text-zinc-500">{r.category} · {r.status}</div>
            <div className="mt-1">{r.content}</div>
            <div className="text-xs text-zinc-600 mt-2">
              Created {new Date(r.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
        {store.records.length === 0 && (
          <p className="text-zinc-500 text-sm">No memories yet.</p>
        )}
      </div>
    </div>
  )
}
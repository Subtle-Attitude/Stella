import { getActiveSession, startSession, pauseSession, resumeSession, endSession } from "@/runtime/session-manager"
import Image from "next/image"

export default function Dashboard() {
  const active = getActiveSession()

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-light mb-2">Welcome Back, Kristin</h1>
      <p className="text-zinc-500 mb-10">Stella OS</p>

      {active && (
        <div className="mb-10 p-4 border border-zinc-800 rounded flex items-center justify-between">
          <div>
            <div className="text-xs text-zinc-500">{active.state.toUpperCase()} · {active.type}</div>
            <div className="text-sm mt-1">
              {active.exploration.domain || "—"} / {active.exploration.pillar || "—"} / {active.exploration.topic || "—"}
            </div>
          </div>
          <div className="flex gap-3">
            <form action={async () => { "use server"; resumeSession(active.id) }}>
              <button type="submit"><Image src="/assets/StellaIMG/play.png" alt="Resume" width={32} height={32} /></button>
            </form>
            <form action={async () => { "use server"; pauseSession(active.id) }}>
              <button type="submit"><Image src="/assets/StellaIMG/pause.png" alt="Pause" width={32} height={32} /></button>
            </form>
            <form action={async () => { "use server"; endSession(active.id) }}>
              <button type="submit"><Image src="/assets/StellaIMG/stop.png" alt="End" width={32} height={32} /></button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <form action={async () => { "use server"; startSession("conversation") }}>
          <button className="flex flex-col items-center gap-2">
            <Image src="/assets/StellaIMG/stella-communication.png" alt="Start Conversation" width={64} height={64} />
            <span className="text-xs">Conversation</span>
          </button>
        </form>

        <form action={async () => { "use server"; startSession("journal") }}>
          <button className="flex flex-col items-center gap-2">
            <Image src="/assets/StellaIMG/log-entry.png" alt="Journal" width={64} height={64} />
            <span className="text-xs">Journal</span>
          </button>
        </form>

        <form action={async () => { "use server"; startSession("voice") }}>
          <button className="flex flex-col items-center gap-2">
            <Image src="/assets/StellaIMG/talk-to-text.png" alt="Voice" width={64} height={64} />
            <span className="text-xs">Voice</span>
          </button>
        </form>

        <a href="/history" className="flex flex-col items-center gap-2">
          <Image src="/assets/StellaIMG/search.png" alt="Search" width={64} height={64} />
          <span className="text-xs">Search</span>
        </a>
      </div>
    </div>
  )
}
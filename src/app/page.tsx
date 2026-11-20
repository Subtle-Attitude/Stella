"use client";

import { useState, useEffect } from "react";
import {
  actionStart,
  actionPause,
  actionResume,
  actionEnd,
  actionGetActive,
} from "@/runtime/actions";
import type { StellaSession } from "@/runtime/types";
import { StellaVisual } from "@/components/stella/stellavisual";
import { orchestrate } from "@/cognitive/orchestrator";

const EXPERIENCES = [{ id: "yourAtlas", label: "Your Atlas" }];

function stopSpeaking() {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

type SpeechRecognizer = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  start: () => void;
};

type SpeechRecognizerConstructor = new () => SpeechRecognizer;

function createSpeechRecognizer(
  onTranscript: (text: string) => void,
  onEnd: () => void,
  onError: (err: string) => void
) {
  const browser = window as Window & {
    SpeechRecognition?: SpeechRecognizerConstructor;
    webkitSpeechRecognition?: SpeechRecognizerConstructor;
  };
  const Recognition = browser.SpeechRecognition ?? browser.webkitSpeechRecognition;
  if (!Recognition) return null;

  const recognizer = new Recognition();
  recognizer.lang = "en-US";
  recognizer.interimResults = false;
  recognizer.continuous = false;

  recognizer.onresult = (event) => {
    const text = event.results[0][0].transcript;
    onTranscript(text);
  };

  recognizer.onend = () => onEnd();
  recognizer.onerror = (event) => onError(event.error || "recognition error");

  return recognizer;
}

function formatDuration(startedAt: string) {
  const mins = Math.floor((Date.now() - new Date(startedAt).getTime()) / 60000);
  return `${mins}m`;
}

export default function Dashboard() {
  const [active, setActive] = useState<StellaSession | null>(null);
  const [experience, setExperience] = useState("yourAtlas");
  const [listening, setListening] = useState(false);
  const [lastTranscript, setLastTranscript] = useState("");

  useEffect(() => {
    actionGetActive().then(setActive);
  }, []);

  const isConversation = active?.type === "conversation";
  const isActive = isConversation && active?.state === "active";
  const isPaused = isConversation && active?.state === "paused";

  function startVoiceCapture() {
    const rec = createSpeechRecognizer(
      async (text) => {
        setLastTranscript(text);
        console.log("[voice] heard:", text);

        try {
          const result = await orchestrate({
            text,
            sessionId: active?.id || "default",
            source: "voice",
          });

          console.log("[voice] orchestrator result:", result);

          if (result.response) {
            stopSpeaking();
            const u = new SpeechSynthesisUtterance(result.response);
            u.rate = 0.95;
            window.speechSynthesis.speak(u);
          } else {
            setLastTranscript((prev) => `${prev} · (no response)`);
          }
        } catch (err) {
          console.error("[voice] orchestrate failed:", err);
          setLastTranscript("Error talking to Stella");
        }
      },
      () => setListening(false),
      (err) => {
        console.error("[voice] recognition error:", err);
        setListening(false);
        setLastTranscript(`Mic error: ${err}`);
      }
    );

    if (rec) {
      setListening(true);
      rec.start();
    } else {
      setLastTranscript("Speech recognition not available in this browser");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      <aside className="w-52 border-r border-zinc-900 py-8 px-4 flex flex-col gap-1">
        <div className="mb-8 px-2">
          <h1 className="text-sm font-light tracking-tight">Stella</h1>
          <p className="text-[10px] text-zinc-600">Atlas Spark</p>
        </div>

        <div className="text-[10px] uppercase tracking-widest text-zinc-600 px-3 mb-2">
          Explore
        </div>

        {EXPERIENCES.map((exp) => (
          <button
            key={exp.id}
            onClick={() => setExperience(exp.id)}
            className={`text-left px-3 py-2.5 rounded text-sm transition-colors ${
              experience === exp.id
                ? "bg-zinc-900 text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {exp.label}
          </button>
        ))}

        <div className="mt-8 text-[10px] uppercase tracking-widest text-zinc-600 px-3 mb-2">
          System
        </div>

        <a href="/journal" className="px-3 py-2 text-sm text-zinc-500 hover:text-zinc-300">
          Journal
        </a>
        <a href="/history" className="px-3 py-2 text-sm text-zinc-500 hover:text-zinc-300">
          Journey
        </a>
        <a href="/memory" className="px-3 py-2 text-sm text-zinc-500 hover:text-zinc-300">
          Memory
        </a>
        <a href="/voice" className="px-3 py-2 text-sm text-zinc-500 hover:text-zinc-300">
          Voice
        </a>
      </aside>

      <div className="flex-1 flex flex-col items-center">
        <div className="w-full px-8 py-3 text-xs text-zinc-500 flex justify-between border-b border-zinc-900">
          <div>
            {active
              ? `${active.type.toUpperCase()} · ${active.state.toUpperCase()} · ${formatDuration(active.startedAt)}`
              : "No active session"}
          </div>
          <div>
            Experience: {EXPERIENCES.find((e) => e.id === experience)?.label}
            {listening && " · Listening"}
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center w-full">
          <StellaVisual mode="orientation" />
        </div>

        <div className="flex items-center justify-center gap-6 py-6 min-h-[80px]">
          {!isActive && !isPaused && (
            <button
              onClick={async () => {
                await actionStart("conversation");
                setActive(await actionGetActive());
              }}
            >
              <img
                src="/assets/StellaIMG/stella-communication.png"
                alt="Begin Conversation"
                width={56}
                height={56}
              />
            </button>
          )}

          {isActive && (
            <>
              <button
                onClick={async () => {
                  await actionPause(active!.id);
                  setActive(await actionGetActive());
                }}
              >
                <img src="/assets/StellaIMG/pause.png" alt="Pause" width={48} height={48} />
              </button>
              <button
                onClick={async () => {
                  await actionEnd(active!.id);
                  setActive(await actionGetActive());
                  stopSpeaking();
                }}
              >
                <img src="/assets/StellaIMG/stop.png" alt="Stop" width={48} height={48} />
              </button>
              <button className="px-4 py-2 text-xs text-zinc-400 border border-zinc-800 rounded-full">
                Save
              </button>
            </>
          )}

          {isPaused && (
            <button
              onClick={async () => {
                await actionResume(active!.id);
                setActive(await actionGetActive());
              }}
            >
              <img
                src="/assets/StellaIMG/stella-communication.png"
                alt="Resume Conversation"
                width={56}
                height={56}
              />
            </button>
          )}
        </div>

        <div className="pb-6 flex flex-col items-center gap-2">
          <button
            onClick={startVoiceCapture}
            disabled={listening}
            className="px-5 py-2 text-xs border border-zinc-700 rounded-full text-zinc-300 disabled:opacity-40"
          >
            {listening ? "Listening…" : "Voice"}
          </button>
          {lastTranscript && (
            <div className="text-xs text-zinc-500">You said: {lastTranscript}</div>
          )}
        </div>
      </div>
    </div>
  );
}
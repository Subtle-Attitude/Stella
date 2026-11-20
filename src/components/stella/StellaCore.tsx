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
import Image from "next/image";

function stopSpeaking() {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

const EXPERIENCES = [
  { id: "yourAtlas", label: "Your Atlas" },
  { id: "envision", label: "Envision" },
  { id: "dreamWeaver", label: "Dream Weaver" },
];

type SpeechRecognizer = {
  lang: string;
  interimResults: boolean;
  onresult:
    | ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void)
    | null;
  start: () => void;
};

type SpeechRecognizerConstructor = new () => SpeechRecognizer;

function createSpeechRecognizer(onTranscript: (text: string) => void) {
  const browser = window as Window & {
    SpeechRecognition?: SpeechRecognizerConstructor;
    webkitSpeechRecognition?: SpeechRecognizerConstructor;
  };
  const Recognition =
    browser.SpeechRecognition ?? browser.webkitSpeechRecognition;
  if (!Recognition) return null;

  const recognizer = new Recognition();
  recognizer.lang = "en-US";
  recognizer.interimResults = false;
  recognizer.onresult = (event) =>
    onTranscript(event.results[0][0].transcript);
  return recognizer;
}

function formatDuration(startedAt: string) {
  const mins = Math.floor(
    (Date.now() - new Date(startedAt).getTime()) / 60000
  );
  return `${mins}m`;
}

export default function Dashboard() {
  const [session, setSession] = useState<StellaSession | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [experience, setExperience] = useState(EXPERIENCES[0].id);

  useEffect(() => {
    actionGetActive().then(setSession);
  }, []);

  const handleStart = async () => {
    const s = await actionStart("conversation");
    setSession(s);
  };

  const handlePause = async () => {
    if (!session) return;
    await actionPause(session.id);
    const updated = await actionGetActive();
    setSession(updated);
  };

  const handleResume = async () => {
    if (!session) return;
    await actionResume(session.id);
    const updated = await actionGetActive();
    setSession(updated);
  };

  const handleEnd = async () => {
    if (!session) return;
    await actionEnd(session.id);
    setSession(null);
    stopSpeaking();
  };

  const handleVoice = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }
    const recognizer = createSpeechRecognizer(async (text) => {
      setTranscript(text);
      const result = await orchestrate({
        text,
        sessionId: session?.id ?? "default",
        source: "voice",
      });
      if (result.response && typeof window !== "undefined") {
        const utterance = new SpeechSynthesisUtterance(result.response);
        window.speechSynthesis.speak(utterance);
      }
    });
    if (recognizer) {
      recognizer.start();
      setIsListening(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row">
      {/* Desktop sidebar — hidden on mobile */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-zinc-800 p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-light">Stella</h1>
          <p className="text-zinc-500 text-sm">Atlas Spark</p>
        </div>
        <nav className="space-y-2 text-sm text-zinc-400">
          <div>Your Atlas</div>
          <div>Envision</div>
          <div>Dream Weaver</div>
        </nav>
      </aside>

      {/* Main area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8">
        {/* Mobile header — visible only when sidebar is hidden */}
        <header className="lg:hidden w-full text-center mb-6">
          <h1 className="text-xl font-light">Stella -OS</h1>
          <p className="text-zinc-500 text-xs">Your Atlas Spark</p>
        </header>

        {/* Stella Orb */}
        <div className="w-48 h-48 lg:w-80 lg:h-80 flex items-center justify-center mb-8">
          <StellaVisual />
        </div>

        {/* Experience selector — unchanged */}
        <div className="flex gap-2 mb-6">
          {EXPERIENCES.map((exp) => (
            <button
              key={exp.id}
              onClick={() => setExperience(exp.id)}
              className={`px-3 py-1 text-xs rounded border ${
                experience === exp.id
                  ? "border-white text-white"
                  : "border-zinc-700 text-zinc-500"
              }`}
            >
              {exp.label}
            </button>
          ))}
        </div>

        {/* Session status — unchanged */}
        {session && (
          <div className="text-xs text-zinc-500 mb-4">
            {session.state?.toUpperCase()} · {session.type} ·{" "}
            {formatDuration(session.startedAt)}
          </div>
        )}

        {/* Icon controls — preserved exactly */}
        <div className="flex items-center gap-4 mb-6">
          {!session && (
            <button onClick={handleStart} aria-label="Start">
              <Image
                src="/stella-communication.png"
                alt="Start"
                width={40}
                height={40}
              />
            </button>
          )}
          {session && (
            <>
              <button onClick={handlePause} aria-label="Pause">
                <Image src="/pause.png" alt="Pause" width={40} height={40} />
              </button>
              <button onClick={handleEnd} aria-label="Stop">
                <Image src="/stop.png" alt="Stop" width={40} height={40} />
              </button>
            </>
          )}
          <button
            onClick={handleVoice}
            aria-label="Voice"
            className={isListening ? "opacity-60" : ""}
          >
            <Image
              src="/stella-communication.png"
              alt="Voice"
              width={40}
              height={40}
            />
          </button>
          <button className="text-xs text-zinc-500">Save</button>
        </div>

        {/* Transcript */}
        {transcript && (
          <div className="text-sm text-zinc-400 max-w-md text-center">
            {transcript}
          </div>
        )}
      </main>
    </div>
  );
}
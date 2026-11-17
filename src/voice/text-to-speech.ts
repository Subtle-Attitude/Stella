export function speak(text: string, onEnd?: () => void): void {
  if (typeof window === "undefined" || !window.speechSynthesis) return
  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = 1
  utterance.pitch = 1
  utterance.onend = () => onEnd?.()
  window.speechSynthesis.speak(utterance)
}

export function stopSpeaking(): void {
  if (typeof window !== "undefined") {
    window.speechSynthesis?.cancel()
  }
}

export interface SynthesisResult {
  audioRef: string | null
  spoken: boolean
}

export async function synthesize(text: string): Promise<SynthesisResult> {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    return { audioRef: null, spoken: false }
  }

  speak(text)
  // Browser speechSynthesis does not expose the audio buffer easily.
  // Return a reference token so callers can still track that synthesis occurred.
  const audioRef = `tts-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  return { audioRef, spoken: true }
}
export function speak(text: string, onEnd?: () => void) {
  if (typeof window === "undefined" || !window.speechSynthesis) return
  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = 1
  utterance.pitch = 1
  utterance.onend = () => onEnd?.()
  window.speechSynthesis.speak(utterance)
}

export function stopSpeaking() {
  if (typeof window !== "undefined") {
    window.speechSynthesis?.cancel()
  }
}

export async function synthesize(text: string): Promise<string | null> {
  speak(text)
  return null
}
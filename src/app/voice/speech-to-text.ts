export function createSpeechRecognizer(
  onResult: (text: string) => void,
  onError?: (err: string) => void
) {
  const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
  if (!SR) {
    onError?.("Speech Recognition not supported")
    return null
  }

  const rec = new SR()
  rec.lang = "en-US"
  rec.continuous = false
  rec.interimResults = false

  rec.onresult = (e: any) => {
    const text = e.results[0][0].transcript
    onResult(text)
  }

  rec.onerror = (e: any) => onError?.(e.error)

  return rec
}

export async function transcribe(_audio?: Blob, textFallback?: string): Promise<string> {
  if (textFallback) return textFallback
  return ""
}
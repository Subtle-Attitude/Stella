// Same contracts — device STT/TTS implementations can replace the adapters
export async function mobileTranscribe(): Promise<string> {
  return "(mobile stt)"
}

export async function mobileSynthesize(text: string): Promise<void> {
  // device TTS
}
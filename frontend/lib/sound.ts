// Basit ses efektleri için Web Audio API tabanlı, dosya gerektirmeyen üreteç.
// Bu sayede oyunlar herhangi bir ses dosyası indirmeden "doğru/yanlış/tık/
// kazanma" gibi geri bildirim sesleri çalabilir.

let audioContext: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioContext) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioContext = new AudioCtx();
  }
  return audioContext;
}

function playTone(frequency: number, durationMs: number, type: OscillatorType = "sine", delayMs = 0) {
  const ctx = getContext();
  if (!ctx) return;

  const startTime = ctx.currentTime + delayMs / 1000;
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);
  gain.gain.setValueAtTime(0.15, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + durationMs / 1000);

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + durationMs / 1000);
}

const SOUND_PREF_KEY = "fen-platformu-ses";

export function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return true;
  const stored = window.localStorage.getItem(SOUND_PREF_KEY);
  return stored !== "off";
}

export function setSoundEnabled(enabled: boolean) {
  window.localStorage.setItem(SOUND_PREF_KEY, enabled ? "on" : "off");
}

export const sfx = {
  correct: () => isSoundEnabled() && (playTone(660, 120), playTone(880, 150, "sine", 120)),
  wrong: () => isSoundEnabled() && playTone(160, 250, "sawtooth"),
  click: () => isSoundEnabled() && playTone(440, 60, "square"),
  win: () => isSoundEnabled() && (playTone(523, 120), playTone(659, 120, "sine", 120), playTone(784, 200, "sine", 240)),
  tick: () => isSoundEnabled() && playTone(300, 40, "square"),
};

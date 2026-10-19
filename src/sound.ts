// Official Minecraft Audio Player with Web Audio Fallback
let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    void audioCtx.resume()
  }
  return audioCtx
}

let soundEnabled = true

export function isSoundEnabled(): boolean {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('mc_sound_enabled')
    if (saved !== null) {
      soundEnabled = saved === 'true'
    }
  }
  return soundEnabled
}

export function setSoundEnabled(enabled: boolean): void {
  soundEnabled = enabled
  if (typeof window !== 'undefined') {
    localStorage.setItem('mc_sound_enabled', String(enabled))
  }
}

// Pre-load authentic Minecraft sound files
const baseUrl = typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL ? import.meta.env.BASE_URL : '/'
const clickAudio = typeof Audio !== 'undefined' ? new Audio(`${baseUrl}click.ogg`) : null
const levelupAudio = typeof Audio !== 'undefined' ? new Audio(`${baseUrl}levelup.ogg`) : null

if (clickAudio) {
  clickAudio.preload = 'auto'
}
if (levelupAudio) {
  levelupAudio.preload = 'auto'
}

/**
 * Plays the actual Minecraft button click sound (click.ogg).
 */
export function playClickSound(): void {
  if (!soundEnabled) return

  // Play real Minecraft sound file
  try {
    if (clickAudio) {
      const clone = clickAudio.cloneNode() as HTMLAudioElement
      clone.volume = 0.65
      const promise = clone.play()
      if (promise !== undefined) {
        promise.catch(() => {
          fallbackClick()
        })
      }
      return
    }
  } catch {
    fallbackClick()
  }
}

function fallbackClick(): void {
  const ctx = getAudioContext()
  if (!ctx) return
  try {
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(360, now)
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.045)
    gain.gain.setValueAtTime(0.4, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.05)
  } catch {}
}

/**
 * Plays the actual Minecraft levelup / advancement chime (levelup.ogg).
 */
export function playAdvancementSound(): void {
  if (!soundEnabled) return

  // Play real Minecraft sound file
  try {
    if (levelupAudio) {
      const clone = levelupAudio.cloneNode() as HTMLAudioElement
      clone.volume = 0.75
      const promise = clone.play()
      if (promise !== undefined) {
        promise.catch(() => {
          fallbackAdvancement()
        })
      }
      return
    }
  } catch {
    fallbackAdvancement()
  }
}

function fallbackAdvancement(): void {
  const ctx = getAudioContext()
  if (!ctx) return
  try {
    const now = ctx.currentTime
    const notes = [440, 554.37, 659.25, 880]
    notes.forEach((freq, idx) => {
      const noteTime = now + idx * 0.09
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, noteTime)
      gain.gain.setValueAtTime(0.3, noteTime)
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.28)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(noteTime)
      osc.stop(noteTime + 0.3)
    })
  } catch {}
}

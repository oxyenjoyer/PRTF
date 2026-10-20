export type VignetteLevel = 'off' | 'low' | 'medium' | 'high'

export interface PanoramaPreset {
  id: string
  name: string
  url: string
  vignette: VignetteLevel
}

/** Pre-configured vignette opacity scale */
export const VIGNETTE_OPACITIES: Record<VignetteLevel, number> = {
  off: 0,
  low: 0.28,      // Lowered & subtle: crystal clear center with gentle feathered corners
  medium: 0.55,   // Authentic classic Minecraft atmospheric vignette
  high: 0.85,     // Deep cinematic vignette
}

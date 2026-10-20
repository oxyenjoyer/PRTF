import React, { memo } from 'react'
import { VignetteLevel, VIGNETTE_OPACITIES } from '../panoramaConfig'

export interface PanoramaProps {
  /** Background image URL or path */
  imageUrl?: string
  /** Vignette intensity preset: 'off' | 'low' | 'medium' | 'high' (default: 'low') */
  vignette?: VignetteLevel
  /** Custom vignette opacity override (0.0 to 1.0) */
  customVignetteOpacity?: number
  /** Enable subtle ambient panorama drift animation */
  drift?: boolean
  /** Apply subtle depth blur (e.g., when menus/modals are active) */
  blur?: boolean
  /** Panorama image brightness multiplier (default: 1.0) */
  brightness?: number
  /** Panorama image contrast multiplier (default: 1.0) */
  contrast?: number
  /** Optional child elements (like particles canvas) rendered within the panorama viewport */
  children?: React.ReactNode
  /** Additional CSS class names */
  className?: string
}

/**
 * Modular Panorama Component for Minecraft UI
 * Provides decoupled background rendering, lowered vignette overlays, and configurable ambient drift.
 */
export const Panorama = memo(function Panorama({
  imageUrl,
  vignette = 'low',
  customVignetteOpacity,
  drift = false,
  blur = false,
  brightness = 1.0,
  contrast = 1.0,
  children,
  className = '',
}: PanoramaProps) {
  const effectiveVignetteOpacity =
    typeof customVignetteOpacity === 'number'
      ? Math.max(0, Math.min(1, customVignetteOpacity))
      : VIGNETTE_OPACITIES[vignette] ?? 0.22

  const containerStyle = {
    '--mc-vignette-opacity': effectiveVignetteOpacity,
    '--mc-panorama-brightness': brightness,
    '--mc-panorama-contrast': contrast,
    '--mc-panorama-blur': blur ? '4px' : '0px',
  } as React.CSSProperties

  return (
    <div
      className={`mc-panorama-container vignette-${vignette} ${className}`}
      style={containerStyle}
      aria-hidden="true"
    >
      {/* Background Panorama Image Layer */}
      <div
        className={`mc-bg-panorama ${drift ? 'panorama-drift' : ''}`}
        style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
      />

      {/* Modular Vignette Overlay Layer */}
      {effectiveVignetteOpacity > 0 && <div className="mc-vignette" />}

      {/* Embedded Ambient Children (e.g. Floating Particle Canvas) */}
      {children}
    </div>
  )
})

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
// The active presentation layer includes the global reset, layout, and theme palettes.
import './github-light.css'

// Keep application-wide providers here if the portfolio gains routing or state later.
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)

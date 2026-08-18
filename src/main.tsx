import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
// This file loads after the base styles so the world theme stays easy to maintain.
import './world.css'
// Contrast and spacing refinements load last so they are easy to adjust independently.
import './readability.css'

// Keep application-wide providers here if the portfolio gains routing or state later.
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)

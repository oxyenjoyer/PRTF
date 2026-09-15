import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
// The active presentation layer loads last so it can cleanly override the base layout.
import './github-light.css'

// Keep application-wide providers here if the portfolio gains routing or state later.
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)

# Game Developer Portfolio

A responsive React, TypeScript, and Vite portfolio starter for a game developer.

The current visual direction is a GitHub-light-inspired developer portfolio: flat neutral surfaces, dark ink, blue highlights, crisp borders, and selective text strokes. It uses a system font stack and CSS only; no external game assets or web fonts are required.

## Tech stack

- **React** renders the portfolio sections and reusable project cards.
- **TypeScript** provides type-safe application code.
- **Vite** supplies the local development server and production build process.
- **CSS** in `src/styles.css` controls the responsive layout and visual system.

## Project layout

- `src/github-light.css` — active GitHub-light theme, palette, controls, and responsive overrides

- `src/App.tsx` — page sections and portfolio content
- `src/styles.css` — global styles and responsive layout
- `src/main.tsx` — React entry point
- `index.html` — browser HTML entry point

## Theme architecture

- `src/styles.css` holds the original base layout and shared responsive rules.
- `src/github-light.css` loads after the base CSS and contains the active GitHub-light presentation layer: colors, typography, controls, cards, and responsive rules.
- `src/App.tsx` contains the HUD labels and portfolio content. Its nearby comments mark the intended editing locations.

When changing the visual system, update `src/github-light.css` first and keep this README in sync.

## Run locally

Install Node.js, then run these commands in this folder:

```powershell
npm.cmd install
npm.cmd run dev
```

Open the local address shown in the terminal, usually `http://localhost:5173`.

## Production build

```powershell
npm.cmd run build
npm.cmd run preview
```

## Customizing

Update placeholder text, email, location, social links, and project entries in `src/App.tsx`. The comments in that file identify the project-data and page-copy edit points.

The CSS custom properties at the beginning of `src/github-light.css` control the active palette. The same file contains typography, responsive breakpoints, project-art placeholders, flat controls, and border treatments. The profile labels are in `src/App.tsx`. Update this README whenever the stack, page structure, or design system changes.

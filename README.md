# Game Developer Portfolio

A responsive React, TypeScript, and Vite portfolio starter for a game developer.

The current visual direction is an original voxel-survival game aesthetic: flat, block-built panels with crisp borders and text strokes, plus a light grass, soil, and sky palette. It uses a remotely loaded Pixelify Sans web font with local fallbacks, CSS-only cloud and ground texture layers, high-contrast UI controls, and an editable in-world status HUD.

## Tech stack

- **React** renders the portfolio sections and reusable project cards.
- **TypeScript** provides type-safe application code.
- **Vite** supplies the local development server and production build process.
- **CSS** in `src/styles.css` controls the responsive layout and visual system.

## Project layout

- `src/App.tsx` — page sections and portfolio content
- `src/styles.css` — global styles and responsive layout
- `src/main.tsx` — React entry point
- `index.html` — browser HTML entry point

## Theme architecture

- `src/styles.css` holds the original base layout and shared responsive rules.
- `src/world.css` loads after the base CSS and contains the clean voxel-world overrides: a line-free sky/ground background, readable type, the status HUD, button states, and content-zone layout.
- `src/App.tsx` contains the HUD labels and portfolio content. Its nearby comments mark the intended editing locations.

When changing the visual system, update `src/world.css` first and keep this README in sync.

`src/readability.css` is the final contrast and spacing layer. It deepens the background, removes all box and text shadows, applies strokes selectively to headings and panel text while leaving navigation and intro copy clean, uses equal section and footer padding, and adds subtle dot-based panel texture.

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

The CSS custom properties at the beginning of `src/styles.css` control the voxel palette. The same file contains the CSS texture layers, readable font stack, responsive breakpoints, project-art placeholders, and pixel-style interaction effects. The HUD labels are in `src/App.tsx`. Update this README whenever the stack, page structure, or design system changes.

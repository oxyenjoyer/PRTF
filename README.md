# Game Developer Portfolio

## Overview

- Responsive single-page game developer portfolio
- Project cards for games, prototypes, and experiments
- Business and contact email links with clipboard fallback
- LinkedIn, GitHub, and itch.io profile links
- Full-bleed responsive layout
- GitHub Light, GitHub Dark, and Midnight theme selector

## Technology Stack

- React
- TypeScript
- Vite
- CSS

## Features

- Mobile, laptop, and desktop responsive breakpoints
- Theme-aware colors, tags, and hover states
- High-contrast Midnight theme with pitch-black canvas
- Keyboard-visible focus states
- Smooth project-card lift, artwork brightness, and overlay outline on hover
- Full-width header and footer borders
- Consistent skills-list row alignment

## Project Structure

- `src/App.tsx` — page content, project data, email constants, social links, and theme selector
- `src/github-light.css` — themes, layout, responsive rules, cards, controls, and hover states
- `src/styles.css` — base styles
- `src/main.tsx` — React entry point and stylesheet imports
- `public/projects/` — future project thumbnail images

## Theme Options

- GitHub Light
- GitHub Dark
- Midnight

## Customization

- Project data: `projects` array in `src/App.tsx`
- Business email: `businessEmail` constant in `src/App.tsx`
- Contact email: `contactEmail` constant in `src/App.tsx`
- Social links: footer links in `src/App.tsx`
- Theme palettes: `.theme-*` blocks in `src/github-light.css`
- Project thumbnails: add files to `public/projects/`, then reference them as `/projects/file-name.jpg`

## Profiles

- [GitHub](https://github.com/oxyenjoyer)
- [itch.io](https://therealoxygenenjoyer.itch.io/)
- [LinkedIn](https://www.linkedin.com/in/c-kingshuk-sarkar-91a312327/)

## Local Development

```powershell
npm.cmd install
npm.cmd run dev
```

## Production Build

```powershell
npm.cmd run build
npm.cmd run preview
```

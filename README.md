# Game Developer Portfolio

I built this responsive portfolio to share my game-development work, technical skills, and a few ways to get in touch. It is a single-page React app with selectable light and dark themes.

## Features

- Responsive layout for mobile, laptop, and desktop screens
- Project cards for games, prototypes, and experiments I have worked on
- GitHub Light, GitHub Dark, and Midnight theme options
- Accessible theme selector and visible keyboard focus states

## Technology Stack

- React
- TypeScript
- Vite
- CSS

## Project Structure

- `src/App.tsx` — portfolio content, project data, and theme selector
- `src/github-light.css` — active design system, theme palettes, layout, and responsive styles
- `src/styles.css` — base application styles
- `src/main.tsx` — application entry point and stylesheet imports

## Customization

I update the `projects` array in `src/App.tsx` when I add or revise portfolio projects. The same file contains the profile labels, contact details, and social links. The header uses `businessEmail` (`realoxygenenjoyer@gmail.com`), while the contact section uses `contactEmail` (`c.kingshuksarkar@gmail.com`). Both links copy the relevant address when a visitor does not have a mail app configured.

I manage the visual themes in `src/github-light.css`. The `.theme-*` blocks define the GitHub Light, GitHub Dark, and Midnight palettes.

## Profiles

- [GitHub](https://github.com/oxyenjoyer)
- [itch.io](https://therealoxygenenjoyer.itch.io/)
- [LinkedIn](https://www.linkedin.com/in/c-kingshuk-sarkar-91a312327/)

## Local Development

Install dependencies and start the development server:

```powershell
npm.cmd install
npm.cmd run dev
```

Vite will display the local URL, typically `http://localhost:5173`.

## Production Build

Create and preview a production build:

```powershell
npm.cmd run build
npm.cmd run preview
```

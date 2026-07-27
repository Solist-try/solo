# Go Solo

A modern, responsive web app for independent travelers — plan boldly, move at your pace, and stay connected when it matters.

## Stack

- React 19 + TypeScript
- Vite
- React Router
- Modular CSS (design tokens + CSS modules)

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/community` | Community |
| `/resources` | Resources |
| `/events` | Events |
| `/profile` | Profile |
| `/settings` | Settings |
| `/design-system` | Design system showcase |

## Design system

- **Color** — warm neutrals, peach accent, soft gold (`src/styles/tokens.css`)
- **Typography** — Fraunces display + Outfit body scale (`src/styles/typography.css`)
- **Spacing** — 4px base scale `--space-1` … `--space-12`
- **Buttons** — primary, secondary, soft, outline, ghost, danger (pill shape)
- **Cards** — elevated, soft, outline, interactive
- **Motif** — `SoftCurve` waves, blobs, arcs, and pills

## Architecture

```
src/
  components/
    layout/     # AppShell, Navbar, Footer
    ui/         # Button, Card, SoftCurve, TextField, Toggle, Avatar, Section
  pages/        # Route-level views
  styles/       # Tokens, typography, motif, motion, global
```

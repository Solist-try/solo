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
| `/profile` | Profile |
| `/settings` | Settings |

## Architecture

```
src/
  components/
    layout/     # AppShell, Navbar, Footer
    ui/         # Button, TextField, Toggle, Avatar, Section
  pages/        # Route-level views
  styles/       # Global tokens, base styles, motion
```

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
| `/messages` | Supportive messaging |
| `/toolkit` | Solo Living Toolkit |
| `/profile` | Profile |
| `/settings` | Settings |
| `/login` | Sign in |
| `/signup` | Create account |
| `/onboarding` | Goals, challenges, interests |
| `/design-system` | Design system showcase |

## Authentication

Client-side auth (local persistence) with:
- Email + password sign up / sign in
- Optional Google and Apple social login buttons
- Multi-step onboarding for solo living goals, challenges, and interests
- Protected app routes until signed in and onboarded

## Solo Living Toolkit

Reusable module at `src/modules/soloLivingToolkit`:

- Checklists with progress
- Habit tracker (Mon–Sun)
- Quick tips
- Daily routines (morning / evening)
- Emotional check-ins
- Practical solo-living tasks

## Events

Reusable module at `src/modules/events`:

- Virtual meetups, workshops, and community discussions
- Event cards with capacity and RSVP
- Calendar integration via `.ics` download and Google Calendar links

## Messaging

Reusable module at `src/modules/messaging`:

- Conversation list + chat thread UI
- Message bubbles with timestamps
- Safety filters for romantic, explicit, hostile, and unsafe location requests

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
    layout/     # AppShell, Navbar, BottomNav, Footer
    ui/         # Button, Card, SoftCurve, TextField, Toggle, Avatar, Section
  modules/
    soloLivingToolkit/  # Toolkit components + data
  pages/        # Route-level views
  styles/       # Tokens, typography, motif, motion, global
```

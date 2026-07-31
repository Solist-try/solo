# Go Solo

A modern, responsive web app for independent travelers — plan boldly, move at your pace, and stay connected when it matters.

## Requirements

- **Node.js** 20+ (tested with Node 22)
- **npm** 10+

Check your versions:

```bash
node -v
npm -v
```

## Open the app with Node

Install dependencies once:

```bash
npm install
```

### Start the app (UI on port 3000)

```bash
npm start
```

Opens the Go Solo **user interface** at **http://localhost:3000/** — an interactive HTML/CSS app with Home, Community, Resources, Events, and Toolkit (not a JSON “Welcome to Solo” message).

```bash
npm run start:ui   # build + serve the full React app on :3000
npm run dev        # React hot-reload on :5173
```

API routes (JSON) remain available for monitoring/integrations:

| Path | Response |
|------|----------|
| `/health` | `{ "ok": true }` |
| `/api/data` | sample features payload |

Static UI files: `server/public/` (`index.html`, `styles.css`, `app.js`).

## Test with Node

| Command | What it does |
|---------|--------------|
| `npm test` | Run unit tests once (Vitest) |
| `npm run test:watch` | Re-run tests on file changes |
| `npm run typecheck` | TypeScript project check |
| `npm run lint` | Lint with oxlint |
| `npm run build` | Typecheck + production build |
| `npm run check` | typecheck + lint + test + build |

Quick verification:

```bash
npm run check
```

## Auth smoke path (manual)

1. `npm start`
2. Open `/signup` (or you’ll be redirected to `/login`)
3. Create an account, complete onboarding
4. Explore Home, Community, Messages, Events, Toolkit, Safety, Mission

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/community` | Community |
| `/resources` | Resources |
| `/events` | Events |
| `/messages` | Supportive messaging |
| `/safety` | Safety center |
| `/toolkit` | Solo Living Toolkit |
| `/mission` | Mission & Values |
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

## Safety

Reusable module at `src/modules/safety`:

- Content moderation hooks (`moderateContent`) for posts, comments, and messages
- Report buttons with reason selection
- Blocked-user logic across Community and Messages
- Community guideline reminders + Safety center page

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
    events/             # Event cards, RSVP, calendar helpers
    messaging/          # Chat UI + safety filters
    safety/             # Moderation, reports, blocking
  pages/        # Route-level views
  styles/       # Tokens, typography, motif, motion, global
```

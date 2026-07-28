# CAITO360 — Frontend Redesign Demo (Next.js 14)

A visual-only redesign demo of the CAITO360 frontend. **No backend** — everything runs on
mock data. Any email/password (or none) signs you in and lands on the dashboard, so the whole
app is clickable for review.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000  (opens on /login)
```

Production build (also how it deploys to Vercel):

```bash
npm run build && npm run start
```

## What's here

- `/login`, `/signup` — graphics-rich front page (navy brand panel + aurora + floating
  answer/insight cards). Submitting either form routes to `/dashboard`.
- `/dashboard`, `/chat`, `/documents`, `/insights`, `/team` — the workspace, restyled.
  Chat and the insights severity/category filters are interactive; the rest is mock content.
- Light/dark toggle (top-right); responsive down to mobile.

## Structure (mirrors the real repo's App Router layout)

```
app/
  layout.tsx            root + pre-paint theme init
  (auth)/login, signup  front page
  (app)/                sidebar + topbar shell
    dashboard, chat, documents, insights, team
components/              Sidebar, Topbar, ThemeToggle, AuthPanel, icons
lib/mock.ts             all fixture data
app/globals.css         the design tokens (evolved from the real app's system)
```

## Porting into the real app

The design lives entirely in `app/globals.css` (CSS custom properties) + the component
classes. The token names line up with the production `globals.css`, so accepted changes port
as a tokens-and-classes pass rather than a rewrite. Nothing here touches data fetching, the
API layer, or auth.

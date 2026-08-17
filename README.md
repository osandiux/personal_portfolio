# Osandi Robinson's Product Design Portfolio

A multi-page portfolio for a product design leader, presenting twelve years of work as a searchable archive. Nocturnal palette, safelight-red accents, and scroll-driven motion.

## Stack

- Vite + React + TypeScript
- React Router (`/`, `/work`, `/project`, `/about`)
- Lenis smooth scroll + GSAP ScrollTrigger
- Plain CSS with prefixed design tokens (`src/styles/tokens.css`)

## Run

```bash
npm install
npm run dev      # local dev
npm run build    # type-check + production build
npm run preview  # preview the build
```

## Structure

- `src/styles/` — tokens, reset, base, motion
- `src/components/primitives/` — Eyebrow, Title, Button, Chip, MediaFrame, Stat, Quote, Marquee, NoteCard…
- `src/components/chrome/` — header (with local clock), fullscreen menu, custom cursor, scroll rail, CTA, footer
- `src/sections/` — page sections per route
- `src/content/` — all copy and image paths (swap content here)
- `public/images/` — extracted plates (Unsplash placeholders)

Deploys as a SPA — `vercel.json` and `public/_redirects` handle route rewrites.

All motion respects `prefers-reduced-motion`; the cursor and rail disappear entirely for reduced-motion and touch users.

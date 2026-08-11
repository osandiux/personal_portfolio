# 005 — Stagger the fullscreen menu links on open

- **Status**: DONE
- **Commit**: none — pre-initial-commit working tree (repo has no commits yet)
- **Severity**: LOW
- **Category**: Purpose — preventing a jarring change (group entrance)
- **Estimated scope**: 2 files, ~30 lines

## Problem

The fullscreen menu fades in as one flat sheet — all four links are already sitting there when the overlay becomes visible. The overlay animates but its content doesn't participate, so the open feels like a screenshot appearing.

```css
/* src/components/chrome/chrome.css:115,130 — current */
.menu-overlay {
  /* … */
  opacity: 0;
  visibility: hidden;
  transition:
    opacity var(--motion-med) var(--ease-out),
    visibility 0s var(--motion-med);
}

.menu-overlay.is-open {
  opacity: 1;
  visibility: visible;
  transition: opacity var(--motion-med) var(--ease-out);
}
```

```tsx
/* src/components/chrome/FullscreenMenu.tsx:25-33 — current (no per-link index) */
{site.nav.map((item) => (
  <Link key={item.to} to={item.to} className="menu-link" onClick={onClose} tabIndex={open ? 0 : -1}>
```

## Target

While closed, each `.menu-link` sits at `opacity: 0; transform: translateY(12px)`. On open, links settle to normal over **300ms `var(--ease-out)`** with a **40ms** per-link delay (4 links → 120ms total spread, ending inside the overlay's own 300ms beat). On close, links reset with **zero delay** so a quick re-open never catches them mid-reset.

```css
/* target — src/components/chrome/chrome.css */
.menu-link {
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity var(--motion-med) var(--ease-out),
    transform var(--motion-med) var(--ease-out);
  transition-delay: 0s;
}

.menu-overlay.is-open .menu-link {
  opacity: 1;
  transform: none;
  transition-delay: calc(var(--i, 0) * 40ms);
}
```

## Repo conventions to follow

- Tokens: `--motion-med: 300ms`, `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` from `src/styles/tokens.css`.
- Inline CSS-variable indexing pattern (already used for hero cells via `animationDelay` at `src/sections/home/Hero.tsx:10`): pass `--i` per element via `style`.
- Nav data comes from `site.nav` in `src/content/site.ts` — the index comes from `map`, not hardcoding.

## Steps

1. **`src/components/chrome/FullscreenMenu.tsx`** — give each link its index (line 25):

```tsx
{site.nav.map((item, i) => (
  <Link
    key={item.to}
    to={item.to}
    className="menu-link"
    style={{ ['--i' as string]: i }}
    onClick={onClose}
    tabIndex={open ? 0 : -1}
  >
```

2. **`src/components/chrome/chrome.css`** — extend the existing `.menu-link` rule (line 148) with the closed-state declarations from the Target block (`opacity`, `transform`, `transition`, `transition-delay: 0s`), keeping its current layout declarations (`display`, `gap`, `padding`, `border-bottom`) untouched.
3. Same file — add the `.menu-overlay.is-open .menu-link` rule from the Target block directly after `.menu-overlay.is-open` (line 130).

## Boundaries

- Do NOT stagger `.menu-top` or `.menu-foot` — chrome anchors the frame; only the nav list enters.
- Do NOT exceed 40ms per-link delay or 300ms duration.
- Do NOT change the overlay's own fade or its `visibility` timing trick.
- Do NOT add new dependencies.
- If the code at the cited lines doesn't match these excerpts, STOP and report instead of improvising.

## Verification

- **Mechanical**: `npm run build` exits 0; `npm run lint` clean.
- **Feel check**: `npm run dev`, narrow the window under 760px (menu button appears), open the menu:
  - Links rise in sequence top-to-bottom; the whole cascade finishes within ~0.4s of the overlay.
  - Close and immediately re-open: the cascade plays cleanly from the start (closed-state `transition-delay: 0s` resets instantly under the fading overlay).
  - DevTools → Animations panel at 10% speed: each link starts 40ms after the previous.
  - Emulate `prefers-reduced-motion: reduce`: menu opens with no rise/stagger, links simply visible (global clamp in `src/styles/motion.css`).
- **Done when**: the menu opens as a sequence rather than a screenshot, and rapid open/close never shows half-reset links.

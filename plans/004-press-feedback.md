# 004 — Add press feedback to every pressable surface

- **Status**: DONE
- **Commit**: none — pre-initial-commit working tree (repo has no commits yet)
- **Severity**: MEDIUM
- **Category**: Purpose — feedback
- **Estimated scope**: 4 files, ~30 lines (CSS only)

## Problem

No element in the app has an `:active` state (verified: `rg ":active" src/` returns nothing). Buttons, chips, angle thumbs, and contact-sheet thumbs respond to hover but give zero press confirmation. These are hit tens of times per day, so feedback must exist but stay near-imperceptible: `scale(0.97)` at 150ms is the ceiling.

Current transition lists that need `transform` added:

```css
/* src/components/primitives/primitives.css:58,68 — .btn (transitions background, color, border-color) */
/* src/components/primitives/primitives.css:120,131 — .chip (transitions color, border-color, background) */
/* src/sections/home/home.css:168 — .angle-thumb (transitions border-color) */
/* src/sections/project/project.css:239 — .sheet-thumb (transitions border-color, opacity) */
```

## Target

Every pressable surface compresses to `scale(0.97)` while pressed, transitioning `transform` over **`var(--motion-fast) var(--ease-out)`** (150ms):

```css
/* target pattern — applied per selector below */
.btn:active,
button.chip:active,
.angle-thumb:active,
.sheet-thumb:active,
.menu-button:active,
.lightbox-close:active {
  transform: scale(0.97);
}
```

with `transform Nms` added to each element's existing `transition` list so press and release both ease.

## Repo conventions to follow

- Tokens: `--motion-fast: 150ms`, `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` from `src/styles/tokens.css`.
- Transition-list style exemplar (multi-property, one per line): `.btn` at `src/components/primitives/primitives.css:68`.
- Only `button.chip` gets press feedback — `.chip` also renders as a static `<span>` (see `Chip` in `src/components/primitives/index.tsx`), and static chips must not react.
- Global reduced-motion clamp in `src/styles/motion.css` already flattens these transitions; add no reduced-motion code.

## Steps

1. **`src/components/primitives/primitives.css`** — in the `.btn` rule (line 58), append `transform var(--motion-fast) var(--ease-out)` to the `transition` list, then add after the `.btn--stroke:hover` rule:

```css
.btn:active {
  transform: scale(0.97);
}
```

2. Same file — in the `.chip` rule (line 120), append `transform var(--motion-fast) var(--ease-out)` to the `transition` list, then add after the `button.chip:hover` rule:

```css
button.chip:active {
  transform: scale(0.97);
}
```

3. **`src/sections/home/home.css`** — in `.angle-thumb` (line 168), extend `transition: border-color var(--motion-fast) var(--ease-out);` to:

```css
transition:
  border-color var(--motion-fast) var(--ease-out),
  transform var(--motion-fast) var(--ease-out);
```

and add:

```css
.angle-thumb:active {
  transform: scale(0.97);
}
```

4. **`src/sections/project/project.css`** — in `.sheet-thumb` (line 239), append `transform var(--motion-fast) var(--ease-out)` to the transition list and add:

```css
.sheet-thumb:active {
  transform: scale(0.97);
}
```

5. **`src/components/chrome/chrome.css`** — `.menu-button` and (in `src/components/overlays/lightbox.css`) `.lightbox-close` have no transition today; give each:

```css
transition: transform var(--motion-fast) var(--ease-out);
```

plus a matching `:active { transform: scale(0.97); }` rule. Preserve their existing declarations untouched.

## Boundaries

- Do NOT add press feedback to `.text-link`, `.note-card`, `.ledger-row`, or nav links — text scaling reads as layout wobble.
- Do NOT exceed `scale(0.97)` or 150ms anywhere.
- Do NOT touch hover styles or any TSX file.
- If a cited selector/line doesn't match, STOP and report instead of improvising.

## Verification

- **Mechanical**: `npm run build` exits 0; `npm run lint` clean.
- **Feel check**: `npm run dev`:
  - Hold mouse down on a work-page chip: it compresses slightly; release eases back — no snap.
  - Press feels subtle at full speed; you notice it happened, not what it did.
  - Static chips (FootCTA services, About clients, note-card tags) do nothing when clicked.
  - Emulate `prefers-reduced-motion: reduce`: press still works, movement is effectively instant.
- **Done when**: every `<button>`/`.btn` surface confirms presses and no `<span>` chip reacts.

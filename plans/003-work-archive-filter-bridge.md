# 003 — Bridge the work-archive swap on filter and view changes

- **Status**: DONE
- **Commit**: none — pre-initial-commit working tree (repo has no commits yet)
- **Severity**: MEDIUM
- **Category**: Purpose — preventing a jarring change
- **Estimated scope**: 2 files, ~25 lines

## Problem

On `/work`, clicking a category chip or the Grid/Ledger toggle re-renders the entire archive instantly. Twelve cards teleport into a different set with no bridge.

```tsx
/* src/sections/work/WorkArchive.tsx:57 — current */
{view === 'grid' ? (
  <section className="work-grid" aria-label="Archive grid">
    {frames.map((frame) => ( /* … */ ))}
  </section>
) : (
  <section className="work-ledger" aria-label="Archive ledger">
    {frames.map((frame) => ( /* … */ ))}
  </section>
)}
```

## Target

Each time filter or view changes, the incoming section enters via `@starting-style`: `opacity: 0; transform: translateY(6px)` settling to normal over **`var(--motion-fast) var(--ease-out)`** (150ms). It must stay this fast — chips get clicked repeatedly when comparing categories; anything slower punishes the exact user the feature serves.

```css
/* target — src/sections/work/work.css */
.work-grid,
.work-ledger {
  transition:
    opacity var(--motion-fast) var(--ease-out),
    transform var(--motion-fast) var(--ease-out);
}

@starting-style {
  .work-grid,
  .work-ledger {
    opacity: 0;
    transform: translateY(6px);
  }
}
```

## Repo conventions to follow

- Tokens: `--motion-fast: 150ms`, `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` in `src/styles/tokens.css`.
- `@starting-style` needs a fresh element to fire — force a React remount with a `key` that encodes both states.
- No-JS-fallback stance: browsers without `@starting-style` simply show content instantly, which is the current behavior — acceptable, add nothing.

## Steps

1. **`src/sections/work/WorkArchive.tsx`** — add a remount key to both conditional sections at line 57 (grid) and the ledger branch:

```tsx
<section key={`${filter}-grid`} className="work-grid" aria-label="Archive grid">
/* … */
<section key={`${filter}-ledger`} className="work-ledger" aria-label="Archive ledger">
```

(`view` is already encoded by which branch renders; `filter` in the key remounts on category change.)

2. **`src/sections/work/work.css`** — append the Target CSS block at the end of the file. Do not modify the existing `.work-grid` (line ~44) or `.work-ledger` (line ~86) blocks.

## Boundaries

- Do NOT stagger individual cards — the whole section moves as one unit; per-card animation would replay on every filter click and delay scanning.
- Do NOT animate the chips or the "Showing N / 12" counter.
- Do NOT touch `src/content/archive.ts` or the card markup.
- Do NOT add new dependencies.
- If the code at the cited lines doesn't match these excerpts, STOP and report instead of improvising.

## Verification

- **Mechanical**: `npm run build` exits 0; `npm run lint` clean.
- **Feel check**: `npm run dev`, `/work`:
  - Clicking Landscape → Portrait → All: each swap fades/rises in over ~150ms; results appear essentially immediately, motion reads as a blink-soft bridge, not a wait.
  - Toggling Grid ⇄ Ledger gets the same bridge.
  - Spam-clicking chips never queues or compounds animations (each remount starts one clean 150ms entry).
  - Emulate `prefers-reduced-motion: reduce`: swaps are instant (global clamp in `src/styles/motion.css`).
- **Done when**: filter/view changes no longer hard-teleport and the interaction still feels instant.

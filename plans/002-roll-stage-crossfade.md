# 002 — Crossfade the roll stage when switching angles

- **Status**: DONE
- **Commit**: none — pre-initial-commit working tree (repo has no commits yet)
- **Severity**: MEDIUM
- **Category**: Purpose — preventing a jarring change
- **Estimated scope**: 2 files, ~35 lines

## Problem

On the home page's Roll 01 section, clicking an angle thumb swaps the `src` of the large stage image. A full-frame photograph teleports into a different photograph with zero bridge — the most visible content change on the page has no transition.

```tsx
/* src/sections/home/RollShowcase.tsx:7,12-14 — current */
const [stage, setStage] = useState<string>(roll.stage);
/* … */
<figure className="media-frame roll-stage">
  <img src={stage} alt={`${roll.title} — selected frame`} />
</figure>
```

```css
/* src/sections/home/home.css:148 — current (transition exists but src swaps can't animate) */
.roll-stage img {
  transition: opacity var(--motion-med) var(--ease-out);
}
```

## Target

All four plates (main + 3 angles) render stacked in the stage; the active one is at `opacity: 1`, the rest at `opacity: 0`, transitioned with **`opacity var(--motion-med) var(--ease-out)`** (300ms). CSS transitions (not keyframes) so rapid thumb-clicking retargets mid-fade instead of restarting.

```css
/* target */
.roll-stage {
  position: relative;
}

.roll-stage img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity var(--motion-med) var(--ease-out);
}

.roll-stage img.is-stage-active {
  opacity: 1;
}
```

## Repo conventions to follow

- Tokens: `--motion-med: 300ms`, `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` in `src/styles/tokens.css`.
- Active-state class naming exemplar: `.angle-thumb.is-active` at `src/sections/home/home.css:194`.
- Content (image paths) comes from `src/content/home.ts` (`roll.stage`, `roll.angles[].image`) — do not hardcode paths.

## Steps

1. **`src/sections/home/RollShowcase.tsx`** — build the plate list once and render all of them in the figure, replacing lines 12–14:

```tsx
const plates = [
  { src: roll.stage, label: `${roll.title} — selected frame` },
  ...roll.angles.map((angle) => ({ src: angle.image, label: `${roll.title} — alternate angle ${angle.no}` })),
];
/* … */
<figure className="media-frame roll-stage">
  {plates.map((plate) => (
    <img
      key={plate.src}
      src={plate.src}
      alt={stage === plate.src ? plate.label : ''}
      aria-hidden={stage !== plate.src}
      className={stage === plate.src ? 'is-stage-active' : undefined}
    />
  ))}
</figure>
```

The `stage` state and both thumb `onClick` handlers stay exactly as they are.

2. **`src/sections/home/home.css`** — replace the `.roll-stage` block (line 144) and `.roll-stage img` block (line 148) with the Target CSS above. Keep the existing `aspect-ratio: 4 / 3` declaration on `.roll-stage`.

## Boundaries

- Do NOT touch the `.angle-thumb` styles or the thumbs markup (lines 25–48 of the TSX).
- Do NOT preload or lazy-load differently — all four plates already ship on this page as thumbs.
- Do NOT add new dependencies or state.
- If the code at the cited lines doesn't match these excerpts, STOP and report instead of improvising.

## Verification

- **Mechanical**: `npm run build` exits 0; `npm run lint` clean.
- **Feel check**: `npm run dev`, home page, Roll 01 section:
  - Clicking angle 02/03/04 crossfades the stage over ~300ms; no white/black flash between plates.
  - Rapidly clicking two thumbs back and forth retargets smoothly — the fade never snaps to zero and restarts.
  - DevTools → Animations panel at 10% speed: exactly two plates ever mid-fade, others stay hidden.
  - Emulate `prefers-reduced-motion: reduce`: swap is effectively instant (global clamp in `src/styles/motion.css` handles this — verify, don't add code).
- **Done when**: no visible teleport between angles and rapid clicks never stutter.

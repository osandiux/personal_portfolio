# 001 — Give the lightbox a symmetric exit

- **Status**: DONE
- **Commit**: none — pre-initial-commit working tree (repo has no commits yet)
- **Severity**: MEDIUM
- **Category**: Physicality & origin (exit/enter symmetry)
- **Estimated scope**: 3 files, ~25 lines

## Problem

The contact-sheet lightbox animates **in** with a 300ms fade but unmounts **instantly** on close. Animated entry + teleport exit breaks the interface's own rules: dismissable surfaces should leave the way they arrived.

```css
/* src/components/overlays/lightbox.css:11 — current (entry only) */
.lightbox {
  /* … */
  animation: lightbox-in var(--motion-med) var(--ease-out);
}

@keyframes lightbox-in {
  from {
    opacity: 0;
  }
}
```

```tsx
/* src/sections/project/ProjectSections.tsx:131 — current (instant unmount) */
{openFrame ? (
  <Lightbox src={openFrame.image} caption={openFrame.frame} onClose={() => setOpenFrame(null)} />
) : null}
```

All three close paths (Escape key, backdrop click, Close button) in `src/components/overlays/Lightbox.tsx` call `onClose` directly, which unmounts the component the same frame.

## Target

Closing adds an `is-closing` class, the overlay fades to `opacity: 0` over **200ms `var(--ease-out)`**, and only then unmounts. Under `prefers-reduced-motion`, unmount immediately (no 200ms wait).

```css
/* target — add to src/components/overlays/lightbox.css */
.lightbox {
  transition: opacity 200ms var(--ease-out);
}

.lightbox.is-closing {
  opacity: 0;
  pointer-events: none;
}
```

## Repo conventions to follow

- Easing/duration tokens live in `src/styles/tokens.css`: `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`, `--motion-fast: 150ms`, `--motion-med: 300ms`. Use `var(--ease-out)`; 200ms is a literal (no token exists between 150 and 300 — do not add one).
- Reduced-motion detection exemplar: `src/hooks/usePrefersReducedMotion.ts` (already exists — import it, do not re-implement).
- A global reduced-motion clamp in `src/styles/motion.css` already zeroes transition durations; the hook check below exists to skip the *unmount delay*, not the visual.

## Steps

1. **`src/components/overlays/Lightbox.tsx`** — add internal closing state and route every close path through it. Replace the component body's close wiring:

```tsx
import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import './lightbox.css';

export function Lightbox({ src, caption, onClose }: { src: string; caption: string; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [closing, setClosing] = useState(false);
  const reduced = usePrefersReducedMotion();

  const requestClose = () => {
    if (closing) return;
    if (reduced) {
      onClose();
      return;
    }
    setClosing(true);
    window.setTimeout(onClose, 200);
  };
  /* … */
}
```

2. In the same file, swap all three `onClose` call sites to `requestClose`:
   - the Escape handler in the `useEffect` (line 18: `if (e.key === 'Escape') onClose();` → `requestClose()`; move the effect's dependency accordingly or attach the handler via a ref — simplest is `useEffect(() => { … }, [])` with `requestClose` stored in a `useRef` updated each render),
   - the backdrop `onClick={onClose}` (line 31) → `onClick={requestClose}`,
   - the Close button `onClick={onClose}` (line 36) → `onClick={requestClose}`.
3. Add the class toggle on the root div (line 31): `className={`lightbox${closing ? ' is-closing' : ''}`}`.
4. **`src/components/overlays/lightbox.css`** — append after the `@keyframes lightbox-in` block (line 18):

```css
.lightbox {
  transition: opacity 200ms var(--ease-out);
}

.lightbox.is-closing {
  opacity: 0;
  pointer-events: none;
}
```

(Adding a second `.lightbox` rule is fine; do not merge into the existing block if that means touching unrelated declarations.)

5. **`src/sections/project/ProjectSections.tsx:131`** — no change required; verify the ternary unmount still reads `onClose={() => setOpenFrame(null)}`.

## Boundaries

- Do NOT touch `src/sections/project/project.css` or any other section styles.
- Do NOT change the dialog markup, focus trap, or scroll-lock logic in the `useEffect`.
- Do NOT add new dependencies.
- If the code at the cited lines doesn't match these excerpts, STOP and report instead of improvising.

## Verification

- **Mechanical**: `npm run build` (tsc + vite) exits 0; `npm run lint` reports no errors.
- **Feel check**: `npm run dev`, open `/project`, click a contact-sheet frame, then close via each path (Escape, backdrop, button):
  - The overlay fades out over ~200ms; it never blinks off.
  - Double-pressing Escape does not error or re-trigger (guard: `if (closing) return`).
  - DevTools → Rendering → emulate `prefers-reduced-motion: reduce`: close is instant, no 200ms dead wait.
  - During the fade, clicks pass through nothing (`pointer-events: none`).
- **Done when**: entry and exit are visually symmetric fades and reduced-motion closes instantly.

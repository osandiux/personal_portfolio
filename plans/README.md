# Animation plans

Written by `improve-animations` (via `find-animation-opportunities`) against the pre-initial-commit working tree. Each plan is self-contained — an executor needs no other context.

| # | Plan | Severity | Status |
| --- | --- | --- | --- |
| 001 | [Give the lightbox a symmetric exit](001-lightbox-symmetric-exit.md) | MEDIUM | DONE |
| 002 | [Crossfade the roll stage when switching angles](002-roll-stage-crossfade.md) | MEDIUM | DONE |
| 003 | [Bridge the work-archive swap on filter/view changes](003-work-archive-filter-bridge.md) | MEDIUM | DONE |
| 004 | [Add press feedback to every pressable surface](004-press-feedback.md) | MEDIUM | DONE |
| 005 | [Stagger the fullscreen menu links on open](005-menu-link-stagger.md) | LOW | DONE |

## Recommended execution order

1. **001** — highest leverage; the only place the UI visibly breaks its own rules (animated entry, teleport exit). Small, isolated.
2. **004** — broadest single improvement; touches every pressable surface, CSS-only.
3. **002** — most visible content teleport on the home page.
4. **003** — fast bridge for the work archive; depends on nothing.
5. **005** — polish; mobile-only entry point.

## Dependencies / overlap notes

- No plan depends on another.
- **004 and 002 both touch `src/sections/home/home.css`** (`.angle-thumb` vs `.roll-stage`): different selectors, no conflict, but if executed together re-read the file between edits.
- **004 and 001 both touch `src/components/overlays/lightbox.css`** (`.lightbox-close` vs `.lightbox`): different selectors, no conflict.
- All plans rely on tokens in `src/styles/tokens.css` (`--motion-fast`, `--motion-med`, `--ease-out`) and the global reduced-motion clamp in `src/styles/motion.css` — neither file should change.

## Verification shared by all plans

`npm run build` and `npm run lint` must pass; feel-checks per plan; reduced-motion emulation via DevTools → Rendering panel.

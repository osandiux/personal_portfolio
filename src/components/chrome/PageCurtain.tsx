import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import './transitions.css';

interface PageCurtainProps {
  curtainRef: RefObject<HTMLDivElement | null>;
  labelRef: RefObject<HTMLParagraphElement | null>;
}

/** Vertical wipe covering route swaps. Idle state lives off-screen above the viewport. */
export function PageCurtain({ curtainRef, labelRef }: PageCurtainProps) {
  // Establish GSAP's sole ownership of `transform` before first paint, so later
  // tweens never compose on top of a separately CSS-authored transform value.
  useLayoutEffect(() => {
    if (curtainRef.current) gsap.set(curtainRef.current, { yPercent: -101 });
  }, [curtainRef]);

  return (
    <div ref={curtainRef} className="page-curtain" aria-hidden>
      <p ref={labelRef} className="page-curtain-label" />
    </div>
  );
}

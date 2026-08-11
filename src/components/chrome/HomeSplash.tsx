import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './transitions.css';

interface HomeSplashProps {
  onDone: () => void;
}

/** Once-per-session iris: full-red brand contracts into the period, revealing Home underneath. */
export function HomeSplash({ onDone }: HomeSplashProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const periodRef = useRef<HTMLSpanElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    const root = rootRef.current!;
    const period = periodRef.current!;
    const rect = period.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const tl = gsap.timeline({ onComplete: onDone });
    tl.to({}, { duration: 0.4 }).to(root, {
      clipPath: `circle(0px at ${cx}px ${cy}px)`,
      duration: 0.9,
      ease: 'power3.inOut',
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={rootRef} className="home-splash" role="presentation" aria-hidden>
      <p className="home-splash-mark">
        POISED
        <span ref={periodRef} className="home-splash-period">
          .
        </span>
      </p>
    </div>
  );
}

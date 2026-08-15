import { useLayoutEffect, useRef, type CSSProperties } from 'react';
import { gsap } from 'gsap';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const FACTORS = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5] as const;

export function TextFractured({ text }: { text: string }) {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const frames = root.querySelectorAll<HTMLElement>('.text-fractured__frame');

    if (reduced) {
      root.classList.add('text-fractured--completed');
      return;
    }

    const state = { p: 1 };
    const tween = gsap.to(state, {
      p: 0,
      duration: 0.85,
      delay: 0.06,
      ease: 'power3.out',
      onUpdate: () => {
        frames.forEach((frame, i) => {
          frame.style.setProperty('--frame-progress', String(state.p));
          frame.style.setProperty('--frame-translation', String(FACTORS[i] * 20 * state.p));
        });
      },
      onComplete: () => root.classList.add('text-fractured--completed'),
    });

    return () => {
      tween.kill();
    };
  }, [reduced, text]);

  return (
    <div
      ref={rootRef}
      className="text-fractured text-fractured--trigger-load text-fractured--frames-10"
      aria-hidden="true"
    >
      <div className="text-fractured__content">
        <div className="text-fractured__original">
          <span className="text-fractured__text">{text}</span>
        </div>
      </div>
      <div className="text-fractured__frames">
        {FACTORS.map((factor, index) => (
          <div
            key={factor}
            className="text-fractured__frame"
            style={
              {
                '--frame-index': index,
                '--frame-total': FACTORS.length,
                '--frame-displacement-factor': factor,
                '--frame-progress': 1,
                '--frame-translation': factor * 20,
              } as CSSProperties
            }
          >
            <div className="text-fractured__frame-inner">
              <span className="text-fractured__text">{text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

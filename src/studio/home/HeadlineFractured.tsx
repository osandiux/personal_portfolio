import { useLayoutEffect, useRef, type CSSProperties } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const FACTORS = [-2, -1, 1, 2] as const;

export function HeadlineFractured({
  desktop,
  mobile,
}: {
  desktop: string;
  mobile: string;
}) {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (reduced) {
      root.style.setProperty('--frame-progress', '1');
      root.querySelectorAll<HTMLElement>('.headline-fractured__frame').forEach((frame, i) => {
        frame.style.setProperty('--frame-translation', String(FACTORS[i] * 20));
      });
      return;
    }

    const st = ScrollTrigger.create({
      trigger: root,
      start: 'top 85%',
      end: 'bottom 40%',
      onUpdate: ({ progress }) => {
        root.style.setProperty('--frame-progress', String(progress));
        root.querySelectorAll<HTMLElement>('.headline-fractured__frame').forEach((frame, i) => {
          frame.style.setProperty('--frame-translation', String(FACTORS[i] * 20 * progress));
        });
      },
    });

    return () => st.kill();
  }, [reduced]);

  return (
    <div ref={rootRef} className="headline-fractured headline-fractured--progress">
      <div className="headline-fractured__content">
        <div className="headline-fractured__original headline-fractured__original--desktop">{desktop}</div>
        <div className="headline-fractured__original headline-fractured__original--mobile">{mobile}</div>
        <div className="headline-fractured__frames">
          {FACTORS.map((factor, index) => (
            <div
              key={factor}
              className="headline-fractured__frame headline-fractured__frame--desktop headline-fractured__frame--mobile"
              style={
                {
                  '--frame-index': index,
                  '--frame-total': FACTORS.length,
                  '--frame-displacement-factor': factor,
                  '--frame-progress': 0,
                  '--frame-translation': 0,
                } as CSSProperties
              }
            >
              <div className="headline-fractured__frame-inner headline-fractured__frame-inner--desktop">{desktop}</div>
              <div className="headline-fractured__frame-inner headline-fractured__frame-inner--mobile">{mobile}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

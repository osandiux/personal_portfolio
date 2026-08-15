import { useCallback, useState, type CSSProperties, type PointerEvent } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { Picture } from '../Picture';

const FRAGMENTS = 7;
const HALF = Math.floor(FRAGMENTS / 2);

export function FigureStripes({
  src,
  alt = '',
  className = '',
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [armed, setArmed] = useState(false);

  const onPointerEnter = useCallback(() => {
    if (!reduced) setArmed(true);
  }, [reduced]);

  const onPointerMove = useCallback((event: PointerEvent<HTMLElement>) => {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 100;
    event.currentTarget.style.setProperty('--mouse-x', String(x));
  }, [reduced]);

  const onPointerLeave = useCallback((event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--mouse-x', '0');
  }, []);

  return (
    <figure
      className={`figure-stripes figure-stripes--intersected${armed ? ' figure-stripes--base-loaded' : ''} ${className}`.trim()}
      style={
        {
          '--fragments': FRAGMENTS,
          '--mouse-x': 0,
          '--delay': 700,
        } as CSSProperties
      }
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="figure-stripes__base">
        <Picture src={src} alt={alt} className="picture--cover" />
      </div>
      {armed
        ? Array.from({ length: FRAGMENTS }, (_, index) => (
            <div
              key={index}
              className="figure-stripes__fragment"
              style={
                {
                  '--f-index': index,
                  '--multiplier': Math.abs(index - HALF),
                  '--half': HALF,
                } as CSSProperties
              }
            >
              <Picture src={src} alt="" className="picture--cover" />
            </div>
          ))
        : null}
    </figure>
  );
}

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export function ScrollProgressRail() {
  const reduced = usePrefersReducedMotion();
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const fill = fillRef.current!;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      fill.style.height = `${Math.min(1, Math.max(0, p)) * 100}%`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduced]);

  if (reduced) return null;

  return (
    <div className="rail" aria-hidden>
      <div className="rail-line">
        <div ref={fillRef} className="rail-fill" />
      </div>
      <span className="rail-cap">FILM ADVANCE</span>
    </div>
  );
}

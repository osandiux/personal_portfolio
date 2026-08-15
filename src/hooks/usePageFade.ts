import { useLayoutEffect, useRef, useState } from 'react';
import { useLocation, type Location } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToTopImmediate } from './lenisController';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const FADE_OUT_MS = 220;

function resetScroll() {
  scrollToTopImmediate();
  if (typeof ScrollTrigger.clearScrollMemory === 'function') {
    ScrollTrigger.clearScrollMemory();
  }
  ScrollTrigger.refresh();
}

export function usePageFade() {
  const location = useLocation();
  const reduced = usePrefersReducedMotion();
  const [rendered, setRendered] = useState<Location>(location);
  const [visible, setVisible] = useState(true);
  const renderedRef = useRef(location);
  const pendingRef = useRef(location);
  const fadingRef = useRef(false);
  const timerRef = useRef(0);

  useLayoutEffect(() => {
    pendingRef.current = location;

    const samePage =
      location.pathname === renderedRef.current.pathname && location.search === renderedRef.current.search;

    if (samePage) {
      renderedRef.current = location;
      setRendered(location);
      return;
    }

    if (reduced) {
      renderedRef.current = location;
      setRendered(location);
      resetScroll();
      setVisible(true);
      return;
    }

    if (fadingRef.current) return;

    fadingRef.current = true;
    setVisible(false);
    timerRef.current = window.setTimeout(() => {
      const next = pendingRef.current;
      renderedRef.current = next;
      setRendered(next);
      resetScroll();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          fadingRef.current = false;
          setVisible(true);
        });
      });
    }, FADE_OUT_MS);

    return undefined;
  }, [location, reduced]);

  useLayoutEffect(() => {
    return () => {
      window.clearTimeout(timerRef.current);
    };
  }, []);

  return { location: rendered, visible };
}

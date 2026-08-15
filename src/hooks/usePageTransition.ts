import { useLayoutEffect, useState } from 'react';
import { POISED_BASE } from '../content/site';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';
import { scrollToTopImmediate } from './lenisController';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SPLASH_KEY = 'poised-splash-seen';

function hasSeenSplash() {
  try {
    return sessionStorage.getItem(SPLASH_KEY) === '1';
  } catch {
    return false;
  }
}

function markSplashSeen() {
  try {
    sessionStorage.setItem(SPLASH_KEY, '1');
  } catch {
    /* sessionStorage unavailable (private mode etc.) — splash just replays */
  }
}

function willShowSplash(pathname: string) {
  return pathname === POISED_BASE && !hasSeenSplash();
}

function resetScroll() {
  scrollToTopImmediate();
  if (typeof ScrollTrigger.clearScrollMemory === 'function') {
    ScrollTrigger.clearScrollMemory();
  }
  ScrollTrigger.refresh();
}

/**
 * Home splash for the first visit to `/poised1` each session.
 * Cross-route fades live in `usePageFade`; this hook only owns splash + scroll reset.
 */
export function usePageTransition(pathname: string) {
  const reduced = usePrefersReducedMotion();
  const [splashActive, setSplashActive] = useState(() => willShowSplash(pathname) && !reduced);

  useLayoutEffect(() => {
    const showSplash = willShowSplash(pathname);
    if (reduced) {
      if (showSplash) markSplashSeen();
      setSplashActive(false);
    } else if (showSplash) {
      setSplashActive(true);
    } else {
      setSplashActive(false);
    }
    resetScroll();
    const raf = requestAnimationFrame(resetScroll);
    return () => cancelAnimationFrame(raf);
  }, [pathname, reduced]);

  return {
    splashActive,
    handleSplashDone: () => {
      markSplashSeen();
      setSplashActive(false);
    },
  };
}

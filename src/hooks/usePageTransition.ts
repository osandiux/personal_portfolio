import { useLayoutEffect, useRef, useState, type RefObject } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToTopImmediate } from './lenisController';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';
import { POISED_BASE } from '../content/site';

const SPLASH_KEY = 'poised-splash-seen';

const ROUTE_LABELS: Record<string, string> = {
  '/': 'INDEX',
  [POISED_BASE]: 'POISED',
  [`${POISED_BASE}/work`]: 'WORK',
  [`${POISED_BASE}/project`]: 'PROJECT',
  [`${POISED_BASE}/about`]: 'ABOUT',
  [`${POISED_BASE}/build`]: 'BUILD',
  '/studio': 'STUDIO',
  '/studio/work': 'STUDIO / WORK',
  '/studio/services': 'STUDIO / SERVICES',
  '/studio/agency': 'STUDIO / AGENCY',
  '/studio/culture': 'STUDIO / CULTURE',
};

const COVER_DURATION = 0.4;
const HOLD_DURATION = 0.15;
const REVEAL_DURATION = 0.4;

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

interface UsePageTransitionArgs {
  pathname: string;
  curtainRef: RefObject<HTMLDivElement | null>;
  labelRef: RefObject<HTMLParagraphElement | null>;
}

/**
 * Page transitions in two coordinated halves:
 * - A capture-phase click listener intercepts internal link clicks, plays the
 *   curtain's descent (top -> covering the current page), then navigates —
 *   so the route swap happens hidden behind an already-covering curtain.
 * - The pathname-keyed effect resets scroll while still covered, holds briefly
 *   with the destination label, then lifts the curtain back up to reveal.
 * Back/forward navigation can't be intercepted before the fact, so it falls
 * back to an instant (invisible) cover snap in the same effect.
 *
 * The home splash takes over entirely for the first visit to `/poised1` each session;
 * reduced motion skips both and marks the splash seen so it never traps.
 */
export function usePageTransition({ pathname, curtainRef, labelRef }: UsePageTransitionArgs) {
  const reduced = usePrefersReducedMotion();
  const navigate = useNavigate();
  const prevPathnameRef = useRef(pathname);
  const coveredByClickRef = useRef(false);
  const [splashActive, setSplashActive] = useState(() => willShowSplash(pathname) && !reduced);

  useLayoutEffect(() => {
    if (reduced) return;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element).closest('a');
      if (!anchor || !anchor.getAttribute('href')) return;
      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download')) return;

      const url = new URL(anchor.href, window.location.origin);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;
      if (willShowSplash(url.pathname)) return; // let the splash take over instead

      const curtain = curtainRef.current;
      if (!curtain) return;

      event.preventDefault();
      if (labelRef.current) labelRef.current.textContent = ROUTE_LABELS[url.pathname] ?? '';
      gsap.to(curtain, {
        yPercent: 0,
        duration: COVER_DURATION,
        ease: 'power2.out',
        onComplete: () => {
          coveredByClickRef.current = true;
          navigate(`${url.pathname}${url.search}${url.hash}`);
        },
      });
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [reduced, navigate, curtainRef, labelRef]);

  useLayoutEffect(() => {
    const isNavigation = pathname !== prevPathnameRef.current;
    prevPathnameRef.current = pathname;

    const showSplash = willShowSplash(pathname);
    const alreadyCovered = coveredByClickRef.current;
    coveredByClickRef.current = false;

    let raf = 0;
    let tween: gsap.core.Tween | undefined;

    if (reduced) {
      if (showSplash) markSplashSeen();
      setSplashActive(false);
      if (curtainRef.current) gsap.set(curtainRef.current, { yPercent: -101 });
      resetScroll();
      raf = requestAnimationFrame(resetScroll);
    } else if (showSplash) {
      setSplashActive(true);
      resetScroll();
      raf = requestAnimationFrame(resetScroll);
    } else {
      setSplashActive(false);
      const curtain = curtainRef.current;

      if (!isNavigation || !curtain) {
        resetScroll();
        raf = requestAnimationFrame(resetScroll);
      } else {
        if (!alreadyCovered) {
          // Not intercepted (browser back/forward) — snap covered instantly
          // so the raw route swap is never visible.
          if (labelRef.current) labelRef.current.textContent = ROUTE_LABELS[pathname] ?? '';
          gsap.set(curtain, { yPercent: 0 });
        }
        resetScroll();
        raf = requestAnimationFrame(resetScroll);
        tween = gsap.to(curtain, {
          yPercent: -101,
          duration: REVEAL_DURATION,
          delay: HOLD_DURATION,
          ease: 'power2.out',
        });
      }
    }

    return () => {
      cancelAnimationFrame(raf);
      tween?.kill();
    };
  }, [pathname, reduced]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    splashActive,
    handleSplashDone: () => {
      markSplashSeen();
      setSplashActive(false);
    },
  };
}

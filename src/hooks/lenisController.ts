import type Lenis from 'lenis';

/** Shared Lenis handle so route changes can reset scroll without recreating the instance. */
let lenis: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null) {
  lenis = instance;
}

/**
 * Hard-reset scroll after a route change.
 * Lenis can leave window.scrollY desynced (Lenis at 0 while window stays deep),
 * which parks the next page's header above the viewport.
 */
export function scrollToTopImmediate() {
  if (lenis) {
    // Stop any in-flight lerp, jump internals + window to 0, then resume.
    lenis.stop();
    lenis.scrollTo(0, { immediate: true, force: true });
    lenis.animatedScroll = 0;
    lenis.targetScroll = 0;
  }
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  if (lenis) {
    lenis.resize();
    lenis.start();
  }
}

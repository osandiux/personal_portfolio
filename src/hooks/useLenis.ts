import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';
import { setLenisInstance } from './lenisController';

gsap.registerPlugin(ScrollTrigger);

/** Smooth scroll for the whole app, synced with GSAP ScrollTrigger. */
export function useLenis() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setLenisInstance(null);
      return;
    }
    const instance = new Lenis({ lerp: 0.12 });
    setLenisInstance(instance);
    instance.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      setLenisInstance(null);
      instance.destroy();
    };
  }, [reduced]);
}

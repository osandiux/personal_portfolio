import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { about } from '../../content/about';
import { MonoText, Title } from '../../components/primitives';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function DevelopScroll() {
  const reduced = usePrefersReducedMotion();
  // Pin an INNER node — never the <section> React removes from <main>.
  const pinRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const washRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(reduced ? 2 : 0);
  const { develop } = about;

  useLayoutEffect(() => {
    if (reduced) return;
    const pin = pinRef.current!;
    const img = imgRef.current!;
    const wash = washRef.current!;
    const trigger = ScrollTrigger.create({
      trigger: pin,
      start: 'top top',
      end: '+=150%',
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        // Negative (inverted) -> stop bath (red wash) -> final print
        img.style.filter = `invert(${Math.max(0, 1 - p * 2)}) grayscale(${Math.max(0, 1 - p * 1.4)})`;
        wash.style.opacity = String(p < 0.66 ? Math.min(0.5, p) : Math.max(0, 0.5 - (p - 0.66) * 1.6));
        setPhase(p < 0.33 ? 0 : p < 0.72 ? 1 : 2);
      },
    });
    return () => trigger.kill();
  }, [reduced]);

  return (
    <section className="dev" id="develop" aria-label="The practice develops">
      <div ref={pinRef} className="dev-pin">
        <figure className="media-frame dev-stage">
          <img
            ref={imgRef}
            src={develop.image}
            alt="Portrait of Osandi Robinson, developing from brief to shipped product"
            style={reduced ? undefined : { filter: 'invert(1) grayscale(1)' }}
          />
          <div ref={washRef} className="dev-safelight" style={{ opacity: 0 }} aria-hidden />
        </figure>

        <div className="dev-side">
          <MonoText className="dev-phase" tone="red">
            {develop.phases[phase]}
          </MonoText>
          <Title as="h2" size="lg" className="dev-title">
            <span className="line">{develop.titleA}</span>
            <span className="line title-accent">{develop.titleB}</span>
          </Title>
          <p className="dev-copy">{develop.copy}</p>
          <MonoText>{develop.hint}</MonoText>
        </div>
      </div>
    </section>
  );
}

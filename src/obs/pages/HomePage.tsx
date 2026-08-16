import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { GRID_EMPTY, WORK, type WorkItem } from '../content';

type Mode = 'vertical' | 'horizontal' | 'grid';

const MODES: { id: Mode; label: string }[] = [
  { id: 'vertical', label: 'Vertical,' },
  { id: 'horizontal', label: 'Horizontal,' },
  { id: 'grid', label: 'Grid' },
];

const GAP = 0.5;
let homeHasBooted = false;

function cardHeight(item: WorkItem) {
  return item.width / item.ratio;
}

function offsetAt(index: number, along: 'height' | 'width') {
  let y = 0;
  for (let i = 0; i < index; i += 1) {
    y += (along === 'height' ? cardHeight(WORK[i]) : WORK[i].width) + GAP;
  }
  return y;
}

function waitForPageVisible(): Promise<void> {
  const fade = document.querySelector('.page-fade');
  if (!fade || fade.classList.contains('is-in')) return Promise.resolve();
  return new Promise((resolve) => {
    const onEnd = (event: Event) => {
      if (event.target !== fade) return;
      fade.removeEventListener('transitionend', onEnd);
      resolve();
    };
    fade.addEventListener('transitionend', onEnd);
    window.setTimeout(() => {
      fade.removeEventListener('transitionend', onEnd);
      resolve();
    }, 480);
  });
}

export function HomePage() {
  const [mode, setMode] = useState<Mode>('vertical');
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [progress, setProgress] = useState(homeHasBooted ? 100 : 0);
  const [booted, setBooted] = useState(homeHasBooted);
  const [leaving, setLeaving] = useState(false);
  const lock = useRef(false);
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = document.querySelector('.obs-root');
    if (booted) root?.classList.add('is-booted');
  }, [booted]);

  useEffect(() => {
    if (homeHasBooted) {
      setBooted(true);
      return;
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let killed = false;
    const obj = { n: 0 };
    const tween = { current: null as gsap.core.Tween | null };

    void waitForPageVisible().then(() => {
      if (killed) return;
      if (reduced) {
        homeHasBooted = true;
        setProgress(100);
        setBooted(true);
        return;
      }
      tween.current = gsap.to(obj, {
        n: 100,
        duration: 1.2,
        ease: 'power2.inOut',
        onUpdate: () => setProgress(Math.round(obj.n)),
        onComplete: () => {
          if (killed) return;
          setLeaving(true);
          const bg = rootRef.current?.querySelector('.obs-preloader__bg');
          const bar = rootRef.current?.querySelector('.obs-preloader__bar');
          const n = rootRef.current?.querySelector('.obs-preloader__n');
          const tl = gsap.timeline({
            onComplete: () => {
              homeHasBooted = true;
              setBooted(true);
            },
          });
          if (n) tl.to(n, { opacity: 0, duration: 0.25 }, 0);
          if (bar) tl.to(bar, { yPercent: -120, duration: 0.7, ease: 'power3.inOut' }, 0);
          if (bg) tl.to(bg, { yPercent: -101, duration: 0.9, ease: 'power3.inOut' }, 0.05);
          else {
            homeHasBooted = true;
            setBooted(true);
          }
        },
      });
    });

    return () => {
      killed = true;
      tween.current?.kill();
    };
  }, []);

  const step = (dir: number) => {
    if (mode === 'grid' || lock.current) return;
    lock.current = true;
    setIndex((current) => (current + dir + WORK.length) % WORK.length);
    window.setTimeout(() => {
      lock.current = false;
    }, 560);
  };

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const onWheel = (event: WheelEvent) => {
      if (mode === 'grid' || !booted) return;
      event.preventDefault();
      const dir = event.deltaY > 2 || event.deltaX > 2 ? 1 : event.deltaY < -2 || event.deltaX < -2 ? -1 : 0;
      if (dir) step(dir);
    };
    node.addEventListener('wheel', onWheel, { passive: false });
    return () => node.removeEventListener('wheel', onWheel);
  }, [mode, booted]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (mode === 'grid' || !booted) return;
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mode, booted]);

  const active = WORK[index];
  const vertCenter = offsetAt(index, 'height') + cardHeight(active) / 2;
  const horizCenter = offsetAt(index, 'width') + active.width / 2;
  const hovered = hover !== null ? WORK[hover] : null;

  return (
    <main ref={rootRef} className={`obs-home is-${mode}${booted ? ' is-ready' : ''}`}>
      {!booted ? (
        <div className={`obs-preloader${leaving ? ' is-out' : ''}`} aria-hidden>
          <div className="obs-preloader__bg" />
          <div className="obs-preloader__bar">
            <div style={{ transform: `translateX(${progress - 100}%)` }} />
          </div>
          <div className="obs-preloader__n">{String(progress).padStart(3, '0')}</div>
        </div>
      ) : null}

      <section className={`obs-mode obs-vert${mode === 'vertical' ? ' is-on' : ''}`}>
        <div className="obs-vert__titles">
          <div className="obs-vert__track" style={{ transform: `translateY(calc(12.625rem - ${index * 1.32 + 0.66}em))` }}>
            {WORK.map((item, i) => (
              <Link key={item.slug} to={`/obs/work/${item.slug}`} className={i === index ? 'is-on' : ''}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="obs-vert__stack">
          <div className="obs-vert__move" style={{ transform: `translateY(calc(50vh - ${vertCenter}rem))` }}>
            {WORK.map((item) => (
              <Link
                key={item.slug}
                to={`/obs/work/${item.slug}`}
                className="obs-card"
                style={{ width: `${item.width}rem`, aspectRatio: String(item.ratio) }}
                aria-label={item.title}
              >
                <img src={item.image} alt="" />
              </Link>
            ))}
          </div>
        </div>
        <div className="obs-vert__meta">
          <span>{active.industry}</span>
          <span>{active.services}</span>
          <span>{String(index + 1).padStart(2, '0')}</span>
        </div>
      </section>

      <section className={`obs-mode obs-horiz${mode === 'horizontal' ? ' is-on' : ''}`}>
        <div
          className="obs-horiz__row"
          style={{ transform: `translate3d(calc(50vw - ${horizCenter}rem), -50%, 0)` }}
        >
          {WORK.map((item) => (
            <Link
              key={item.slug}
              to={`/obs/work/${item.slug}`}
              className="obs-card obs-card--rot"
              style={{ width: `${item.width}rem`, aspectRatio: String(item.ratio) }}
              aria-label={item.title}
            >
              <img src={item.image} alt="" />
            </Link>
          ))}
        </div>
        <div className="obs-horiz__titles">
          <div style={{ transform: `translateY(${-index * 1.32}em)` }}>
            {WORK.map((item) => (
              <Link key={item.slug} to={`/obs/work/${item.slug}`}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="obs-horiz__meta">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span>{active.industry}</span>
        </div>
      </section>

      <section className={`obs-mode obs-mode--grid${mode === 'grid' ? ' is-on' : ''}`}>
        <div className="obs-grid">
          {GRID_EMPTY.map((cell) => (
            <div key={cell.n} className="obs-grid__empty" style={{ gridRow: cell.r, gridColumn: cell.c }}>
              {cell.n}
            </div>
          ))}
          {WORK.map((item, i) => (
            <Link
              key={item.slug}
              to={`/obs/work/${item.slug}`}
              className={`obs-grid__item${hover === i ? ' is-on' : ''}`}
              style={{ gridRow: item.grid.r, gridColumn: item.grid.c }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              aria-label={item.title}
            >
              <span className="obs-card" style={{ aspectRatio: String(item.ratio) }}>
                <img src={item.image} alt="" />
              </span>
            </Link>
          ))}
        </div>
        <div className={`obs-grid__overlay${hovered ? ' is-on' : ''}`} aria-hidden>
          <figure className={`obs-grid__zoom${hovered ? ' is-on' : ''}`}>
            {hovered ? <img src={hovered.image} alt="" /> : null}
          </figure>
          <div className="obs-grid__giant">
            <div>{hovered?.title ?? ''}</div>
          </div>
          <div className="obs-grid__meta">
            <span>{hovered?.title}</span>
            <span>{hovered?.industry}</span>
            <span>{hovered?.services}</span>
            <span>{hover !== null ? String(hover + 1).padStart(2, '0') : ''}</span>
          </div>
        </div>
      </section>

      <div className="obs-modes">
        {MODES.map((item) => (
          <button
            key={item.id}
            type="button"
            className={mode === item.id ? 'is-on' : ''}
            onClick={() => setMode(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="obs-copy">All rights reserved. ©2026 Obys</p>
    </main>
  );
}

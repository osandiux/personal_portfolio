import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function shuffleChar(ch: string) {
  if (ch === ' ' || ch === '.' || ch === ',' || ch === '’' || ch === "'") return ch;
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

export function SplitTextShuffle({
  text,
  lines,
}: {
  text: string;
  lines?: readonly string[];
}) {
  const reduced = usePrefersReducedMotion();
  const rows = lines ?? [text];
  const [display, setDisplay] = useState(rows);

  useEffect(() => {
    if (reduced) {
      setDisplay(rows);
      return;
    }

    const locked = rows.map((line) => Array.from(line).map(() => false));
    let frame = 0;
    let raf = 0;
    const tick = () => {
      frame += 1;
      const next = rows.map((line, li) =>
        Array.from(line)
          .map((ch, ci) => {
            if (locked[li][ci]) return ch;
            if (frame > 8 + ci * 2 + li * 6) {
              locked[li][ci] = true;
              return ch;
            }
            return shuffleChar(ch);
          })
          .join(''),
      );
      setDisplay(next);
      if (locked.every((line) => line.every(Boolean))) return;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, text, lines]);

  return (
    <span className="split-text-shuffle" aria-label={text}>
      {display.map((line, i) => (
        <span key={i} aria-hidden="true">
          {Array.from(line).map((ch, ci) => (
            <span key={`${i}-${ci}`}>{ch}</span>
          ))}
        </span>
      ))}
    </span>
  );
}

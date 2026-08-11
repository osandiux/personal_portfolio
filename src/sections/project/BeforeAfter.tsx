import { useRef, useState } from 'react';
import { project } from '../../content/project';
import { Eyebrow, MonoText, Title } from '../../components/primitives';

const clamp = (v: number) => Math.min(92, Math.max(8, v));

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const stageRef = useRef<HTMLDivElement>(null);
  const { beforeAfter: ba } = project;

  const fromPointer = (clientX: number) => {
    const rect = stageRef.current!.getBoundingClientRect();
    setPos(clamp(((clientX - rect.left) / rect.width) * 100));
  };

  return (
    <section className="ba" aria-label="From flow to shipped product — comparison">
      <Eyebrow>{ba.kicker}</Eyebrow>
      <Title as="h2" size="lg">
        {ba.title}
      </Title>

      <div
        ref={stageRef}
        className="ba-stage"
        style={{ ['--ba-pos' as string]: `${pos}%` }}
        onPointerDown={(e) => {
          (e.target as Element).setPointerCapture?.(e.pointerId);
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons > 0) fromPointer(e.clientX);
        }}
      >
        <img className="ba-before" src={ba.beforeImage} alt={ba.beforeLabel} />
        <img className="ba-after" src={ba.afterImage} alt={ba.afterLabel} />
        <div className="ba-divider" aria-hidden />
        <button
          type="button"
          className="ba-handle"
          aria-label="Compare early flow and shipped product (arrow keys)"
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') setPos((p) => clamp(p - 4));
            if (e.key === 'ArrowRight') setPos((p) => clamp(p + 4));
          }}
        >
          ↔
        </button>
      </div>

      <div className="ba-labels">
        <MonoText>{ba.beforeLabel}</MonoText>
        <MonoText tone="bright">{ba.afterLabel}</MonoText>
      </div>
    </section>
  );
}

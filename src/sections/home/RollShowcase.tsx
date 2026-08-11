import { useState } from 'react';
import { roll } from '../../content/home';
import { Eyebrow, MonoText, Title } from '../../components/primitives';
import { useInView } from '../../hooks/useInView';

export function RollShowcase() {
  const [stage, setStage] = useState<string>(roll.stage);
  const ref = useInView<HTMLElement>();

  const plates = [
    { src: roll.stage, label: `${roll.title} — selected frame` },
    ...roll.angles.map((angle) => ({ src: angle.image, label: `${roll.title} — alternate angle ${angle.no}` })),
  ];

  return (
    <section ref={ref} className="roll reveal" aria-label="Case 01 — selected">
      <figure className="media-frame roll-stage">
        {plates.map((plate) => (
          <img
            key={plate.src}
            src={plate.src}
            alt={stage === plate.src ? plate.label : ''}
            aria-hidden={stage !== plate.src}
            className={stage === plate.src ? 'is-stage-active' : undefined}
          />
        ))}
      </figure>

      <div className="roll-side">
        <Eyebrow>{roll.kicker}</Eyebrow>
        <MonoText>{roll.meta}</MonoText>
        <Title as="h2" size="lg" className="roll-title">
          {roll.title}
        </Title>
        <MonoText>{roll.sub}</MonoText>
        <p style={{ color: 'var(--color-dim)', maxWidth: '40ch' }}>{roll.desc}</p>

        <div className="roll-thumbs" role="group" aria-label="Angles">
          <MonoText className="mono">ANGLES</MonoText>
          <button
            type="button"
            className={`angle-thumb${stage === roll.stage ? ' is-active' : ''}`}
            onClick={() => setStage(roll.stage)}
            aria-label="View main frame"
          >
            <img src={roll.stage} alt="" />
            <span className="angle-no">01</span>
          </button>
          {roll.angles.map((angle) => (
            <button
              key={angle.no}
              type="button"
              className={`angle-thumb${stage === angle.image ? ' is-active' : ''}`}
              onClick={() => setStage(angle.image)}
              aria-label={`View alternate angle ${angle.no}`}
            >
              <img src={angle.image} alt="" />
              <span className="angle-no">{angle.no}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

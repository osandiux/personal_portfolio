import { useState } from 'react';
import { project } from '../../content/project';
import { Eyebrow, MediaFrame, MonoText, Quote, Title } from '../../components/primitives';
import { Lightbox } from '../../components/overlays/Lightbox';
import { useInView } from '../../hooks/useInView';
import './project.css';

export function ProjectOpen() {
  const { open } = project;
  return (
    <section className="p-open" aria-label="Case study — The BitcoinFi Suite">
      <div className="p-open-media" aria-hidden>
        <img src={open.image} alt="" />
      </div>
      <div className="p-open-scrim" aria-hidden />
      <div className="p-open-copy">
        <div className="p-open-topline">
          <MonoText>{open.kicker}</MonoText>
          <MonoText>{open.coords}</MonoText>
        </div>
        <Eyebrow>{open.category}</Eyebrow>
        <h1 className="title p-title">
          <span className="line">{open.titleA}</span>
          <span className="line title-accent">{open.titleB}</span>
        </h1>
        <p className="p-sub">{open.sub}</p>
      </div>
    </section>
  );
}

export function ProjectBrief() {
  const { brief } = project;
  const ref = useInView<HTMLElement>();
  return (
    <section ref={ref} className="p-brief reveal" aria-label="The brief">
      <Eyebrow>{brief.kicker}</Eyebrow>
      <div>
        <p className="p-brief-lines">{brief.lines.join(' ')}</p>
        <dl className="p-specs">
          {brief.specs.map((spec) => (
            <div key={spec.k}>
              <dt className="p-spec-k">{spec.k}</dt>
              <dd className="p-spec-v">{spec.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function ProjectStillOne() {
  const { stillOne } = project;
  return (
    <section className="p-still" aria-label={stillOne.caption}>
      <MediaFrame src={stillOne.image} alt={stillOne.caption} />
      <div className="p-cap">
        <MonoText>{stillOne.caption}</MonoText>
        <MonoText>{stillOne.index}</MonoText>
      </div>
    </section>
  );
}

export function ProjectTwoUp() {
  const { twoUp } = project;
  return (
    <section className="p-still" aria-label={twoUp.caption}>
      <div className="p-still--two">
        {twoUp.images.map((img) => (
          <MediaFrame key={img.src} src={img.src} alt={img.alt} />
        ))}
      </div>
      <div className="p-cap">
        <MonoText>{twoUp.caption}</MonoText>
        <MonoText>{twoUp.index}</MonoText>
      </div>
    </section>
  );
}

export function ProjectStillTwo() {
  const { stillTwo } = project;
  return (
    <section className="p-still" aria-label={stillTwo.caption}>
      <MediaFrame src={stillTwo.image} alt={stillTwo.caption} />
      <div className="p-cap">
        <MonoText>{stillTwo.caption}</MonoText>
        <MonoText>{stillTwo.index}</MonoText>
      </div>
    </section>
  );
}

export function ContactSheet() {
  const { sheet } = project;
  const [openFrame, setOpenFrame] = useState<{ frame: string; image: string } | null>(null);

  return (
    <section className="sheet" aria-label="The flow sheet">
      <div className="sheet-head">
        <div>
          <Eyebrow>{sheet.kicker}</Eyebrow>
          <Title as="h2" size="lg">
            {sheet.title}
          </Title>
        </div>
        <MonoText tone="red">{sheet.hint}</MonoText>
      </div>

      <div className="sheet-grid">
        {sheet.frames.map((frame) => (
          <button
            key={frame.frame}
            type="button"
            className="sheet-thumb"
            onClick={() => setOpenFrame(frame)}
            aria-label={`Enlarge ${frame.frame}`}
          >
            <img src={frame.image} alt={frame.frame} loading="lazy" />
            <span className="mono">{frame.frame}</span>
          </button>
        ))}
      </div>

      {openFrame ? (
        <Lightbox src={openFrame.image} caption={openFrame.frame} onClose={() => setOpenFrame(null)} />
      ) : null}
    </section>
  );
}

export function ProjectQuote() {
  const ref = useInView<HTMLElement>();
  return (
    <section ref={ref} className="p-quote reveal" aria-label="Field note">
      <Quote lines={project.quote.lines} />
    </section>
  );
}

/** Atmosphere only — the source teaser has no destination, so this never navigates. */
export function NextProject() {
  const { next } = project;
  return (
    <section className="p-next" aria-label="Next project teaser">
      <img src={next.image} alt="" aria-hidden />
      <div className="p-next-copy">
        <Eyebrow>{next.kicker}</Eyebrow>
        <p className="title p-next-title">{next.title}</p>
      </div>
    </section>
  );
}

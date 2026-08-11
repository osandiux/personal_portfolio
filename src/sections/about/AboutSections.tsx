import { about } from '../../content/about';
import { Chip, Eyebrow, MonoText, Stat, Title } from '../../components/primitives';
import { useInView } from '../../hooks/useInView';
import './about.css';

export function AboutHead() {
  const { head } = about;
  return (
    <section className="about-head" aria-label="About">
      <Eyebrow>{head.label}</Eyebrow>
      <Title as="h1" size="xl" className="about-head-title">
        <span className="line">{head.titleA}</span>
        <span className="line title-accent">{head.titleB}</span>
      </Title>
      <p className="about-head-intro">{head.intro}</p>
      <MonoText>{head.name}</MonoText>
    </section>
  );
}

export function Bio() {
  const { bio } = about;
  const ref = useInView<HTMLElement>();
  return (
    <section ref={ref} className="bio reveal" aria-label="Biography">
      <Eyebrow>{bio.kicker}</Eyebrow>
      <div>
        <div className="bio-paras">
          {bio.paras.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
        <div className="bio-stats">
          {bio.stats.map((stat) => (
            <Stat key={stat.caption} value={stat.value} caption={stat.caption} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Timeline() {
  const { timeline } = about;
  const ref = useInView<HTMLElement>();
  return (
    <section ref={ref} className="timeline reveal" aria-label="Timeline">
      <Eyebrow>{timeline.kicker}</Eyebrow>
      <Title as="h2" size="lg">
        {timeline.title}
      </Title>
      <div>
        {timeline.stops.map((stop) => (
          <div key={stop.year} className="tl-stop">
            <span className="tl-year">{stop.year}</span>
            <div>
              <p className="tl-title">{stop.title}</p>
              <p className="tl-note">{stop.note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Kit() {
  const { kit } = about;
  const ref = useInView<HTMLElement>();
  return (
    <section ref={ref} className="kit reveal" aria-label="The kit">
      <div>
        <Eyebrow>{kit.kicker}</Eyebrow>
        <div style={{ marginTop: 'var(--space-4)' }}>
          {kit.rows.map((row) => (
            <div key={row.k} className="kit-row">
              <span className="kit-k">{row.k}</span>
              <span>{row.v}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Eyebrow>{kit.clientsLabel}</Eyebrow>
        <div className="kit-clients">
          {kit.clients.map((client) => (
            <Chip key={client}>{client}</Chip>
          ))}
        </div>
      </div>
    </section>
  );
}

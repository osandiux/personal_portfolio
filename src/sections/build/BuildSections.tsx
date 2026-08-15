import { build } from '../../content/build';
import { POISED_BASE } from '../../content/site';
import {
  Button,
  Chip,
  Eyebrow,
  MediaFrame,
  MonoText,
  NoteCard,
  Quote,
  Stat,
  TextLink,
  Title,
  Marquee,
} from '../../components/primitives';
import { useInView } from '../../hooks/useInView';
import './build.css';

export function BuildHead() {
  const { head } = build;
  return (
    <section className="build-head" aria-label="Build guide">
      <Eyebrow>{head.label}</Eyebrow>
      <Title as="h1" size="xl" className="build-head-title">
        <span className="line">{head.titleA}</span>
        <span className="line title-accent">{head.titleB}</span>
      </Title>
      <p className="build-head-intro">{head.intro}</p>
      <MonoText>{head.meta}</MonoText>
    </section>
  );
}

/** Live specimens of every primitive — the centerpiece for builders. */
export function SystemShowcase() {
  const ref = useInView<HTMLElement>();
  return (
    <section ref={ref} className="build-system reveal" aria-label="Design system — primitives">
      <div className="build-system-head">
        <Eyebrow>System / Primitives</Eyebrow>
        <Title as="h2" size="lg">
          Compose from these.
        </Title>
        <p className="build-lede">
          Every page is an arrangement of the same building blocks. Specimens below are the real components from{' '}
          <span className="mono">src/components/primitives/</span>.
        </p>
      </div>

      <div className="build-specimens">
        <article className="build-specimen">
          <MonoText>Eyebrow</MonoText>
          <Eyebrow>Sample section label</Eyebrow>
          <p className="build-specimen-note">{build.primitives[0].note}</p>
        </article>

        <article className="build-specimen">
          <MonoText>Title</MonoText>
          <Title as="h3" size="md">
            Display heading
          </Title>
          <p className="build-specimen-note">{build.primitives[1].note}</p>
        </article>

        <article className="build-specimen">
          <MonoText>MonoText</MonoText>
          <MonoText>12 ROLES · EST. 2018</MonoText>
          <MonoText tone="red">ACCENT META</MonoText>
          <p className="build-specimen-note">{build.primitives[2].note}</p>
        </article>

        <article className="build-specimen">
          <MonoText>Button</MonoText>
          <Button href="mailto:osandi@poised.design">Primary action →</Button>
          <p className="build-specimen-note">{build.primitives[3].note}</p>
        </article>

        <article className="build-specimen">
          <MonoText>TextLink</MonoText>
          <TextLink to={`${POISED_BASE}/work`}>Internal route</TextLink>
          <p className="build-specimen-note">{build.primitives[4].note}</p>
        </article>

        <article className="build-specimen">
          <MonoText>Chip</MonoText>
          <div className="build-specimen-row">
            <Chip>Default</Chip>
            <Chip active>Active</Chip>
          </div>
          <p className="build-specimen-note">{build.primitives[5].note}</p>
        </article>

        <article className="build-specimen">
          <MonoText>MediaFrame</MonoText>
          <MediaFrame src="/images/portfolio/project-01-borrow.png" alt="Sample media frame" ratio="16 / 9" />
          <p className="build-specimen-note">{build.primitives[6].note}</p>
        </article>

        <article className="build-specimen">
          <MonoText>Stat</MonoText>
          <Stat value="12+" caption="Years in product design" />
          <p className="build-specimen-note">{build.primitives[7].note}</p>
        </article>

        <article className="build-specimen build-specimen--wide">
          <MonoText>Quote</MonoText>
          <Quote lines={['“Compose pages from primitives,', 'not one-off markup.”']} source="Build guide" />
          <p className="build-specimen-note">{build.primitives[8].note}</p>
        </article>

        <article className="build-specimen build-specimen--wide">
          <MonoText>Marquee</MonoText>
          <div className="build-marquee-clip">
            <Marquee items={['Apple', 'Square', 'BlockFi', 'Thesis*', 'Primitives']} />
          </div>
          <p className="build-specimen-note">{build.primitives[9].note}</p>
        </article>

        <article className="build-specimen build-specimen--wide">
          <MonoText>NoteCard</MonoText>
          <NoteCard date="11.08.2026" title="Tokens before components" tag="System" />
          <p className="build-specimen-note">{build.primitives[10].note}</p>
        </article>
      </div>

      <div className="build-tokens-callout">
        <Eyebrow>{build.tokensNote.kicker}</Eyebrow>
        <p className="build-lede">{build.tokensNote.body}</p>
        <MonoText tone="red">{build.tokensNote.path}</MonoText>
      </div>
    </section>
  );
}

export function ChromeCatalog() {
  const ref = useInView<HTMLElement>();
  return (
    <section ref={ref} className="build-chrome reveal" aria-label="Chrome and overlays">
      <Eyebrow>System / Chrome & overlays</Eyebrow>
      <Title as="h2" size="lg">
        Site chrome.
      </Title>
      <p className="build-lede">Shared shell pieces. Pages never reimplement navigation, transitions, or footer CTA.</p>
      <div className="build-chrome-list">
        {build.chrome.map((item) => (
          <div key={item.name} className="build-chrome-row">
            <span className="build-chrome-name">{item.name}</span>
            <span className="mono build-chrome-path">{item.path}</span>
            <span className="build-chrome-role">{item.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function BuildOutline() {
  const { outline } = build;
  const ref = useInView<HTMLElement>();
  return (
    <section ref={ref} className="build-outline reveal" aria-label="Outline">
      <Eyebrow>{outline.kicker}</Eyebrow>
      <Title as="h2" size="lg">
        {outline.title}
      </Title>
      <div className="build-phase-list">
        {outline.phases.map((phase) => (
          <div key={phase.no} className="build-phase">
            <span className="mono build-phase-no">{phase.no}</span>
            <div>
              <p className="build-phase-name">{phase.name}</p>
              <p className="build-phase-note">{phase.note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function BuildMilestones() {
  const { milestones } = build;
  const ref = useInView<HTMLElement>();
  return (
    <section ref={ref} className="build-timeline reveal" aria-label="Milestones">
      <Eyebrow>{milestones.kicker}</Eyebrow>
      <Title as="h2" size="lg">
        {milestones.title}
      </Title>
      <div>
        {milestones.stops.map((stop) => (
          <div key={stop.year} className="build-tl-stop">
            <span className="build-tl-year">{stop.year}</span>
            <div>
              <p className="build-tl-title">{stop.title}</p>
              <p className="build-tl-note">{stop.note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function BuildChallenges() {
  const { challenges } = build;
  const ref = useInView<HTMLElement>();
  return (
    <section ref={ref} className="build-challenges reveal" aria-label="Challenges and solutions">
      <Eyebrow>{challenges.kicker}</Eyebrow>
      <Title as="h2" size="lg">
        {challenges.title}
      </Title>
      <div className="build-challenge-list">
        {challenges.items.map((item) => (
          <div key={item.challenge} className="build-challenge">
            <div>
              <MonoText tone="red">Challenge</MonoText>
              <p>{item.challenge}</p>
            </div>
            <div>
              <MonoText>Solution</MonoText>
              <p>{item.solution}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function BuildSteps() {
  const { steps } = build;
  const ref = useInView<HTMLElement>();
  return (
    <section ref={ref} className="build-steps reveal" aria-label="Key steps">
      <Eyebrow>{steps.kicker}</Eyebrow>
      <Title as="h2" size="lg">
        {steps.title}
      </Title>
      <ol className="build-step-list">
        {steps.items.map((item, i) => (
          <li key={item} className="build-step">
            <span className="mono">{String(i + 1).padStart(2, '0')}</span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function BuildTradeoffs() {
  const { tradeoffs } = build;
  const ref = useInView<HTMLElement>();
  return (
    <section ref={ref} className="build-tradeoffs reveal" aria-label="Trade-offs">
      <Eyebrow>{tradeoffs.kicker}</Eyebrow>
      <Title as="h2" size="lg">
        {tradeoffs.title}
      </Title>
      <div className="build-tradeoff-list">
        {tradeoffs.rows.map((row) => (
          <div key={row.k} className="build-tradeoff-row">
            <span className="build-tradeoff-k">{row.k}</span>
            <span>{row.v}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function BuildLearnings() {
  const { learnings } = build;
  const ref = useInView<HTMLElement>();
  return (
    <section ref={ref} className="build-learnings reveal" aria-label="Learnings">
      <Eyebrow>{learnings.kicker}</Eyebrow>
      <Quote lines={learnings.lines} />
      <div className="build-learnings-cta">
        <TextLink to={`${POISED_BASE}/work`}>{learnings.cta}</TextLink>
        <div className="build-specimen-row">
          <Chip>Work</Chip>
          <Chip>Project</Chip>
          <Chip>About</Chip>
        </div>
      </div>
    </section>
  );
}

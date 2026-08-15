import { aboutTeaser } from '../../content/home';
import { POISED_BASE } from '../../content/site';
import { Eyebrow, MediaFrame, Stat, TextLink, Title } from '../../components/primitives';
import { useInView } from '../../hooks/useInView';

export function AboutTeaser() {
  const ref = useInView<HTMLElement>();

  return (
    <section ref={ref} className="about-teaser reveal" aria-label="About the designer">
      <MediaFrame src={aboutTeaser.portrait} alt="Portrait of Osandi Robinson" scrim />

      <div>
        <Eyebrow>{aboutTeaser.label}</Eyebrow>
        <Title as="h2" size="lg" className="about-teaser-title">
          <span className="line">{aboutTeaser.titleA}</span>
          <span className="line title-accent">{aboutTeaser.titleB}</span>
        </Title>
        <p className="about-teaser-lede">{aboutTeaser.lede}</p>
        <div className="about-teaser-stats">
          {aboutTeaser.stats.map((stat) => (
            <Stat key={stat.caption} value={stat.value} caption={stat.caption} />
          ))}
        </div>
        <TextLink to={`${POISED_BASE}/about`}>{aboutTeaser.cta}</TextLink>
      </div>
    </section>
  );
}

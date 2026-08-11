import { site } from '../../content/site';
import { Button, Chip, MonoText } from '../primitives';

export function FootCTA() {
  return (
    <section className="foot-cta" aria-label="Partnerships">
      <MonoText>{site.footCta.kicker}</MonoText>
      <h2 className="foot-cta-title">
        {site.footCta.titleA} <span className="red">{site.footCta.titleB}</span>.
      </h2>
      <div className="foot-cta-chips">
        {site.footCta.chips.map((chip) => (
          <Chip key={chip}>{chip}</Chip>
        ))}
      </div>
      <div className="foot-cta-row">
        <Button href={`mailto:${site.email}`}>{site.footCta.action} →</Button>
        <p className="foot-cta-meta">
          {site.bookingLong} · <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </div>
    </section>
  );
}

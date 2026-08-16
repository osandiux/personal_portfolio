import { Link, useParams } from 'react-router-dom';
import { EMAIL, WORK } from '../content';

export function WorkPage() {
  const { slug } = useParams();
  const item = WORK.find((entry) => entry.slug === slug) ?? WORK[0];
  const next = WORK[(WORK.indexOf(item) + 1) % WORK.length];

  return (
    <main className="obs-work">
      <div className="obs-work__info">
        <h1>{item.title}</h1>
        <div className="obs-work__meta">
          <p>{item.industry}</p>
          <p>{item.services}</p>
        </div>
        {item.href ? (
          <a className="obs-link" href={item.href} target="_blank" rel="noreferrer">
            Visit website
          </a>
        ) : null}
      </div>
      <figure key={item.slug} className="obs-work__figure">
        <img src={item.image} alt={item.title} />
      </figure>
      <Link className="obs-back" to="/obs">
        Back
      </Link>
      <Link className="obs-work__next" to={`/obs/work/${next.slug}`}>
        Next — {next.title}
      </Link>
      <p className="obs-copy">
        Contact: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>
    </main>
  );
}

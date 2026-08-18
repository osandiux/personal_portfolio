import { Link } from 'react-router-dom';
import { EMAIL, mix1Build } from '../content';
import { Mix1Contact } from '../Contact';
import { SplitTextShuffle } from '../../studio/home/SplitTextShuffle';
import { TextFractured } from '../../studio/home/TextFractured';

export function BuildPage() {
  return (
    <div className="page page-agency mix1-build">
      <header className="hero-agency">
        <div className="hero-agency__inner">
          <div className="hero-agency__start">
            <div className="hero-agency__heading">
              <h1 className="heading heading--hg sr-only">{mix1Build.title}</h1>
              <TextFractured text={mix1Build.title} />
            </div>
            <p className="hero-agency__intro">
              <SplitTextShuffle text={mix1Build.intro} />
            </p>
          </div>
        </div>
      </header>

      <section className="mix1-build__section">
        <p className="mix1-build__kicker">{mix1Build.what.kicker}</p>
        <h2 className="heading heading--xl">{mix1Build.what.title}</h2>
        <p className="mix1-build__body">{mix1Build.what.body}</p>
      </section>

      <section className="mix1-build__section">
        <p className="mix1-build__kicker">{mix1Build.spec.kicker}</p>
        <h2 className="heading heading--xl">{mix1Build.spec.title}</h2>
        <p className="mix1-build__body">{mix1Build.spec.body}</p>
      </section>

      <section className="mix1-build__section">
        <p className="mix1-build__kicker">{mix1Build.keep.kicker}</p>
        <h2 className="heading heading--xl">{mix1Build.keep.title}</h2>
        <div className="mix1-build__specimens">
          <a className="mix1-pxbtn" href={`mailto:${EMAIL}`}>
            Pixel button
          </a>
          <span className="mix1-pxbtn mix1-pxbtn--chip">[01]</span>
          <img className="mix1-build__swatch" src="/images/portfolio/mock-poised.png" alt="" />
        </div>
        <ul className="mix1-build__list">
          {mix1Build.keep.items.map((item) => (
            <li key={item.name}>
              <h3 className="heading heading--md">{item.name}</h3>
              <p>{item.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mix1-build__section">
        <p className="mix1-build__kicker">{mix1Build.isolation.kicker}</p>
        <h2 className="heading heading--xl">{mix1Build.isolation.title}</h2>
        <ul className="mix1-build__rows">
          {mix1Build.isolation.rows.map((row) => (
            <li key={row.k}>
              <span className="mix1-build__key">{row.k}</span>
              <span>{row.v}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mix1-build__section">
        <p className="mix1-build__kicker">{mix1Build.sequence.kicker}</p>
        <h2 className="heading heading--xl">{mix1Build.sequence.title}</h2>
        <ol className="mix1-build__steps">
          {mix1Build.sequence.steps.map((step, index) => (
            <li key={step}>
              <span className="mix1-build__key">[{String(index + 1).padStart(2, '0')}]</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mix1-build__section">
        <p className="mix1-build__kicker">{mix1Build.broke.kicker}</p>
        <h2 className="heading heading--xl">{mix1Build.broke.title}</h2>
        <ul className="mix1-build__pairs">
          {mix1Build.broke.items.map((item) => (
            <li key={item.challenge}>
              <p>
                <span className="mix1-build__key">Broke</span>
                {item.challenge}
              </p>
              <p>
                <span className="mix1-build__key">Fix</span>
                {item.solution}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mix1-build__section">
        <p className="mix1-build__kicker">{mix1Build.tradeoffs.kicker}</p>
        <h2 className="heading heading--xl">{mix1Build.tradeoffs.title}</h2>
        <ul className="mix1-build__rows">
          {mix1Build.tradeoffs.rows.map((row) => (
            <li key={row.k}>
              <span className="mix1-build__key">{row.k}</span>
              <span>{row.v}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mix1-build__section">
        <p className="mix1-build__kicker">{mix1Build.steal.kicker}</p>
        <h2 className="heading heading--xl">{mix1Build.steal.title}</h2>
        <ol className="mix1-build__steps">
          {mix1Build.steal.items.map((item, index) => (
            <li key={item}>
              <span className="mix1-build__key">[{String(index + 1).padStart(2, '0')}]</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
        <Link className="mix1-pxbtn" to={mix1Build.steal.href}>
          {mix1Build.steal.cta}
        </Link>
      </section>

      <Mix1Contact />
    </div>
  );
}

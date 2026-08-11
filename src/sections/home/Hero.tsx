import { hero } from '../../content/home';
import { MonoText } from '../../components/primitives';

export function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero-backdrop" style={{ backgroundImage: `url(${hero.backdrop})` }} aria-hidden />
      <div className="hero-cells" aria-hidden>
        {hero.cells.map((src, i) => (
          <img key={src} src={src} alt="" className="hero-cell" style={{ animationDelay: `${i * 90}ms` }} />
        ))}
      </div>
      <div className="hero-veil" aria-hidden />

      <div className="hero-body">
        <div className="hero-topline">
          <MonoText>{hero.label}</MonoText>
          <MonoText>{hero.count}</MonoText>
        </div>
        <h1 className="title title--xl hero-title">
          {hero.title.split(' ').map((word) => (
            <span key={word} className="hero-line">
              <span>{word}</span>
            </span>
          ))}
        </h1>
        <p className="hero-desc">{hero.desc}</p>
        <div className="hero-foot">
          <MonoText tone="red">{hero.hint}</MonoText>
          <MonoText>EST. 2018 — UNITED STATES</MonoText>
        </div>
      </div>
    </section>
  );
}

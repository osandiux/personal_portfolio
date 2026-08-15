import { useMemo, useState } from 'react';
import { studioWork } from '../content';
import { FigureStripes } from '../home/FigureStripes';
import { SplitTextShuffle } from '../home/SplitTextShuffle';
import { TextFractured } from '../home/TextFractured';

function DwIcon({ src }: { src: string }) {
  return (
    <span
      className="dw-icon"
      role="img"
      style={{
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
      }}
    />
  );
}

export function WorkPage() {
  const [concept, setConcept] = useState<'services' | 'sectors' | null>(null);
  const [service, setService] = useState('all');
  const [sector, setSector] = useState('all');

  const options = concept === 'sectors' ? studioWork.sectors : studioWork.services;
  const selected = concept === 'sectors' ? sector : service;
  const filtered = useMemo(
    () =>
      studioWork.items.filter((item) => {
        if (service !== 'all' && item.service !== service) return false;
        if (sector !== 'all' && item.sector !== sector) return false;
        return true;
      }),
    [service, sector],
  );

  const counts = useMemo(() => {
    const source = concept === 'sectors' ? 'sector' : 'service';
    const map = new Map<string, number>();
    studioWork.items.forEach((item) => {
      const key = item[source];
      map.set(key, (map.get(key) ?? 0) + 1);
    });
    return map;
  }, [concept]);

  return (
    <div className="page page-work">
      <div className="work-feature">
        <header className="hero-work">
          <div className="hero-work__content">
            <h1 className="heading heading--hg sr-only">{studioWork.title}</h1>
            <TextFractured text={studioWork.title} />
            <p className="hero-work__intro">
              <SplitTextShuffle text={studioWork.intro} lines={studioWork.introLines} />
            </p>
          </div>
          <div className="hero-work__video">
            <div className="video-player video-player--rounded video-player--playing">
              <div className="video-player__video">
                <video src="/studio/reel/wkhs-reel.webm" autoPlay loop muted playsInline />
              </div>
              <div className="video-player__controls">
                <div className="video-player__caption">WKHS Reel</div>
              </div>
            </div>
          </div>
          <div className="hero-work__filter">
            <nav className={`filter-projects${concept ? ' filter-projects--opened' : ''}`}>
              <div className="filter-projects__inner">
                <div className="filter-projects__concepts">
                  <button
                    type="button"
                    className={`filter-projects__concept${service !== 'all' ? ' filter-projects__concept--active' : ''}`}
                    onClick={() => setConcept((open) => (open === 'services' ? null : 'services'))}
                  >
                    <DwIcon src="/studio/svg/chevron-up-down.svg" />
                    <span className="filter-projects__concept-text">Services</span>
                  </button>
                  <button
                    type="button"
                    className={`filter-projects__concept${sector !== 'all' ? ' filter-projects__concept--active' : ''}`}
                    onClick={() => setConcept((open) => (open === 'sectors' ? null : 'sectors'))}
                  >
                    <DwIcon src="/studio/svg/chevron-up-down.svg" />
                    <span className="filter-projects__concept-text">Sectors</span>
                  </button>
                </div>
                {concept ? (
                  <div className="filter-projects__options">
                    {options.flatMap((option, index) => [
                      index > 0 ? <span key={`sep-${option.id}`} className="filter-projects__option-separator" /> : null,
                      <button
                        key={option.id}
                        type="button"
                        className={`filter-projects__option${selected === option.id ? ' filter-projects__option--active' : ''}`}
                        onClick={() => {
                          if (concept === 'sectors') setSector(option.id);
                          else setService(option.id);
                        }}
                      >
                        <span>{option.label}</span>
                        <small>{option.id === 'all' ? studioWork.items.length : (counts.get(option.id) ?? 0)}</small>
                      </button>,
                    ])}
                  </div>
                ) : null}
              </div>
            </nav>
          </div>
        </header>

        <div className={`list-article list-article--mode-default${service !== 'all' || sector !== 'all' ? ' list-article--filtered' : ''}`}>
          {filtered.map((item, index) => (
            <article
              key={item.name}
              className={`article ${index % 2 === 0 ? 'article--header-dist-row' : 'article--header-dist-column'}`}
            >
              <FigureStripes src={item.image} alt={item.name} className="article__figure" />
              <header>
                <h2 className="heading heading--md article__heading">{item.name}</h2>
                <p className="article__description">{item.desc}</p>
              </header>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

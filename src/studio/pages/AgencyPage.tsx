import { useEffect, useRef, useState } from 'react';
import { studioAgency } from '../content';
import { Picture } from '../Picture';
import { SplitTextShuffle } from '../home/SplitTextShuffle';
import { TextFractured } from '../home/TextFractured';

export function AgencyPage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const width = track.clientWidth || 1;
      setActive(Math.round(track.scrollLeft / width));
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="page page-agency">
      <header className="hero-agency">
        <div className="hero-agency__inner">
          <div className="hero-agency__start">
            <div className="hero-agency__heading">
              <h1 className="heading heading--hg sr-only">{studioAgency.title}</h1>
              <TextFractured text={studioAgency.title} />
            </div>
            <p className="hero-agency__intro">
              <SplitTextShuffle text={studioAgency.intro} lines={studioAgency.introLines} />
            </p>
          </div>
        </div>
      </header>

      <section className="team">
        <div className="team__inner">
          <header className="team__header">
            <h2 className="heading heading--xl">Team</h2>
          </header>
          <p className="team__intro">{studioAgency.teamIntro}</p>
          <div className="team__description">
            <p>{studioAgency.teamBody}</p>
          </div>
          <figure className="team__figure">
            <Picture src={studioAgency.portrait} alt="Studio team" className="picture--cover" />
          </figure>
          <div className="team__people">
            {studioAgency.team.map((person) => (
              <article key={person.name} className="team__member">
                <div className="team__member-info">
                  <div className="team__member-position">
                    <span>{person.role}</span>
                  </div>
                  <header>
                    <h3 className="heading heading--xl">{person.name}</h3>
                  </header>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="block block-grid-lists block--safe-area">
        <div className="block-grid-lists__inner">
          <figure className="block-grid-lists__figure">
            <Picture src={studioAgency.capabilitiesFigure} alt="" className="picture--cover" />
          </figure>
          <div className="block-grid-lists__lists">
            {studioAgency.capabilities.map((cap) => (
              <article key={cap.no} className="block-grid-lists__list">
                <span className="block-grid-lists__list-index">[{cap.no}]</span>
                <header className="block-grid-lists__list-header">
                  <h3 className="heading heading--base">{cap.name}</h3>
                </header>
                <ul className="block-grid-lists__list-ul">
                  {cap.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="vision">
        <div className="vision__inner">
          <nav className="vision__nav">
            <ul>
              {studioAgency.vision.map((slide, index) => (
                <li key={slide.name} className="vision__nav-item">
                  <button
                    type="button"
                    className={`vision__nav-button${index === active ? ' vision__nav-button--active' : ''}`}
                    onClick={() => {
                      const target = trackRef.current?.children[index] as HTMLElement | undefined;
                      target?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
                    }}
                  >
                    [{String(index + 1).padStart(2, '0')}]
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="vision-slider">
            <div className="vision-slider__track" ref={trackRef}>
              {studioAgency.vision.map((slide) => (
                <article key={slide.name} className="vision__slide">
                  <div className="vision__start">
                    <header className="vision__slide-header">
                      <h3 className="heading heading--xl">{slide.name}</h3>
                    </header>
                    <p className="vision__slide-description">{slide.copy}</p>
                  </div>
                  <div className="vision__end">
                    <figure>
                      <Picture src={slide.image} alt="" className="picture--cover" />
                    </figure>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="list-clients">
        <div className="list-clients__inner">
          <header className="list-clients__header">
            <h2 className="heading heading--xl">The wall of fame</h2>
          </header>
          <p className="list-clients__amount">+ Than {studioAgency.clients.length} clients</p>
          <ul className="list-clients__list">
            {studioAgency.clients.map((client) => (
              <li key={client}>
                <span>{client}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

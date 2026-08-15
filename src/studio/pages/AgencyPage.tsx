import { studioAgency } from '../content';
import { Picture } from '../Picture';

export function AgencyPage() {
  return (
    <div className="page page-agency">
      <header className="hero-agency">
        <div className="hero-agency__inner">
          <div className="hero-agency__start">
            <div className="hero-agency__heading">
              <h1 className="heading heading--hg">{studioAgency.title}</h1>
            </div>
            <p className="hero-agency__intro">{studioAgency.intro}</p>
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
            <Picture src={studioAgency.portrait} alt="Studio team" />
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
          {studioAgency.vision.map((slide) => (
            <article key={slide.name} className="vision__slide">
              <div className="vision__start">
                <h3 className="vision__slide-header heading heading--xl">{slide.name}</h3>
                <p className="vision__slide-description">{slide.copy}</p>
              </div>
            </article>
          ))}
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

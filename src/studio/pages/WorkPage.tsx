import { studioWork } from '../content';
import { Picture } from '../Picture';

export function WorkPage() {
  return (
    <div className="page page-work">
      <header className="hero-work">
        <div className="hero-work__content">
          <h1 className="heading heading--hg">{studioWork.title}</h1>
          <p className="hero-work__intro">{studioWork.intro}</p>
        </div>
        <div className="hero-work__filter">
          <div className="filter-projects">
            <div className="filter-projects__inner">
              <div className="filter-projects__concepts">
                <button type="button" className="filter-projects__concept">
                  <span className="filter-projects__concept-text">Services</span>
                </button>
                <button type="button" className="filter-projects__concept">
                  <span className="filter-projects__concept-text">Sectors</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="list-article list-article--mode-default">
        {studioWork.items.map((item) => (
          <article key={item.name} className="article article--header-dist-row">
            <figure className="article__figure">
              <Picture src={item.image} alt={item.name} />
            </figure>
            <header>
              <h2 className="article__heading">{item.name}</h2>
              <p className="article__description">{item.desc}</p>
            </header>
          </article>
        ))}
      </div>
    </div>
  );
}

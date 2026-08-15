import { studioServices } from '../content';
import { Picture } from '../Picture';

export function ServicesPage() {
  return (
    <div className="page page-services">
      <header className="hero-services">
        <div className="hero-services__start">
          <div className="hero-services__heading">
            <h1 className="heading heading--hg">{studioServices.title}</h1>
          </div>
          <div className="hero-services__description">
            <p>{studioServices.intro}</p>
          </div>
        </div>
        <div className="hero-services__end">
          <figure className="hero-services__figure">
            <Picture src={studioServices.figure} alt="" />
          </figure>
          <nav className="hero-services__anchors">
            <ul>
              {studioServices.offerings.map((offer) => (
                <li key={offer.no}>
                  <a className="link hero-services__anchor" href={`#service-${offer.no}`}>
                    <span className="link__prefix">[{offer.no}]</span>
                    <span>{offer.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      {studioServices.offerings.map((offer, index) => (
        <article
          key={offer.no}
          className={`article-service article-service--wrapper${index === studioServices.offerings.length - 1 ? ' article-service--border-bottom' : ''}`}
        >
          <span className="article-service__anchor" id={`service-${offer.no}`} />
          <div className="article-service__inner">
            <div className="article-service__index">[{offer.no}]</div>
            <header className="article-service__header">
              <h2 className="heading heading--xl">{offer.name}</h2>
            </header>
            <div className="article-service__description">
              <p>{offer.copy}</p>
            </div>
            <div className="article-service__solutions">
              <ul>
                {offer.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

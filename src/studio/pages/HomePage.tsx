import { Link } from 'react-router-dom';
import { studioCulture, studioHome } from '../content';
import { Picture } from '../Picture';
import { HeadlineFractured } from '../home/HeadlineFractured';
import { HeroHome, HeroHomeMobile } from '../home/HeroHome';

export function HomePage() {
  return (
    <div className="page page-home">
      <h1 className="sr-only">Your agency based in Bilbao</h1>
      <HeroHome />
      <HeroHomeMobile />

      <div className="page-home__blocks">
        <div className="blocks">
          <section className="brand-values">
            <div className="brand-values__inner">
              <div className="brand-values__featured">
                <h2 className="featured featured--xl">{studioHome.featured}</h2>
              </div>
              <div className="brand-values__messages">
                <div>
                  Design and code
                  <br />
                  with concept
                </div>
                <div>
                  Digital by
                  <br />
                  nature
                </div>
              </div>
              <div className="brand-values__description">
                <p>{studioHome.description}</p>
              </div>
              <div className="brand-values__cta">
                <Link className="button button--icon" to="/studio/agency">
                  <span className="button__inner">
                    <span className="button__text">{studioHome.discoverAgency}</span>
                    <span className="button__icon">
                      <img src="/studio/svg/enter.svg" alt="" />
                    </span>
                  </span>
                </Link>
              </div>
              <div className="brand-values__media">
                <div className="media">
                  <Picture src={studioHome.media} alt="" className="picture--cover" />
                </div>
              </div>
              <div className="brand-values__headline-fractured">
                <HeadlineFractured desktop={studioHome.fractured} mobile={studioHome.fracturedMobile} />
              </div>
            </div>
          </section>

          <section className="home-services">
            <div className="home-services__inner">
              <div className="home-services__intro">
                <h2 className="featured featured--base">{studioHome.servicesIntro}</h2>
              </div>
              <div className="home-services__messages-image">
                <div>
                  Design and code
                  <br />
                  with concept
                </div>
                <div>
                  Digital by
                  <br />
                  nature
                </div>
                <Picture src={studioHome.agencyImage} alt="" className="picture--cover" />
              </div>
              <div className="home-services__list">
                {studioHome.services.map((service) => (
                  <Link key={service.no} to={service.href}>
                    <article className="home-services__service">
                      <span className="home-services__service-index">
                        <span>[{service.no}]</span>
                      </span>
                      <header>
                        <h3 className="home-services__service-name">
                          <span>{service.before}</span>
                          <span className="home-services__service-space-pre-image">&nbsp;</span>
                          <Picture src={service.image} alt="" className="picture--cover" />
                          <span className="home-services__service-space-post-image">&nbsp;</span>
                          <span>{service.after}</span>
                        </h3>
                      </header>
                    </article>
                  </Link>
                ))}
              </div>
              <div className="home-services__list-mobile">
                {studioHome.services.map((service) => (
                  <Link key={service.no} to={service.href}>
                    <article className="home-services__service-mobile">
                      <span className="home-services__service-mobile-index">
                        <span>[{service.no}]</span>
                      </span>
                      <header className="home-services__service-mobile-header">
                        <h3 className="heading heading--xl home-services__service-mobile-heading">
                          {`${service.before} ${service.after}`.trim()}
                        </h3>
                      </header>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="home-projects">
            <div className="home-projects__inner">
              <div className="list-article list-article--mode-default">
                {studioHome.projects.map((item) => (
                  <Link key={item.name} to="/studio/work" className="article article--header-dist-row">
                    <article>
                      <figure className="article__figure">
                        <Picture src={item.image} alt={item.name} />
                      </figure>
                      <header>
                        <h2 className="article__heading">{item.name}</h2>
                        <p className="article__description">{item.desc}</p>
                      </header>
                    </article>
                  </Link>
                ))}
              </div>
              <div className="home-projects__more">
                <Link className="link link--hover-underline" to="/studio/work">
                  <span className="link__inner">
                    <span className="link__text">{studioHome.seeAll}</span>
                  </span>
                  <small>(23)</small>
                </Link>
              </div>
            </div>
          </section>

          <section className="home-posts">
            <div className="home-posts__inner">
              <header className="home-posts__header">
                <h2 className="heading heading--xl">{studioHome.cultureTitle}</h2>
                <p>{studioHome.cultureIntro}</p>
                <div className="home-posts__header-more">
                  <Link className="link link--hover-underline link--underline" to="/studio/culture">
                    <span className="link__inner">
                      <span className="link__text">{studioHome.cultureMore}</span>
                    </span>
                  </Link>
                </div>
              </header>
              <div className="home-posts__list">
                <section className="list-table">
                  <div className="list-table__inner">
                    {studioCulture.notes.slice(0, 5).map((note) => (
                      <Link key={note.title} to="/studio/culture">
                        <article className={`list-table__item${note.featured ? ' list-table__item--featured' : ''}`}>
                          <div className="list-table__item-start">
                            <span className="list-table__item-start-default">{note.date}</span>
                            <span className="list-table__item-start-hover">[+]</span>
                          </div>
                          <figure className="list-table__item-figure">
                            <Picture src={note.image} alt="" />
                          </figure>
                          <h2 className="list-table__item-title">{note.title}</h2>
                          <div className="list-table__item-end">[{note.read}]</div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </section>
              </div>
              <div className="home-posts__more-mobile">
                <Link className="button" to="/studio/culture">
                  <span className="button__inner">
                    <span className="button__text">{studioHome.cultureMore}</span>
                  </span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>

      <aside className="contact-banner">
        <div className="contact-banner__inner">
          <p className="contact-banner__text">{studioHome.contact}</p>
          <p className="contact-banner__cta-contact">
            <a className="link link--hover-underline" href="#wkhs-footer">
              <span className="link__inner">
                <span className="link__text">{studioHome.shallWeTalk}</span>
              </span>
            </a>
          </p>
          <p className="contact-banner__cta-projects">
            <Link className="link link--hover-underline" to="/studio/work">
              <span className="link__inner">
                <span className="link__text">{studioHome.moreProjects}</span>
              </span>
            </Link>
          </p>
        </div>
      </aside>
    </div>
  );
}

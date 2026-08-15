import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { studioHome, studioServices, studioWork } from '../content';
import { FigureStripes } from '../home/FigureStripes';
import { HeadlineFractured } from '../home/HeadlineFractured';
import { SplitTextShuffle } from '../home/SplitTextShuffle';
import { TextFractured } from '../home/TextFractured';
import { Picture } from '../Picture';

const workByName = Object.fromEntries(studioWork.items.map((item) => [item.name, item]));

function ServiceProjects({ names }: { names: readonly string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const items = names.map((name) => workByName[name]).filter(Boolean);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const slides = [...track.children] as HTMLElement[];
      const next = slides.findIndex((slide) => slide.offsetLeft + slide.offsetWidth / 2 > track.scrollLeft);
      setActive(Math.max(0, next));
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="article-service__projects">
      <nav className="article-service__projects-pagination">
        <ul>
          {items.map((item, index) => (
            <li key={item.name}>
              <button
                type="button"
                className={`button button--clear article-service__projects-pagination-button${index === active ? ' article-service__projects-pagination-button--active' : ''}`}
                onClick={() => {
                  const slide = trackRef.current?.children[index] as HTMLElement | undefined;
                  slide?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
                }}
              >
                <span className="button__inner">
                  <span className="button__text">{String(index + 1).padStart(2, '0')}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="article-service__projects-track" ref={trackRef}>
        {items.map((item) => (
          <Link key={item.name} className="article-service__projects-slide" to="/studio/work">
            <FigureStripes src={item.image} alt={item.name} />
            <figcaption>{item.name}</figcaption>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ServicesPage() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div className="page page-services">
      <header className="hero-services">
        <div className="hero-services__start">
          <div className="hero-services__heading">
            <h1 className="heading heading--hg sr-only">{studioServices.title}</h1>
            <TextFractured text={studioServices.title} />
          </div>
          <div className="hero-services__description">
            <p>
              <SplitTextShuffle text={studioServices.intro} lines={studioServices.introLines} />
            </p>
          </div>
        </div>
        <div className="hero-services__end">
          <figure className="hero-services__figure">
            <Picture src={studioServices.figure} alt="" className="picture--cover" />
          </figure>
          <nav className={`hero-services__anchors${hover ? ' hero-services__anchors--hover' : ''}`}>
            <ul>
              {studioServices.offerings.map((offer) => (
                <li key={offer.no}>
                  <a
                    className={`link link--hover-underline hero-services__anchor${hover === offer.slug ? ' hero-services__anchor--hover' : ''}`}
                    href={`#anchor-${offer.slug}`}
                    onMouseEnter={() => setHover(offer.slug)}
                    onMouseLeave={() => setHover(null)}
                  >
                    <div className="link__inner">
                      <span className="link__prefix">[{offer.no}]</span>
                      <span className="link__text">{offer.name}</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hero-services__headline-fractured">
            <HeadlineFractured desktop={studioServices.fractured} mobile={studioServices.fractured} />
          </div>
        </div>
      </header>

      {studioServices.offerings.map((offer, index) => (
        <article
          key={offer.no}
          className={`article-service article-service--wrapper article-service--index-${index + 1}${index === studioServices.offerings.length - 1 ? ' article-service--border-bottom' : ''}`}
        >
          <span className="article-service__anchor" id={`anchor-${offer.slug}`} />
          <div className="article-service__inner">
            <div className="article-service__index">[{offer.no}]</div>
            <header className="article-service__header">
              <h2 className="heading heading--xl article-service__heading">{offer.name}</h2>
            </header>
            <div className="article-service__subheading">
              <p>{offer.subtitle}</p>
            </div>
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
            <div className="article-service__link">
              <Link className="button button--icon" to="/studio/work">
                <span className="button__inner">
                  <span className="button__text">View more</span>
                  <span className="button__icon">
                    <img src="/studio/svg/enter.svg" alt="" />
                  </span>
                </span>
              </Link>
            </div>
            <ServiceProjects names={offer.projects} />
          </div>
        </article>
      ))}

      <aside className="contact-banner contact-banner--border">
        <div className="contact-banner__inner">
          <p className="contact-banner__text">{studioHome.contact}</p>
          <p className="contact-banner__cta-contact">
            <a className="link link--hover-underline" href="#wkhs-footer">
              <span className="link__inner">
                <span className="link__text">{studioHome.shallWeTalk}</span>
              </span>
            </a>
          </p>
        </div>
      </aside>
    </div>
  );
}

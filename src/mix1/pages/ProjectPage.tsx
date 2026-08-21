import { useEffect, useRef } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { mix1Projects } from '../content';
import { Mix1Contact } from '../Contact';
import { Picture } from '../../studio/Picture';
import { FigureStripes } from '../../studio/home/FigureStripes';

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = mix1Projects.find((p) => p.slug === slug);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        document.documentElement.classList.toggle('mix1-hero-visible', entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '0px 0px -100% 0px' }
    );
    observer.observe(hero);
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('mix1-hero-visible');
    };
  }, []);

  if (!project) return <Navigate to="/mix1/work" replace />;

  return (
    <article className="page page-project mix1-project">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="hero-project"
        style={{ '--color-project': '#0f0f0f', '--site-color': '#ffffff' } as React.CSSProperties}
      >
        <div className="hero-project__inner">
          <h1 className="heading heading--xl hero-project__title">{project.name}</h1>
          <div className="hero-project__client">
            <p className="hero-project__client-heading">Client</p>
            <p className="hero-project__client-value">{project.client}</p>
          </div>
          <div className="hero-project__figure">
            <div className="hero-project__sector-year">
              <span>{project.sector}</span>
              <span>/ {project.year}</span>
            </div>
            <FigureStripes src={project.image} alt={project.name} />
          </div>
          <div className="hero-project__services-readtime">
            <div className="hero-project__services">
              <ul>
                <li>{project.service}</li>
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
            <div className="hero-project__readtime">
              <p>{project.readTime} min</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Blocks ───────────────────────────────────────── */}
      <div className="blocks blocks--ctx-project">
        {/* Featured rich blocks interleaved with image blocks */}
        {project.featuredSections.map((section, i) => (
          <div key={i}>
            {/* Block Featured Rich */}
            <div className="block block--safe-area block--bg-light block-featured-rich block-featured-rich--ctx-project">
              <div className="block-featured-rich__inner">
                <div className="block-featured-rich__featured">
                  <p>{section.lead}</p>
                </div>
                <div className="block-featured-rich__rich-content">
                  <div className="rich-content">
                    <h2>{section.richTitle}</h2>
                    {section.body.map((para, pi) => (
                      <p key={pi}>{para}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Block Media — image grid */}
            <div className="block block-media block--bg-light block--safe-area block-media--cols-2 block-media--ctx-project block-media--expansion-wrapper">
              {section.images.map((src, ii) => (
                <div key={ii} className="media block-media__item">
                  <Picture src={src} alt="" className="picture--cover picture--rounded" />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Block Motion Demos — reference clips illustrating the motion principles behind the work */}
        {project.motionDemos.length > 0 && (
          <div className="block block--safe-area block--bg-light block-motion-demos">
            <div className="block-motion-demos__inner">
              {project.motionDemos.map((demo, i) => (
                <div key={i} className="block-motion-demos__item">
                  <video
                    className="block-motion-demos__video"
                    src={demo.src}
                    data-media-block-exempt="true"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <p className="block-motion-demos__label">{demo.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Block Mockups — slider */}
        <div className="block block-mockups block--has-background block-mockups--unique">
          <div className="block-mockups__mockups">
            <div className="slider slider-mockups slider--spv-auto">
              <div className="swiper-wrapper">
                {project.mockups.map((src, i) => (
                  <div key={i} className="swiper-slide">
                    <div className="block-mockups__mockup">
                      <Picture src={src} alt="" className="picture--cover picture--rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Closing featured (no rich content) */}
        <div className="block block--safe-area block--bg-light block-featured-rich block-featured-rich--ctx-project">
          <div className="block-featured-rich__inner">
            <div className="block-featured-rich__featured">
              <p>{project.closingLead}</p>
            </div>
          </div>
        </div>

        {/* Block Stats */}
        {project.stats.length > 0 && (
          <div className="block block--safe-area block--bg-light block-stats">
            <div className="block-stats__inner">
              <div className="block-stats__stats">
                {project.stats.map((stat, i) => (
                  <div key={i} className="block-stats__stat">
                    <p className="block-stats__stat-name">{stat.name}</p>
                    <p className="block-stats__stat-description">{stat.description}</p>
                    <p className="block-stats__stat-value">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Credits ──────────────────────────────────────── */}
      <section className="comp-credits">
        <div className="comp-credits__inner">
          <header className="comp-credits__header">
            <h2 className="heading heading--md heading--dark heading--primary">Credits</h2>
          </header>
          <div className="comp-credits__start">
            {project.credits.map((c) => (
              <div key={c.role} className="comp-credits__group">
                <div className="comp-credits__group-title">{c.role}</div>
                <ul>
                  <li>{c.name}</li>
                </ul>
              </div>
            ))}
          </div>
          <div className="comp-credits__end">
            {project.clientCredits.map((c) => (
              <div key={c.role} className="comp-credits__group">
                <div className="comp-credits__group-title">{c.role}</div>
                <ul>
                  <li>{c.name}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Mix1Contact />
    </article>
  );
}

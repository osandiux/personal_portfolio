import { mix1Work } from '../content';
import { FigureStripes } from '../../studio/home/FigureStripes';
import { SplitTextShuffle } from '../../studio/home/SplitTextShuffle';
import { TextFractured } from '../../studio/home/TextFractured';

export function WorkPage() {
  return (
    <div className="page page-work">
      <div className="work-feature">
        <header className="hero-work">
          <div className="hero-work__content">
            <h1 className="heading heading--hg sr-only">{mix1Work.title}</h1>
            <TextFractured text={mix1Work.title} />
            <p className="hero-work__intro">
              <SplitTextShuffle text={mix1Work.intro} lines={[...mix1Work.introLines]} />
            </p>
          </div>
          <div className="hero-work__video">
            <div className="video-player video-player--rounded video-player--playing">
              <div className="video-player__video">
                <video src="/studio/reel/wkhs-reel.webm" autoPlay loop muted playsInline />
              </div>
              <div className="video-player__controls">
                <div className="video-player__caption">Reel</div>
              </div>
            </div>
          </div>
        </header>

        <div className="mix1-impact">
          {mix1Work.impact.map((stat) => (
            <div key={`${stat.org}-${stat.value}`} className="mix1-impact__item">
              <span className="mix1-impact__org">{stat.org}</span>
              <span className="mix1-impact__value">{stat.value}</span>
              <span className="mix1-impact__label">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="list-article list-article--mode-default">
          {mix1Work.items.map((item, index) => (
            <article
              key={item.name}
              className={`article ${index % 2 === 0 ? 'article--header-dist-row' : 'article--header-dist-column'}`}
            >
              <FigureStripes src={item.image} alt={item.name} className="article__figure" />
              <header>
                <h2 className="heading heading--md article__heading">{item.name}</h2>
                <p className="article__description">
                  <strong>{item.headline}. </strong>
                  {item.desc}
                </p>
              </header>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

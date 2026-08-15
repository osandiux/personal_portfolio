import { studioCulture } from '../content';
import { Picture } from '../Picture';
import { SplitTextShuffle } from '../home/SplitTextShuffle';

const GALLERY_SLOTS = [null, 0, 1, null, 2, 3, 4, null, 5, 6, null, 7] as const;

export function CulturePage() {
  return (
    <div className="page page-culture">
      <div className="page-culture__hero-sticky">
        <header className="hero-culture">
          <div className="hero-culture__inner">
            <h1 className="heading heading--md">{studioCulture.title}</h1>
            <div className="hero-culture__intro">
              <SplitTextShuffle text={studioCulture.intro} lines={studioCulture.introLines} />
            </div>
          </div>
        </header>

        <div className="gallery-grid">
          <div className="gallery-grid__inner">
            {GALLERY_SLOTS.map((slot, index) =>
              slot === null ? (
                <span key={`gap-${index}`} />
              ) : (
                <figure key={studioCulture.gallery[slot]}>
                  <Picture src={studioCulture.gallery[slot]} alt="" className="picture--cover" />
                </figure>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="list-table" id="notes">
        {studioCulture.notes.map((note) => (
          <a
            key={note.title}
            className={`list-table__item${note.featured ? ' list-table__item--featured' : ''}`}
            href="#notes"
          >
            <div className="list-table__item-start">
              <span className="list-table__item-start-default">{note.date}</span>
              <span className="list-table__item-start-hover">[+]</span>
            </div>
            <figure className="list-table__item-figure">
              <Picture src={note.image} alt="" />
            </figure>
            <h2 className="list-table__item-title">{note.title}</h2>
            <div className="list-table__item-end">[{note.read}]</div>
          </a>
        ))}
      </div>
    </div>
  );
}

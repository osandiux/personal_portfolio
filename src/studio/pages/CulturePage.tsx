import { studioCulture } from '../content';
import { Picture } from '../Picture';

export function CulturePage() {
  return (
    <div className="page page-culture">
      <div className="page-culture__hero-sticky">
        <header className="hero-culture">
          <div className="hero-culture__inner">
            <h1 className="heading heading--md">{studioCulture.title}</h1>
            <div className="hero-culture__intro">{studioCulture.intro}</div>
          </div>
        </header>
      </div>
      <div className="list-table">
        {studioCulture.notes.map((note) => (
          <article
            key={note.title}
            className={`list-table__item${note.featured ? ' list-table__item--featured' : ''}`}
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
          </article>
        ))}
      </div>
    </div>
  );
}

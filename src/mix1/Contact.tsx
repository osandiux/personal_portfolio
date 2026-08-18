import { DECK, EMAIL, LINKEDIN, mix1About } from './content';

export function Mix1Contact({ lead = false }: { lead?: boolean }) {
  return (
    <section className="mix1-contact">
      {lead ? (
        <>
          <p>{mix1About.seeking}</p>
          <p>{mix1About.contactLine}</p>
        </>
      ) : null}
      <a className="mix1-pxbtn" href={`mailto:${EMAIL}`}>
        Get in touch
      </a>
      <p>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        {' · '}
        <a href={LINKEDIN} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        {' · '}
        <a href={DECK} target="_blank" rel="noreferrer">
          Deck
        </a>
      </p>
      <p>Poised LLC © 2026</p>
    </section>
  );
}

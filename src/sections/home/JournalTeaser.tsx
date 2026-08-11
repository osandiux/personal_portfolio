import { journalTeaser } from '../../content/home';
import { Eyebrow, NoteCard, Title } from '../../components/primitives';
import { useInView } from '../../hooks/useInView';

/** Atmosphere only — notes intentionally do not link anywhere. */
export function JournalTeaser() {
  const ref = useInView<HTMLElement>();

  return (
    <section ref={ref} className="journal-teaser reveal" aria-label="Field notes">
      <Eyebrow>{journalTeaser.label}</Eyebrow>
      <Title as="h2" size="lg">
        {journalTeaser.title}
      </Title>
      <div>
        {journalTeaser.notes.map((note) => (
          <NoteCard key={note.title} date={note.date} title={note.title} tag={note.tag} />
        ))}
      </div>
    </section>
  );
}

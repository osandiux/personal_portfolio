import { useMemo, useState, type FormEvent } from 'react';
import career from './data/notes/career.json';
import education from './data/notes/education.json';
import goals from './data/notes/goals.json';
import quotes from './data/notes/quotes.json';
import random from './data/notes/random.json';
import sunday from './data/notes/sunday-suppers.json';
import desktopItems from './data/desktop.json';
import readme from './data/README.md?raw';
import { LAUNCHER, TRACKS } from './content';

type Note = {
  id: string;
  title: string;
  folder: string;
  company?: string;
  institution?: string;
  organization?: string;
  location?: string;
  period?: string;
  type?: string;
  description?: string;
  body?: string;
  dateString?: string;
  achievements?: string[];
  gpa?: string;
  honors?: string;
  resolutions?: string[];
  goals?: string[];
  aboutContent?: { intro?: string; scoringIntro?: string; footer?: string };
};

const NOTES = [...career, ...education, ...sunday, ...goals, ...quotes, ...random] as Note[];
const FOLDERS = ['Career', 'Education', 'Sunday Suppers', 'Goals', 'Quotes', 'Random'];

export function NotesApp() {
  const [folder, setFolder] = useState('Career');
  const [id, setId] = useState(NOTES[0]?.id ?? '');
  const items = NOTES.filter((note) => note.folder === folder);
  const active = NOTES.find((note) => note.id === id) ?? items[0];

  return (
    <div className="os1-split">
      <aside className="os1-side">
        {FOLDERS.map((name) => (
          <button
            key={name}
            type="button"
            className={`os1-enter${name === folder ? ' is-on' : ''}`}
            onClick={() => {
              setFolder(name);
              const next = NOTES.find((note) => note.folder === name);
              if (next) setId(next.id);
            }}
          >
            {name}
          </button>
        ))}
      </aside>
      <div className="os1-split os1-split--wide">
        <div className="os1-list os1-side">
          {items.map((note) => (
            <button key={note.id} type="button" className={`os1-enter${note.id === active?.id ? ' is-on' : ''}`} onClick={() => setId(note.id)}>
              {note.title}
            </button>
          ))}
        </div>
        <article className="os1-main">
          {active ? <NoteBody note={active} /> : null}
        </article>
      </div>
    </div>
  );
}

function NoteBody({ note }: { note: Note }) {
  return (
    <>
      <div className="os1-kicker">{note.folder}</div>
      <h3>{note.title}</h3>
      {note.company || note.institution || note.organization ? (
        <p>
          {[note.company || note.institution || note.organization, note.location, note.period, note.type]
            .filter(Boolean)
            .join(' · ')}
        </p>
      ) : null}
      {note.gpa ? (
        <p>
          GPA {note.gpa}
          {note.honors ? ` · ${note.honors}` : ''}
        </p>
      ) : null}
      {note.description ? <p>{note.description}</p> : null}
      {note.body ? <p style={{ whiteSpace: 'pre-wrap' }}>{note.body}</p> : null}
      {note.aboutContent?.intro ? <p>{note.aboutContent.intro}</p> : null}
      {note.achievements?.length ? (
        <ul>
          {note.achievements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {note.resolutions?.length ? (
        <ul>
          {note.resolutions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {note.goals?.length ? (
        <ul>
          {note.goals.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

export function FinderApp({ onOpenItem }: { onOpenItem: (id: string) => void }) {
  return (
    <div className="os1-split">
      <aside className="os1-side">
        <button type="button" className="is-on">
          Desktop
        </button>
        <button type="button">Documents</button>
        <button type="button">Downloads</button>
        <button type="button">Applications</button>
      </aside>
      <div className="os1-finder-grid">
        {desktopItems.map((item) => (
          <button key={item.id} type="button" className="os1-enter" onClick={() => onOpenItem(item.id)}>
            <img src={item.icon} alt="" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function PhotosApp({ onOpenItem }: { onOpenItem: (id: string) => void }) {
  return (
    <div className="os1-photos">
      {desktopItems
        .filter((item) => item.icon.endsWith('.jpg'))
        .map((item) => (
          <button key={item.id} type="button" onClick={() => onOpenItem(item.id)} aria-label={item.label}>
            <img src={item.icon} alt={item.label} />
          </button>
        ))}
    </div>
  );
}

export function MailApp() {
  const [sent, setSent] = useState(false);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };
  return (
    <form className="os1-mail" onSubmit={onSubmit}>
      <label>
        From
        <input name="from" type="email" placeholder="you@pond.com" required />
      </label>
      <label>
        Subject
        <input name="subject" placeholder="Hello from the pond" />
      </label>
      <label>
        Message
        <textarea name="body" placeholder="Say hi to the pond…" required />
      </label>
      <button type="submit">{sent ? 'Quack, sent!' : 'Send'}</button>
    </form>
  );
}

export function MusicApp() {
  const [current, setCurrent] = useState(0);
  return (
    <div className="os1-music">
      <div className="os1-music__art" aria-hidden />
      <div>
        <div className="os1-kicker">{TRACKS[current].album}</div>
        <h3>{TRACKS[current].title}</h3>
        <p>{TRACKS[current].artist}</p>
        <div className="os1-music__controls" aria-hidden>
          <img src="/os1/music/button_backward.png" alt="" />
          <img src="/os1/music/button_play.png" alt="" />
          <img src="/os1/music/button_forward.png" alt="" />
        </div>
        {TRACKS.map((track, index) => (
          <button
            key={track.title}
            type="button"
            className={`os1-track${index === current ? ' is-on' : ''}`}
            onClick={() => setCurrent(index)}
          >
            <span>{track.title}</span>
            <span>{track.artist}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function TerminalApp({ onOpen }: { onOpen: (id: string) => void }) {
  const [lines, setLines] = useState<string[]>(['gucduck os1 — type `help`']);
  const [value, setValue] = useState('');

  const run = (raw: string) => {
    const input = raw.trim();
    const [cmd, ...rest] = input.split(/\s+/);
    const arg = rest.join(' ');
    const next = [`gucduck@pond ~ % ${input}`];
    if (!cmd) {
      setLines((current) => [...current, ...next]);
      return;
    }
    if (cmd === 'help') next.push('help, whoami, ls, cat, open, about, clear, date');
    else if (cmd === 'whoami') next.push('chris / gucduck');
    else if (cmd === 'ls') next.push(desktopItems.map((item) => item.label).join('  '));
    else if (cmd === 'cat') next.push(arg.toLowerCase().includes('readme') ? readme : 'cat: file not found');
    else if (cmd === 'open') {
      const target = arg.toLowerCase();
      const app = ['finder', 'mail', 'notes', 'photos', 'music', 'terminal', 'apps', 'trash'].find((id) => id === target);
      if (app) onOpen(app);
      next.push(app ? `opening ${app}` : 'open: app not found');
    } else if (cmd === 'about') next.push('gucduck is a macOS desktop reimagined as Chris Gu’s portfolio.');
    else if (cmd === 'date') next.push(new Date().toString());
    else if (cmd === 'clear') {
      setLines([]);
      return;
    } else next.push(`command not found: ${cmd}`);
    setLines((current) => [...current, ...next]);
  };

  return (
    <div className="os1-term">
      {lines.map((line, index) => (
        <div key={`${line}-${index}`}>{line}</div>
      ))}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          run(value);
          setValue('');
        }}
      >
        <span>gucduck@pond ~ %</span>
        <input value={value} onChange={(event) => setValue(event.target.value)} autoFocus />
      </form>
    </div>
  );
}

export function AppsApp({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div className="os1-apps">
      {LAUNCHER.map((item) =>
        item.href ? (
          <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
            <img src={item.icon} alt="" />
            {item.label}
          </a>
        ) : (
          <button key={item.label} type="button" onClick={() => item.id && onOpen(item.id)}>
            <img src={item.icon} alt="" />
            {item.label}
          </button>
        ),
      )}
    </div>
  );
}

export function TrashApp() {
  return (
    <div className="os1-about">
      <p>The trash is empty. Even the breadcrumbs got eaten.</p>
    </div>
  );
}

export function AboutApp() {
  return (
    <div className="os1-about">
      <img src="/os1/logo.png" alt="" />
      <h3>gucduck</h3>
      <p>macOS 26.0.1 · Chris Gu</p>
      <p>A personal website that looks and feels like a Mac. Waddle around.</p>
      <p>© 2026 gucduck</p>
    </div>
  );
}

export function ReadmeApp() {
  return (
    <article className="os1-main" style={{ whiteSpace: 'pre-wrap' }}>
      {readme}
    </article>
  );
}

export function PreviewApp({ itemId }: { itemId: string }) {
  const item = desktopItems.find((entry) => entry.id === itemId);
  if (!item) return null;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <img className="os1-preview" src={item.icon} alt={item.label} />
      {item.description || item.link ? (
        <div className="os1-main">
          <h3>{item.label}</h3>
          {item.description ? <p>{item.description}</p> : null}
          {item.link ? (
            <p>
              <a href={item.link} target="_blank" rel="noreferrer">
                {item.linkText || 'Open link'}
              </a>
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function CivieApp() {
  return (
    <div className="os1-about">
      <img src="/os1/menu/app_civie.png" alt="" />
      <h3>Civie</h3>
      <p>Your say, every day.</p>
      <p>
        <a href="https://civie.org" target="_blank" rel="noreferrer">
          Open civie.org
        </a>
      </p>
    </div>
  );
}

export function useDesktopItems() {
  return useMemo(() => desktopItems, []);
}

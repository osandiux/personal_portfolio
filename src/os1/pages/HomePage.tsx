import { useEffect, useMemo, useRef, useState, type AnimationEvent } from 'react';
import { WindowFrame } from '../Window';
import {
  AboutApp,
  AppsApp,
  CivieApp,
  FinderApp,
  MailApp,
  MusicApp,
  NotesApp,
  PhotosApp,
  PreviewApp,
  ReadmeApp,
  TerminalApp,
  TrashApp,
  useDesktopItems,
} from '../apps';
import { DOCK, NOTIFICATIONS, type AppId } from '../content';
import '../styles/os1.css';

const TITLES: Record<string, string> = {
  finder: 'Finder',
  mail: 'Mail',
  notes: 'Notes',
  photos: 'Photos',
  music: 'Music',
  terminal: 'Terminal',
  civie: 'Civie',
  apps: 'Apps',
  trash: 'Trash',
  about: 'About This Mac',
  preview: 'Quick Look',
  readme: 'README.md',
};

const SIZES: Record<string, { width: number; height: number }> = {
  notes: { width: 860, height: 520 },
  mail: { width: 520, height: 420 },
  terminal: { width: 640, height: 400 },
  about: { width: 420, height: 320 },
  trash: { width: 380, height: 240 },
  civie: { width: 420, height: 300 },
  apps: { width: 520, height: 360 },
  music: { width: 640, height: 420 },
};

function formatLockClock(now: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).formatToParts(now);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? '';
  return {
    date: `${get('weekday')} ${get('month')} ${get('day')}`,
    time: `${get('hour')}:${get('minute')}`,
  };
}

function ControlIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden>
      <rect x="1" y="3" width="6" height="4" rx="1" fill="currentColor" opacity="0.9" />
      <rect x="9" y="9" width="6" height="4" rx="1" fill="currentColor" opacity="0.9" />
      <path d="M12 3v2M4 11v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden>
      <path
        d="M2.2 6.4c3.3-3.2 8.3-3.2 11.6 0M4.4 8.7c2.1-2 5.1-2 7.2 0M8 12.2l.01.01"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HomePage() {
  const items = useDesktopItems();
  const rootRef = useRef<HTMLDivElement>(null);
  const unlockedRef = useRef(false);
  const lockOutRef = useRef(false);
  const [now, setNow] = useState(() => new Date());
  const [locked, setLocked] = useState(true);
  const [lockOut, setLockOut] = useState(false);
  const [open, setOpen] = useState<string[]>([]);
  const [minimized, setMinimized] = useState<string[]>([]);
  const [maximized, setMaximized] = useState<string[]>([]);
  const [zOrder, setZOrder] = useState<string[]>([]);
  const [bounce, setBounce] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState('1');
  const [panel, setPanel] = useState<'notify' | 'control' | null>(null);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [dnd, setDnd] = useState(false);
  const [display, setDisplay] = useState(100);
  const [sound, setSound] = useState(80);
  const [finePointer] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const enter = () => {
    if (lockOutRef.current || unlockedRef.current) return;
    lockOutRef.current = true;
    setLockOut(true);
  };

  useEffect(() => {
    if (!locked) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      enter();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [locked]);

  useEffect(() => {
    if (!lockOut) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const id = window.setTimeout(() => {
      if (unlockedRef.current) return;
      unlockedRef.current = true;
      setLocked(false);
    }, reduced ? 0 : 500);
    return () => window.clearTimeout(id);
  }, [lockOut]);

  useEffect(() => {
    if (!panel || locked) return;
    const onDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('.os1-panel, .os1-menubar')) return;
      setPanel(null);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPanel(null);
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [panel, locked]);

  const clock = useMemo(() => formatLockClock(now), [now]);
  const barTime = now.toLocaleTimeString('en-US', { weekday: 'short', hour: 'numeric', minute: '2-digit' });
  const notes = dnd ? [] : NOTIFICATIONS.filter((note) => !dismissed.includes(note.id));
  const dim = ((100 - display) / 100) * 0.85;

  const onLockAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.animationName !== 'os1-lock-exit' || unlockedRef.current) return;
    unlockedRef.current = true;
    setLocked(false);
  };

  const focus = (id: string) => {
    setZOrder((current) => [...current.filter((item) => item !== id), id]);
    setMinimized((current) => current.filter((item) => item !== id));
  };

  const openApp = (id: string) => {
    setOpen((current) => {
      if (current.includes(id)) return current;
      setBounce(id);
      window.setTimeout(() => setBounce((active) => (active === id ? null : active)), 520);
      return [...current, id];
    });
    focus(id);
  };

  const openItem = (itemId: string) => {
    const item = items.find((entry) => entry.id === itemId);
    if (!item) return;
    if (item.documentPath) {
      openApp('readme');
      return;
    }
    if (item.link && !item.description) {
      window.open(item.link, '_blank', 'noopener,noreferrer');
      return;
    }
    setPreviewId(itemId);
    openApp('preview');
  };

  const closeApp = (id: string) => {
    setOpen((current) => current.filter((item) => item !== id));
    setMinimized((current) => current.filter((item) => item !== id));
    setMaximized((current) => current.filter((item) => item !== id));
    setZOrder((current) => current.filter((item) => item !== id));
  };

  return (
    <div className="os1-desktop" ref={rootRef}>
      <img className="os1-wallpaper" src="/os1/background.jpg" alt="" />
      <div className="os1-wallpaper-dim" />

      <div className={locked ? 'os1-stage is-locked' : 'os1-stage'}>
        <header className="os1-menubar">
          <button type="button" className="os1-menubar__brand" onClick={() => openApp('about')}>
            gucduck
          </button>
          <div className="os1-menubar__right">
            <span className="os1-menubar__weather">Seattle 68°</span>
            <span className="os1-menubar__wifi" aria-hidden>
              <WifiIcon />
            </span>
            <button
              type="button"
              className={panel === 'control' ? 'is-on' : ''}
              aria-label="Control Center"
              aria-expanded={panel === 'control'}
              onClick={() => setPanel(panel === 'control' ? null : 'control')}
            >
              <ControlIcon />
            </button>
            <button
              type="button"
              className={panel === 'notify' ? 'is-on' : ''}
              aria-label="Notification Center"
              aria-expanded={panel === 'notify'}
              onClick={() => setPanel(panel === 'notify' ? null : 'notify')}
            >
              {barTime}
            </button>
          </div>
        </header>

        {panel === 'notify' ? (
          <div className="os1-panel os1-panel--notify" id="notification-center-panel">
            <h2>Notification Center</h2>
            {notes.length === 0 ? (
              <div className="os1-note os1-note--empty">No Notifications</div>
            ) : (
              notes.map((note, index) => (
                <button
                  key={note.id}
                  type="button"
                  className="os1-note"
                  style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
                  aria-label={`Dismiss ${note.app} notification: ${note.title}`}
                  onClick={() => setDismissed((current) => [...current, note.id])}
                >
                  {note.image ? <img src={note.image} alt="" /> : <span className="os1-note__emoji">🦆</span>}
                  <div>
                    <small>
                      {note.app} · {note.time}
                    </small>
                    <strong>{note.title}</strong>
                    <p>{note.body}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        ) : null}

        {panel === 'control' ? (
          <div className="os1-panel os1-panel--control">
            <div className="os1-control-stack">
              <button type="button" className="os1-row" aria-pressed={wifi} onClick={() => setWifi((value) => !value)}>
                <span className={`os1-orb${wifi ? ' is-on' : ''}`}>
                  <WifiIcon />
                </span>
                <span>
                  <strong>Wi‑Fi</strong>
                  <small>{wifi ? 'gucduck' : 'Off'}</small>
                </span>
              </button>
              <button type="button" className="os1-row" aria-pressed={bluetooth} onClick={() => setBluetooth((value) => !value)}>
                <span className={`os1-orb${bluetooth ? ' is-on' : ''}`}>B</span>
                <span>
                  <strong>Bluetooth</strong>
                  <small>{bluetooth ? 'On' : 'Off'}</small>
                </span>
              </button>
            </div>
            <div className="os1-control-grid">
              <div className="os1-tile is-disabled">
                <span className="os1-orb">✋</span>
                <strong>Hand Gestures</strong>
                <small>Off</small>
              </div>
              <button type="button" className="os1-tile" aria-pressed={dnd} onClick={() => setDnd((value) => !value)}>
                <span className={`os1-orb${dnd ? ' is-on' : ''}`}>☽</span>
                <strong>Do Not Disturb</strong>
                <small>{dnd ? 'On' : 'Off'}</small>
              </button>
            </div>
            <label className="os1-slider">
              Display
              <input type="range" min={15} max={100} value={display} onChange={(event) => setDisplay(Number(event.target.value))} />
            </label>
            <label className="os1-slider">
              Sound
              <input type="range" min={0} max={100} value={sound} onChange={(event) => setSound(Number(event.target.value))} />
            </label>
          </div>
        ) : null}

        <div className={`os1-icons${lockOut || !locked ? ' is-live' : ''}`}>
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className="os1-icon"
              style={{ animationDelay: `${index * 40}ms` }}
              onClick={() => openItem(item.id)}
            >
              <img className="os1-icon__img" src={item.icon} alt="" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {open
          .filter((id) => !minimized.includes(id))
          .map((id) => (
            <WindowFrame
              key={id}
              title={id === 'preview' ? items.find((item) => item.id === previewId)?.label || 'Quick Look' : TITLES[id] || id}
                zIndex={12 + zOrder.indexOf(id)}
              maximized={maximized.includes(id)}
              offset={(zOrder.indexOf(id) % 6) * 18}
              width={SIZES[id]?.width}
              height={SIZES[id]?.height}
              onFocus={() => focus(id)}
              onClose={() => closeApp(id)}
              onMinimize={() => setMinimized((current) => [...current, id])}
              onMaximize={() =>
                setMaximized((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
              }
            >
              {id === 'finder' ? <FinderApp onOpenItem={openItem} /> : null}
              {id === 'mail' ? <MailApp /> : null}
              {id === 'notes' ? <NotesApp /> : null}
              {id === 'photos' ? <PhotosApp onOpenItem={openItem} /> : null}
              {id === 'music' ? <MusicApp /> : null}
              {id === 'terminal' ? <TerminalApp onOpen={(app) => openApp(app as AppId)} /> : null}
              {id === 'civie' ? <CivieApp /> : null}
              {id === 'apps' ? <AppsApp onOpen={(app) => openApp(app as AppId)} /> : null}
              {id === 'trash' ? <TrashApp /> : null}
              {id === 'about' ? <AboutApp /> : null}
              {id === 'readme' ? <ReadmeApp /> : null}
              {id === 'preview' ? <PreviewApp itemId={previewId} /> : null}
            </WindowFrame>
          ))}

        <nav className="os1-dock" aria-label="Dock">
          {DOCK.map((item) => (
            <span key={item.label} className="contents">
              <button
                type="button"
                className={`os1-dock__item${bounce === item.id ? ' is-bounce' : ''}`}
                aria-label={item.label}
                onClick={() => openApp(item.id as AppId)}
              >
                <img src={item.icon} alt="" />
                {open.includes(item.id) ? <span className="os1-dock__dot" /> : null}
                <span className="os1-dock__tip">{item.label}</span>
              </button>
              {item.splitAfter ? <span className="os1-dock__split" /> : null}
            </span>
          ))}
        </nav>
      </div>

      {dim > 0 ? <div className="os1-brightness" style={{ opacity: dim }} aria-hidden /> : null}

      {locked ? (
        <div
          className={`os1-lock${lockOut ? ' is-out' : ''}`}
          role="button"
          tabIndex={0}
          aria-label="Enter the site"
          onClick={enter}
          onAnimationEnd={onLockAnimationEnd}
        >
          <img className="os1-lock__wall" src="/os1/background.jpg" alt="" />
          <div className="os1-lock__shade" />
          <div className="os1-lock__clock">
            <span className="os1-lock__date">{clock.date}</span>
            <span className="os1-lock__time">{clock.time}</span>
          </div>
          <div className="os1-lock__user">
            <div className="os1-lock__avatar">
              <img src="/os1/avatar.png" alt="gucduck" />
            </div>
            <span className="os1-lock__name">gucduck</span>
            <span className="os1-lock__hint">{finePointer ? 'Click to Enter' : 'Tap to Enter'}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { site } from '../../content/site';

export function FullscreenMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div className={`menu-overlay${open ? ' is-open' : ''}`} aria-hidden={!open}>
      <div className="menu-top">
        <span className="header-wordmark">{site.name}</span>
        <button type="button" className="menu-button" style={{ display: 'inline-flex' }} onClick={onClose}>
          Close
        </button>
      </div>

      <nav className="menu-links" aria-label="Menu">
        {site.nav.map((item, i) => (
          <Link
            key={item.to}
            to={item.to}
            className="menu-link"
            style={{ ['--i' as string]: i }}
            onClick={onClose}
            tabIndex={open ? 0 : -1}
          >
            <span className="menu-no">{item.no}</span>
            <span className="menu-name">{item.name}</span>
            <span className="menu-desc">{item.desc}</span>
          </Link>
        ))}
      </nav>

      <div className="menu-foot">
        <span className="mono">{site.bookingLong}</span>
        <a className="mono mono--bright" href={`mailto:${site.email}`} tabIndex={open ? 0 : -1}>
          {site.email}
        </a>
      </div>
    </div>
  );
}

import { useEffect, useLayoutEffect, useState, type ReactNode } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { EMAIL } from './content';
import './styles/obs.css';

const TITLE = 'Obys Agency';
const FAVICON = '/obs/favicon.svg';

function setFavicon(href: string) {
  const existing = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (existing) {
    const previous = existing.getAttribute('href');
    existing.href = href;
    existing.type = 'image/svg+xml';
    return () => {
      if (previous) existing.href = previous;
      else existing.remove();
    };
  }
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/svg+xml';
  link.href = href;
  document.head.appendChild(link);
  return () => link.remove();
}

function Wordmark() {
  return (
    <svg viewBox="0 0 251 68" fill="none" aria-hidden>
      <path d="M31.558 60.3923C45.7403 60.3923 53.7237 49.9668 53.7237 34C53.7237 18.9724 45.7403 7.60774 31.558 7.60774C17.4696 7.60774 9.39226 18.9724 9.39226 34C9.39226 49.9668 17.4696 60.3923 31.558 60.3923ZM63.116 34C63.116 56.0718 49.0276 68 31.558 68C14.0884 68 0 56.0718 0 34C0 12.0221 14.0884 9.53674e-06 31.558 9.53674e-06C49.0276 9.53674e-06 63.116 12.0221 63.116 34Z" fill="currentColor" />
      <path d="M96.0506 29.0133C99.4318 29.0133 108.073 29.1072 108.073 19.2454C108.073 11.5437 104.222 8.81996 96.0506 8.81996H77.6417V29.0133H96.0506ZM111.642 47.8918C111.642 39.8144 107.321 36.715 99.8075 36.715H77.6417V59.1625H99.8075C107.321 59.1625 111.642 55.3116 111.642 47.8918ZM120.752 47.1404C120.752 61.6984 109.669 66.6763 99.9953 66.8641H99.3379H68.5312V1.1183H77.6417H98.5865C103.377 1.1183 117.183 4.21775 117.183 17.6487C117.183 25.2564 112.487 29.6708 106.852 32.3006C111.83 32.9581 120.752 36.5271 120.752 47.1404Z" fill="currentColor" />
      <path d="M175.067 1.1183L150.084 40.0962V66.8641H140.973V40.0962L116.084 1.1183H125.476L145.388 32.3006H145.764L165.675 1.1183H175.067Z" fill="currentColor" />
      <path d="M200.53 29.116C214.054 31.7459 226.452 31.7459 226.452 49.5912C226.452 63.3978 213.96 68 200.999 68C175.358 68 173.762 50.8122 174.043 45.2707H182.684C182.684 48.0884 184.375 60.2983 200.342 60.2983C212.927 60.2983 217.436 55.7901 217.436 49.3094C217.436 41.4199 211.237 39.6354 198.651 37.3812C186.723 35.3149 175.452 34 175.734 18.4088C175.922 8.82873 181.557 9.53674e-06 198.933 9.53674e-06C220.723 9.53674e-06 224.104 11.7403 223.916 19.7238H215.275C215.275 13.5249 210.016 8.07735 198.463 8.07735C189.071 8.07735 184.751 12.5856 184.751 18.7845C184.657 27.2376 197.054 28.5525 200.53 29.116Z" fill="currentColor" />
      <path d="M240.18 21.4401C234.542 21.4401 229.998 16.8909 229.998 11.2746C229.998 5.60209 234.542 1.02479 240.18 1.02479C245.818 1.02479 250.362 5.60209 250.362 11.2746C250.362 16.8909 245.818 21.4401 240.18 21.4401ZM240.18 19.8676C244.836 19.8676 248.595 15.8519 248.595 11.2746C248.595 6.61303 244.836 2.59736 240.18 2.59736C235.524 2.59736 231.765 6.61303 231.765 11.2746C231.765 15.8519 235.524 19.8676 240.18 19.8676Z" fill="currentColor" />
    </svg>
  );
}

function Mark() {
  return (
    <svg viewBox="0 0 400 400" fill="none" aria-hidden>
      <g className="obs-mark__l">
        <path d="M177.777 7.47266C81.2195 18.4935 6.21582 100.484 6.21582 199.992C6.21604 299.5 81.2197 381.489 177.777 392.51V400L44.4443 399.997L20.8887 375.997L0 355.553V44.4287L23.9844 20.8887L44.4287 0H177.777V7.47266Z" fill="currentColor" />
      </g>
      <g className="obs-mark__r">
        <path d="M355.556 0.00292969L379.111 24.0029L400 44.4473V355.57L376.016 379.111L355.571 400H222.223V392.508C318.774 381.481 393.771 299.495 393.771 199.992C393.771 100.489 318.774 18.5016 222.223 7.47461V0L355.556 0.00292969Z" fill="currentColor" />
      </g>
    </svg>
  );
}

function berlinZone(date: Date) {
  const name = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Berlin',
    timeZoneName: 'short',
  })
    .formatToParts(date)
    .find((part) => part.type === 'timeZoneName')?.value;
  if (name === 'GMT+2' || name === 'UTC+2') return 'CEST';
  if (name === 'GMT+1' || name === 'UTC+1') return 'CET';
  return name ?? 'CET';
}

function formatClock(date: Date) {
  const time = date.toLocaleTimeString('en-US', {
    timeZone: 'Europe/Berlin',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return `${berlinZone(date)} ${time}`;
}

function Clock() {
  const [now, setNow] = useState(() => formatClock(new Date()));
  useEffect(() => {
    const id = window.setInterval(() => setNow(formatClock(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="obs-header__reveal">{now}</span>;
}

export function ObsShell() {
  const { pathname } = useLocation();
  const [copied, setCopied] = useState(false);
  const page = pathname.includes('/about') ? 'about' : pathname.includes('/work/') ? 'work' : 'home';
  document.documentElement.dataset.obs = '';
  document.documentElement.dataset.obsPage = page;

  const copyEmail = () => {
    void navigator.clipboard?.writeText(EMAIL);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.obs = '';
    root.dataset.obsPage = page;
    const previousTitle = document.title;
    document.title = page === 'about' ? 'About - Obys Agency' : TITLE;
    const restoreIcon = setFavicon(FAVICON);
    return () => {
      delete root.dataset.obs;
      delete root.dataset.obsPage;
      document.title = previousTitle;
      restoreIcon();
    };
  }, [page]);

  return (
    <div className={`obs-root is-${page}${page !== 'home' ? ' is-booted' : ''}`}>
      <header className="obs-header">
        <NavLink to="/obs" className="obs-wordmark" aria-label="Obys">
          <Wordmark />
        </NavLink>
        <div className="obs-header__right">
          <nav className="obs-menu">
            <NavLink to="/obs" end className={({ isActive }) => (isActive || page === 'work' ? 'is-on' : '')}>
              <span className="obs-header__reveal">Work</span>
            </NavLink>
            <NavLink to="/obs/about" className={({ isActive }) => (isActive ? 'is-on' : '')}>
              <span className="obs-header__reveal">About</span>
            </NavLink>
          </nav>
          <div className="obs-time">
            <Clock />
          </div>
          <button type="button" className="obs-contact" onClick={copyEmail}>
            <span className="obs-header__reveal">{copied ? 'Copied' : 'Contact'}</span>
          </button>
        </div>
      </header>
      <div className={`obs-mark${page === 'about' ? ' is-spread' : ''}`} aria-hidden>
        <Mark />
      </div>
      <Outlet />
    </div>
  );
}

export function Ln({ children }: { children: ReactNode }) {
  return (
    <span className="obs-ln_">
      <span className="obs-ln">{children}</span>
    </span>
  );
}

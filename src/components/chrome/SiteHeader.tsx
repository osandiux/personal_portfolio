import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { site } from '../../content/site';
import { useLocalClock } from '../../hooks/useLocalClock';

export function SiteHeader({ onMenu }: { onMenu: () => void }) {
  const clock = useLocalClock();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <NavLink to="/" className="header-mark" aria-label="Poised — home">
        <span className="header-pulse" aria-hidden />
        <span className="header-wordmark">{site.name}</span>
      </NavLink>

      <nav className="header-nav" aria-label="Primary">
        {site.nav.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'nav-here' : '')} end>
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="header-tools">
        <span className="chip header-booking">{site.booking}</span>
        <span className="header-clock">{clock} LOCAL</span>
        <button type="button" className="menu-button" onClick={onMenu}>
          Menu
        </button>
      </div>
    </header>
  );
}

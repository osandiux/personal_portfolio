import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { studioNav } from './content';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/studio' || pathname === '/studio/';

  return (
    <>
      <header className={`wkhs-header${isHome ? '' : ' wkhs-header--show-brand'}${menuOpen ? ' wkhs-header--menu-open' : ''}`}>
        <div className="wkhs-header__start">
          <figure className="wkhs-header__logo">
            <Link to="/studio" aria-label="Access the home page">
              <img src="/studio/svg/logo.svg" alt="Workoholics" />
            </Link>
          </figure>
        </div>
        <div className="wkhs-header__between">
          <nav className="wkhs-header__nav wkhs-header__nav--main">
            <ul>
              {studioNav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `link link--hover-underline wkhs-header__nav-item${isActive ? ' link--underline wkhs-header__nav-item--current' : ''}`
                    }
                  >
                    <span className="link__inner">
                      <span className="link__text">{item.name}</span>
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
            <ul>
              <li>
                <a
                  className="link link--hover-underline wkhs-header__nav-item wkhs-header__nav-item--wip"
                  href="https://wip.workoholics.es"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="link__inner">
                    <span className="sr-only">Wip</span>
                    <img src="/studio/svg/wip.svg" alt="" />
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="wkhs-header__end">
          <nav className="wkhs-header__nav wkhs-header__nav--end">
            <ul>
              <li>
                <a className="wkhs-header__nav-item wkhs-header__nav-item--featured" href="#wkhs-footer">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <nav className="lang-selector lang-selector--desktop" aria-label="Language">
            <ul>
              <li>
                <span className="lang-selector__link">Es</span>
              </li>
              <li>
                <span className="lang-selector__link">Eu</span>
              </li>
              <li>
                <span className="lang-selector__link lang-selector__link--active">En</span>
              </li>
            </ul>
          </nav>
          <button type="button" className="wkhs-header__button-menu" onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>
      <div className={`wkhs-menu${menuOpen ? ' wkhs-menu--open' : ''}`}>
        <nav>
          <ul>
            {studioNav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className="link link--hover-underline" onClick={() => setMenuOpen(false)}>
                  <span className="link__inner">
                    <span className="link__text">{item.name}</span>
                  </span>
                </NavLink>
              </li>
            ))}
            <li>
              <a className="link link--hover-underline" href="#wkhs-footer" onClick={() => setMenuOpen(false)}>
                <span className="link__inner">
                  <span className="link__text">Contact</span>
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

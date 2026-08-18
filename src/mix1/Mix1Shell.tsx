import { useLayoutEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Mix1Nav } from './Nav';
import '../craft/styles/craft.css';
import '../craft/styles/home.css';
import '../studio/styles/wkhs.css';
import '../studio/styles/home.css';
import '../studio/styles/pages.css';
import './styles/mix1.css';

function mix1Page(pathname: string) {
  if (pathname.includes('/about')) return 'about';
  if (pathname.includes('/work')) return 'work';
  return 'home';
}

function setFavicon(href: string) {
  const existing = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (existing) {
    const previous = existing.getAttribute('href');
    existing.href = href;
    return () => {
      if (previous) existing.href = previous;
      else existing.remove();
    };
  }
  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = href;
  document.head.appendChild(link);
  return () => link.remove();
}

export function Mix1Shell() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const page = mix1Page(pathname);

  document.documentElement.dataset.mix1 = '';
  document.documentElement.dataset.mix1Page = page;
  if (page === 'home') {
    document.documentElement.dataset.craft = '';
    document.documentElement.dataset.craftPage = 'home';
    delete document.documentElement.dataset.wkhs;
    delete document.documentElement.dataset.wkhsPage;
  } else {
    document.documentElement.dataset.wkhs = '';
    document.documentElement.dataset.wkhsPage = page;
    delete document.documentElement.dataset.craft;
    delete document.documentElement.dataset.craftPage;
  }

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.mix1 = '';
    root.dataset.mix1Page = page;
    delete root.dataset.craft;
    delete root.dataset.wkhs;
    delete root.dataset.wkhsPage;
    delete root.dataset.craftPage;
    if (page === 'home') {
      root.dataset.craft = '';
      root.dataset.craftPage = 'home';
    } else {
      root.dataset.wkhs = '';
      root.dataset.wkhsPage = page;
      root.classList.add('fonts-loaded');
    }
    const previousTitle = document.title;
    document.title =
      page === 'about'
        ? 'About — Osandi Robinson'
        : page === 'work'
          ? 'Experiences — Osandi Robinson'
          : 'Osandi — Poised Design Executive';
    const restoreIcon = setFavicon('/craft/favicon.svg');
    return () => {
      delete root.dataset.mix1;
      delete root.dataset.mix1Page;
      delete root.dataset.craft;
      delete root.dataset.craftPage;
      delete root.dataset.wkhs;
      delete root.dataset.wkhsPage;
      document.title = previousTitle;
      restoreIcon();
    };
  }, [page]);

  useLayoutEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element).closest('a');
      if (!anchor || !anchor.getAttribute('href')) return;
      if (anchor.target && anchor.target !== '_self') return;
      const url = new URL(anchor.href, window.location.origin);
      if (url.origin !== window.location.origin) return;
      if (!url.pathname.startsWith('/mix1')) return;
      event.preventDefault();
      navigate(`${url.pathname}${url.search}${url.hash}`);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [navigate]);

  return (
    <div className={`mix1-root is-${page}`}>
      <Mix1Nav />
      {page === 'home' ? (
        <div className="craft-root">
          <Outlet />
        </div>
      ) : (
        <div className="wkhs-root">
          <main>
            <Outlet />
          </main>
        </div>
      )}
    </div>
  );
}

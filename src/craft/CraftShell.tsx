import { useLayoutEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './styles/craft.css';

const FAVICON = '/craft/favicon.svg';

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

export function CraftShell() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const page = pathname.includes('/bcp') ? 'bcp' : 'home';

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.craft = '';
    root.dataset.craftPage = page;
    const previousTitle = document.title;
    document.title = page === 'bcp' ? 'The Brand Context Protocol · wild' : 'Craft, engineered · wild';
    const restoreIcon = setFavicon(FAVICON);
    return () => {
      delete root.dataset.craft;
      delete root.dataset.craftPage;
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
      if (!url.pathname.startsWith('/craft')) return;
      event.preventDefault();
      navigate(`${url.pathname}${url.search}${url.hash}`);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [navigate]);

  return (
    <div className="craft-root">
      <Outlet />
    </div>
  );
}

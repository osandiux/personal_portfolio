import { useLayoutEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './gsap';
import './styles/sap.css';

const FAVICON = '/1sap/favicon.svg';
const TITLE = 'Gregory Muryn-Mukha — Founding Product Designer';

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

export function SapShell() {
  const navigate = useNavigate();
  document.documentElement.dataset.sap = '';

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.sap = '';
    const previousTitle = document.title;
    document.title = TITLE;
    const restoreIcon = setFavicon(FAVICON);
    return () => {
      delete root.dataset.sap;
      document.title = previousTitle;
      restoreIcon();
    };
  }, []);

  useLayoutEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element).closest('a');
      if (!anchor || !anchor.getAttribute('href')) return;
      if (anchor.target && anchor.target !== '_self') return;
      const url = new URL(anchor.href, window.location.origin);
      if (url.origin !== window.location.origin) return;
      if (!url.pathname.startsWith('/1sap')) return;
      if (url.hash && url.pathname === window.location.pathname) return;
      event.preventDefault();
      navigate(`${url.pathname}${url.search}${url.hash}`);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [navigate]);

  return (
    <div className="sap-root">
      <Outlet />
    </div>
  );
}

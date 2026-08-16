import { useLayoutEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './styles/os1.css';

const FAVICON = '/os1/logo.png';
const TITLE = 'gucduck by Chris Gu';

function setFavicon(href: string) {
  const existing = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (existing) {
    const previous = existing.getAttribute('href');
    existing.href = href;
    existing.type = 'image/png';
    return () => {
      if (previous) existing.href = previous;
      else existing.remove();
    };
  }
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/png';
  link.href = href;
  document.head.appendChild(link);
  return () => link.remove();
}

export function Os1Shell() {
  document.documentElement.dataset.os1 = '';

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.os1 = '';
    const previousTitle = document.title;
    document.title = TITLE;
    const restoreIcon = setFavicon(FAVICON);
    return () => {
      delete root.dataset.os1;
      document.title = previousTitle;
      restoreIcon();
    };
  }, []);

  return (
    <div className="os1-root">
      <Outlet />
    </div>
  );
}

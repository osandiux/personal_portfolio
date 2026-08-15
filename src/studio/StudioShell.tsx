import { useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import './styles/wkhs.css';
import './styles/home.css';
import './styles/pages.css';

function studioPage(pathname: string) {
  if (pathname === '/studio' || pathname === '/studio/') return 'home';
  const part = pathname.replace(/^\/studio\/?/, '').split('/')[0];
  return part || 'home';
}

export function StudioShell() {
  const { pathname } = useLocation();
  const page = studioPage(pathname);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.wkhs = '';
    root.dataset.wkhsPage = page;
    root.classList.add('fonts-loaded');
    const previousTitle = document.title;
    document.title = page === 'home' ? 'Digital Agency in Bilbao | Workoholics' : 'Workoholics';

    const existingIcon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    const previousIcon = existingIcon?.getAttribute('href');
    if (existingIcon) existingIcon.remove();

    const sentinel = document.querySelector('.wkhs-footer__intersection-ref');
    const observer = sentinel
      ? new IntersectionObserver(
          ([entry]) => {
            document.body.classList.toggle('footer-intersected', entry.isIntersecting);
          },
          { threshold: 0 },
        )
      : null;
    if (sentinel && observer) observer.observe(sentinel);

    return () => {
      observer?.disconnect();
      document.body.classList.remove('footer-intersected');
      delete root.dataset.wkhs;
      delete root.dataset.wkhsPage;
      document.title = previousTitle;
      if (previousIcon) {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = previousIcon;
        document.head.appendChild(link);
      }
    };
  }, [page]);

  return (
    <div className="wkhs-root">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

import { useLayoutEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import './styles/wkhs.css';

export function StudioShell() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.wkhs = '';
    root.classList.add('fonts-loaded');
    const previousTitle = document.title;
    document.title = 'Workoholics';
    return () => {
      delete root.dataset.wkhs;
      document.title = previousTitle;
    };
  }, []);

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

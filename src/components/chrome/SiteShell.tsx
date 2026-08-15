import { useLayoutEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SiteHeader } from './SiteHeader';
import { FullscreenMenu } from './FullscreenMenu';
import { ScrollProgressRail } from './ScrollProgressRail';
import { FootCTA } from './FootCTA';
import { SiteFooter } from './SiteFooter';
import './chrome.css';

export function SiteShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <SiteHeader onMenu={() => setMenuOpen(true)} />
      <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>
        <Outlet />
      </main>
      <FootCTA />
      <SiteFooter />
      <ScrollProgressRail />
    </>
  );
}

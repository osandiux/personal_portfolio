import { useLayoutEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useLenis } from '../../hooks/useLenis';
import { usePageTransition } from '../../hooks/usePageTransition';
import { HomeSplash } from './HomeSplash';
import { PageCurtain } from './PageCurtain';
import { SiteHeader } from './SiteHeader';
import { FullscreenMenu } from './FullscreenMenu';
import { CustomCursor } from './CustomCursor';
import { ScrollProgressRail } from './ScrollProgressRail';
import { FootCTA } from './FootCTA';
import { SiteFooter } from './SiteFooter';
import './chrome.css';

export function SiteShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  useLenis();

  const curtainRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const { splashActive, handleSplashDone } = usePageTransition({ pathname, curtainRef, labelRef });

  useLayoutEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {splashActive && <HomeSplash onDone={handleSplashDone} />}
      <PageCurtain curtainRef={curtainRef} labelRef={labelRef} />
      <SiteHeader onMenu={() => setMenuOpen(true)} />
      <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>
        <Outlet />
      </main>
      <FootCTA />
      <SiteFooter />
      <ScrollProgressRail />
      <CustomCursor />
    </>
  );
}

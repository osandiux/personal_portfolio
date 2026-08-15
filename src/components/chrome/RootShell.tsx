import { Outlet, useLocation } from 'react-router-dom';
import { useLenis } from '../../hooks/useLenis';
import { usePageTransition } from '../../hooks/usePageTransition';
import { HomeSplash } from './HomeSplash';
import { CustomCursor } from './CustomCursor';
import './chrome.css';

export function RootShell() {
  const { pathname } = useLocation();
  useLenis();
  const { splashActive, handleSplashDone } = usePageTransition(pathname);

  return (
    <>
      {splashActive && <HomeSplash onDone={handleSplashDone} />}
      <Outlet />
      <CustomCursor />
    </>
  );
}

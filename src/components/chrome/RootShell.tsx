import { useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useLenis } from '../../hooks/useLenis';
import { usePageTransition } from '../../hooks/usePageTransition';
import { HomeSplash } from './HomeSplash';
import { PageCurtain } from './PageCurtain';
import { CustomCursor } from './CustomCursor';
import './chrome.css';

export function RootShell() {
  const { pathname } = useLocation();
  useLenis();

  const curtainRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const { splashActive, handleSplashDone } = usePageTransition({ pathname, curtainRef, labelRef });

  return (
    <>
      {splashActive && <HomeSplash onDone={handleSplashDone} />}
      <PageCurtain curtainRef={curtainRef} labelRef={labelRef} />
      <Outlet />
      <CustomCursor />
    </>
  );
}

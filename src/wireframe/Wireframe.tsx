import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import './wireframe.css';

const STORAGE_KEY = 'wireframe';

type WireframeValue = {
  on: boolean;
  toggle: () => void;
};

const WireframeContext = createContext<WireframeValue>({ on: false, toggle: () => undefined });

function readStored() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function pauseRasterVideo() {
  document.querySelectorAll<HTMLVideoElement>('video').forEach((video) => {
    video.pause();
  });
}

export function WireframeProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [on, setOn] = useState(readStored);

  const toggle = useCallback(() => {
    setOn((current) => {
      const next = !current;
      try {
        sessionStorage.setItem(STORAGE_KEY, next ? '1' : '0');
      } catch {
        /* private mode */
      }
      return next;
    });
  }, []);

  useLayoutEffect(() => {
    if (on) document.documentElement.dataset.wireframe = '';
    else delete document.documentElement.dataset.wireframe;
    if (on) {
      pauseRasterVideo();
      return;
    }
    if (document.documentElement.dataset.mediaBlocks !== undefined) return;
    document.querySelectorAll<HTMLVideoElement>('video[autoplay]').forEach((video) => {
      void video.play().catch(() => undefined);
    });
  }, [on, pathname]);

  useEffect(() => {
    if (!on) return;
    let frame = 0;
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(pauseRasterVideo);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [on, pathname]);

  const value = useMemo(() => ({ on, toggle }), [on, toggle]);

  return (
    <WireframeContext.Provider value={value}>
      {children}
      {pathname !== '/' ? <WireframeToggle compact /> : null}
    </WireframeContext.Provider>
  );
}

export function useWireframe() {
  return useContext(WireframeContext);
}

export function WireframeToggle({ compact = false }: { compact?: boolean }) {
  const { on, toggle } = useWireframe();

  return (
    <button
      type="button"
      className={`wireframe-toggle${compact ? ' wireframe-toggle--compact' : ''}${on ? ' is-on' : ''}`}
      role="switch"
      aria-checked={on}
      aria-label="Show sites as black and white wireframes"
      onClick={toggle}
    >
      <span className="wireframe-toggle__label">{compact ? (on ? 'WIR' : 'UI') : 'Wireframe'}</span>
      <span className="wireframe-toggle__track" aria-hidden="true">
        <span className="wireframe-toggle__thumb" />
      </span>
    </button>
  );
}

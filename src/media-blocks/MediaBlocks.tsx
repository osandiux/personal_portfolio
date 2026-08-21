import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import './media-blocks.css';

const STORAGE_KEY = 'media-blocks';
const MIX1_STORAGE_KEY = 'mix1-media-blocks';
const PALETTE = ['#ff3b3b', '#3b5bd9', '#f5c518', '#2a9d8f', '#e0492a', '#1c2541'];

type MediaBlocksValue = {
  on: boolean;
  toggle: () => void;
};

const MediaBlocksContext = createContext<MediaBlocksValue>({ on: false, toggle: () => undefined });

function readStored() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function readMix1Stored() {
  try {
    return sessionStorage.getItem(MIX1_STORAGE_KEY) !== '0';
  } catch {
    return true;
  }
}

function writeStored(key: string, on: boolean) {
  try {
    sessionStorage.setItem(key, on ? '1' : '0');
  } catch {
    /* private mode */
  }
}

function isMedia(el: Element): el is HTMLImageElement | HTMLVideoElement {
  // Content that must always show and play regardless of the block toggle —
  // e.g. instructional clips where the motion itself is the point, not a
  // decorative placeholder standing in for a photo.
  if (el.hasAttribute('data-media-block-exempt')) return false;
  if (el instanceof HTMLVideoElement) return true;
  if (!(el instanceof HTMLImageElement)) return false;
  const src = `${el.getAttribute('src') || ''} ${el.getAttribute('srcset') || ''} ${el.currentSrc || ''}`;
  return !src.includes('.svg') && !src.includes('image/svg');
}

function colorFor(src: string, fallbackIndex: number) {
  if (!src) return PALETTE[fallbackIndex % PALETTE.length];
  let hash = 0;
  for (let i = 0; i < src.length; i += 1) hash = (hash * 31 + src.charCodeAt(i)) | 0;
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

function paint(on: boolean) {
  const media = [...document.querySelectorAll('img, video')].filter(isMedia);
  media.forEach((el, index) => {
    const wrapper = el instanceof HTMLVideoElement ? el.closest<HTMLElement>('.video-player__video') : null;
    if (on) {
      const src = el instanceof HTMLVideoElement ? el.currentSrc || el.src : el.currentSrc || el.src;
      const color = colorFor(src, index);
      el.style.setProperty('--media-block', color);
      wrapper?.style.setProperty('--media-block', color);
      if (el instanceof HTMLVideoElement) el.pause();
    } else {
      el.style.removeProperty('--media-block');
      wrapper?.style.removeProperty('--media-block');
      if (el instanceof HTMLVideoElement && el.hasAttribute('autoplay')) {
        void el.play().catch(() => undefined);
      }
    }
  });
}

export function MediaBlocksProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const isMix1 = pathname.startsWith('/mix1');
  const [globalOn, setGlobalOn] = useState(readStored);
  const [mix1On, setMix1On] = useState(readMix1Stored);
  const on = isMix1 ? mix1On : globalOn;

  const toggle = useCallback(() => {
    if (isMix1) {
      setMix1On((current) => {
        const next = !current;
        writeStored(MIX1_STORAGE_KEY, next);
        return next;
      });
      return;
    }
    setGlobalOn((current) => {
      const next = !current;
      writeStored(STORAGE_KEY, next);
      return next;
    });
  }, [isMix1]);

  useLayoutEffect(() => {
    if (on) document.documentElement.dataset.mediaBlocks = '';
    else delete document.documentElement.dataset.mediaBlocks;
    paint(on);
  }, [on, pathname]);

  useEffect(() => {
    if (!on) return;
    let frame = 0;
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => paint(true));
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'srcset'] });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [on, pathname]);

  const value = useMemo(() => ({ on, toggle }), [on, toggle]);

  return (
    <MediaBlocksContext.Provider value={value}>
      {children}
      {pathname !== '/' ? <MediaBlocksToggle compact /> : null}
    </MediaBlocksContext.Provider>
  );
}

export function useMediaBlocks() {
  return useContext(MediaBlocksContext);
}

export function MediaBlocksToggle({ compact = false }: { compact?: boolean }) {
  const { on, toggle } = useMediaBlocks();

  return (
    <button
      type="button"
      className={`media-blocks-toggle${compact ? ' media-blocks-toggle--compact' : ''}${on ? ' is-on' : ''}`}
      role="switch"
      aria-checked={on}
      aria-label="Replace images and videos with color blocks"
      onClick={toggle}
    >
      <span className="media-blocks-toggle__label">{compact ? (on ? 'Block' : 'Image') : 'Blocks'}</span>
      <span className="media-blocks-toggle__track" aria-hidden="true">
        <span className="media-blocks-toggle__thumb" />
      </span>
    </button>
  );
}

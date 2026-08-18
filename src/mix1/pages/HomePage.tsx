import { useEffect } from 'react';
import { runCraftRuntime } from '../../craft/runtime';
import markup from '../markup/home.html?raw';
import homeRuntime from '../../craft/scripts/home.js?raw';
import '../../craft/styles/home.css';

const html = { __html: markup };
const COLOR_KEY = 'mix1-game-color';

function readColor() {
  try {
    return sessionStorage.getItem(COLOR_KEY) === '1';
  } catch {
    return false;
  }
}

function writeColor(on: boolean) {
  try {
    sessionStorage.setItem(COLOR_KEY, on ? '1' : '0');
  } catch {
    /* private mode */
  }
}

function applyColor(on: boolean) {
  const root = document.documentElement;
  if (on) root.dataset.mix1Color = '';
  else delete root.dataset.mix1Color;
  document.querySelectorAll('#pxctl [data-color]').forEach((btn) => {
    const selected = btn.getAttribute('data-color') === (on ? '1' : '0');
    btn.classList.toggle('on', selected);
    btn.setAttribute('aria-pressed', selected ? 'true' : 'false');
  });
}

export function HomePage() {
  useEffect(() => {
    const stop = runCraftRuntime(homeRuntime);
    applyColor(readColor());
    const pxctl = document.getElementById('pxctl');
    const onClick = (event: MouseEvent) => {
      const btn = (event.target as Element).closest('[data-color]');
      if (!btn || !pxctl?.contains(btn)) return;
      const on = btn.getAttribute('data-color') === '1';
      writeColor(on);
      applyColor(on);
    };
    pxctl?.addEventListener('click', onClick);
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();
    return () => {
      stop();
      pxctl?.removeEventListener('click', onClick);
      delete document.documentElement.dataset.mix1Color;
    };
  }, []);

  return <div dangerouslySetInnerHTML={html} />;
}

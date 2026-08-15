import { useLayoutEffect } from 'react';
import { runCraftRuntime } from '../runtime';
import markup from '../markup/home.html?raw';
import homeRuntime from '../scripts/home.js?raw';
import '../styles/home.css';

export function HomePage() {
  useLayoutEffect(() => {
    const stop = runCraftRuntime(homeRuntime);
    const id = window.location.hash.slice(1);
    if (id) {
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView();
      });
    }
    return stop;
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}

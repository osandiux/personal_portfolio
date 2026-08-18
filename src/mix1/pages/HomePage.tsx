import { useEffect } from 'react';
import { runCraftRuntime } from '../../craft/runtime';
import markup from '../markup/home.html?raw';
import homeRuntime from '../../craft/scripts/home.js?raw';
import '../../craft/styles/home.css';

const html = { __html: markup };

export function HomePage() {
  useEffect(() => {
    const stop = runCraftRuntime(homeRuntime);
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();
    return stop;
  }, []);

  return <div dangerouslySetInnerHTML={html} />;
}

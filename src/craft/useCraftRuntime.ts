import { useEffect } from 'react';
import { runCraftRuntime } from './runtime';

function waitForPageVisible(): Promise<void> {
  return new Promise((resolve) => {
    const fade = document.querySelector('.page-fade');
    if (!fade || fade.classList.contains('is-in')) {
      requestAnimationFrame(() => resolve());
      return;
    }

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      fade.removeEventListener('transitionend', onEnd);
      window.clearTimeout(timer);
      requestAnimationFrame(() => resolve());
    };
    const onEnd = (event: Event) => {
      const transition = event as TransitionEvent;
      if (transition.target !== fade) return;
      if (transition.propertyName && transition.propertyName !== 'opacity') return;
      finish();
    };

    fade.addEventListener('transitionend', onEnd);
    const timer = window.setTimeout(finish, 480);
  });
}

async function waitForSneak() {
  if (!document.fonts?.load) return;
  try {
    await Promise.all([
      document.fonts.load('300 16px Sneak'),
      document.fonts.load('400 16px Sneak'),
      document.fonts.load('500 16px Sneak'),
    ]);
  } catch {
    /* font load is best-effort */
  }
}

export function useCraftRuntime(code: string) {
  useEffect(() => {
    let live = true;
    let stop = () => {};

    void (async () => {
      await waitForPageVisible();
      await Promise.race([waitForSneak(), new Promise<void>((resolve) => window.setTimeout(resolve, 800))]);
      if (!live) return;
      stop = runCraftRuntime(code);
      const id = window.location.hash.slice(1);
      if (id) document.getElementById(id)?.scrollIntoView();
    })();

    return () => {
      live = false;
      stop();
    };
  }, [code]);
}

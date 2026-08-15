import { useEffect } from 'react';
import { runCraftRuntime } from '../craft/runtime';

function waitForPageVisible(): Promise<void> {
  return new Promise((resolve) => {
    const fade = document.querySelector('.page-fade');
    let done = false;
    let observer: MutationObserver | undefined;
    let timer = 0;

    const finish = () => {
      if (done) return;
      done = true;
      fade?.removeEventListener('transitionend', onEnd);
      observer?.disconnect();
      window.clearTimeout(timer);
      requestAnimationFrame(() => resolve());
    };
    const onEnd = (event: Event) => {
      const transition = event as TransitionEvent;
      if (fade && transition.target !== fade) return;
      if (transition.propertyName && transition.propertyName !== 'opacity') return;
      finish();
    };

    if (!fade || fade.classList.contains('is-in')) {
      requestAnimationFrame(() => resolve());
      return;
    }

    fade.addEventListener('transitionend', onEnd);
    observer = new MutationObserver(() => {
      if (fade.classList.contains('is-in')) finish();
    });
    observer.observe(fade, { attributes: true, attributeFilter: ['class'] });
    timer = window.setTimeout(finish, 480);
  });
}

async function waitForUCity() {
  if (!document.fonts?.load) return;
  try {
    await Promise.all([
      document.fonts.load('400 16px "UCity Pro"'),
      document.fonts.load('600 16px "UCity Pro"'),
      document.fonts.load('700 16px "UCity Pro"'),
    ]);
  } catch {
    /* font load is best-effort */
  }
}

export function useSapRuntime(code: string) {
  useEffect(() => {
    let live = true;
    let stop = () => {};

    void (async () => {
      await waitForPageVisible();
      await Promise.race([waitForUCity(), new Promise<void>((resolve) => window.setTimeout(resolve, 800))]);
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

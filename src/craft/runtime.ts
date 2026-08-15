type Listener = [
  EventTarget,
  string,
  EventListenerOrEventListenerObject,
  boolean | AddEventListenerOptions | undefined,
];

export function runCraftRuntime(code: string): () => void {
  let live = true;
  const origRAF = window.requestAnimationFrame.bind(window);
  const origCAF = window.cancelAnimationFrame.bind(window);
  const origST = window.setTimeout.bind(window);
  const origSI = window.setInterval.bind(window);
  const origCT = window.clearTimeout.bind(window);
  const origCI = window.clearInterval.bind(window);
  const origAdd = EventTarget.prototype.addEventListener;
  const origRemove = EventTarget.prototype.removeEventListener;
  const origWinAdd = window.addEventListener.bind(window);
  const OrigIO = window.IntersectionObserver;
  const OrigRO = window.ResizeObserver;

  const rafIds = new Set<number>();
  const timeouts = new Set<number>();
  const intervals = new Set<number>();
  const listeners: Listener[] = [];
  const observers: { disconnect: () => void }[] = [];

  EventTarget.prototype.addEventListener = function (type, fn, opts) {
    if (fn) listeners.push([this, type, fn, opts as boolean | AddEventListenerOptions | undefined]);
    return origAdd.call(this, type, fn, opts);
  };

  window.IntersectionObserver = class extends OrigIO {
    constructor(cb: IntersectionObserverCallback, opts?: IntersectionObserverInit) {
      super(cb, opts);
      observers.push(this);
    }
  };

  if (OrigRO) {
    window.ResizeObserver = class extends OrigRO {
      constructor(cb: ResizeObserverCallback) {
        super(cb);
        observers.push(this);
      }
    };
  }

  const requestAnimationFrame = ((cb: FrameRequestCallback) => {
    const id = origRAF((t) => {
      rafIds.delete(id);
      if (!live) return;
      cb(t);
    });
    rafIds.add(id);
    return id;
  }) as typeof window.requestAnimationFrame;

  const setTimeoutFn = ((handler: TimerHandler, timeout?: number, ...args: unknown[]) => {
    const id = origST(() => {
      timeouts.delete(id as unknown as number);
      if (!live) return;
      if (typeof handler === 'function') handler(...args);
    }, timeout);
    timeouts.add(id as unknown as number);
    return id;
  }) as typeof setTimeout;

  const setIntervalFn = ((handler: TimerHandler, timeout?: number, ...args: unknown[]) => {
    const id = origSI(() => {
      if (!live) return;
      if (typeof handler === 'function') handler(...args);
    }, timeout);
    intervals.add(id as unknown as number);
    return id;
  }) as typeof setInterval;

  const addEventListener = ((
    type: string,
    fn: EventListenerOrEventListenerObject,
    opts?: boolean | AddEventListenerOptions,
  ) => {
    listeners.push([window, type, fn, opts]);
    return origWinAdd(type, fn, opts);
  }) as typeof window.addEventListener;

  try {
    const run = new Function(
      'requestAnimationFrame',
      'cancelAnimationFrame',
      'setTimeout',
      'setInterval',
      'clearTimeout',
      'clearInterval',
      'addEventListener',
      code,
    );
    run(requestAnimationFrame, origCAF, setTimeoutFn, setIntervalFn, origCT, origCI, addEventListener);
  } finally {
    EventTarget.prototype.addEventListener = origAdd;
    window.IntersectionObserver = OrigIO;
    if (OrigRO) window.ResizeObserver = OrigRO;
  }

  return () => {
    live = false;
    rafIds.forEach(origCAF);
    timeouts.forEach(origCT);
    intervals.forEach(origCI);
    observers.forEach((observer) => observer.disconnect());
    listeners.forEach(([target, type, fn, opts]) => {
      try {
        origRemove.call(target, type, fn, opts);
      } catch {
        /* node already gone */
      }
    });
  };
}

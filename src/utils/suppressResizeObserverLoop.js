/**
 * Chrome may throw "ResizeObserver loop completed with undelivered notifications"
 * when a ResizeObserver callback triggers layout in the same frame (e.g. Swiper).
 * Harmless in production; CRA dev overlay treats it as fatal on client-side navigation.
 */
const RESIZE_OBSERVER_LOOP =
  /ResizeObserver loop (completed with undelivered notifications|limit exceeded)/;

const isResizeObserverLoop = (message) =>
  typeof message === 'string' && RESIZE_OBSERVER_LOOP.test(message);

const patchResizeObserver = () => {
  if (typeof window === 'undefined' || !window.ResizeObserver) return;

  const NativeResizeObserver = window.ResizeObserver;

  window.ResizeObserver = class PatchedResizeObserver extends NativeResizeObserver {
    constructor(callback) {
      super((entries, observer) => {
        window.requestAnimationFrame(() => callback(entries, observer));
      });
    }
  };
};

export const suppressResizeObserverLoop = () => {
  if (typeof window === 'undefined') return;

  patchResizeObserver();

  window.addEventListener(
    'error',
    (event) => {
      const message = event.message || event.error?.message || '';
      if (isResizeObserverLoop(message)) {
        event.stopImmediatePropagation();
        event.preventDefault();
      }
    },
    true,
  );

  const originalConsoleError = window.console.error;
  window.console.error = (...args) => {
    const first = args[0];
    const message = typeof first === 'string' ? first : first?.message;
    if (isResizeObserverLoop(message)) {
      return;
    }
    originalConsoleError.apply(window.console, args);
  };
};

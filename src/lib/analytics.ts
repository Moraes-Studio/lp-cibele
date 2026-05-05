export function trackEvent(
  eventName: string,
  payload?: Record<string, string | number | boolean>
) {
  if (typeof window === 'undefined') return;

  if (typeof (window as Window & { va?: (...args: unknown[]) => void }).va === 'function') {
    (window as Window & { va?: (...args: unknown[]) => void }).va?.('track', eventName, payload);
  }
}

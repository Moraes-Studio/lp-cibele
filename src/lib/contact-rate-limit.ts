const STORAGE_KEY = 'contact_last_sent';
const COOLDOWN_MS = 3 * 60 * 1000; // 3 minutes

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; remainingMs: number };

export function checkContactRateLimit(): RateLimitResult {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { allowed: true };

    const lastSent = parseInt(raw, 10);
    if (isNaN(lastSent)) return { allowed: true };

    const elapsed = Date.now() - lastSent;
    if (elapsed >= COOLDOWN_MS) return { allowed: true };

    return { allowed: false, remainingMs: COOLDOWN_MS - elapsed };
  } catch {
    // localStorage unavailable (SSR, private mode) — allow the action
    return { allowed: true };
  }
}

export function recordContactSent(): void {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    // Silently ignore if localStorage is unavailable
  }
}

export function formatCooldownMessage(remainingMs: number): string {
  const seconds = Math.ceil(remainingMs / 1000);
  if (seconds < 60) return `Aguarde ${seconds} segundos antes de enviar novamente.`;
  const minutes = Math.ceil(seconds / 60);
  return `Aguarde ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'} antes de enviar novamente.`;
}

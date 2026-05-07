import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const focusRingBase =
  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';

export function navActiveClasses(isActive: boolean) {
  return isActive
    ? 'bg-brand-sand text-brand-forest'
    : 'text-foreground hover:bg-brand-sand/60';
}

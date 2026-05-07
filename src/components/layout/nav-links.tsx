'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '@/config/navigation';
import { cn } from '@/lib/utils';

export function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-1">
      {navigation.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={cn(
              'rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
              pathname === item.href
                ? 'bg-brand-sand text-brand-forest'
                : 'text-foreground hover:bg-brand-sand/60'
            )}
            aria-current={pathname === item.href ? 'page' : undefined}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

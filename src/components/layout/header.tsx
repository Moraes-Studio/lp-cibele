'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PageContainer } from '@/components/shared/page-container';
import { MobileMenu } from '@/components/layout/mobile-menu';
import { navigation } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <PageContainer>
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-serif text-lg font-semibold text-brand-forest focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label={`${siteConfig.name} — página inicial`}
          >
            {siteConfig.name}
          </Link>

          <nav aria-label="Navegação principal" className="hidden md:block">
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
          </nav>

          <MobileMenu />
        </div>
      </PageContainer>
    </header>
  );
}

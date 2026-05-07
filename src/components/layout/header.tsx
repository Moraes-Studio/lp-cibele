import Link from 'next/link';
import { PageContainer } from '@/components/shared/page-container';
import { MobileMenu } from '@/components/layout/mobile-menu';
import { NavLinks } from '@/components/layout/nav-links';
import { siteConfig } from '@/config/site';
import { cn, focusRingBase } from '@/lib/utils';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-sand/40 bg-white/38 shadow-[0_1px_20px_rgba(47,74,63,0.05)] backdrop-blur-[16px]">
      <PageContainer>
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className={cn('font-serif text-lg font-semibold text-brand-forest', focusRingBase)}
            aria-label={`${siteConfig.name} — página inicial`}
          >
            {siteConfig.name}
          </Link>

          <nav aria-label="Navegação principal" className="hidden md:block">
            <NavLinks />
          </nav>

          <MobileMenu />
        </div>
      </PageContainer>
    </header>
  );
}

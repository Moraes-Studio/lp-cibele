import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { cn, focusRingBase } from '@/lib/utils';

interface SocialLinkProps {
  href: string | null;
  label: string;
  icon: IconType;
  iconClassName?: string;
  external?: boolean;
  children: ReactNode;
}

export function SocialLink({
  href,
  label,
  icon: Icon,
  iconClassName,
  external = false,
  children,
}: SocialLinkProps) {
  if (!href) return null;

  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        'flex w-fit items-center gap-2 rounded text-sm text-muted-foreground transition-colors hover:text-foreground',
        focusRingBase
      )}
    >
      <Icon className={cn('h-5 w-5 shrink-0', iconClassName)} aria-hidden="true" />
      <span>{children}</span>
    </a>
  );
}

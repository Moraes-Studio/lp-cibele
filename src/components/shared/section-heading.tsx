import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  level?: 1 | 2 | 3;
  accent?: boolean;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'left',
  level = 2,
  accent = false,
}: SectionHeadingProps) {
  const headingClass = 'text-3xl font-bold tracking-tight text-foreground md:text-4xl';

  const heading =
    level === 1 ? (
      <h1 id={id} className={headingClass}>{title}</h1>
    ) : level === 3 ? (
      <h3 id={id} className={headingClass}>{title}</h3>
    ) : (
      <h2 id={id} className={headingClass}>{title}</h2>
    );

  return (
    <div className={cn('space-y-4', align === 'center' ? 'text-center' : 'text-center md:text-left')}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-sage-strong">{eyebrow}</p>
      )}
      {heading}
      {accent && (
        <div
          className={cn(
            'h-0.5 w-16 rounded-full bg-brand-sage',
            align === 'center' ? 'mx-auto' : 'mx-auto md:mx-0'
          )}
          aria-hidden="true"
        />
      )}
      {description && (
        <p className="text-base leading-7 text-muted-foreground md:text-lg">{description}</p>
      )}
    </div>
  );
}

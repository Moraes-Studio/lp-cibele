import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  level?: 1 | 2 | 3;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'left',
  level = 2,
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
    <div className={cn('space-y-4', align === 'center' && 'text-center')}>
      {eyebrow && (
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">{eyebrow}</p>
      )}
      {heading}
      {description && (
        <p className="text-base leading-7 text-muted-foreground md:text-lg">{description}</p>
      )}
    </div>
  );
}

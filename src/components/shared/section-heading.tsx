import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={cn('space-y-4', align === 'center' && 'text-center')}>
      {eyebrow && (
        <p className="text-sm font-medium uppercase tracking-widest text-brand-sage">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-7 text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

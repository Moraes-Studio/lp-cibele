import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ServiceEditorialSectionProps {
  id: string;
  title: string;
  paragraphs: [string, string];
  imageSrc?: string;
  imageAlt?: string;
  imagePosition: 'left' | 'right';
  decorativeVariant?: 'rose' | 'sage';
  sectionBg?: 'white' | 'ivory';
  isFirst?: boolean;
}

function DecorativePanel({ variant }: { variant: 'rose' | 'sage' }) {
  if (variant === 'rose') {
    return (
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#c4857c] via-[#d49d96] to-[#e2b8b2]">
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-[#8b4a43]/25" />
        <div className="absolute -top-10 -left-10 h-64 w-64 rounded-full bg-white/25" />
        <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#7a9e82] via-[#96b39b] to-[#b2c9b5]">
      <div className="absolute -top-14 -left-14 h-80 w-80 rounded-full bg-white/20" />
      <div className="absolute bottom-6 right-6 h-60 w-60 rounded-full bg-white/30" />
      <div className="absolute right-1/3 top-1/3 h-44 w-44 rounded-full bg-[#4a7a52]/20" />
    </div>
  );
}

export function ServiceEditorialSection({
  id,
  title,
  paragraphs,
  imageSrc,
  imageAlt,
  imagePosition,
  decorativeVariant,
  sectionBg = 'white',
  isFirst = false,
}: ServiceEditorialSectionProps) {
  const imageOnLeft = imagePosition === 'left';

  return (
    <section
      aria-labelledby={`${id}-heading`}
      className={cn(
        'py-20 md:py-28 lg:py-32',
        sectionBg === 'ivory' ? 'bg-brand-ivory' : 'bg-white'
      )}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:items-center md:gap-14 lg:gap-24">

          {/* aside — foto ou painel decorativo; sempre primeiro no DOM → topo no mobile */}
          <aside
            className={cn(
              'w-full shrink-0 md:w-1/2',
              !imageOnLeft && 'md:order-2'
            )}
          >
            <div className="relative min-h-[300px] overflow-hidden rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.10)] sm:min-h-[420px] md:h-[540px]">
              {decorativeVariant && <DecorativePanel variant={decorativeVariant} />}
              {imageSrc && (
                <Image
                  src={imageSrc}
                  alt={imageAlt ?? title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={isFirst}
                />
              )}
            </div>
          </aside>

          {/* article — conteúdo textual */}
          <article
            className={cn(
              'w-full shrink-0 md:w-1/2',
              !imageOnLeft && 'md:order-1'
            )}
          >
            <div className="space-y-8">

              {/* linha decorativa */}
              <div className="h-px w-12 bg-brand-sage" aria-hidden="true" />

              {/* título */}
              <h2
                id={`${id}-heading`}
                className="font-serif text-3xl font-medium leading-snug tracking-tight text-brand-forest md:text-[2.25rem]"
              >
                {title}
              </h2>

              {/* parágrafos */}
              <div className="space-y-5">
                {paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className="text-base leading-[1.9] text-muted-foreground md:text-[1.0625rem]"
                  >
                    {para}
                  </p>
                ))}
              </div>

            </div>
          </article>

        </div>
      </div>
    </section>
  );
}

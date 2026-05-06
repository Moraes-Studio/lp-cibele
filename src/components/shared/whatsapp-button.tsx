import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

type WhatsAppButtonVariant = 'floating' | 'inline';

interface WhatsAppButtonProps {
  label?: string;
  variant?: WhatsAppButtonVariant;
  className?: string;
}

function buildWhatsAppUrl(phoneNumber: string): string | null {
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  if (!digitsOnly) return null;
  return `https://wa.me/${digitsOnly}`;
}

export function WhatsAppButton({
  label = 'Agendar pelo WhatsApp',
  variant = 'inline',
  className,
}: WhatsAppButtonProps) {
  const whatsappUrl = buildWhatsAppUrl(siteConfig.phone);

  if (!whatsappUrl) return null;

  if (variant === 'floating') {
    return (
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir WhatsApp"
        className={cn(
          'fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2',
          className
        )}
      >
        <MessageCircle className="h-7 w-7" aria-hidden="true" />
      </Link>
    );
  }

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-[#243B32] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        className
      )}
    >
      <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
      {label}
    </Link>
  );
}

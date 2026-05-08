import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { cn, focusRingBase } from '@/lib/utils';
import { siteConfig } from '@/config/site';

type WhatsAppButtonVariant = 'floating' | 'inline';

interface WhatsAppButtonProps {
  label?: string;
  variant?: WhatsAppButtonVariant;
  className?: string;
  message?: string;
}

export function buildWhatsAppUrl(phoneNumber: string, message?: string): string | null {
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  if (!digitsOnly) return null;
  const baseUrl = `https://wa.me/${digitsOnly}`;
  if (message) return `${baseUrl}?text=${encodeURIComponent(message)}`;
  return baseUrl;
}

export function WhatsAppButton({
  label = 'Agendar pelo WhatsApp',
  variant = 'inline',
  className,
  message,
}: WhatsAppButtonProps) {
  const whatsappUrl = buildWhatsAppUrl(siteConfig.phone, message);

  if (!whatsappUrl) return null;

  if (variant === 'floating') {
    return (
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Agendar pelo WhatsApp"
        className={cn(
          'fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--whatsapp-green)] text-white shadow-[0_4px_18px_rgba(31,64,52,0.22)] transition-all duration-300 hover:scale-105 hover:shadow-[0_6px_24px_rgba(31,64,52,0.30)] focus:ring-[var(--whatsapp-green)] sm:bottom-6 sm:right-6 sm:h-14 sm:w-14',
          focusRingBase,
          className
        )}
      >
        <FaWhatsapp className="h-5 w-5 sm:h-7 sm:w-7" aria-hidden="true" />
      </Link>
    );
  }

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-forest-soft',
        focusRingBase,
        className
      )}
    >
      <FaWhatsapp className="h-5 w-5 shrink-0" aria-hidden="true" />
      {label}
    </Link>
  );
}

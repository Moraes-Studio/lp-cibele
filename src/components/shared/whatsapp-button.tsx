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
          'fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#3a7d5d] text-white shadow-[0_4px_18px_rgba(47,74,63,0.22)] transition-all duration-300 hover:scale-105 hover:shadow-[0_6px_24px_rgba(47,74,63,0.30)] focus:ring-[#3a7d5d]',
          focusRingBase,
          className
        )}
      >
        <FaWhatsapp className="h-7 w-7" aria-hidden="true" />
      </Link>
    );
  }

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-sage',
        focusRingBase,
        className
      )}
    >
      <FaWhatsapp className="h-4 w-4 shrink-0" aria-hidden="true" />
      {label}
    </Link>
  );
}

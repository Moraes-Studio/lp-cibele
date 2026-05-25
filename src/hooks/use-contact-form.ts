'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { buildWhatsAppUrl } from '@/components/shared/whatsapp-button';
import { contactFormSchema, type ContactFormData } from '@/lib/validations';
import { sanitizeField } from '@/lib/sanitize';
import {
  checkContactRateLimit,
  recordContactSent,
  formatCooldownMessage,
} from '@/lib/contact-rate-limit';
import { siteConfig } from '@/config/site';

export type ContactSubmitState = 'idle' | 'sending' | 'success' | 'error' | 'blocked';

const WHATSAPP_OPEN_DELAY_MS = 600;
const FORM_RESET_DELAY_MS = 2500;

function buildWhatsAppMessage(data: ContactFormData): string {
  return (
    `Olá! Gostaria de agendar uma conversa.\n\n` +
    `*Nome:* ${data.name}\n` +
    `*E-mail:* ${data.email}\n` +
    `*Telefone:* ${data.phone}\n\n` +
    `*Mensagem:*\n${data.message}`
  );
}

export function useContactForm() {
  const [submitState, setSubmitState] = useState<ContactSubmitState>('idle');
  const [blockedMessage, setBlockedMessage] = useState('');

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      company: '',
    },
  });

  const isDisabled = form.formState.isSubmitting || submitState === 'success';

  async function onSubmit(data: ContactFormData) {
    if (data.company) return;

    const rateLimitResult = checkContactRateLimit();
    if (!rateLimitResult.allowed) {
      setBlockedMessage(formatCooldownMessage(rateLimitResult.remainingMs));
      setSubmitState('blocked');
      return;
    }

    setSubmitState('sending');

    const whatsAppMessage = buildWhatsAppMessage(data);
    const whatsAppUrl = buildWhatsAppUrl(siteConfig.phone, whatsAppMessage);

    if (!whatsAppUrl) {
      setSubmitState('error');
      return;
    }

    const fieldsToSanitize = [data.name, data.email, data.phone, data.message];
    const hasThreat = fieldsToSanitize.some((v) => !sanitizeField(v).ok);
    if (hasThreat) {
      setSubmitState('error');
      return;
    }

    recordContactSent();
    setSubmitState('success');

    await new Promise((resolve) => setTimeout(resolve, WHATSAPP_OPEN_DELAY_MS));
    window.open(whatsAppUrl, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setSubmitState('idle');
      form.reset();
    }, FORM_RESET_DELAY_MS);
  }

  return { form, onSubmit, submitState, blockedMessage, isDisabled };
}

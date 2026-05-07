'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/section-heading';
import { PageContainer } from '@/components/shared/page-container';
import { buildWhatsAppUrl } from '@/components/shared/whatsapp-button';
import { contactFormSchema, type ContactFormData } from '@/lib/validations';
import { sanitizeAll } from '@/lib/sanitize';
import {
  checkContactRateLimit,
  recordContactSent,
  formatCooldownMessage,
} from '@/lib/contact-rate-limit';
import { siteConfig } from '@/config/site';
import { cn, focusRingBase } from '@/lib/utils';

type SubmitState = 'idle' | 'sending' | 'success' | 'error' | 'blocked' | 'threat';

function buildWhatsAppMessage(data: ContactFormData): string {
  return (
    `Olá! Gostaria de agendar uma conversa.\n\n` +
    `*Nome:* ${data.name}\n` +
    `*E-mail:* ${data.email}\n` +
    `*Telefone:* ${data.phone}\n\n` +
    `*Mensagem:*\n${data.message}`
  );
}

const socialLinkClass = cn(
  'inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground',
  focusRingBase,
  'rounded'
);

export function ContactSection() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [blockedMessage, setBlockedMessage] = useState('');

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
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
    // Honeypot — silently do nothing if filled
    if (data.company) return;

    // Rate limit check
    const rateLimit = checkContactRateLimit();
    if (!rateLimit.allowed) {
      setBlockedMessage(formatCooldownMessage(rateLimit.remainingMs));
      setSubmitState('blocked');
      return;
    }

    setSubmitState('sending');

    // Sanitize all fields before building the WhatsApp URL
    const sanitized = sanitizeAll({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    });

    if (!sanitized.ok) {
      setSubmitState('threat');
      return;
    }

    const message = buildWhatsAppMessage({
      ...data,
      name: sanitized.values.name,
      email: sanitized.values.email,
      phone: sanitized.values.phone,
      message: sanitized.values.message,
    });

    const url = buildWhatsAppUrl(siteConfig.phone, message);

    if (!url) {
      setSubmitState('error');
      return;
    }

    recordContactSent();
    setSubmitState('success');

    // Small delay so the user sees the success state before WhatsApp opens
    await new Promise((r) => setTimeout(r, 600));
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <section id="contato" aria-labelledby="contato-heading" className="py-20">
      <PageContainer>
        <SectionHeading
          id="contato-heading"
          title="Entre em contato"
          description="Preencha o formulário e sua mensagem chegará diretamente no meu WhatsApp. Respondo assim que possível."
          align="center"
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Form */}
          <div className="rounded-2xl bg-card p-8 shadow-sm">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                noValidate
                className="space-y-5"
              >
                {/* Honeypot — invisible to real users, filled by bots */}
                <div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px]">
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Nome <span aria-hidden="true" className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Seu nome completo"
                          autoComplete="name"
                          disabled={isDisabled}
                          maxLength={100}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        E-mail <span aria-hidden="true" className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="seu@email.com"
                          autoComplete="email"
                          disabled={isDisabled}
                          maxLength={150}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        WhatsApp / Telefone <span aria-hidden="true" className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          placeholder="(11) 99999-9999"
                          autoComplete="tel"
                          disabled={isDisabled}
                          maxLength={20}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Mensagem <span aria-hidden="true" className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Conte um pouco sobre o que está buscando..."
                          rows={4}
                          disabled={isDisabled}
                          maxLength={1000}
                          className="resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Feedback messages */}
                {submitState === 'success' && (
                  <p role="status" className="text-sm font-medium text-[#3a7d5d]">
                    Sua mensagem foi preparada. O WhatsApp abrirá em instantes.
                  </p>
                )}
                {submitState === 'error' && (
                  <p role="alert" className="text-sm text-destructive">
                    Não foi possível abrir o WhatsApp. Tente novamente ou entre em contato diretamente.
                  </p>
                )}
                {submitState === 'blocked' && (
                  <p role="alert" className="text-sm text-destructive">
                    {blockedMessage}
                  </p>
                )}
                {submitState === 'threat' && (
                  <p role="alert" className="text-sm text-destructive">
                    Sua mensagem contém conteúdo inválido. Revise os campos e tente novamente.
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isDisabled}
                  className="w-full gap-2"
                >
                  <FaWhatsapp className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {form.formState.isSubmitting
                    ? 'Preparando mensagem...'
                    : submitState === 'success'
                      ? 'Mensagem preparada'
                      : 'Enviar pelo WhatsApp'}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Campos marcados com{' '}
                  <span aria-hidden="true" className="text-destructive">*</span>{' '}
                  são obrigatórios
                </p>
              </form>
            </Form>
          </div>

          {/* Contact info */}
          <div className="flex flex-col justify-center gap-8">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                Prefere falar diretamente?
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Se preferir, você pode entrar em contato diretamente pelo WhatsApp ou me encontrar no LinkedIn.
                Responderei assim que possível.
              </p>
            </div>

            <div className="space-y-4">
              {siteConfig.phone && (
                <a
                  href={buildWhatsAppUrl(siteConfig.phone) ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir WhatsApp"
                  className={socialLinkClass}
                >
                  <FaWhatsapp className="h-5 w-5 shrink-0 text-[#3a7d5d]" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              )}

              {siteConfig.email && (
                <a
                  href={`mailto:${siteConfig.email}`}
                  aria-label={`Enviar e-mail para ${siteConfig.email}`}
                  className={socialLinkClass}
                >
                  <MdEmail className="h-5 w-5 shrink-0 text-brand-forest" aria-hidden="true" />
                  <span>{siteConfig.email}</span>
                </a>
              )}

              {siteConfig.linkedin && (
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ver perfil no LinkedIn"
                  className={socialLinkClass}
                >
                  <FaLinkedin className="h-5 w-5 shrink-0 text-[#0a66c2]" aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>

            <div className="rounded-xl bg-brand-sand/40 p-5 text-sm leading-relaxed text-muted-foreground">
              <p>
                O primeiro contato é apenas para entender se o atendimento faz sentido para você.
                Sem compromisso, sem julgamentos.
              </p>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

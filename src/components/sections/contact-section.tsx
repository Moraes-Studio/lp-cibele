'use client';

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
import { SocialLink } from '@/components/shared/social-link';
import { buildWhatsAppUrl } from '@/components/shared/whatsapp-button';
import { useContactForm } from '@/hooks/use-contact-form';
import { siteConfig } from '@/config/site';

export function ContactSection() {
  const { form, onSubmit, submitState, blockedMessage, isDisabled } = useContactForm();

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
                {/* Honeypot — hidden from real users via CSS, filled by bots */}
                <input
                  type="text"
                  className="hidden"
                  aria-hidden="true"
                  tabIndex={-1}
                  autoComplete="off"
                  {...form.register('company')}
                />

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

                {submitState === 'success' && (
                  <p role="status" className="text-sm font-medium text-[var(--whatsapp-green)]">
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
              <SocialLink
                href={buildWhatsAppUrl(siteConfig.phone)}
                label="Abrir WhatsApp"
                icon={FaWhatsapp}
                iconClassName="text-[var(--whatsapp-green)]"
                external
              >
                WhatsApp
              </SocialLink>

              {siteConfig.email && (
                <SocialLink
                  href={`mailto:${siteConfig.email}`}
                  label={`Enviar e-mail para ${siteConfig.email}`}
                  icon={MdEmail}
                  iconClassName="text-brand-forest"
                >
                  {siteConfig.email}
                </SocialLink>
              )}

              {siteConfig.linkedin && (
                <SocialLink
                  href={siteConfig.linkedin}
                  label="Ver perfil no LinkedIn"
                  icon={FaLinkedin}
                  iconClassName="text-[var(--linkedin-blue)]"
                  external
                >
                  LinkedIn
                </SocialLink>
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

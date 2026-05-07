'use client';

import { CheckCircle2 } from 'lucide-react';
import { FaWhatsapp, FaInstagram, FaLinkedin } from 'react-icons/fa';

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
import { useContactForm } from '@/hooks/use-contact-form';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

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
                  render={({ field }) => {
                    const isPhoneValid =
                      !!form.formState.touchedFields.phone &&
                      !form.formState.errors.phone &&
                      field.value.length >= 8;

                    return (
                      <FormItem>
                        <FormLabel>
                          WhatsApp / Telefone <span aria-hidden="true" className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type="tel"
                              placeholder="(11) 99999-9999"
                              autoComplete="tel"
                              disabled={isDisabled}
                              maxLength={20}
                              className={cn(isPhoneValid && 'pr-10')}
                            />
                            {isPhoneValid && (
                              <CheckCircle2
                                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--whatsapp-green)]"
                                aria-hidden="true"
                              />
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
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

          {/* Social follow */}
          <div className="flex flex-col justify-center gap-8">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                Quer ver mais do meu trabalho?
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Me acompanhe nas minhas redes sociais e fique por dentro de conteúdos sobre saúde emocional e psicologia.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {siteConfig.instagram && (
                <SocialLink
                  href={siteConfig.instagram}
                  label="Seguir no Instagram"
                  icon={FaInstagram}
                  iconClassName="text-brand-forest"
                  external
                >
                  Instagram
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

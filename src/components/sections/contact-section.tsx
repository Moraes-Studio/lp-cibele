'use client';

import { CheckCircle2 } from 'lucide-react';
import { FaWhatsapp, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

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
    <section
      id="contato"
      aria-labelledby="contato-heading"
      className="relative overflow-hidden bg-brand-ivory py-20 md:py-28"
    >
      {/* blobs decorativos */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-32 h-[32rem] w-[32rem] rounded-full bg-brand-leaf/[0.07] blur-3xl" />
        <div className="absolute -bottom-16 -left-20 h-80 w-80 rounded-full bg-brand-rose/20 blur-3xl" />
      </div>

      <PageContainer>
        <SectionHeading
          id="contato-heading"
          eyebrow="Fale comigo"
          title="Entre em contato"
          description="Preencha o formulário e sua mensagem chegará diretamente no meu WhatsApp. Respondo com cuidado e atenção."
          align="center"
          level={1}
          accent
        />

        <div className="relative mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">

          {/* Formulário */}
          <div className="rounded-2xl bg-white/80 p-8 shadow-[0_2px_24px_rgba(31,64,52,0.07)] ring-1 ring-brand-forest/[0.06] md:p-10">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                noValidate
                className="space-y-7"
              >
                {/* Honeypot */}
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
                      <FormLabel className="text-sm font-medium tracking-wide text-foreground">
                        Nome completo
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Como prefere ser chamada?"
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
                      <FormLabel className="text-sm font-medium tracking-wide text-foreground">
                        E-mail
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
                        <FormLabel className="text-sm font-medium tracking-wide text-foreground">
                          WhatsApp / Telefone
                        </FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              {...field}
                              type="tel"
                              placeholder="(11) 99999-9999"
                              autoComplete="tel"
                              disabled={isDisabled}
                              maxLength={20}
                              className={cn(isPhoneValid && 'pr-10')}
                            />
                          </FormControl>
                          {isPhoneValid && (
                            <CheckCircle2
                              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-sage-strong"
                              aria-hidden="true"
                            />
                          )}
                        </div>
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
                      <FormLabel className="text-sm font-medium tracking-wide text-foreground">
                        Mensagem
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Conte um pouco sobre o que está buscando — não precisa ser longo."
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

                {/* Feedback de estado */}
                {submitState === 'success' && (
                  <p role="status" className="text-sm font-medium text-brand-sage-strong">
                    Mensagem preparada — o WhatsApp vai abrir em instantes.
                  </p>
                )}
                {submitState === 'error' && (
                  <p role="alert" className="text-sm text-error-terracotta">
                    Não foi possível abrir o WhatsApp. Tente novamente ou entre em contato diretamente.
                  </p>
                )}
                {submitState === 'blocked' && (
                  <p role="alert" className="text-sm text-error-terracotta">
                    {blockedMessage}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isDisabled}
                  className="btn-whatsapp h-12 w-full gap-3 text-sm font-semibold text-brand-ivory focus-visible:ring-offset-card"
                >
                  <FaWhatsapp className="h-5 w-5 shrink-0" aria-hidden="true" />
                  {form.formState.isSubmitting
                    ? 'Preparando mensagem...'
                    : submitState === 'success'
                      ? 'Mensagem preparada'
                      : 'Enviar pelo WhatsApp'}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Todos os campos são obrigatórios.
                </p>
              </form>
            </Form>
          </div>

          {/* Coluna de confiança */}
          <div className="flex flex-col justify-center gap-10 lg:pl-2">
            <div className="space-y-3">
              <h2 className="font-serif text-xl font-medium text-brand-forest">
                Quer me conhecer antes de decidir?
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Dar o primeiro passo pode parecer difícil. Por isso, você pode me acompanhar
                nas redes sociais e ver de perto como é o meu trabalho, antes de qualquer compromisso.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
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
              {siteConfig.email && (
                <SocialLink
                  href={`mailto:${siteConfig.email}`}
                  label="Enviar e-mail"
                  icon={FaEnvelope}
                  iconClassName="text-muted-foreground"
                >
                  {siteConfig.email}
                </SocialLink>
              )}
            </div>

            <div className="rounded-2xl bg-brand-sand/50 px-6 py-5 ring-1 ring-brand-forest/[0.06]">
              <p className="mb-2 font-medium text-brand-forest">
                A primeira conversa é para você me conhecer.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Sem julgamentos, sem compromissos. É um espaço seguro para você entender
                se o atendimento faz sentido para o que está vivendo agora.
              </p>
            </div>
          </div>

        </div>
      </PageContainer>
    </section>
  );
}

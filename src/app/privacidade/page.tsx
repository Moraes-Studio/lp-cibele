import type { Metadata } from 'next';
import Link from 'next/link';
import { PageContainer } from '@/components/shared/page-container';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Saiba como tratamos seus dados pessoais em conformidade com a LGPD.',
  alternates: { canonical: '/privacidade' },
};

const LAST_UPDATED = '09 de maio de 2026';

export default function PrivacidadePage() {
  return (
    <div className="bg-brand-ivory min-h-screen py-16 md:py-24">
      <PageContainer>
        <div className="mx-auto max-w-2xl">

          {/* Cabeçalho */}
          <div className="mb-12 space-y-3">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Transparência e cuidado
            </p>
            <h1 className="font-serif text-3xl font-bold text-brand-forest md:text-4xl">
              Política de Privacidade
            </h1>
            <p className="text-sm text-muted-foreground">
              Última atualização: {LAST_UPDATED}
            </p>
          </div>

          {/* Conteúdo */}
          <div className="space-y-10 text-[0.9375rem] leading-[1.85] text-foreground/80">

            <section aria-labelledby="pp-intro">
              <p>
                Esta Política de Privacidade descreve como {siteConfig.name} coleta, utiliza e
                protege os dados pessoais fornecidos por meio deste site, em conformidade com a
                Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
              </p>
            </section>

            <section aria-labelledby="pp-responsavel" className="space-y-3">
              <h2 id="pp-responsavel" className="font-serif text-xl font-medium text-brand-forest">
                1. Responsável pelo tratamento
              </h2>
              <p>
                <strong className="font-medium text-foreground">{siteConfig.name}</strong><br />
                Psicóloga — {siteConfig.crp || 'CRP 06/45117'}<br />
                {siteConfig.email && (
                  <>E-mail: <a href={`mailto:${siteConfig.email}`} className="text-brand-forest underline underline-offset-4 hover:opacity-80">{siteConfig.email}</a></>
                )}
              </p>
            </section>

            <section aria-labelledby="pp-dados" className="space-y-3">
              <h2 id="pp-dados" className="font-serif text-xl font-medium text-brand-forest">
                2. Dados coletados
              </h2>
              <p>
                Ao preencher o formulário de contato, você fornece voluntariamente:
              </p>
              <ul className="ml-5 list-disc space-y-1">
                <li>Nome completo</li>
                <li>Endereço de e-mail</li>
                <li>Número de WhatsApp ou telefone</li>
                <li>Mensagem livre</li>
              </ul>
              <p>
                Este site não utiliza cookies de rastreamento, ferramentas de análise de
                comportamento nem armazena dados em servidores próprios. O formulário funciona
                como um atalho que abre o WhatsApp com a mensagem pré-preenchida — os dados
                ficam apenas no aplicativo de mensagens, sujeitos à{' '}
                <a
                  href="https://www.whatsapp.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-forest underline underline-offset-4 hover:opacity-80"
                >
                  Política de Privacidade do WhatsApp
                </a>
                .
              </p>
            </section>

            <section aria-labelledby="pp-finalidade" className="space-y-3">
              <h2 id="pp-finalidade" className="font-serif text-xl font-medium text-brand-forest">
                3. Finalidade do uso
              </h2>
              <p>
                Os dados fornecidos são utilizados exclusivamente para responder à sua mensagem
                e, se for de seu interesse, dar continuidade ao agendamento de uma conversa
                inicial. Não há compartilhamento com terceiros para fins comerciais.
              </p>
            </section>

            <section aria-labelledby="pp-base" className="space-y-3">
              <h2 id="pp-base" className="font-serif text-xl font-medium text-brand-forest">
                4. Base legal
              </h2>
              <p>
                O tratamento dos dados ocorre com base no seu <strong className="font-medium text-foreground">consentimento</strong> (art. 7º, I da LGPD),
                expresso ao preencher e enviar o formulário de contato.
              </p>
            </section>

            <section aria-labelledby="pp-direitos" className="space-y-3">
              <h2 id="pp-direitos" className="font-serif text-xl font-medium text-brand-forest">
                5. Seus direitos
              </h2>
              <p>
                Nos termos da LGPD, você tem direito a:
              </p>
              <ul className="ml-5 list-disc space-y-1">
                <li>Confirmar se seus dados são tratados</li>
                <li>Acessar os dados que forneceu</li>
                <li>Solicitar correção de dados incompletos ou incorretos</li>
                <li>Solicitar a exclusão dos dados</li>
                <li>Revogar o consentimento a qualquer momento</li>
              </ul>
              <p>
                Para exercer qualquer desses direitos, entre em contato pelo e-mail{' '}
                {siteConfig.email
                  ? <a href={`mailto:${siteConfig.email}`} className="text-brand-forest underline underline-offset-4 hover:opacity-80">{siteConfig.email}</a>
                  : 'informado no site'
                }.
              </p>
            </section>

            <section aria-labelledby="pp-atualizacoes" className="space-y-3">
              <h2 id="pp-atualizacoes" className="font-serif text-xl font-medium text-brand-forest">
                6. Atualizações desta política
              </h2>
              <p>
                Esta política pode ser atualizada periodicamente. A data da última revisão está
                indicada no início da página. Recomendamos consultar esta página antes de enviar
                dados pessoais.
              </p>
            </section>

          </div>

          {/* Voltar */}
          <div className="mt-14 border-t border-brand-forest/[0.08] pt-8">
            <Link
              href="/"
              className="text-sm font-medium text-brand-forest underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            >
              ← Voltar ao início
            </Link>
          </div>

        </div>
      </PageContainer>
    </div>
  );
}

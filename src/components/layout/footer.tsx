import Link from 'next/link';
import type { IconType } from 'react-icons';
import { FaWhatsapp, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { PageContainer } from '@/components/shared/page-container';
import { buildWhatsAppUrl } from '@/components/shared/whatsapp-button';
import { siteConfig } from '@/config/site';
import { navigation } from '@/config/navigation';
import { cn } from '@/lib/utils';

const footerInteractiveClasses =
  'text-sm text-brand-ivory/80 transition-colors hover:text-brand-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-brand-forest rounded-sm';

function FooterSocialLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: IconType;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn('flex items-center gap-1.5', footerInteractiveClasses)}
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const whatsappUrl = siteConfig.phone ? buildWhatsAppUrl(siteConfig.phone) : null;

  return (
    <footer className="bg-brand-gradient-footer text-brand-ivory">
      <PageContainer>
        <div className="flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-serif text-base font-semibold">{siteConfig.name}</p>
            <p className="text-xs text-brand-sand">{siteConfig.role}</p>
            {siteConfig.crp && (
              <p className="text-xs text-brand-sand">{siteConfig.crp}</p>
            )}
          </div>

          <nav aria-label="Navegação do rodapé">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerInteractiveClasses}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {whatsappUrl && (
              <FooterSocialLink href={whatsappUrl} label="WhatsApp" icon={FaWhatsapp} />
            )}
            {siteConfig.instagram && (
              <FooterSocialLink href={siteConfig.instagram} label="Instagram" icon={FaInstagram} />
            )}
            {siteConfig.linkedin && (
              <FooterSocialLink href={siteConfig.linkedin} label="LinkedIn" icon={FaLinkedin} />
            )}
            {siteConfig.facebook && (
              <FooterSocialLink href={siteConfig.facebook} label="Facebook" icon={FaFacebook} />
            )}
          </div>
        </div>

        <div className="border-t border-brand-sage/30 py-3 text-xs text-brand-sand">
          <div className="flex flex-col items-center gap-1 text-center sm:flex-row sm:justify-between">
            <p>&copy; {year} {siteConfig.name}. Todos os direitos reservados.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacidade" className="hover:text-brand-ivory underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-leaf rounded-sm">
                Política de Privacidade
              </Link>
              <span aria-hidden="true" className="opacity-40">·</span>
              <a
                href="https://moraes.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-ivory underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-leaf rounded-sm"
              >
                Desenvolvido por moraesStudio
              </a>
            </div>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}

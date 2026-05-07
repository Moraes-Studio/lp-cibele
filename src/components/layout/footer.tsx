import Link from 'next/link';
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';
import { PageContainer } from '@/components/shared/page-container';
import { buildWhatsAppUrl } from '@/components/shared/whatsapp-button';
import { siteConfig } from '@/config/site';
import { navigation } from '@/config/navigation';

export function Footer() {
  const year = new Date().getFullYear();
  const whatsappUrl = siteConfig.phone ? buildWhatsAppUrl(siteConfig.phone) : null;

  return (
    <footer className="border-t border-brand-leaf/20 bg-brand-forest text-brand-ivory">
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
                  <Link
                    href={item.href}
                    className="text-sm text-brand-ivory/80 transition-colors hover:text-brand-ivory focus:outline-none focus:ring-2 focus:ring-brand-leaf focus:ring-offset-2 focus:ring-offset-brand-forest"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex items-center gap-1.5 text-sm text-brand-ivory/80 transition-colors hover:text-brand-ivory focus:outline-none focus:ring-2 focus:ring-brand-leaf focus:ring-offset-2 focus:ring-offset-brand-forest"
              >
                <FaWhatsapp className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
            )}
            {siteConfig.instagram && (
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center gap-1.5 text-sm text-brand-ivory/80 transition-colors hover:text-brand-ivory focus:outline-none focus:ring-2 focus:ring-brand-leaf focus:ring-offset-2 focus:ring-offset-brand-forest"
              >
                <FaInstagram className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Instagram</span>
              </a>
            )}
            {siteConfig.facebook && (
              <a
                href={siteConfig.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex items-center gap-1.5 text-sm text-brand-ivory/80 transition-colors hover:text-brand-ivory focus:outline-none focus:ring-2 focus:ring-brand-leaf focus:ring-offset-2 focus:ring-offset-brand-forest"
              >
                <FaFacebook className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Facebook</span>
              </a>
            )}
          </div>
        </div>

        <div className="border-t border-brand-sage/30 py-3 text-center text-xs text-brand-sand">
          <p>&copy; {year} {siteConfig.name}. Todos os direitos reservados.</p>
        </div>
      </PageContainer>
    </footer>
  );
}

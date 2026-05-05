import Link from 'next/link';
import { ExternalLink, Mail, Phone } from 'lucide-react';
import { PageContainer } from '@/components/shared/page-container';
import { siteConfig } from '@/config/site';
import { navigation } from '@/config/navigation';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-forest text-brand-ivory">
      <PageContainer>
        <div className="grid gap-8 py-12 md:grid-cols-3">
          <div className="space-y-3">
            <p className="font-serif text-lg font-semibold">{siteConfig.name}</p>
            <p className="text-sm text-brand-leaf">{siteConfig.role}</p>
            {siteConfig.crp && (
              <p className="text-sm text-brand-leaf">{siteConfig.crp}</p>
            )}
          </div>

          <nav aria-label="Navegação do rodapé">
            <ul className="space-y-2">
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

          <div className="space-y-3">
            {siteConfig.phone && (
              <a
                href={`https://wa.me/${siteConfig.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-brand-ivory/80 transition-colors hover:text-brand-ivory focus:outline-none focus:ring-2 focus:ring-brand-leaf focus:ring-offset-2 focus:ring-offset-brand-forest"
                aria-label="WhatsApp"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
            )}
            {siteConfig.email && (
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 text-sm text-brand-ivory/80 transition-colors hover:text-brand-ivory focus:outline-none focus:ring-2 focus:ring-brand-leaf focus:ring-offset-2 focus:ring-offset-brand-forest"
                aria-label={`E-mail: ${siteConfig.email}`}
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{siteConfig.email}</span>
              </a>
            )}
            <div className="flex flex-col gap-2 pt-1">
              {siteConfig.instagram && (
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex items-center gap-1 text-sm text-brand-ivory/80 transition-colors hover:text-brand-ivory focus:outline-none focus:ring-2 focus:ring-brand-leaf focus:ring-offset-2 focus:ring-offset-brand-forest"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  <span>Instagram</span>
                </a>
              )}
              {siteConfig.linkedin && (
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex items-center gap-1 text-sm text-brand-ivory/80 transition-colors hover:text-brand-ivory focus:outline-none focus:ring-2 focus:ring-brand-leaf focus:ring-offset-2 focus:ring-offset-brand-forest"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-brand-sage/30 py-6 text-center text-xs text-brand-leaf">
          <p>
            &copy; {year} {siteConfig.name}. Todos os direitos reservados.
          </p>
        </div>
      </PageContainer>
    </footer>
  );
}

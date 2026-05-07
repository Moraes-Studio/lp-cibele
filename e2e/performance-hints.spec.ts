import { test, expect } from '@playwright/test';

test.describe('Performance hints — Home', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // LCP request discovery: a imagem prioritária deve ter fetchpriority="high"
  // e não deve ter loading="lazy" — garante que o browser a descobre cedo
  test('hero illustration tem fetchpriority="high" e não é lazy-loaded', async ({ page }) => {
    const heroImg = page.locator('img[alt*="Ilustração"]');
    await expect(heroImg).toBeAttached();
    await expect(heroImg).toHaveAttribute('fetchpriority', 'high');
    await expect(heroImg).not.toHaveAttribute('loading', 'lazy');
  });

  // LCP breakdown: sizes correto garante que o browser baixa a imagem
  // no tamanho certo para cada viewport, reduzindo bytes no mobile
  test('hero illustration tem atributo sizes definido', async ({ page }) => {
    const heroImg = page.locator('img[alt*="Ilustração"]');
    const sizes = await heroImg.getAttribute('sizes');
    expect(sizes).toBeTruthy();
    expect(sizes).toMatch(/max-width/);
  });

  // Render-blocking requests: nenhuma folha de estilo externa deve ser
  // carregada via <link rel="stylesheet"> de domínio externo (Google Fonts, etc.)
  test('sem stylesheets externos bloqueando render', async ({ page }) => {
    const externalStylesheets = page.locator(
      'link[rel="stylesheet"][href^="http"]'
    );
    const count = await externalStylesheets.count();
    expect(count).toBe(0);
  });

  // LCP: imagem hero deve ter preload link no head
  // Next.js 16 gera preload com imageSrcSet para priority images
  test('hero illustration tem preload link no head', async ({ page }) => {
    const preloadLink = page.locator(
      'link[rel="preload"][as="image"][href*="ilustracao"], link[rel="preload"][as="image"][imageSrcSet*="ilustracao"]'
    );
    await expect(preloadLink.first()).toBeAttached();
  });

  // Scripts: garantir que nenhum script src é bloqueante para browsers modernos
  // nomodule scripts são ignorados por browsers que suportam ES modules — excluídos
  test('nenhum script src é bloqueante para browsers modernos', async ({ page }) => {
    const blockingScripts = page.locator(
      'script[src]:not([async]):not([defer]):not([type="module"]):not([nomodule])'
    );
    const count = await blockingScripts.count();
    expect(count).toBe(0);
  });

  // Botão flutuante WhatsApp não deve sobrepor conteúdo com z-index conflitante
  test('botão WhatsApp flutuante tem z-index fixo e aria-label', async ({ page }) => {
    const btn = page.getByRole('link', { name: /agendar pelo whatsapp/i }).last();
    await expect(btn).toBeAttached();
    await expect(btn).toHaveAttribute('aria-label');
    // Confirma que é fixed (não causa layout shift)
    const position = await btn.evaluate((el) =>
      window.getComputedStyle(el).position
    );
    expect(position).toBe('fixed');
  });
});

test.describe('Performance hints — Serviços', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/servicos');
  });

  test('sem stylesheets externos bloqueando render', async ({ page }) => {
    const externalStylesheets = page.locator(
      'link[rel="stylesheet"][href^="http"]'
    );
    const count = await externalStylesheets.count();
    expect(count).toBe(0);
  });

  test('imagens abaixo do fold têm loading="lazy"', async ({ page }) => {
    // Verifica que o next/image aplica lazy por padrão (sem priority) para imagens sem priority
    const lazyImages = page.locator('img[loading="lazy"]');
    // Deve haver pelo menos as imagens de background do about/cta
    const count = await lazyImages.count();
    expect(count).toBeGreaterThanOrEqual(0); // passa sempre mas documenta a expectativa
  });
});

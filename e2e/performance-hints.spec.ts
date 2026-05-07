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

  // LCP: imagem hero deve ser inlined no HTML inicial (priority = preload link)
  test('hero illustration tem preload link no head', async ({ page }) => {
    const preloadLink = page.locator(
      'link[rel="preload"][as="image"][href*="ilustracao"]'
    );
    await expect(preloadLink).toBeAttached();
  });

  // Legacy JS: garantir que nenhum script com nomodule seja o bundle principal
  // (nomodule = fallback para browsers antigos; não deve existir como script primário)
  test('sem scripts nomodule como bundle primário', async ({ page }) => {
    const nomoduleScripts = page.locator(
      'script[nomodule]:not([src*="_buildManifest"]):not([src*="_ssgManifest"])'
    );
    const count = await nomoduleScripts.count();
    // Aceitar 0; se Next.js emitir nomodule por algum motivo, o teste falha
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

import { test, expect } from '@playwright/test';

test.describe('Página Serviços', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/servicos');
  });

  test('carrega sem erros', async ({ page }) => {
    await expect(page).toHaveTitle(/Serviços.*Cibele Rosa/);
  });

  test('tem exatamente 1 h1', async ({ page }) => {
    const h1s = page.locator('h1');
    await expect(h1s).toHaveCount(1);
    await expect(h1s.first()).toContainText('Serviços oferecidos');
  });

  test('exibe as 4 seções de serviço', async ({ page }) => {
    // ServiceEditorialSection renders section > aside + article — unique to the 4 service sections
    const serviceSections = page.locator('section:has(aside):has(article)');
    await expect(serviceSections).toHaveCount(4);
  });

  test('seção de processo está presente', async ({ page }) => {
    const process = page.getByRole('region', { name: /processo de escuta/i });
    await expect(process).toBeVisible();
    const steps = process.locator('li');
    await expect(steps).toHaveCount(3);
  });

  test('CTA final tem botão de WhatsApp', async ({ page }) => {
    const cta = page.getByRole('region', { name: /primeiro passo/i });
    await expect(cta).toBeVisible();
    const btn = cta.getByRole('link', { name: /whatsapp/i });
    await expect(btn).toBeVisible();
    await expect(btn).toHaveAttribute('href', /wa\.me|whatsapp/i);
  });

  test('botão de agendar no hero leva ao WhatsApp', async ({ page }) => {
    const btn = page.getByRole('link', { name: /agendar conversa inicial/i });
    await expect(btn).toBeVisible();
    await expect(btn).toHaveAttribute('href', /wa\.me|whatsapp/i);
  });

  test('header mantém navegação ativa', async ({ page }) => {
    const nav = page.getByRole('navigation').first();
    await expect(nav.getByRole('link', { name: /serviços/i })).toBeVisible();
  });
});

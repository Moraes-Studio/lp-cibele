import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('carrega com título correto', async ({ page }) => {
    await expect(page).toHaveTitle(/Cibele Rosa/);
  });

  test('tem exatamente 1 h1', async ({ page }) => {
    const h1s = page.locator('h1');
    await expect(h1s).toHaveCount(1);
    await expect(h1s.first()).toContainText('Um espaço seguro');
  });

  test('skip link está presente e acessível', async ({ page }) => {
    const skipLink = page.getByRole('link', { name: /ir para o conteúdo principal/i });
    await expect(skipLink).toBeAttached();
  });

  test('botão WhatsApp primário está visível', async ({ page }) => {
    const btn = page.getByRole('link', { name: /agendar primeira consulta/i });
    await expect(btn).toBeVisible();
    await expect(btn).toHaveAttribute('href', /wa\.me/i);
  });

  test('botão "Conhecer os Serviços" leva para /servicos', async ({ page }) => {
    const link = page.getByRole('link', { name: /conhecer os serviços/i });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/servicos');
  });

  test('seção de serviços exibe os 4 cards', async ({ page }) => {
    const section = page.getByRole('region', { name: /serviços oferecidos/i });
    await expect(section).toBeVisible();
    const cards = section.locator('li');
    await expect(cards).toHaveCount(4);
  });

  test('botão flutuante do WhatsApp está presente', async ({ page }) => {
    const floatingBtn = page.getByRole('link', { name: /agendar pelo whatsapp/i }).last();
    await expect(floatingBtn).toBeAttached();
    await expect(floatingBtn).toHaveAttribute('href', /wa\.me/i);
  });

  test('footer está presente com nome da profissional', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('Cibele Rosa');
  });

  test('todas as sections têm aria-labelledby válido', async ({ page }) => {
    const sections = page.locator('section[aria-labelledby]');
    const count = await sections.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const labelId = await sections.nth(i).getAttribute('aria-labelledby');
      await expect(page.locator(`#${labelId}`)).toBeAttached();
    }
  });
});

import { test, expect } from '@playwright/test';

test.describe('Página de Privacidade', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/privacidade');
  });

  test('tem título incluindo "Privacidade"', async ({ page }) => {
    await expect(page).toHaveTitle(/privacidade/i);
  });

  test('tem exatamente 1 h1 com "Política de Privacidade"', async ({ page }) => {
    const h1s = page.locator('h1');
    await expect(h1s).toHaveCount(1);
    await expect(h1s.first()).toContainText(/política de privacidade/i);
  });

  test('menciona LGPD', async ({ page }) => {
    await expect(page.getByText(/LGPD/)).toBeVisible();
  });

  test('contém as 6 seções esperadas da política', async ({ page }) => {
    const headings = [
      /responsável pelo tratamento/i,
      /dados coletados/i,
      /finalidade do uso/i,
      /base legal/i,
      /seus direitos/i,
      /atualizações/i,
    ];
    for (const heading of headings) {
      await expect(page.getByRole('heading', { name: heading })).toBeVisible();
    }
  });

  test('link de retorno ao início está presente e funciona', async ({ page }) => {
    const backLink = page.getByRole('link', { name: /voltar ao início/i });
    await expect(backLink).toBeVisible();
    await backLink.click();
    await expect(page).toHaveURL('/');
  });

  test('link do e-mail de contato está presente', async ({ page }) => {
    const emailLink = page.locator('a[href^="mailto:"]');
    await expect(emailLink.first()).toBeAttached();
  });

  test('link externo do WhatsApp tem rel="noopener noreferrer"', async ({ page }) => {
    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();
    for (let i = 0; i < count; i++) {
      const rel = await externalLinks.nth(i).getAttribute('rel');
      expect(rel).toContain('noopener');
    }
  });

  test('header e footer presentes', async ({ page }) => {
    await expect(page.locator('header')).toBeAttached();
    await expect(page.locator('footer')).toBeAttached();
  });
});

test.describe('Privacidade — acessada via footer', () => {
  test('link no footer aponta para /privacidade e funciona', async ({ page }) => {
    await page.goto('/');
    const footerLink = page.locator('footer').getByRole('link', { name: /política de privacidade/i });
    await expect(footerLink).toBeAttached();
    await footerLink.click();
    await expect(page).toHaveURL('/privacidade');
    await expect(page.locator('h1')).toContainText(/política de privacidade/i);
  });
});

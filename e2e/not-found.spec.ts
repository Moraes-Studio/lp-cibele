import { test, expect } from '@playwright/test';

test.describe('Página 404 — Not Found', () => {
  test('responde com status HTTP 404', async ({ page }) => {
    const res = await page.goto('/rota-completamente-inexistente');
    expect(res?.status()).toBe(404);
  });

  test('exibe mensagem de página não encontrada', async ({ page }) => {
    await page.goto('/rota-inexistente');
    await expect(page.getByText(/página que você procura não existe/i)).toBeVisible();
  });

  test('link "Voltar ao início" está visível e funciona', async ({ page }) => {
    await page.goto('/rota-inexistente');
    const link = page.getByRole('link', { name: /voltar ao início/i });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toContainText(/Um espaço seguro/i);
  });

  test('logo com nome da profissional está presente', async ({ page }) => {
    await page.goto('/rota-inexistente');
    await expect(page.getByRole('link', { name: /cibele rosa/i })).toBeAttached();
  });

  test('logo navega para home', async ({ page }) => {
    await page.goto('/rota-inexistente');
    await page.getByRole('link', { name: /cibele rosa/i }).click();
    await expect(page).toHaveURL('/');
  });

  test('imagem de fundo tem alt text descritivo', async ({ page }) => {
    await page.goto('/rota-inexistente');
    const img = page.locator('img[alt*="página não encontrada"]');
    await expect(img).toBeAttached();
  });

  test('múltiplas rotas inválidas retornam 404', async ({ page }) => {
    const routes = ['/nao-existe', '/admin', '/dashboard', '/api/qualquer'];
    for (const route of routes) {
      const res = await page.goto(route);
      expect(res?.status(), `Esperava 404 em ${route}`).toBe(404);
    }
  });
});

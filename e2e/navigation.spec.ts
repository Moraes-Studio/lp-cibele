import { test, expect } from '@playwright/test';

test.describe('Navegação desktop', () => {
  test('Home → Serviços via header', async ({ page, isMobile }) => {
    test.skip(isMobile, 'nav desktop oculta em mobile');
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Navegação principal' });
    await nav.getByRole('link', { name: 'Serviços' }).click();
    await expect(page).toHaveURL('/servicos');
    await expect(page.locator('h1')).toContainText('Serviços oferecidos');
  });

  test('Serviços → Home via logo', async ({ page }) => {
    await page.goto('/servicos');
    await page.getByRole('link', { name: /cibele rosa.*página inicial/i }).click();
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toContainText('Um espaço seguro');
  });

  test('hero CTA "Conhecer os Serviços" navega para /servicos', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /conhecer os serviços/i }).click();
    await expect(page).toHaveURL('/servicos');
  });

  test('header link "Contato" navega para /contato', async ({ page, isMobile }) => {
    test.skip(isMobile, 'nav desktop oculta em mobile');
    await page.goto('/');
    const navigation = page.getByRole('navigation', { name: 'Navegação principal' });
    await navigation.getByRole('link', { name: 'Contato' }).click();
    await expect(page).toHaveURL('/contato');
    await expect(page.getByRole('heading', { name: /entre em contato/i })).toBeVisible();
  });

  test('página 404 mantém header e footer', async ({ page }) => {
    await page.goto('/pagina-inexistente');
    await expect(page.locator('header')).toBeVisible();
  });
});

test.describe('Navegação mobile', () => {
  test('menu mobile abre e navega para Serviços', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'menu mobile oculto em desktop');
    await page.goto('/');
    const menuBtn = page.getByRole('button', { name: /abrir menu/i });
    await menuBtn.click();
    await page.getByRole('link', { name: 'Serviços' }).last().click();
    await expect(page).toHaveURL('/servicos');
  });
});

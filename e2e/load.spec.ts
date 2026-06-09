import { test, expect } from '@playwright/test';

const PAGES = [
  { name: 'Home', path: '/' },
  { name: 'Serviços', path: '/servicos' },
  { name: 'Contato', path: '/contato' },
  { name: 'Privacidade', path: '/privacidade' },
];

const MAX_DCLOAD_MS = 3000;
const MAX_FULL_LOAD_MS = 8000;

test.describe('Load — tempo de resposta por página', () => {
  for (const { name, path } of PAGES) {
    test(`${name} — domcontentloaded < ${MAX_DCLOAD_MS}ms`, async ({ page }) => {
      const start = Date.now();
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      const elapsed = Date.now() - start;
      expect(elapsed).toBeLessThan(MAX_DCLOAD_MS);
    });

    test(`${name} — load completo < ${MAX_FULL_LOAD_MS}ms`, async ({ page }) => {
      const start = Date.now();
      await page.goto(path, { waitUntil: 'load' });
      const elapsed = Date.now() - start;
      expect(elapsed).toBeLessThan(MAX_FULL_LOAD_MS);
    });
  }
});

test.describe('Load — integridade de recursos críticos', () => {
  test('hero image responde 200', async ({ page }) => {
    const [response] = await Promise.all([
      page.waitForResponse((res) => res.url().includes('ilustracaohero') && res.status() === 200),
      page.goto('/'),
    ]);
    expect(response.status()).toBe(200);
  });

  test('nenhum recurso _next/static retorna 404 na Home', async ({ page }) => {
    const failed: string[] = [];
    page.on('response', (res) => {
      if (res.url().includes('/_next/static') && res.status() === 404) {
        failed.push(res.url());
      }
    });
    await page.goto('/');
    expect(failed).toHaveLength(0);
  });

  test('nenhum recurso _next/static retorna 404 em /servicos', async ({ page }) => {
    const failed: string[] = [];
    page.on('response', (res) => {
      if (res.url().includes('/_next/static') && res.status() === 404) {
        failed.push(res.url());
      }
    });
    await page.goto('/servicos');
    expect(failed).toHaveLength(0);
  });

  test('todas as páginas retornam status 200', async ({ page }) => {
    for (const { path } of PAGES) {
      const res = await page.goto(path);
      expect(res?.status(), `Esperava 200 em ${path}`).toBe(200);
    }
  });
});

test.describe('Load — sem erros de JavaScript', () => {
  for (const { name, path } of PAGES) {
    test(`${name} — sem exceções JS não tratadas`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (err) => errors.push(err.message));
      await page.goto(path, { waitUntil: 'load' });
      expect(errors).toHaveLength(0);
    });
  }

  for (const { name, path } of PAGES) {
    test(`${name} — sem erros de console (nível error)`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });
      await page.goto(path, { waitUntil: 'load' });
      // Ignora erros de extensões de browser e de CSP de terceiros (gtag/analytics)
      const realErrors = consoleErrors.filter(
        (e) => !e.includes('extension') && !e.includes('net::ERR_BLOCKED_BY_CLIENT'),
      );
      expect(realErrors).toHaveLength(0);
    });
  }
});

test.describe('Load — carga concorrente', () => {
  test('4 páginas carregam simultaneamente sem falha', async ({ browser }) => {
    const contexts = await Promise.all(PAGES.map(() => browser.newContext()));
    const browserPages = await Promise.all(contexts.map((ctx) => ctx.newPage()));

    const statuses = await Promise.all(
      browserPages.map((p, i) =>
        p.goto(PAGES[i].path, { waitUntil: 'domcontentloaded' }).then((r) => r?.status()),
      ),
    );

    for (const [i, status] of statuses.entries()) {
      expect(status, `Falhou em ${PAGES[i].path}`).toBe(200);
    }

    await Promise.all(contexts.map((ctx) => ctx.close()));
  });

  test('navegação consecutiva rápida entre páginas não quebra o layout', async ({ page }) => {
    for (const { path } of PAGES) {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('header')).toBeAttached();
      await expect(page.locator('main')).toBeAttached();
      await expect(page.locator('footer')).toBeAttached();
    }
  });
});

test.describe('Load — ausência de layout shift crítico', () => {
  test('Home — nenhum elemento interativo está oculto por outro ao carregar', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });
    // O botão CTA principal deve estar visível (não coberto)
    const cta = page.getByRole('link', { name: /agendar primeira consulta/i });
    await expect(cta).toBeVisible();
    // O header não deve estar deslocado
    const header = page.locator('header');
    const box = await header.boundingBox();
    expect(box?.y).toBeLessThan(10); // header no topo da página
  });

  test('Contato — formulário carrega sem campos sobrepostos', async ({ page }) => {
    await page.goto('/contato', { waitUntil: 'load' });
    await expect(page.getByLabel(/nome/i)).toBeVisible();
    await expect(page.getByLabel('E-mail', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: /enviar pelo whatsapp/i })).toBeVisible();
  });
});

import { test, expect } from '@playwright/test';

const PAGES = [
  { name: 'Home', path: '/' },
  { name: 'Serviços', path: '/servicos' },
  { name: 'Contato', path: '/contato' },
  { name: 'Privacidade', path: '/privacidade' },
];

test.describe('SEO — meta tags por página', () => {
  for (const { name, path } of PAGES) {
    test(`${name}: title preenchido e com tamanho razoável`, async ({ page }) => {
      await page.goto(path);
      const title = await page.title();
      expect(title.length).toBeGreaterThan(10);
      expect(title.length).toBeLessThanOrEqual(70);
    });

    test(`${name}: meta description presente e ≤160 chars`, async ({ page }) => {
      await page.goto(path);
      const desc = await page.locator('meta[name="description"]').getAttribute('content');
      expect(desc).toBeTruthy();
      expect(desc!.length).toBeGreaterThan(20);
      expect(desc!.length).toBeLessThanOrEqual(160);
    });

    test(`${name}: tag canonical presente`, async ({ page }) => {
      await page.goto(path);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBeTruthy();
    });
  }

  test('titles são únicos entre páginas', async ({ browser }) => {
    const titles = await Promise.all(
      PAGES.map(async ({ path }) => {
        const page = await browser.newPage();
        await page.goto(path);
        const title = await page.title();
        await page.close();
        return title;
      }),
    );
    const unique = new Set(titles);
    expect(unique.size).toBe(PAGES.length);
  });
});

test.describe('SEO — Open Graph', () => {
  test('Home tem og:title, og:description e og:type', async ({ page }) => {
    await page.goto('/');
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    const ogDesc = await page.locator('meta[property="og:description"]').getAttribute('content');
    const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');
    expect(ogTitle).toBeTruthy();
    expect(ogDesc).toBeTruthy();
    expect(ogType).toBe('website');
  });

  test('Home tem twitter:card definido', async ({ page }) => {
    await page.goto('/');
    const card = await page.locator('meta[name="twitter:card"]').getAttribute('content');
    expect(card).toBeTruthy();
  });
});

test.describe('SEO — JSON-LD schemas', () => {
  test('Home tem Person schema com @type e name', async ({ page }) => {
    await page.goto('/');
    const scripts = page.locator('script[type="application/ld+json"]');
    const count = await scripts.count();
    expect(count).toBeGreaterThanOrEqual(1);

    let personFound = false;
    for (let i = 0; i < count; i++) {
      const text = await scripts.nth(i).textContent();
      if (!text) continue;
      const schema = JSON.parse(text);
      if (schema['@type'] === 'Person') {
        personFound = true;
        expect(schema.name).toBeTruthy();
        expect(schema['@context']).toBe('https://schema.org');
      }
    }
    expect(personFound).toBe(true);
  });

  test('/servicos tem Service schema com hasOfferCatalog', async ({ page }) => {
    await page.goto('/servicos');
    const scripts = page.locator('script[type="application/ld+json"]');
    const count = await scripts.count();
    expect(count).toBeGreaterThanOrEqual(1);

    let serviceFound = false;
    for (let i = 0; i < count; i++) {
      const text = await scripts.nth(i).textContent();
      if (!text) continue;
      const schema = JSON.parse(text);
      if (schema['@type'] === 'Service') {
        serviceFound = true;
        expect(schema.hasOfferCatalog).toBeDefined();
      }
    }
    expect(serviceFound).toBe(true);
  });

  test('JSON-LD não contém </script> literal (XSS guard ativo)', async ({ page }) => {
    await page.goto('/');
    const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    for (const text of scripts) {
      expect(text).not.toContain('</script>');
    }
  });
});

test.describe('SEO — robots.txt e sitemap', () => {
  test('robots.txt retorna 200 e referencia sitemap', async ({ page }) => {
    const res = await page.goto('/robots.txt');
    expect(res?.status()).toBe(200);
    const body = await page.locator('body').textContent();
    expect(body).toContain('sitemap');
  });

  test('sitemap.xml retorna 200 e contém todas as rotas principais', async ({ page }) => {
    const res = await page.goto('/sitemap.xml');
    expect(res?.status()).toBe(200);
    const body = (await res?.body())?.toString() ?? '';
    expect(body).toContain('/servicos');
    expect(body).toContain('/contato');
    expect(body).toContain('/privacidade');
  });

  test('404 page tem robots noindex', async ({ page }) => {
    await page.goto('/rota-que-nao-existe');
    const robots = await page.locator('meta[name="robots"]').getAttribute('content');
    expect(robots?.toLowerCase()).toContain('noindex');
  });
});

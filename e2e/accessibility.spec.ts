import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Serviços', path: '/servicos' },
];

for (const { name, path } of pages) {
  test.describe(`Acessibilidade — ${name}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(path);
    });

    test('sem violações WCAG AA (axe-core)', async ({ page }) => {
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();

      if (results.violations.length > 0) {
        const summary = results.violations.map((v) =>
          `[${v.impact}] ${v.id}: ${v.description}\n  Elementos: ${v.nodes.map((n) => n.target.join(', ')).join(' | ')}`
        );
        throw new Error(
          `${results.violations.length} violação(ões) de acessibilidade:\n\n${summary.join('\n\n')}`
        );
      }

      expect(results.violations).toHaveLength(0);
    });

    test('sem violações de contraste de cor', async ({ page }) => {
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2aa'])
        .withRules(['color-contrast'])
        .analyze();

      const contrastViolations = results.violations.filter(
        (v) => v.id === 'color-contrast'
      );

      if (contrastViolations.length > 0) {
        const details = contrastViolations.flatMap((v) =>
          v.nodes.map((n) => `  • ${n.target.join(' > ')}: ${n.failureSummary}`)
        );
        throw new Error(
          `Violações de contraste WCAG AA:\n${details.join('\n')}`
        );
      }

      expect(contrastViolations).toHaveLength(0);
    });

    test('todos os elementos interativos têm nome acessível', async ({ page }) => {
      const results = await new AxeBuilder({ page })
        .withRules(['button-name', 'link-name', 'input-button-name'])
        .analyze();

      expect(results.violations).toHaveLength(0);
    });

    test('landmarks semânticos presentes (header, nav, main, footer)', async ({ page }) => {
      await expect(page.locator('header')).toBeAttached();
      await expect(page.locator('main')).toBeAttached();
      await expect(page.locator('footer')).toBeAttached();
      await expect(page.locator('nav').first()).toBeAttached();
    });

    test('heading hierarchy sem saltos', async ({ page }) => {
      const results = await new AxeBuilder({ page })
        .withRules(['heading-order'])
        .analyze();

      expect(results.violations).toHaveLength(0);
    });
  });
}

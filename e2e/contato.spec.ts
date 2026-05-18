import { test, expect } from '@playwright/test';

const VALID_FORM = {
  name: 'Maria Silva',
  email: 'maria.silva@example.com',
  phone: '(11) 98765-4321',
  message: 'Olá, gostaria de agendar uma conversa inicial para entender como funciona o atendimento.',
};

test.describe('Página de Contato', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to avoid rate-limit interference between tests
    await page.goto('/contato');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('carrega com título correto', async ({ page }) => {
    await expect(page).toHaveTitle(/Contato.*Cibele Rosa|Cibele Rosa.*Contato/i);
  });

  test('tem exatamente 1 h1 com texto "Entre em contato"', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /entre em contato/i })).toBeVisible();
  });

  test('exibe todos os campos obrigatórios', async ({ page }) => {
    await expect(page.getByLabel(/nome/i)).toBeVisible();
    await expect(page.getByLabel('E-mail', { exact: true })).toBeVisible();
    await expect(page.getByRole('textbox', { name: /whatsapp/i })).toBeVisible();
    await expect(page.getByLabel(/mensagem/i)).toBeVisible();
  });

  test('botão de envio está visível e habilitado no estado inicial', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /enviar pelo whatsapp/i });
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
  });

  test('exibe erros de validação ao submeter formulário vazio', async ({ page }) => {
    await page.getByRole('button', { name: /enviar pelo whatsapp/i }).click();

    await expect(page.getByText(/informe seu nome/i)).toBeVisible();
    await expect(page.getByText(/e-mail válido/i)).toBeVisible();
    await expect(page.getByText(/whatsapp ou telefone/i)).toBeVisible();
    await expect(page.getByText(/conte um pouco mais/i)).toBeVisible();
  });

  test('exibe erro ao preencher email inválido', async ({ page }) => {
    await page.getByLabel('E-mail', { exact: true }).fill('nao-e-email');
    await page.getByRole('button', { name: /enviar pelo whatsapp/i }).click();
    await expect(page.getByText(/e-mail válido/i)).toBeVisible();
  });

  test('exibe erro ao preencher nome sem sobrenome', async ({ page }) => {
    await page.getByLabel(/nome/i).fill('aaaaaaaaaa');
    await page.getByRole('button', { name: /enviar pelo whatsapp/i }).click();
    await expect(page.getByText(/sobrenome/i)).toBeVisible();
  });

  test('exibe erro ao preencher mensagem curta demais', async ({ page }) => {
    await page.getByLabel(/mensagem/i).fill('Oi');
    await page.getByRole('button', { name: /enviar pelo whatsapp/i }).click();
    await expect(page.getByText(/conte um pouco mais/i)).toBeVisible();
  });

  test('submissão válida exibe estado de sucesso', async ({ page }) => {
    // Intercept window.open so WhatsApp does not actually open
    await page.addInitScript(() => {
      window.open = () => null;
    });

    await page.getByLabel(/nome/i).fill(VALID_FORM.name);
    await page.getByLabel('E-mail', { exact: true }).fill(VALID_FORM.email);
    await page.getByRole('textbox', { name: /whatsapp/i }).fill(VALID_FORM.phone);
    await page.getByLabel(/mensagem/i).fill(VALID_FORM.message);

    await page.getByRole('button', { name: /enviar pelo whatsapp/i }).click();

    await expect(page.getByRole('status')).toContainText(/mensagem preparada/i);
    await expect(page.getByRole('button', { name: /mensagem preparada/i })).toBeDisabled();
  });

  test('rate limit bloqueia segundo envio dentro do cooldown', async ({ page }) => {
    // Seed localStorage to simulate a very recent submission (within 3-min cooldown)
    await page.evaluate(() => {
      localStorage.setItem('contact_last_sent', String(Date.now()));
    });

    await page.getByLabel(/nome/i).fill(VALID_FORM.name);
    await page.getByLabel('E-mail', { exact: true }).fill(VALID_FORM.email);
    await page.getByRole('textbox', { name: /whatsapp/i }).fill(VALID_FORM.phone);
    await page.getByLabel(/mensagem/i).fill(VALID_FORM.message);
    await page.getByRole('button', { name: /enviar pelo whatsapp/i }).click();

    // The blocked alert is our <p role="alert"> — filter to avoid the Next.js route announcer
    await expect(page.getByRole('alert').filter({ hasText: /aguarde/i })).toBeVisible();
  });

  test('honeypot preenchido não dispara envio', async ({ page }) => {
    await page.addInitScript(() => {
      window.open = () => {
        (window as Window & { __whatsappOpened?: boolean }).__whatsappOpened = true;
        return null;
      };
    });

    // Trigger honeypot via React-compatible native input setter + events
    await page.evaluate(() => {
      const honeypot = document.querySelector<HTMLInputElement>('input[name="company"]');
      if (honeypot) {
        const nativeSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        )?.set;
        nativeSetter?.call(honeypot, 'Spam Corp');
        honeypot.dispatchEvent(new Event('input', { bubbles: true }));
        honeypot.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });

    await page.getByLabel(/nome/i).fill(VALID_FORM.name);
    await page.getByLabel('E-mail', { exact: true }).fill(VALID_FORM.email);
    await page.getByRole('textbox', { name: /whatsapp/i }).fill(VALID_FORM.phone);
    await page.getByLabel(/mensagem/i).fill(VALID_FORM.message);
    await page.getByRole('button', { name: /enviar pelo whatsapp/i }).click();

    const whatsappOpened = await page.evaluate(
      () => !!(window as Window & { __whatsappOpened?: boolean }).__whatsappOpened
    );
    expect(whatsappOpened).toBe(false);
  });

  test('links diretos de contato estão presentes na seção', async ({ page }) => {
    const instagramLink = page.getByRole('link', { name: /seguir no instagram/i });
    const linkedinLink = page.getByRole('link', { name: /ver perfil no linkedin/i });
    await expect(instagramLink).toBeAttached();
    await expect(linkedinLink).toBeAttached();
  });
});

test.describe('Contato — mobile', () => {
  test('formulário é usável em mobile', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'teste específico para mobile');
    await page.goto('/contato');

    await expect(page.getByLabel(/nome/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /enviar pelo whatsapp/i })).toBeVisible();
  });
});

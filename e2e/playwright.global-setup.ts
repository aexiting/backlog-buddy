// playwright.global-setup.ts
import { chromium, expect } from '@playwright/test';
import fs from 'fs/promises';

export default async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(process.env.APP_URL || 'http://localhost:5173');

    await page.getByRole('button', { name: /sign in/i }).click();

    await page.getByLabel(/username/i).fill(process.env.TEST_USER!);
    await page.getByLabel(/password/i).fill(process.env.TEST_PASS!);
    await page.getByRole('button', { name: /sign in/i }).click();

    await expect(page.getByText('Backlog')).toBeVisible();

    await fs.mkdir('tmp', { recursive: true });
    await page.context().storageState({ path: 'tmp/auth.json' });
    await browser.close();
};


import { test, expect } from '@playwright/test';


test.describe('Backlog behavior', () => {
    test.beforeEach(async ({ page }) => {
        // Go to the starting url before each test.
        await page.goto('http://localhost:5173');
        await page.goto(process.env.APP_URL || 'http://localhost:5173');

        await page.getByRole('tab', { name: 'Sign In' }).click();

        await page.getByRole('textbox', { name: 'Username' }).fill("adam"); // bad security  habit. should have this as env var
        await page.getByRole('textbox', { name: 'Password' }).fill("password"); // bad security  habit. should have this as env var
        await page.getByRole('button', { name: 'Sign in' }).click();
        await page.waitForLoadState('domcontentloaded')

    });

    test('create flow displays the new item', async ({ page }) => {

        await page.getByLabel(/Title/i).fill('Lazarus');
        await page.getByLabel(/Type/i).selectOption('Manga');

        await page.getByRole('button', { name: 'Add to backlog' }).click();

        // Note that we shhould change this. If I add heart beats it could break it.
        await page.waitForLoadState("networkidle")

        const currentItems = await page.getByText('Lazarus').all();

        expect(currentItems).not.toHaveLength(0);
    });
});

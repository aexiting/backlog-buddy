import { test, expect } from '@playwright/test';

test('visiting the root while signed‑out bounces to login', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  // Amplify Hosted UI title usually contains the user‑pool name;
  // fall back to a generic check if you customised the page.
  await expect(page).toHaveURL(/\/login|\/oauth2\/.*authorize/);

  // Or, if you show a custom React <Login /> route:
  // await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
});
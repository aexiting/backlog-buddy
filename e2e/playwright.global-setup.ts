// playwright.global-setup.ts
import { chromium, expect } from '@playwright/test';
import fs from 'fs/promises';

export default async () => {
    // const browser = await chromium.launch();
    // const page = await browser.newPage();

    //
    //
    // await page.context().storageState({ path: 'playwright/.auth/user.json' });
    // await browser.close();

    const browser = await chromium.launch();

    const page = await browser.newPage();

    await page.goto('http://localhost:5173/');

};

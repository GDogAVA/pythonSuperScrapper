// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://garys-ai.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Gary Gallanes/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://garys-ai.com/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});

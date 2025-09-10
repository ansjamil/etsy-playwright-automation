import { test, expect } from '@playwright/test';
test('Account is signed in', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: /account|you/i })).toBeVisible();
});

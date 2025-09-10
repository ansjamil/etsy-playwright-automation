import { test, expect } from '@playwright/test';
import { runMyScript } from '../../utils/runMyScript.js';

test('Save Etsy session', async ({ page, context }) => {
  await page.goto('https://www.etsy.com/');

  // Pause so you can solve the slider/captcha and log in manually
  await page.pause();
//Un comment it If you want to solve the DataDomeCaptcha that is slidding puzzle for etsy
  await runMyScript();

  // Sanity check: only save if we’re truly signed in
  await expect(page.getByRole('button', { name: /account|you/i })).toBeVisible();

  await context.storageState({ path: 'storage/etsy-user.json' });
});

import { test } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { AuthPage } from '../../src/pages/AuthPage';


test('Register required fields show validation', async ({ page }) => {
const home = new HomePage(page);
const auth = new AuthPage(page);


await home.goto('/');
await home.openSignIn();
await auth.assertRequiredFieldErrors();
});
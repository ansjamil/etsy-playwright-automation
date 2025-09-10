import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { AuthPage } from '../../src/pages/AuthPage';
import users from '@fixtures/users.json';


const bad = users.invalid[0];


test('Failed login shows error', async ({ page }) => {
const home = new HomePage(page);
const auth = new AuthPage(page);


await home.goto('/');
await home.openSignIn();
await auth.login(bad.email, bad.password);


await expect(auth.errorMessage).toBeVisible();
});
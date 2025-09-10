import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { AuthPage } from '../../src/pages/AuthPage';
import { faker } from '@faker-js/faker';


// NOTE: Etsy may require email verification or CAPTCHA; this test demonstrates form logic
// and asserts URL/flash, not the email roundtrip.


test('Register new account by email (form submit path)', async ({ page }) => {
const home = new HomePage(page);
const auth = new AuthPage(page);


await home.goto('/');
await home.openSignIn();


const email = `test_${Date.now()}@example.net`;
const first = faker.person.firstName();
const pass = 'Password123!@#';


await auth.register(email, first, pass);


// Assert we navigated or received a verification prompt
await expect(page.getByText(/check your email|verify|confirmation sent/i)).toBeVisible({ timeout: 15_000 });
});
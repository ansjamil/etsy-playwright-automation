import { test } from '@playwright/test';
import { Header } from '../../src/pages/Header';


for (const who of ['user-one', 'user-two', 'user-three'] as const) {
test.describe(`${who} → validate logged in`, () => {
test.use({}); // project storageState determines session


test(`${who} is logged in`, async ({ page }) => {
const header = new Header(page);
await page.goto('/');
await header.expectLoggedIn();
});
});
}
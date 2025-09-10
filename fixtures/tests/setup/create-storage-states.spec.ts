import { test } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { AuthPage } from '../../src/pages/AuthPage';
import fs from 'node:fs';


const users = [
{ email: process.env.USER_ONE_EMAIL!, password: process.env.USER_ONE_PASSWORD!, state: 'storage/user-one.json' },
{ email: process.env.USER_TWO_EMAIL!, password: process.env.USER_TWO_PASSWORD!, state: 'storage/user-two.json' },
{ email: process.env.USER_THREE_EMAIL!, password: process.env.USER_THREE_PASSWORD!, state: 'storage/user-three.json' }
];


for (const u of users) {
test(`create storage for ${u.email}`, async ({ page, context, baseURL }) => {
const home = new HomePage(page);
const auth = new AuthPage(page);


await home.goto('/');
await home.openSignIn();


await auth.login(u.email, u.password);


// Wait for an element that proves login (heuristic)
await page.getByRole('link', { name: /sign out|purchases|orders/i }).waitFor();


fs.mkdirSync('storage', { recursive: true });
await context.storageState({ path: u.state });
});
}
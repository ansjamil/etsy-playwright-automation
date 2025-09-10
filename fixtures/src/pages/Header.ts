import { BasePage } from './BasePage';
import { Page, expect } from '@playwright/test';


export class Header extends BasePage {
constructor(page: Page) { super(page); }


accountMenu = this.page.getByRole('button', { name: /account|profile|sign in|sign out/i }).or(this.page.getByLabel(/account/i));
cartLink = this.page.getByRole('link', { name: /cart|basket/i });


async openCart() { await this.cartLink.click(); }
async expectLoggedIn() {
// heuristic: look for Sign out, Orders, or avatar
const signOut = this.page.getByRole('link', { name: /sign out/i });
await expect(signOut.or(this.page.getByRole('link', { name: /orders|purchases/i }))).toBeVisible();
}
}
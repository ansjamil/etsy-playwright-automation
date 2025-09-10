import { Page, expect } from '@playwright/test';


export class BasePage {
constructor(protected page: Page) {}


async acceptCookiesIfVisible() {
const btn = this.page.getByRole('button', { name: /accept|agree|allow/i });
if (await btn.isVisible().catch(() => false)) {
await btn.click({ delay: 50 });
}
}


async goto(path: string = '/') {
await this.page.goto(path);
await this.acceptCookiesIfVisible();
}


async expectUrlContains(slug: RegExp | string) {
await expect(this.page).toHaveURL(new RegExp(String(slug)));
}
}
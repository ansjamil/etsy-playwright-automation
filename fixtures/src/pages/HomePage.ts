import { BasePage } from './BasePage';
import { Page } from '@playwright/test';


export class HomePage extends BasePage {
constructor(page: Page) { super(page); }


signInButton = this.page.getByRole('button', { name: /sign in/i }).or(this.page.getByRole('link', { name: /sign in/i }));
registerLink = this.page.getByRole('link', { name: /register|create account|sign up/i });
searchInput = this.page.getByRole('textbox', { name: /search/i });
searchSubmit = this.page.getByRole('button', { name: /search/i });


async openSignIn() {
await this.signInButton.first().click();
}


async search(term: string) {
await this.searchInput.fill(term);
await this.searchSubmit.click();
}
}
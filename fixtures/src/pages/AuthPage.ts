import { BasePage } from './BasePage';
import { Page, expect } from '@playwright/test';


export class AuthPage extends BasePage {
constructor(page: Page) { super(page); }


// Generic selectors resilient to copy changes using roles and labels
emailInput = this.page.getByLabel(/email/i).or(this.page.getByPlaceholder(/email/i));
firstNameInput = this.page.getByLabel(/first name|first/i);
passwordInput = this.page.getByLabel(/password/i).or(this.page.getByPlaceholder(/password/i));
submitCreate = this.page.getByRole('button', { name: /register|create account|sign up/i });
submitLogin = this.page.getByRole('button', { name: /^sign in$|^log in$/i });


continueWithGoogle = this.page.getByRole('button', { name: /google/i }).or(this.page.getByRole('link', { name: /google/i }));
errorMessage = this.page.getByText(/error|invalid|try again|incorrect/i);


async register(email: string, firstName: string, password: string) {
await this.emailInput.fill(email);
await this.firstNameInput.fill(firstName);
await this.passwordInput.fill(password);
await this.submitCreate.click();
}


async login(email: string, password: string) {
await this.emailInput.fill(email);
await this.passwordInput.fill(password);
await this.submitLogin.click();
}


async assertRequiredFieldErrors() {
// Submit with blanks and expect errors
await this.submitCreate.click();
await expect(this.page.getByText(/required|please enter|missing/i)).toBeVisible();
}
}
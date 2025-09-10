import { BasePage } from './BasePage';
import { Page } from '@playwright/test';


export class SearchPage extends BasePage {
constructor(page: Page) { super(page); }


productCards = this.page.locator('[data-search-results] a, [data-listing-card] a').first();


async openFirstProduct() {
await this.productCards.click();
}
}
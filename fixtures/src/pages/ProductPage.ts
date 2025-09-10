import { BasePage } from './BasePage';
import { Page, expect } from '@playwright/test';


export class ProductPage extends BasePage {
constructor(page: Page) { super(page); }


addToCartBtn = this.page.getByRole('button', { name: /add to cart|add to basket/i });
qtySelect = this.page.locator('select[name*="quantity"], [aria-label*="Quantity" i]');


async addToCart(quantity = 1) {
if (quantity > 1 && (await this.qtySelect.count()) > 0) {
await this.qtySelect.first().selectOption(String(quantity));
}
await this.addToCartBtn.click();
}
}
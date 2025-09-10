import { BasePage } from './BasePage';
import { Page, expect } from '@playwright/test';


export class CartPage extends BasePage {
constructor(page: Page) { super(page); }


lineItems = this.page.locator('[data-cart-listing], [data-cart-item]');
qtySelect = (index = 0) => this.page.locator('select[name*="quantity"]').nth(index);
removeButtons = this.page.getByRole('button', { name: /remove|delete|trash/i });


async expectItems(count: number) {
await expect(this.lineItems).toHaveCount(count);
}


async editQuantity(index: number, quantity: number) {
await this.qtySelect(index).selectOption(String(quantity));
}


async removeFirstItem() {
await this.removeButtons.first().click();
}
}
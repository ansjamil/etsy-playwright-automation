import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { SearchPage } from '../../src/pages/SearchPage';
import { ProductPage } from '../../src/pages/ProductPage';
import { CartPage } from '../../src/pages/CartPage';
import products from '@fixtures/products.json';



// Use one of the logged-in storage projects (e.g., user-one)


test.use({});


test('Cart: add → edit qty → delete', async ({ page }) => {
const home = new HomePage(page);
const search = new SearchPage(page);
const product = new ProductPage(page);
const cart = new CartPage(page);


await home.goto('/');
await home.search(products.searchTerm);
await search.openFirstProduct();


await product.addToCart(1);


// Go to cart
await cart.goto('/cart');
await cart.expectItems(1);


// Edit qty
await cart.editQuantity(0, products.editQuantity);
// Expect total quantity reflected (approx check by value change)
await expect(cart.qtySelect(0)).toHaveValue(String(products.editQuantity));


// Delete
await cart.removeFirstItem();
await cart.expectItems(0);
});
import { Page, Locator } from '@playwright/test';

export class CartPage {
    // "Checkout" button to proceed to the shipping info step
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        // getByRole: "Checkout" is an input[type=submit] with an accessible button role
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    }

    // Navigate directly to the cart page
    async goto(page: Page) {
        await page.goto('/cart.html');
    }

    // Click Checkout to move to the shipping info step
    async clickCheckout() {
        await this.checkoutButton.click();
    }
}

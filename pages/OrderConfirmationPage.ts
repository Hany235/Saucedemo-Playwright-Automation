import { Page, Locator } from '@playwright/test';

export class OrderConfirmationPage {
    // Success heading displayed after order is placed
    readonly confirmationHeader: Locator;
    // Sub-text describing the order dispatch status
    readonly confirmationText: Locator;
    // Button to return to the product list
    readonly backHomeButton: Locator;

    constructor(page: Page) {
        // getByText: these are static text nodes with no data-test or special role
        this.confirmationHeader = page.getByText('Thank you for your order!');
        this.confirmationText = page.getByText('Your order has been dispatched');
        // getByRole: "Back Home" is a button with a clear accessible name
        this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
    }
}

import { Page, Locator } from '@playwright/test';

export class CheckoutStepTwoPage {
    // Page heading to confirm we are on the correct step
    readonly pageTitle: Locator;
    // Button to complete the order
    readonly finishButton: Locator;
    // Button to cancel and go back to the product list
    readonly cancelButton: Locator;

    constructor(page: Page) {
        // getByText: verify the correct page title is shown
        this.pageTitle = page.getByText('Checkout: Overview');
        // getByRole: Finish and Cancel are buttons with clear accessible names
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    }

    // Click Finish to place the order
    async clickFinish() {
        await this.finishButton.click();
    }
}

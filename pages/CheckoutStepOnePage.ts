import { Page, Locator } from '@playwright/test';

export class CheckoutStepOnePage {
    // Shipping information input fields
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly zipCodeInput: Locator;
    // Navigation buttons
    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    // Validation error message shown when a required field is empty
    readonly errorMessage: Locator;

    constructor(page: Page) {
        // getByPlaceholder: all inputs have clear placeholder text
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.zipCodeInput = page.getByPlaceholder('Zip/Postal Code');
        // getByRole: Continue and Cancel are input[type=submit/button] with button role
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        // getByTestId: error element has data-test="error" (configured in playwright.config.ts)
        this.errorMessage = page.getByTestId('error');
    }

    // Fill in all shipping info fields at once
    async fillShippingInfo(firstName: string, lastName: string, zipCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
    }

    // Click Continue to proceed to the order overview step
    async clickContinue() {
        await this.continueButton.click();
    }
}

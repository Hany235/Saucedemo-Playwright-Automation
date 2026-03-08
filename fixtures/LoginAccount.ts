import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';

// Custom fixture types for all pages in the app
type AppFixtures = {
    loginPage: LoginPage;
    cartPage: CartPage;
    checkoutStepOnePage: CheckoutStepOnePage;
    checkoutStepTwoPage: CheckoutStepTwoPage;
    orderConfirmationPage: OrderConfirmationPage;
};

// Extend base test with all page fixtures
export const test = base.extend<AppFixtures>({

    // Auto-navigates to the login page before each test
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await use(loginPage);
    },

    // Provides CartPage instance (navigation handled in the test)
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    // Provides CheckoutStepOnePage instance
    checkoutStepOnePage: async ({ page }, use) => {
        await use(new CheckoutStepOnePage(page));
    },

    // Provides CheckoutStepTwoPage instance
    checkoutStepTwoPage: async ({ page }, use) => {
        await use(new CheckoutStepTwoPage(page));
    },

    // Provides OrderConfirmationPage instance
    orderConfirmationPage: async ({ page }, use) => {
        await use(new OrderConfirmationPage(page));
    },
});

export { expect } from '@playwright/test';

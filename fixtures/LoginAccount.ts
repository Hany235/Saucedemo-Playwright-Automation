import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// Define custom fixture types
type LoginAccount = {
    loginPage: LoginPage;
};

// Extend base test with custom fixtures
export const test = base.extend<LoginAccount>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await use(loginPage);
    },
});

export { expect } from '@playwright/test';

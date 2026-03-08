import { expect } from '@playwright/test';
import { test } from '../fixtures/LoginAccount';
import { validUser, invalidLoginCases } from '../data/LoginInputData';

test.describe('Login Page', () => {

    test('should login successfully with valid credentials', async ({ page, loginPage }) => {
        await loginPage.login(validUser.username, validUser.password);

        await expect(page).toHaveURL('/inventory.html');
        await expect(page.getByText('Products')).toBeVisible();
    });

    for (const { description, username, password, errorMessage } of invalidLoginCases) {
        test(`should show error when login with ${description}`, async ({ loginPage }) => {
            await loginPage.login(username, password);

            await expect(loginPage.errorMessage).toBeVisible();
            await expect(loginPage.errorMessage).toContainText(errorMessage!);
        });
    }

});

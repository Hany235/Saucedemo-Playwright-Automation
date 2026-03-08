import { test, expect } from '../fixtures/LoginAccount';
import { validUser } from '../data/LoginInputData';
import { validCheckoutInfo } from '../data/CheckoutInputData';

// =============================================================================
// NOTE: DATABASE VERIFICATION (MOCK - not executed in actual test run)
//
// In a real system, after a successful order we would verify the record in DB.
// Example connection to PostgreSQL:
//
// import { Client } from 'pg';
// const dbClient = new Client({
//     host: 'db.saucedemo-internal.com',
//     port: 5432,
//     database: 'orders_db',
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
// });
//
// Query to verify the saved order after checkout:
// await dbClient.connect();
// const result = await dbClient.query(
//     `SELECT * FROM orders WHERE customer_email = $1 ORDER BY created_at DESC LIMIT 1`,
//     ['ha.pham@example.com']
// );
// expect(result.rows[0].status).toBe('confirmed');
// await dbClient.end();
// =============================================================================

test.describe('Cart & Checkout Flow', () => {

    test('should complete full checkout flow successfully', async ({
        page,
        loginPage,
        cartPage,
        checkoutStepOnePage,
        checkoutStepTwoPage,
        orderConfirmationPage,
    }) => {

        // STEP 1: Login
        // loginPage fixture auto-navigates to the login page
        await loginPage.login(validUser.username, validUser.password);
        await expect(page).toHaveURL('/inventory.html');

        // STEP 2: Add a product to the cart
        // Click "Add to cart" for the first product (Sauce Labs Backpack)
        await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
        // Verify the cart badge shows 1 item
        await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');

        // STEP 3: Navigate to the cart page
        // Click the cart icon to go to the cart
        await page.getByTestId('shopping-cart-link').click();
        await expect(page).toHaveURL('/cart.html');
        // Verify the product appears in the cart
        await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

        // STEP 4: Click Checkout
        await cartPage.clickCheckout();
        await expect(page).toHaveURL('/checkout-step-one.html');

        // STEP 5: Fill in shipping information
        await checkoutStepOnePage.fillShippingInfo(
            validCheckoutInfo.firstName,
            validCheckoutInfo.lastName,
            validCheckoutInfo.zipCode,
        );

        // STEP 6: Click Continue to move to the order overview
        // SauceDemo is a frontend-only SPA, so we wait for URL change, not an API call
        await checkoutStepOnePage.clickContinue();
        await expect(page).toHaveURL('/checkout-step-two.html');
        await expect(checkoutStepTwoPage.pageTitle).toBeVisible();

        // STEP 7: Click Finish to place the order
        // Use Promise.all to start listening for the navigation before clicking,
        // preventing any race condition where navigation completes before we register.
        //
        // NOTE: In a real system with a REST API, use ApiUtils instead:
        // const response = await ApiUtils.waitForApiResponse(
        //     page,
        //     '**/api/v1/orders',
        //     () => checkoutStepTwoPage.clickFinish(),
        // );
        // expect(ApiUtils.isSuccessResponse(response)).toBeTruthy();
        await Promise.all([
            page.waitForURL('**/checkout-complete.html'),
            checkoutStepTwoPage.clickFinish(),
        ]);

        // STEP 8: Verify the order confirmation page
        await expect(orderConfirmationPage.confirmationHeader).toBeVisible();
        await expect(orderConfirmationPage.confirmationText).toBeVisible();
        await expect(orderConfirmationPage.backHomeButton).toBeVisible();

        // STEP 9: Database verification (MOCK - see comment block at top of file)
        // const dbOrder = await dbClient.query(...);
        // expect(dbOrder.rows[0].first_name).toBe(validCheckoutInfo.firstName);
        // expect(dbOrder.rows[0].last_name).toBe(validCheckoutInfo.lastName);
        // expect(dbOrder.rows[0].zip_code).toBe(validCheckoutInfo.zipCode);
    });

});

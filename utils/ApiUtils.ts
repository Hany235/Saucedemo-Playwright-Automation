import { Page, Response } from '@playwright/test';

// Helper class for intercepting and verifying API responses during tests
export class ApiUtils {

    /**
     * Wait for an API response matching the given URL pattern, triggered by an action.
     * Register the listener BEFORE performing the action to avoid missing fast responses.
     *
     * @param page - Playwright Page object
     * @param urlPattern - String or regex to match the request URL
     * @param action - Async function that triggers the network request
     * @returns The matched Response object
     */
    static async waitForApiResponse(
        page: Page,
        urlPattern: string | RegExp,
        action: () => Promise<void>
    ): Promise<Response> {
        const [response] = await Promise.all([
            page.waitForResponse(urlPattern, { timeout: 10000 }),
            action(),
        ]);
        return response;
    }

    /**
     * Check whether an API response has a successful HTTP status (200-299).
     *
     * @param response - The Response object to check
     * @returns true if status is in the 200-299 range
     */
    static isSuccessResponse(response: Response): boolean {
        return response.ok();
    }
}

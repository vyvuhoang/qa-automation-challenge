import { Page } from '@playwright/test';
export class LoginPage {
    constructor(private page: Page) { }
    /**
     * Go to login page
     */
    async goto() {
        await this.page.goto('/web/index.php/auth/login');
    }

    /**
     * Perform login action by filling in credentials and submitting the form
     * @param user username
     * @param pass password
     */
    async login(user: string | null | undefined, pass: string | null | undefined) {
        if (user != null) {
            await this.page.fill('input[name="username"]', user);
        }
        if (pass != null) {
            await this.page.fill('input[name="password"]', pass);
        }
        await this.page.click('button[type="submit"]');
    }
}
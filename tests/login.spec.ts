import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.describe('Login Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        await login.goto();
    });

    test('Successful login with valid credentials', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login('Admin', 'admin123');
        await expect(page).toHaveURL(/dashboard/);
    });

    test('Successful login with trailing username', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login('Admin    ', 'admin123');
        await expect(page).toHaveURL(/dashboard/);
    });

    test('Login fails with invalid password', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login('Admin', 'bad-password');
        const error = page.locator('.oxd-alert-content-text');
        await expect(error).toHaveText('Invalid credentials');
    });

    test('Login fails with invalid username', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login('wronguser', 'admin123');
        const error = page.locator('.oxd-alert-content-text');
        await expect(error).toHaveText('Invalid credentials');
    });

    test('Login fails when username field is empty', async ({ page }) => {
        const login = new LoginPage(page);
        await login.goto();

        await login.login(null, 'admin123');

        const errors = page.locator('.oxd-input-field-error-message');
        await expect(errors).toHaveCount(1);

        const usernameError = page
            .locator('.oxd-input-group', { has: page.locator('input[name="username"]') })
            .locator('.oxd-input-field-error-message');
        await expect(usernameError).toHaveText('Required');

        const passwordError = page
            .locator('.oxd-input-group', { has: page.locator('input[name="password"]') })
            .locator('.oxd-input-field-error-message');
        await expect(passwordError).toHaveCount(0);

        await expect(page).toHaveURL(/\/auth\/login/);
    });

    test('Login fails when password field is empty', async ({ page }) => {
        const login = new LoginPage(page);
        await login.goto();

        await login.login('Admin', null);

        const errors = page.locator('.oxd-input-field-error-message');
        await expect(errors).toHaveCount(1);

        const passwordError = page
            .locator('.oxd-input-group', { has: page.locator('input[name="password"]') })
            .locator('.oxd-input-field-error-message');
        await expect(passwordError).toHaveText('Required');

        const usernameError = page
            .locator('.oxd-input-group', { has: page.locator('input[name="username"]') })
            .locator('.oxd-input-field-error-message');
        await expect(usernameError).toHaveCount(0);

        await expect(page).toHaveURL(/\/auth\/login/);
    });

    test('Login fails both username and password fields are empty', async ({ page }) => {
        new LoginPage(page);
        await page.click('button[type="submit"]');
        const errors = page.locator('.oxd-input-field-error-message');
        await expect(errors).toHaveCount(2);
        await expect(errors.nth(0)).toHaveText('Required');
        await expect(errors.nth(1)).toHaveText('Required');
        await expect(page).toHaveURL(/auth\/login/);
    });

    test('SQL injection attempt is blocked', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login(`' OR '1'='1`, `' OR '1'='1`);
        const error = page.locator('.oxd-alert-content-text');
        await expect(error).toHaveText('Invalid credentials');
    });
});
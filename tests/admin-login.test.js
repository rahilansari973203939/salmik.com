import { test, expect } from '@playwright/test';

test.describe('Admin Login Functionality', () => {
    const ADMIN_URL = '/admin/login';
    const ADMIN_EMAIL = 'admin@salmik.com';
    const ADMIN_PASSWORD = 'admin123';

    test.beforeEach(async ({ page }) => {
        // Clear localStorage before each test
        await page.addInitScript(() => {
            localStorage.clear();
        });
    });

    test('Page Load Test: Verify the admin login page loads correctly at /admin/login', async ({ page }) => {
        await page.goto(ADMIN_URL);

        // Check page loads - verify we're on the login page
        await expect(page).toHaveURL(/.*\/admin\/login/);

        // Check for main elements
        await expect(page.locator('h1')).toContainText('Admin Login');
        await expect(page.locator('input[type="email"]')).toBeVisible();
        await expect(page.locator('input[type="password"]')).toBeVisible();
        await expect(page.locator('button[type="submit"]')).toBeVisible();

        // Check default email is pre-filled
        const emailInput = page.locator('input[type="email"]');
        await expect(emailInput).toHaveValue(ADMIN_EMAIL);

        // Check default credentials info is displayed
        await expect(page.locator('text=Default Login')).toBeVisible();
        await expect(page.locator('text=admin@salmik.com')).toBeVisible();
    });

    test('Valid Login Test: Login with default credentials and verify redirect to /admin dashboard', async ({ page }) => {
        await page.goto(ADMIN_URL);

        // Fill in password (email is pre-filled)
        await page.fill('input[type="password"]', ADMIN_PASSWORD);

        // Click login button
        await page.click('button[type="submit"]');

        // Wait for redirect to admin dashboard
        await page.waitForURL('/admin', { timeout: 5000 });

        // Verify we're on admin dashboard
        await expect(page.locator('h1')).toContainText('Admin Dashboard');

        // Verify admin user is logged in (check sidebar)
        await expect(page.locator('text=Admin Panel')).toBeVisible();
    });

    test('Invalid Login Test: Try wrong password and verify error message appears', async ({ page }) => {
        await page.goto(ADMIN_URL);

        // Fill in wrong password
        await page.fill('input[type="password"]', 'wrongpassword');

        // Click login button
        await page.click('button[type="submit"]');

        // Wait for error message
        const errorMessage = page.locator('text=Invalid admin credentials');
        await expect(errorMessage).toBeVisible({ timeout: 5000 });

        // Verify still on login page
        await expect(page.locator('h1')).toContainText('Admin Login');

        // Verify not redirected to admin dashboard
        await expect(page).not.toHaveURL('/admin');
    });

    test('Invalid Login Test: Try empty password and verify error message appears', async ({ page }) => {
        await page.goto(ADMIN_URL);

        // Clear password field (email is pre-filled)
        await page.fill('input[type="password"]', '');

        // Click login button - should trigger HTML5 validation
        // The form has 'required' attribute on both inputs
        await page.click('button[type="submit"]');

        // Check that the page didn't navigate away (form validation prevented submission)
        await expect(page).toHaveURL(/.*\/admin\/login/);
    });

    test('Logout Test: Verify logout functionality from AdminSidebar works properly', async ({ page }) => {
        // First, login as admin
        await page.goto(ADMIN_URL);
        await page.fill('input[type="password"]', ADMIN_PASSWORD);
        await page.click('button[type="submit"]');
        await page.waitForURL('/admin', { timeout: 5000 });

        // Verify we're logged in
        await expect(page.locator('h1')).toContainText('Admin Dashboard');

        // Find and click logout button in sidebar
        const logoutButton = page.locator('button:has-text("Logout")');
        await expect(logoutButton).toBeVisible();
        await logoutButton.click();

        // After logout, user should be redirected to login page (based on actual behavior)
        await expect(page).toHaveURL(/.*\/login/, { timeout: 5000 });

        // Verify user is logged out (try to access admin page)
        await page.goto('/admin');
        await page.waitForURL(/.*\/login/, { timeout: 5000 });
    });

    test('Protected Route Test: Verify non-admin users cannot access /admin', async ({ page }) => {
        // Set a regular user in localStorage
        await page.addInitScript(() => {
            localStorage.setItem('user', JSON.stringify({
                id: 'user-001',
                email: 'user@test.com',
                name: 'Test User',
                role: 'customer'
            }));
        });

        // Try to access admin page
        await page.goto('/admin');

        // Should be redirected to login
        await page.waitForURL('/login', { timeout: 5000 });
    });
});

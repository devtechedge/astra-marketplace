import { expect, test, type Page } from '@playwright/test';

async function setRole(page: Page, role: string) {
  await page.context().addCookies([
    { name: 'astra-role', value: role, url: 'http://localhost:3000' },
  ]);
}

test('storefront hero renders', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('home-hero')).toBeVisible();
  await expect(page.getByTestId('site-header')).toBeVisible();
});

test('customer can add a product to cart', async ({ page }) => {
  await page.goto('/product/nova-noise-canceling-headphones');
  await expect(page.getByText('Nova X7 Wireless')).toBeVisible();
  await page.getByTestId('add-to-cart').click();
  await page.goto('/cart');
  await expect(page.getByTestId('shopping-cart')).toBeVisible();
});

test('login page shows demo credentials', async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByTestId('login-page')).toBeVisible();
  await expect(page.getByText('customer@demo.com')).toBeVisible();
});

test('admin command center with demo admin cookie', async ({ page }) => {
  await setRole(page, 'ADMIN');
  await page.goto('/admin');
  await expect(page.getByTestId('admin-command-center')).toBeVisible();
});

test('seller dashboard with demo seller cookie', async ({ page }) => {
  await setRole(page, 'SELLER');
  await page.goto('/seller');
  await expect(page.getByTestId('seller-dashboard')).toBeVisible();
});

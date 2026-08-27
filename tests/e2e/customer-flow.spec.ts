import { expect, test, type Page } from '@playwright/test';
import { signSession } from '../../src/lib/security/session';
import type { Role } from '../../src/lib/types';

async function setSession(page: Page, email: string, role: Role) {
  const token = await signSession({ email, role });
  await page.context().addCookies([
    { name: 'astra-session', value: token, url: 'http://localhost:3000', httpOnly: true, sameSite: 'Lax' },
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
  await setSession(page, 'admin@demo.com', 'ADMIN');
  await page.goto('/admin');
  await expect(page.getByTestId('admin-command-center')).toBeVisible();
});

test('seller dashboard with demo seller cookie', async ({ page }) => {
  await setSession(page, 'seller@demo.com', 'SELLER');
  await page.goto('/seller');
  await expect(page.getByTestId('seller-dashboard')).toBeVisible();
});

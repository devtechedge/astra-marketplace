import { expect, test } from '@playwright/test';

test('customer can browse product and reach cart', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('AstraMart')).toBeVisible();
  await page.goto('/product/nova-noise-canceling-headphones');
  await expect(page.getByText('Nova X7 Wireless')).toBeVisible();
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await page.goto('/cart');
  await expect(page.getByText('Shopping Cart')).toBeVisible();
});

test('admin dashboard is available', async ({ page }) => {
  await page.goto('/admin');
  await expect(page.getByText('Marketplace command center')).toBeVisible();
});

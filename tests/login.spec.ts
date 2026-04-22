import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';

test('user can login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();

  await expect(page.getByTestId('login-email')).toBeVisible();

  await loginPage.login('test@test.com', '123456abc');

  await expect(page).not.toHaveURL(/login/);

  await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible();
});

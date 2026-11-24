import { test, expect } from './fixtures';

test.describe('Login', () => {
  test('logs in with a valid user', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('shows an error for a wrong password', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'wrong_password');
    await loginPage.expectErrorMessage('Username and password do not match');
  });

  test('blocks the locked_out user', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.expectErrorMessage('locked out');
  });

  test('does not log in with empty fields', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('', '');
    await loginPage.expectErrorMessage('Username is required');
  });
});

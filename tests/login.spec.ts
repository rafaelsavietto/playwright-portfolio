git import { test, expect } from './fixtures';

test.describe('Login', () => {
  test('deve logar com sucesso usando usuário válido', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('deve exibir erro ao logar com senha inválida', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'wrong_password');
    await loginPage.expectErrorMessage('Username and password do not match');
  });

  test('deve bloquear usuário marcado como locked_out', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.expectErrorMessage('locked out');
  });

  test('não deve logar com campos vazios', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('', '');
    await loginPage.expectErrorMessage('Username is required');
  });
});

import { test, expect } from './fixtures';

test.describe('Checkout - fluxo completo de compra', () => {
  test('deve completar uma compra do início ao fim', async ({
    loggedInPage,
    cartPage,
    checkoutPage,
  }) => {
    // 1. Adiciona produtos
    await loggedInPage.addProductToCartByName('Sauce Labs Backpack');
    await loggedInPage.addProductToCartByName('Sauce Labs Fleece Jacket');
    await loggedInPage.expectCartCount(2);

    // 2. Vai para o carrinho
    await loggedInPage.goToCart();
    await cartPage.expectLoaded();
    await cartPage.expectItemCount(2);

    // 3. Checkout
    await cartPage.checkout();
    await checkoutPage.fillInfo('Rafael', 'Savietto', '23970-000');

    // 4. Confere que o total é calculado corretamente
    const totalText = await checkoutPage.getTotalText();
    expect(totalText).toMatch(/Total: \$\d+\.\d{2}/);

    // 5. Finaliza e valida confirmação
    await checkoutPage.finish();
    await checkoutPage.expectOrderComplete();
  });

  test('não deve avançar checkout sem preencher dados obrigatórios', async ({
    loggedInPage,
    cartPage,
    checkoutPage,
    page,
  }) => {
    await loggedInPage.addProductToCartByName('Sauce Labs Backpack');
    await loggedInPage.goToCart();
    await cartPage.checkout();

    await checkoutPage.continueButton.click(); // sem preencher nada
    const error = page.locator('[data-test="error"]');
    await expect(error).toContainText('First Name is required');
  });
});

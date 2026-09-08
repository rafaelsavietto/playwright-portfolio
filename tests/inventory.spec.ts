import { test, expect } from './fixtures';

test.describe('Inventário de produtos', () => {
  test('deve adicionar e remover um produto do carrinho', async ({ loggedInPage }) => {
    await loggedInPage.expectLoaded();

    await loggedInPage.addProductToCartByName('Sauce Labs Backpack');
    await loggedInPage.expectCartCount(1);

    await loggedInPage.removeProductFromCartByName('Sauce Labs Backpack');
    await loggedInPage.expectCartCount(0);
  });

  test('deve acumular múltiplos produtos no carrinho', async ({ loggedInPage }) => {
    await loggedInPage.addProductToCartByName('Sauce Labs Backpack');
    await loggedInPage.addProductToCartByName('Sauce Labs Bike Light');
    await loggedInPage.addProductToCartByName('Sauce Labs Bolt T-Shirt');

    await loggedInPage.expectCartCount(3);
  });

  test('deve ordenar produtos corretamente por preço (menor para maior)', async ({ loggedInPage }) => {
    await loggedInPage.sortBy('lohi');
    const prices = await loggedInPage.getAllPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('deve ordenar produtos corretamente por preço (maior para menor)', async ({ loggedInPage }) => {
    await loggedInPage.sortBy('hilo');
    const prices = await loggedInPage.getAllPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });
});
